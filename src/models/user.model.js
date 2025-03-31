import { mongoose } from '../app.js'


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String },
    bio: { type: String },
    
    skillsTaught: [{ type: String }],
    skillsLearning: [{ type: String }],
    mentorRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "session" }],
    learnerRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: "session" }],
    mentorRating: { type: Number, default: 0 },
}, { timestamps: true })

const user = mongoose.model('users',userSchema);

export default user;