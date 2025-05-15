import { Server } from "socket.io";
import users from "../models/user.model.js";
import { onlineUsers } from "./mem.js";

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

        if (userId) {
          onlineUsers.set(userId, socket.id)
        }

        socket.emit("online-users", Array.from(onlineUsers.keys()))

        const user = await users.findById(userId).populate('connections');

        io.emit("online", userId)

        user.connections.forEach(c => {
          io.emit('online', userId)
        })

        socket.on("message", async (message) => {
          console.log("recieved: ", message)
        })

        socket.on("disconnect", async () => {
          onlineUsers.delete(userId)
          io.emit('offline', userId);

          user.connections.forEach(c => {
          io.emit('online', userId)
        })

          console.log(`User with userId -${userId}- disconnected`)
        })

      } catch (error) {
        console.log(error)
      }

    });

    return io;
  } catch (error) {
    console.log(error)
  }

};