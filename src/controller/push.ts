import { Server, Socket } from "socket.io";
import { getTemplateByRoom, rooms } from "../utils/Files";
import { ChangeSet } from "@codemirror/state";

export const push = (socket: Socket, io: Server) => {
  const updates = (
    version: number,
    docUpdates: any,
    room: string,
    activeFile: string
  ) => {
    try {
      let { files } = getTemplateByRoom(room, socket);
      const { updates, pending, code } = files.get(activeFile)!;

      if (version != updates.length) {
        socket.emit("push:updates:response", false);
      } else {
        for (let update of JSON.parse(docUpdates)) {
          let changes = ChangeSet.fromJSON(update.changes);
          updates.push({
            changes,
            clientID: update.clientID,
            effects: update.effects,
          });
          files.set(activeFile, {
            code,
            updates,
            pending,
          });
        }
        socket.emit("push:updates:response", true);
        while (pending.length) {
          pending.pop()!(updates);
        }
        files.set(activeFile, {
          code,
          updates,
          pending,
        });
      }
    } catch (error) {
      console.error("push:updates", error);
    }
  };

  socket.on("push:updates", updates);
};
