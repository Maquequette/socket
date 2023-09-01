import { Document } from "../interface/Document";
import { Socket } from "socket.io";
import { SANDBOX_TEMPLATES } from "../templates";
import { Text } from "@codemirror/state";
import { Update } from "@codemirror/collab";

export const rooms = new Map<string, Document>();

export const getTemplateByRoom = (
  room: string = "",
  socket: Socket,
  template: string = ""
): Document => {
  if (!socket.rooms.has(room)) socket.join(room);

  if (rooms.has(room)) return rooms.get(room)!;

  let files = new Map<
    string,
    {
      code: Text;
      updates: Update[];
      pending: ((value: any) => void)[];
    }
  >();

  Object.entries(SANDBOX_TEMPLATES[template]?.files).forEach(
    (entry: [any, any]) => {
      const [key, value] = entry;
      files.set(key, {
        code: Text.of([value.code]),
        updates: [],
        pending: [],
      });
    }
  );

  const documentContent: Document = {
    files,
  };

  rooms.set(room, { files });

  return documentContent;
};
