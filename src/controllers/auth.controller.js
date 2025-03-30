import user from "../models/user.model.js";
import bcrypt from "bcryptjs"
import { generateOTP, saveOTP, sendOTP } from "../services/otp.service.js"
import jwt from "jsonwebtoken"
import { config } from "../../config/env.js";

const registerController = async (req,res) => {
    try {
        const {name , email , password } = req.body

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await user.create({ name, email, password: hashedPassword })

        console.log(newUser)

        res.status(201).json({ message: "User registered successfully"});

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}

const loginController = async (req,res) => {
    try {
        const { email } = req.body;

        const otp = generateOTP();

        const sent =  await sendOTP(email,otp);

        if(sent)
        {
            const existingUser = await user.findOne({email: email});

            await saveOTP(existingUser._id, otp);
            return res.status(200).json({message: "OTP sent Successfully"})
        }

        return res.status(500).json({error: "Internal server error 2"})


    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal server error"})
    }
}

const OTPVerifyController = async (req,res) => {

    try {
        const { userId } = req.body;

        const existingUser = await user.findById(userId);

        const {email , password , name} = existingUser;

        console.log(existingUser)
        console.log({email, password, name});

        const token = jwt.sign({email: email, userId: userId , name: name ,email: email, password: password}, config.jwtSecret , {expiresIn: '2d'})    
        
        res.status(200).json({message: "OTP verified successfully", token: token});

    } catch (error) { 
            res.status(500).json({error: "Internal server error"})
    }
}

const jwtVerifyController = async (req,res) => {
    try {
        const token = req.headers['authorization'].split(" ")[1];
        
        jwt.verify(token, config.jwtSecret, (err, decoded) => {
            if (err) {
                res.status(400).json({error: "Token is invalid"})
            } else {
                res.status(200).json({...decoded})
            }
        })

    } catch (error) {
        res.status(500).json({error: "Internal server error"})
    }
}

export {registerController, loginController , OTPVerifyController, jwtVerifyController}