import { Server, Socket } from "socket.io";
import { getTemplateByRoom, rooms } from "../utils/Files";

export const pull = (socket: Socket, io: Server) => {
  const updates = (version: number, room: string) => {
    try {
      const { updates, pending, files } = getTemplateByRoom(room, socket);
      if (version < updates.length) {
        io.to(room).emit(
          "pull:updates:response",
          JSON.stringify(updates.slice(version))
        );
      } else {
        pending.push((updates) => {
          io.to(room).emit(
            "pull:updates:response",
            JSON.stringify(updates.slice(version))
          );
        });
        rooms.set(room, { updates, pending, files });
      }
    } catch (error) {
      console.error("pull:updates", error);
    }
  };

  socket.on("pull:updates", updates);
};
