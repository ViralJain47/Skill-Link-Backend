import {Router} from 'express';
import { getConversationList, getPrivateMessages } from '../controllers/message.controller.js';


const messageRoute = Router();
messageRoute.get('/:sender/:receiver', getPrivateMessages)
messageRoute.get('/:userId', getConversationList)

export default messageRoute
