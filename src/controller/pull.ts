import { Socket } from "socket.io";
import { getDocument } from "../utils/Document";

export const pull = (socket: Socket) => {
  const updates = (documentName: string, version: number) => {
    try {
      const document = getDocument(documentName);
      if (document) {
        const { updates, pending, doc } = document;
        if (version < updates.length) {
          socket.emit(
            "pull:updates:response",
            JSON.stringify(updates.slice(version))
          );
        }
      }
    } catch (error) {
      console.error("pull:updates", error);
    }
  };

  socket.on("pull:updates", updates);
};
