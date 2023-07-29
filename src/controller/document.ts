import { Socket } from "socket.io";
import { getDocument } from "../utils/Document";

export const document = (socket: Socket) => {
  const get = (documentName: string) => {
    try {
      let { updates, doc } = getDocument(documentName);
      socket.emit("get:document:response", updates.length, doc.toString());
    } catch (error) {
      console.error("get:document", error);
    }
  };

  socket.on("document:get", get);
};
