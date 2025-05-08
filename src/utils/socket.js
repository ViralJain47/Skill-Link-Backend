import { Server } from "socket.io";

export const initSocket = (server) => {
    const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  
  console.log("Real Time updates.....")

  io.on("connection", (socket) => {
    console.log("New client connected:", socket.id);
    
    socket.on("event", async (message) => {
      console.log("recieved: ", message)
    })

  });

  return io;
};