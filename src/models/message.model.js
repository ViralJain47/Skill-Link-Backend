import { mongoose } from '../app.js'


const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    message: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
},)

export default message = mongoose.Model("messages",messageSchema)