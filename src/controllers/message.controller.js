import mongoose from 'mongoose'
import messages from '../models/message.model.js'
import {onlineUsers} from "../utils/mem.js"
import users from '../models/user.model.js'

const getPrivateMessages = async (req, res, next) => {
    try {
        const { sender, receiver } = req.params;

        console.log(sender, " ", receiver)

        const allMessages = await messages.find({ sender, receiver })

        console.log(allMessages)

        res.status(200).json({ message: "Message fetched successfully", messages: allMessages })

    } catch (error) {
        if (error instanceof mongoose.Error) {
            return next(error)
        }

        return res.status(500).json({ error: "Internal Server error" })
    }
}

const getConversationList = async (req, res, next) => {
    try {
        const { userId } = req.params;

        console.log(userId)

        const allMessages = await messages.find({
            $or: [
                { sender: userId },
                { receiver: userId }
            ]
        }).sort({ timestamp: -1 }); 

        console.log(allMessages)

        const uniquePairs = new Map();

        for (const msg of allMessages) {
            const [userA, userB] = [msg.sender, msg.receiver].sort();
            const key = `${userA}_${userB}`;

            if (!uniquePairs.has(key)) {
                const otherUserId = msg.sender == userId ? msg.receiver : msg.sender;

                const otherUser = await users.findById(otherUserId).lean();
                console.log(otherUser)

                console.log(msg)

                uniquePairs.set(key, {
                    userId: otherUserId,
                    name: otherUser.name,
                    avatar: otherUser.profilePicture,
                    isOnline: onlineUsers.has(otherUserId),
                    lastMessage: msg.content,
                    lastMessageTime: msg.timestamp
                });
            }
        }

        
        const conversationList = Array.from(uniquePairs.values());
        console.log(conversationList)

        res.status(200).json({
            message: "Conversations fetched successfully",
            conversations: conversationList
        });

    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

export { getPrivateMessages, getConversationList }
