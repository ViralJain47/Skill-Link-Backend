import { createSkill, deleteSkill, updateSkill, getAllSkills, getSkill } from "../controllers/skill.controller.js";
import { Router } from "express";


const skillRouter = Router()

skillRouter.get('/all', getAllSkills)
skillRouter.get('/:id', getSkill)
skillRouter.post('/create', createSkill)
skillRouter.put('/update/:id', updateSkill)
skillRouter.delete('/delete/:id',deleteSkill)


export default skillRouter