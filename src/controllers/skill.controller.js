import Skill from '../models/skill.model.js'
import mongoose from 'mongoose'
import users from '../models/user.model.js'

const createSkill = async (req, res, next) => {
    try {
        const {
            title,
            hoursCompleted,
            approxTotalHours,
            endDate,
            userId,
            type
        } = req.body

        const user = await users.findById(userId)

        if(!user) {
            return res.status(400).json({error: "invalid user id"})
        }

        const skill = await Skill.create({
            title,
            hoursCompleted,
            approxTotalHours,
            endDate,
            type,
            user: userId
        })

        if (!skill) {
            return res.status(401)
        }

        if(type == 'Learning')
        {
            user.skillsLearning.push(skill._id)
        }
        else {
            user.skillsTaught.push(skill._id)
        }

        await user.save()

        res.status(201).json({ message: "skill created successfully ", skill })

    } catch (error) {
        if (error instanceof mongoose.Error) {
            return next(error)
        }
        logger.error(error.message)
        res.status(500).json({ message: "internal server error" })
    }
}

const getAllUserSkills = async (req, res, next) => {
    try {
        const { id } = req.params
        const skills = await Skill.find({ user: id }).populate({
            path: "user",
            select: "name"
        })
        res.status(200).json(skills)
    }
    catch (error) {
        if (error instanceof mongoose.Error) {
            return next(error)
        }
        logger.error(error.message)
        res.status(500).json({ error: "Internal server error" });
    }
}

const getSkill = async (req, res,next) => {
    try {
        const { id } = req.params

        const skill = await Skill.findById(id).populate({
            path: 'user',
            select: 'name'
        });

        if (!skill) {
            return res.status(404).json({ message: "skill not found" })
        }

        res.status(200).json(skill)


    } catch (error) {
        if (error instanceof mongoose.Error) {
            return next(error)
        }
        logger.error(error.message)
        res.status(500).json({ error: "Internal server error" });
    }
}

const updateSkill = async (req, res,next) => {
    try {
        const { id } = req.params
        const skill = req.body

        const updatedSkill = await Skill.findByIdAndUpdate(id, { ...skill }, { new: true })

        if (!updatedSkill) {
            return res.status(400).json({ message: "invalid skill details" })
        }

        res.status(200).json(updatedSkill)

    } catch (error) {
        if (error instanceof mongoose.Error) {
            return next(error)
        }
        logger.error(error.message)
        res.status(500).json({ error: "Internal server error" })
    }
}

const deleteSkill = async (req, res,next) => {
    try {
        const { id } = req.params;

        const deletedSkill = await Skill.findByIdAndDelete(id);

        if (!deletedSkill) {
            return res.status(404).json({ message: 'skill not found' })
        }

        await users.updateMany(
            {
              $or: [
                { skillsTaught: deletedSkill._id },
                { skillsLearning: deletedSkill._id }
              ]
            },
            {
              $pull: {
                skillsTaught: deletedSkill._id,
                skillsLearning: deletedSkill._id
              }
            }
          );
         

        res.status(200).json({ message: 'Skill deleted successfully' })

    } catch (error) {
        if (error instanceof mongoose.Error) {
            return next(error)
        }
        logger.error(error.message)
        res.status(500).json({ error: "Internal server error" })
    }
}

export {
    createSkill,
    deleteSkill,
    updateSkill,
    getSkill,
    getAllUserSkills
}