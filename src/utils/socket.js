import { Server } from "socket.io";

export const initSocket = (server) => {

  try {
    const io = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    console.log("socket setup")

    io.on("connection", (socket) => {
      console.log("New client connected:", socket.id);

      socket.on("event", async (message) => {
        console.log("recieved: ", message)
      })

    });

    return io;
  } catch (error) {
      console.log(error)
  }

};