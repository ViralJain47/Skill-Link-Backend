import {updateProfileController , getAllUsers} from '../controllers/user.controller.js'
import {Router} from 'express'

const userRoute = Router()

userRoute.put('/update/:userId', updateProfileController)
userRoute.get('/all', getAllUsers)

export default userRoute
