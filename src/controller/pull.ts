import { Server, Socket } from "socket.io";
import { getFilesByRoom } from "../utils/Files";

export const pull = (socket: Socket, io: Server) => {
  const updates = (version: number, room: string, activeFile: string) => {
    try {
      const { files } = getFilesByRoom(room, socket);
      const { updates, pending, code } = files.get(activeFile)!;

      if (version < updates.length) {
        socket.emit(
          "pull:updates:response",
          JSON.stringify(updates.slice(version)),
          Object.fromEntries(files)
        );
      } else {
        pending.push((updates) => {
          socket.emit(
            "pull:updates:response",
            JSON.stringify(updates.slice(version)),
            Object.fromEntries(files)
          );
        });

        files.set(activeFile, {
          updates,
          pending,
          code,
        });
      }
    } catch (error) {
      console.error("pull:updates", error);
    }
  };

  socket.on("pull:updates", updates);
};
