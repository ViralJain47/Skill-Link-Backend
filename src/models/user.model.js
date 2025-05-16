import { mongoose } from "../app.js";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String },
    bio: { type: String },
    verified: { type: Boolean, default: false },
    skillsTaught: [{ type: mongoose.Types.ObjectId, ref: "skills" }],
    skillsLearning: [{ type: mongoose.Types.ObjectId, ref: "skills" }],
    mentorRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "sessions" }],
    learnerRequests: [
      { type: mongoose.Schema.Types.ObjectId, ref: "sessions" },
    ],
    mentorRating: { type: Number, default: 0 },
    connectionRequests: [
      {
        name: { type: String },
        senderId: { type: mongoose.Schema.Types.ObjectId },
      },
    ],
    connections: [
      {
        name: { type: String },
        connectionId: { type: mongoose.Types.ObjectId },
      },
    ],
  },
  { timestamps: true }
);

const users = mongoose.model("users", userSchema);

export default users;
