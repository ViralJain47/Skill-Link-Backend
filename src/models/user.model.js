import { mongoose } from '../app.js'


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String },
    bio: { type: String },
    verified: {type: Boolean , default: false},
    skillsTaught: [{ type: String }],
    skillsLearning: [{ type: String }],
    mentorRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "sessions" }],
    learnerRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "sessions" }],
    mentorRating: { type: Number, default: 0 },
    connections: [{ type: mongoose.Types.ObjectId, ref: 'users',}],
    socketId: {type: String},
    messages: [{ type: mongoose.Types.ObjectId, ref: "messages" }],
    isOnline: {type: Boolean, default: false}
}, { timestamps: true })

const users = mongoose.model('users',userSchema);

export default users;