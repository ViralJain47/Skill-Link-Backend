import { mongoose } from '../app.js'


const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    host: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
    skill: { type: String, required: true },
    date: { type: Date, required: true },
    maxParticipants: { type: Number, default: 20 },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }], 
}, { timestamps: true })

export default eventModel = mongoose.Model("events", eventSchema)