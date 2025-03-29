import { mongoose } from '../app.js'


const reviewSchema = new mongoose.Schema({
    reviewedUserId : {
        type: mongoose.Types.ObjectId,
        ref: "users"
    },

    reviewerId: {
        type: mongoose.Types.ObjectId,
        ref: "users"
    },

    rating : Number,
    comment: String,
    reviewDate: Date.now()

}, { timestamps: true })

export default review = mongoose.Model("reviews",reviewSchema)