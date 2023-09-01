import { Server, Socket } from "socket.io";
import { ChangeSet } from "@codemirror/state";
import { Update, rebaseUpdates } from "@codemirror/collab";
import { getTemplateByRoom } from "../utils/Files";

export const push = (socket: Socket, io: Server) => {
  const updates = (
    version: number,
    docUpdates: any,
    room: string,
    activeFile: string
  ) => {
    try {
      let { files } = getTemplateByRoom(room, socket);
      let { updates, pending, code } = files.get(activeFile)!;

      let received = JSON.parse(docUpdates).map((update: Update) => ({
        clientID: update.clientID,
        changes: ChangeSet.fromJSON(update.changes),
        effects: update.effects,
      }));

      if (version != updates.length) {
        received = rebaseUpdates(received, updates.slice(version));
        socket.emit("push:updates:response", false);
      }

      for (let update of received) {
        updates.push(update);
        files.set(activeFile, { code, updates, pending });
        code = update.changes.apply(code);
        files.set(activeFile, { code, updates, pending });
      }

      socket.emit("push:updates:response", true);

      if (received.length) {
        let updates = received.map((update: Update) => ({
          clientID: update.clientID,
          changes: update.changes.toJSON(),
          effects: update.effects,
        }));

        while (pending.length) pending.pop()!(updates);

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
