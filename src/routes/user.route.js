import {updateProfileController , getAllUsers, getUserWithId, sendConnectionRequest, changeConnectionRequest} from '../controllers/user.controller.js'
import {Router} from 'express'

const userRoute = Router()

userRoute.put('/update/:userId', updateProfileController)
userRoute.get('/all', getAllUsers)
userRoute.get('/:id', getUserWithId)
userRoute.post('/connect/:receiverId', sendConnectionRequest)
userRoute.post('/connectRequest/:receiverId', changeConnectionRequest);

export default userRoute
