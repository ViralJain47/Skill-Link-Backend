import { mongoose } from '../app.js'


const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Types.ObjectId,
        ref: "users"
    },

    receiver: {
        type: mongoose.Types.ObjectId,
        ref: "users"
    },

    content: String

}, { timestamps: true })

export default message = mongoose.Model("messages",messageSchema)