import mongoose from "mongoose";

const mongoerr = (error, req, res, next) => {
    if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({ error: error.message });
    }

    if (error instanceof mongoose.Error.CastError) {
        return res.status(400).json({ error: 'Invalid ID format' });
    }

    return res.status(400).json({ error: error })

}

export default mongoerr