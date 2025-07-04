import { mongoose } from "../app.js";

const NotificationSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, default: false }
}, { timestamps: true });

const notifications =  mongoose.model("notifications", NotificationSchema);
export default notifications;