import { Socket } from "socket.io";
import { getDocument } from "../utils/Document";

export const pull = (socket: Socket) => {
  const update = (documentName: string, version: number) => {
    try {
      const { updates, pending, doc } = getDocument(documentName);
      if (version < updates.length) {
        socket.emit(
          "pull:updates:response",
          JSON.stringify(updates.slice(version))
        );
      }
    } catch (error) {
      console.error("pull:updates", error);
    }
  };

  socket.on("pull:updates", update);
};
