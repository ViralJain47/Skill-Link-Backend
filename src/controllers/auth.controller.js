import user from "../models/user.model.js";
import bcrypt from "bcryptjs"

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
        const { email , password } = req.body;

        

    } catch (error) {
        
    }
} 

export {registerController}