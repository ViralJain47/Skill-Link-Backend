import {updateProfileController} from '../controllers/user.controller.js'
import {Router} from 'express'

const userRoute = Router()

userRoute.put('/update/:userId', updateProfileController)

export default userRoute
