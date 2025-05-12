import mongoose from 'mongoose'

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comments"
        }
    ],
    rating: {
        type: Number,
        min: [1, 'rating should be atleast  1'],
        max: [5, 'max rating should be atmost 5'],
        validate: {
            validator: Number.isInteger,
            message: '{VALUE} is not an integer'
          }
    },
    category: {
        type: String
    }
}, { timestamps: true })

const Blog = mongoose.model('blogs', blogSchema);
export default Blog;

