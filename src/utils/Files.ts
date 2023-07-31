import { Document } from "../interface/Document";
import { Socket } from "socket.io";
import { SANDBOX_TEMPLATES } from "../templates";

export const rooms = new Map<string, Document>();

export const getTemplateByRoom = (
  room: string = "",
  socket: Socket,
  template: string = ""
): Document => {
  if (!socket.rooms.has(room)) {
    socket.join(room);
  }

  if (rooms.has(room)) return rooms.get(room)!;

  const documentContent: Document = {
    updates: [],
    pending: [],
    files: SANDBOX_TEMPLATES[template],
  };
  rooms.set(room, documentContent);

  return documentContent;
};
