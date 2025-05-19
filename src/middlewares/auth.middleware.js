import validator from 'validator';
import users from '../models/user.model.js'
import bcrypt from 'bcryptjs';
import { verifyOTP } from '../services/otp.service.js';
import mongoose from 'mongoose';
import logger from '../utils/logger.js';


const registerMiddleware = async (req, res, next) => {

    try{
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        const existingUser = await users.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        next();
    }catch(error){
        if (error instanceof mongoose.Error) {
              return next(error);
            }
        logger.error(error.message)
        res.status(500).json({error: 'Internal server error'})
    }
};

const loginMiddleware = async (req,res,next) => {
    try {
        const {email , password} = req.body;

        const existingUser = await users.findOne({email});

        if(!existingUser)
        {
            return res.status(400).json({ error: "User not found" })
        }

        const match =  bcrypt.compare(password, existingUser.password)

        if(!match)
        {
            return res.status(400).json({error: "Incorrect Password"})
        }

        next();

    } catch (error) {
        if (error instanceof mongoose.Error) {
              return next(error);
            }
        logger.error(error.message)    
        res.status(500).json({error : "Internal server error"})
    }
}

const OTPVerifyMiddleware = async (req,res,next) => {
    try {
        const {userId , otp } = req.body;
        const verified = await verifyOTP(userId,otp);

        if(!verified)
        {
            return res.status(400).json({error: "Incorrect OTP"});
        }

        next();
        
    } catch (error) {
        if (error instanceof mongoose.Error) {
              return next(error);
            }
        logger.error(error.message)
        res.status(500).json({error: "Internal server error"})
    }
}

export { registerMiddleware , loginMiddleware , OTPVerifyMiddleware};
