import "dotenv/config";
import { Server, Socket } from "socket.io";
import * as http from "http";
import { pull } from "./controller/pull";
import { document } from "./controller/document";
import { push } from "./controller/push";

const server = http.createServer();

let io = new Server(server, {
  path: "/api",
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const onConnection = (socket: Socket) => {
  pull(socket, io);
  document(socket, io);
  push(socket, io);
};

io.on("connection", onConnection);

const port = process.env.PORT || 8000;
server.listen(port, () => console.log(`Server listening on port: ${port}`));
