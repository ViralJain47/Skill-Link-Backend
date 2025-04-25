import { createEvent, deleteEvent, getAllEvents, updateEvent } from '../controllers/event.controller.js';

import { Router } from 'express';

const eventRoute = Router();

eventRoute.post('/create', createEvent);
eventRoute.get('/all', getAllEvents);
eventRoute.put('/update/:id', updateEvent);
eventRoute.delete('/delete/:id', deleteEvent)


export default eventRoute;