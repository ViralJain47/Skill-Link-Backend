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
    rating: Number


}, { timestamps: true })

export default user = mongoose.Model("users",userSchema);