import { Server } from "socket.io";
import users from "../models/user.model.js";
import { onlineUsers } from "./mem.js";
import messages from "../models/message.model.js";

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

        // GET userID from socket metadata provided by client
        const userId = socket.handshake.query["userId"];

        // if userID exists add userID along with socket.id in onlineUsers list
        if (userId) {
          onlineUsers.set(userId, socket.id)
        }

        socket.on("initialize-message", async () => {
          const notDeliveredMessages = await messages.find({
            receiver: userId,
            status: 'sent'
        })

        console.log("notDeliveredMessages: ", notDeliveredMessages)
          notDeliveredMessages.forEach(async msg => {
              console.log("reached here")
              socket.emit("private:receive-message", {
                ...msg.toObject(),
                status: "delivered"
              });

              msg.status = 'delivered'
              await msg.save()

              console.log("msg: ", msg.sender)

              const senderSocketId = onlineUsers.get(msg.sender.toString());
              console.log("socket sender : ", senderSocketId)
                if (senderSocketId) {
                  io.to(senderSocketId).emit("private:message-delivered", msg);
                }
          })
        })

        socket.on("private:seen-message", (Deliveredmessages) => {

            if(Deliveredmessages.length == 0)
            {
              return;
            }

            Deliveredmessages.forEach(async msg => {
              const sender = onlineUsers.get(msg.sender.toString())
              
              const updatedMsg = await messages.findByIdAndUpdate(msg._id, {status: "seen"}, {new: true});

              io.to(sender).emit("private:message-update-seen", updatedMsg);

            })
        })

        // Notifying the client about all the Online users
        socket.emit("online-users", Array.from(onlineUsers.keys()))

        // Getting the current user along with populated connections
        const user = await users.findById(userId).populate('connections');

        // [Temporary] Notifying all users that the user is now online 
        io.emit("online", userId)

        // Notifying all user Connections that the user is now online 
        user.connections.forEach(c => {
          io.emit('online', userId)
        })

        // Message Handler for handling sendMessage event
        socket.on("private:message", async (message) => {
          const toSocket = onlineUsers.get(message.receiver)

          const newMessage = await messages.create({
            sender: userId,
            receiver: message.receiver,
            content: message.content,
            timestamp: message.timestamp,
            status: 'sent',
          })

          console.log({newMessage, tempId: message.tempId})

          socket.emit("private:message-sent", {...newMessage.toObject(), tempId: message.tempId});

          if (toSocket) {
            io.to(toSocket).emit("private:receive-message", {
              ...newMessage.toObject(),
              status: "delivered"
            });
          }

          if(!toSocket)
          {
            return;
          }

          newMessage.status = 'delivered';
          await newMessage.save()

          socket.emit("private:message-delivered", newMessage)

        })

        // Logic for Handling user disconnection 
        socket.on("disconnect", async () => {
          // Removing user from the map of online users
          onlineUsers.delete(userId)

          //[Temporary] Notifying all users that users is offline now
          io.emit('offline', userId);

          // Notifying all user connections that the users is offline now
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