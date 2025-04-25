import users from "../models/user.model.js"

const updateProfileController =  async (req,res) => {
    try {
        const userId = req.params.id;
        const updatedData = req.body;

        const updatedUser = await users.findByIdAndUpdate(userId, {
            ...updatedData
        }, { new: true })

        if(!updatedUser)
        {
            return res.status(404).json({ message: "Unable to update user data" })
        }

        res.status(200).json({ message: "User updated"})

    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }

}


exports = {updateProfileController}