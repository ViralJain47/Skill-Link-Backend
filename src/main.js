import http from "http";
import app from "./app.js";
import { config } from "../config/env.js";
import { initSocket } from "./utils/socket.js";
import logger from "./utils/logger.js";

const server = http.createServer(app);
const io = initSocket(server);

server.listen(config.port, () => {
  logger.info(`SERVER RUNNING AT http://localhost:${config.port}`);
});