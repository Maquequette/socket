import { Server, Socket } from "socket.io";
import { getFilesByRoom } from "../utils/Files";

export const document = (socket: Socket, io: Server) => {
  const get = (room: string, template: string, activeFile: string) => {
    try {
      const { files } = getFilesByRoom(room, socket, template);
      const { updates } = files.get(activeFile)!;
      socket.emit(
        "get:document:response",
        updates.length,
        Object.fromEntries(files)
      );
    } catch (error) {
      console.error("get:document", error);
    }
  };

  socket.on("get:document", get);
};
