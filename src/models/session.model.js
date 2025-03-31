import { mongoose } from "../app.js";

const SessionSchema = new mongoose.Schema({
    skill: { type: String, required: true }, 
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    learner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    sessionTime: { type: Date, required: true },
    status: { type: String, enum: ["Pending", "Accepted", "Completed"], default: "Pending" },
}, { timestamps: true });

export default mongoose.model("sessions", SessionSchema);