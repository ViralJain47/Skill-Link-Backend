import { mongoose } from '../app.js'


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    avatar: String,
    bio: String,
    skills: [String],
    role: String,
    rating: Number,
    isVerified: {
        type: Boolean,
        default: false
    }


}, { timestamps: true })

const user = mongoose.model('users',userSchema);

export default user;