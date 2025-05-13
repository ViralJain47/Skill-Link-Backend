import users from "../models/user.model.js";
import sessions from "../models/session.model.js";
import bcrypt from "bcryptjs"
import { generateOTP, saveOTP, sendOTP } from "../services/otp.service.js"
import jwt from "jsonwebtoken"
import { config } from "../../config/env.js";
import mongoose from "mongoose";

const registerController = async (req, res,next) => {
    try {
        const { name, email, password } = req.body

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await users.create({ name, email, password: hashedPassword })

        console.log(newUser)

        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        if (error instanceof mongoose.Error) {
            return next(error)
        }
        res.status(500).json({ error: "Internal server error" });
    }
}

const loginController = async (req, res,next) => {
    try {
        const { email } = req.body;

        const otp = generateOTP();

        const sent = await sendOTP(email, otp);

        if (sent) {

            const existingUser = await users.findOne({ email: email })

            if (!existingUser.verified) {
                await saveOTP(existingUser._id, otp);
                return res.status(200).json({ message: "OTP sent Successfully", userId: existingUser._id })
            }

            const token = jwt.sign({ userId: existingUser._id }, config.jwtSecret, { expiresIn: '2d' })

            return res.status(200).json({ message: "user is verified already", token: token })
        }

        return res.status(500).json({ error: "Internal server error 2" })


    } catch (error) {
        if (error instanceof mongoose.Error) {
            return next(error)
        }
        console.log(error)
        res.status(500).json({ error: "Internal server error" })
    }
}

const OTPVerifyController = async (req, res,next) => {

    try {
        const { userId } = req.body;

        const token = jwt.sign({ userId }, config.jwtSecret, { expiresIn: '2d' })

        res.status(200).json({ message: "OTP verified successfully", token: token });

    } catch (error) {
        if (error instanceof mongoose.Error) {
            return next(error)
        }
        res.status(500).json({ error: "Internal server error" })
    }
}

const jwtVerifyController = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(" ")[1];

        jwt.verify(token, config.jwtSecret, async (err, decoded) => {
            if (err) {
                res.status(400).json({ error: "Token is invalid" })
            } else {
                const userId = decoded.userId;

                const decodedUser = await users.findById(userId)
                    .populate("mentorRequests", sessions)
                    .populate("learnerRequests", sessions)
                    .populate("skillsLearning")
                    .populate("skillsTaught")
                    .select("-password");

                console.log(decodedUser)

                res.status(200).json(decodedUser)
            }
        })

    } catch (error) {
        if (error instanceof mongoose.Error) {
            return next(error)
        }
        console.log(error)
        res.status(500).json({ error: "Internal server error" })
    }
}

export { registerController, loginController, OTPVerifyController, jwtVerifyController }