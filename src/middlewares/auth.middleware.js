import validator from 'validator';
import users from '../models/user.model.js'
import bcrypt from 'bcryptjs';
import { verifyOTP } from '../services/otp.service.js';


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

        const match = await bcrypt.compare(password, existingUser.password)

        if(!match)
        {
            return res.status(400).json({error: "Incorrect Password"})
        }

        next();

    } catch (error) {
        console.log(error)
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
        res.status(500).json({error: "Internal server error"})
    }
}

export { registerMiddleware , loginMiddleware , OTPVerifyMiddleware};
