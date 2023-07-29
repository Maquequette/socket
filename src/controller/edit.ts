import { Socket } from "socket.io";

export const edit = (socket: Socket) => {
  const display = (params: any) => {
    socket.emit("display", params);
  };
  socket.on("edit:display", display);
};
