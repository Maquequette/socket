import { Server, Socket } from "socket.io";
import { getTemplateByRoom, rooms } from "../utils/Files";
import { ChangeSet, Text } from "@codemirror/state";

export const push = (socket: Socket, io: Server) => {
  const updates = (
    version: number,
    docUpdates: any,
    room: string,
    activeFile: string
  ) => {
    try {
      let { updates, pending, files } = getTemplateByRoom(room, socket);
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
          files.set(activeFile, changes.apply(files.get(activeFile)!));
        }
        socket.emit("push:updates:response", true);
        while (pending.length) pending.pop()!(updates);
        rooms.set(room, { updates, pending, files });
      }
    } catch (error) {
      console.error("push:updates", error);
    }
  };

  socket.on("push:updates", updates);
};
