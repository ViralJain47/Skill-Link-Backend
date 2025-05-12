import { mongoose } from '../app.js'


const messageSchema = new mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
},)

const messages = mongoose.model("messages",messageSchema)
export default messages;