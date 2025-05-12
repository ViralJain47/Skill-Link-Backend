import { Server } from "socket.io";
import users from "../models/user.model";

export const initSocket = (server) => {

  try {
    const io = new Server(server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });

    console.log("socket setup")

    io.on("connection", async (socket) => {
      try {
        console.log("New client connected:", socket.id);
        const userId = socket.handshake.query["userId"];

        const user = await users.findById(userId).populate('connections', 'socketId');
        user.socketId = socket.id;
        user.isOnline = true;
        await user.save();

        user.connections.forEach(c => {
          c.emit('online', {
            user: userId
          })
        })

        socket.on("message", async (message) => {
          console.log("recieved: ", message)
        })

        socket.on("disconnect", async () => {
          user.isOnline = false;
          await user.save();

          user.connections.forEach(c => {
            c.emit('offline', {
              user: userId
            })
          })

        })

      } catch (error) {

      }

    });

    return io;
  } catch (error) {
    console.log(error)
  }

};