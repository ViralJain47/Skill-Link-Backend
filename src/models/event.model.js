import { mongoose } from '../app.js'


const eventSchema = new mongoose.Schema({
    eventName: String,
    eventDate: String,
    time: String,
    location: String,
    hostId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },
    eventDescription: String
}, { timestamps: true })

export default eventModel = mongoose.Model("events", eventSchema)