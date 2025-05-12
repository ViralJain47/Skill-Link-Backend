import { createSkill, deleteSkill, updateSkill, getAllUserSkills, getSkill } from "../controllers/skill.controller.js";
import { Router } from "express";


const skillRouter = Router()

skillRouter.get('/user/:id', getAllUserSkills)
skillRouter.get('/:id', getSkill)
skillRouter.post('/create', createSkill)
skillRouter.put('/update/:id', updateSkill)
skillRouter.delete('/delete/:id',deleteSkill)


export default skillRouter