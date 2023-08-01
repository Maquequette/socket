import { Server, Socket } from "socket.io";
import { getTemplateByRoom, rooms } from "../utils/Files";
import { FILE } from "dns";

export const pull = (socket: Socket, io: Server) => {
  const updates = (version: number, room: string, activeFile: string) => {
    try {
      const { files } = getTemplateByRoom(room, socket);
      const { updates, pending } = files.get(activeFile)!;

      if (version < updates.length) {
        socket.emit(
          "pull:updates:response",
          JSON.stringify(updates.slice(version))
        );
      } else {
        pending.push((updates) => {
          socket.emit(
            "pull:updates:response",
            JSON.stringify(updates.slice(version))
          );
        });
        rooms.set(room, { files });
      }
    } catch (error) {
      console.error("pull:updates", error);
    }
  };

  socket.on("pull:updates", updates);
};
