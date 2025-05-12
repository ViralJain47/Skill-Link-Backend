import { mongoose } from '../app.js'


const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    host: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    date: { type: Date, required: true },
    maxParticipants: { type: Number, default: 20 },
    minParticipants: { type: Number, default: 5 },
    duration: { type: String, required: true },
    media: [ {type: String} ],
    venue: { type: String, required: true },
    registrationFee: { type: Number, default: 0 },
    type: { type: String},
    status: { type: String, enum: ["upcoming", "ongoing", "completed"], default: "upcoming" },
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    time: {String} 
}, { timestamps: true })

const events = mongoose.model("events", eventSchema)
export default events;