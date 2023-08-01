import { Server, Socket } from "socket.io";
import { getTemplateByRoom } from "../utils/Files";

export const document = (socket: Socket, io: Server) => {
  const get = (room: string, template: string, activeFile: string) => {
    try {
      const { files } = getTemplateByRoom(room, socket, template);
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
