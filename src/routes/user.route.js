import {updateProfileController , getAllUsers, getUserWithId} from '../controllers/user.controller.js'
import {Router} from 'express'

const userRoute = Router()

userRoute.put('/update/:userId', updateProfileController)
userRoute.get('/all', getAllUsers)
userRoute.get('/:id', getUserWithId)

export default userRoute
