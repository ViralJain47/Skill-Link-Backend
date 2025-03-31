import { mongoose } from '../app.js'


const reviewSchema = new mongoose.Schema({
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    learner: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String }
}, { timestamps: true })

export default review = mongoose.Model("reviews",reviewSchema)