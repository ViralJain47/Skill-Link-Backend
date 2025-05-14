import {Router} from 'express';
import { getPrivateMessages } from '../controllers/message.controller.js';


const messageRoute = Router();
messageRoute.get('/:sender/:receiver', getPrivateMessages)

export default messageRoute
