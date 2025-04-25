import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import { config } from "../config/env.js";
import  "./utils/oauth.js";
import "./utils/redis.js";
import users from "./models/user.model.js";
import "./models/session.model.js";
import events from "./models/event.model.js";
import "./models/message.model.js";
import "./models/notification.model.js";
import "./models/review.model.js";
import eventRoute from "./routes/event.route.js";
import authRoute from "./routes/auth.route.js";
import faker from 'faker';


const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use("/api/auth", authRoute);
app.use("/api/event", eventRoute);

try {
  mongoose.connect(config.mongoUri)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));  
} catch (error) {
  console.log("error", error);
}

const seedDatabase = async () => {
  try {
    await users.deleteMany();
    await events.deleteMany();

    const userData = Array.from({ length: 20 }, () => ({
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      profilePicture: faker.image.avatar(),
      bio: faker.lorem.sentence(),
      verified: faker.datatype.boolean(),
      skillsTaught: faker.helpers.shuffle(['JavaScript', 'Node.js', 'React', 'Python', 'Django']).slice(0, 2),
      skillsLearning: faker.helpers.shuffle(['Blockchain', 'Docker', 'GraphQL', 'AI', 'ML']).slice(0, 2),
      mentorRequests: [],
      learnerRequests: [],
      mentorRating: faker.datatype.number({ min: 0, max: 5, precision: 0.1 }),
    }));

    const createdUsers = await users.insertMany(userData);
    const userIds = createdUsers.map(user => user._id);

    const eventData = Array.from({ length: 10 }, () => {
      const hostId = faker.helpers.randomize(userIds);
      const participantCount = faker.datatype.number({ min: 1, max: 5 });
      const participants = faker.helpers.shuffle(userIds.filter(id => id.toString() !== hostId.toString())).slice(0, participantCount);

      return {
        title: faker.lorem.words(3),
        description: faker.lorem.paragraph(),
        host: hostId,
        date: faker.date.future(),
        maxParticipants: faker.datatype.number({ min: 10, max: 100 }),
        minParticipants: faker.datatype.number({ min: 2, max: 10 }),
        duration: `${faker.datatype.number({ min: 1, max: 3 })} hours`,
        media: faker.image.imageUrl(),
        venue: faker.address.streetAddress(),
        registrationFee: faker.datatype.number({ min: 0, max: 100 }),
        type: faker.helpers.randomize(['online', 'offline']),
        status: faker.helpers.randomize(['upcoming', 'ongoing', 'completed']),
        participants
      };
    });

    await events.insertMany(eventData);

    console.log('🎉 Mock users and events inserted!');
  } catch (err) {
    console.error(err);
  }
}


export default app;
export {mongoose};