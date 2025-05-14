import mongoose, { model, Schema } from 'mongoose'

const SkillSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    hoursCompleted: {
        type: Number,
        default: 0.0
    },
    approxTotalHours: {
        type: Number,
        required: true
    },
    type:{
        type: String,
        enum: ["Learning", "Teaching"],
        required: true
    },
    endDate: {
        type: Date,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    }
},{timestamps: true})

const Skill = model('skills', SkillSchema)
export default Skill 