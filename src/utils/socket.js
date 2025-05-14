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

        const user = await users.findById(userId).populate('connections');

        user.connections.forEach(c => {
          c.emit('online', {
            user: userId
          })
        })

        socket.on("message", async (message) => {
          console.log("recieved: ", message)
        })

        socket.on("disconnect", async () => {
          onlineUsers.delete(userId)
          user.connections.forEach(c => {
            c.emit('offline', {
              user: userId
            })
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