import { Socket } from "socket.io";
import { getDocument, documents } from "../utils/Document";
import { ChangeSet } from "@codemirror/state";

export const push = (socket: Socket) => {
  const updates = (documentName: string, version: number, docUpdates: any) => {
    try {
      const document = getDocument(documentName);
      if (document) {
        let { updates, pending, doc } = document;
        docUpdates = JSON.parse(docUpdates);

        if (version != updates.length) {
          socket.emit("push:update:response", false);
        } else {
          for (let update of docUpdates) {
            // Convert the JSON representation to an actual ChangeSet
            // instance
            let changes = ChangeSet.fromJSON(update.changes);
            updates.push({
              changes,
              clientID: update.clientID,
              effects: update.effects,
            });
            documents.set(documentName, { updates, pending, doc });
            doc = changes.apply(doc);
            documents.set(documentName, { updates, pending, doc });
          }
          socket.emit("push:update:response", true);

          while (pending.length) pending.pop()!(updates);
          documents.set(documentName, { updates, pending, doc });
        }
      }
    } catch (error) {
      console.error("push:updates", error);
    }
  };

  socket.on("push:updates", updates);
};
