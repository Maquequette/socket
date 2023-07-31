import { Server, Socket } from "socket.io";
import { getTemplateByRoom } from "../utils/Files";

export const pull = (socket: Socket, io: Server) => {
  const updates = (room: string, version: number, template: string) => {
    try {
      const { updates, pending, files } = getTemplateByRoom(room, socket);
      if (version < updates.length) {
        io.to(room).emit(
          "pull:updates:response",
          JSON.stringify(updates.slice(version))
        );
      }
    } catch (error) {
      console.error("pull:updates", error);
    }
  };

  socket.on("pull:updates", updates);
};
