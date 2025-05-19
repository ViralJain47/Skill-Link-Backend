import mongoose from "mongoose";
import logger from "../utils/logger.js";

const mongoerr = (error, req, res, next) => {

    logger.error(`Error: ${err.message}`, { stack: err.stack });

    if (error instanceof mongoose.Error.ValidationError) {
        return res.status(400).json({ error: error.message });
    }

    if (error instanceof mongoose.Error.CastError) {
        return res.status(400).json({ error: 'Invalid ObjectID ' });
    }

    if(error instanceof mongoose.Error)
    {
        return res.status(400).json({error: error.message})
    }

    return res.status(400).json({ error: error })

}

export default mongoerr