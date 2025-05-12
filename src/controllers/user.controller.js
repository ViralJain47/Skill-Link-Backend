import users from "../models/user.model.js"
import mongoose from "mongoose";

const updateProfileController = async (req, res,next) => {
    try {
        const userId = req.params.id;
        const updatedData = req.body;

        const updatedUser = await users.findByIdAndUpdate(userId, {
            ...updatedData
        }, { new: true })

        if (!updatedUser) {
            return res.status(404).json({ message: "Unable to update user data" })
        }

        res.status(200).json({ message: "User updated" })

    } catch (error) {
        if (error instanceof mongoose.Error) {
            return next(error)
        }
        res.status(500).json({ error: "Internal server error" });
    }

}

const getAllUsers = async (req,res,next) => {
    try {
        const allUsers = await users.find({}).select('name skillsTaught skillsLearning')
        res.status(200).json(allUsers)
    } catch (error) {
        if (error instanceof mongoose.Error) {
            return next(error)
        }
        res.status(500).json({ error: "Internal server error" });
    }
}


export {updateProfileController, getAllUsers}  