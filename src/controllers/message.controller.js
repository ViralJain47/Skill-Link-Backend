import mongoose from 'mongoose'
import messages from '../models/message.model.js'

const getPrivateMessages = async (req,res,next) => {
    try {
        const { sender , receiver } = req.params;

        console.log(sender, " ", receiver)

        const allMessages = await messages.find({sender, receiver})
        
        res.status(200).json({message: "Message fetched successfully", messages: allMessages})

    } catch (error) {
        if(error instanceof mongoose.Error)
        {
            return next(error)
        }

        return res.status(500).json({error : "Internal Server error"})
    }
}

export {getPrivateMessages}
