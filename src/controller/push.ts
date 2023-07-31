import { Server, Socket } from "socket.io";
import { getTemplateByRoom, rooms } from "../utils/Files";
import { ChangeSet, Text } from "@codemirror/state";

export const push = (socket: Socket, io: Server) => {
  const updates = (
    room: string,
    version: number,
    docUpdates: any,
    template: string
  ) => {
    try {
      let { updates, pending, files } = getTemplateByRoom(room, socket);
      docUpdates = JSON.parse(docUpdates);

      if (version != updates.length) {
        io.to(room).emit("push:updates:response", false);
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
          rooms.set(room, { updates, pending, files });
        }
        io.to(room).emit("push:updates:response", true);

        while (pending.length) pending.pop()!(updates);
        rooms.set(room, { updates, pending, files });
      }
    } catch (error) {
      console.error("push:updates", error);
    }
  };

  socket.on("push:updates", updates);
};
