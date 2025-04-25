import { mongoose } from "../app.js";

const SessionSchema = new mongoose.Schema({
    skill: { type: String, required: true }, 
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    learner: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    sessionTime: { type: Date, required: true },
    status: { type: String, enum: ["Pending", "Accepted", "Completed"], default: "Pending" },
}, { timestamps: true });

const sessions = mongoose.model("sessions", SessionSchema);
export default sessions;