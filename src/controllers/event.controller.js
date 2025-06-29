import mongoose, { MongooseError } from "mongoose";
import events from "../models/event.model.js";
import { __rootFolder } from "../utils/storage.js";
import fs from "fs"
import logger from "../utils/logger.js";

const createEvent = async (req, res, next) => {
    try {
        const { title, description, date, time, duration, venue, type, maxParticipants, host, registrationFee, status, media } = req.body;
        const images = req.files?.map(file => `/storage/${file.filename}`)

        const newEvent = await events.create({
            title,
            description,
            date,
            time,
            duration,
            venue,
            type,
            maxParticipants,
            host,
            registrationFee,
            status,
            media: images
        })

        if (!newEvent) {
            return res.status(401)
        }

        res.status(201).json({ message: "Event created successfully", event: newEvent })

    } catch (error) {

        if (error instanceof mongoose.Error) {
            return next(error)
        }
        logger.error(error.message)
        res.status(500).json({ error: "Internal server error" });
    }
}

const getAllEvents = async (req, res, next) => {
    try {
        const allEvents = await events.find({}).populate("host")
        res.status(200).json(allEvents)
    }
    catch (error) {
        if (error instanceof mongoose.Error) {
            return next(error)
        }
        logger.error(error.message)
        res.status(500).json({ error: "Internal server error" });
    }

}

const updateEvent = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedEvent = await events.findByIdAndUpdate(id, { ...req.body }, { new: true });

        if (!updatedEvent) {
            return res.status(400).json({ message: 'Event not found' });
        }

        res.status(200).json({ message: 'Event updated successfully', event: updatedEvent });
    } catch (error) {
        if (error instanceof mongoose.Error) {
            return next(error)
        }
        logger.error(error.message)
        res.status(500).json({ error: 'Internal server error' });
    }
}
const deleteEvent = async (req, res,next) => {
    try {
        const { id } = req.params;
        const deletedEvent = await events.findByIdAndDelete(id);

        if (!deletedEvent) {
            return res.status(400).json({ message: 'Event not found' });
        }

        deletedEvent.media.map(file => {

            const filePath = `${__rootFolder}${file}`

            fs.access(filePath, fs.constants.F_OK, err => {
                if(err) logger.error(err)
          
                fs.unlink(filePath, (err) =>{
                  if (err) logger.error(err)
                })
              })
        })
        

        res.status(200).json({ message: 'Event deleted successfully' });
    } catch (error) {
        if (error instanceof mongoose.Error) {
            next(error)
        }
        logger.error(error.message)
        res.status(500).json({ error: 'Internal server error' });
    }
}

export { createEvent, getAllEvents, deleteEvent, updateEvent }