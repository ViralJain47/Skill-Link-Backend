import { createEvent, deleteEvent, getAllEvents, updateEvent } from '../controllers/event.controller.js';

import { Router } from 'express';
import { upload } from '../utils/storage.js';

const eventRoute = Router();

eventRoute.post('/create', upload.array('media', 5), createEvent);
eventRoute.get('/all', getAllEvents);
eventRoute.put('/update/:id', updateEvent);
eventRoute.delete('/delete/:id', deleteEvent)


export default eventRoute;