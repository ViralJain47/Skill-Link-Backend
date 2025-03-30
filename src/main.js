import http from "http";
import app from "./app.js";
import { config } from "../config/env.js";
import { initSocket } from "./utils/socket.js";

const server = http.createServer(app);
const io = initSocket(server);

server.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});