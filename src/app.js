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
import "./models/skill.model.js";
import "./models/blog.model.js";
import "./models/comment.model.js";
import eventRoute from "./routes/event.route.js";
import authRoute from "./routes/auth.route.js";
import skillRouter from "./routes/skill.route.js";
import { Faker, en } from '@faker-js/faker';
import blogRoute from "./routes/blog.route.js";
import mongoerr from "./middlewares/mongoerr.middleware.js";

const customFaker = new Faker({ locale: [en] });

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());
app.use("/api/auth", authRoute);
app.use("/api/event", eventRoute);
app.use("/api/skill", skillRouter);
app.use("/api/blog", blogRoute)
app.use(mongoerr)

try { 
  mongoose.connect(config.mongoUri)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));  
} catch (error) {
  console.log("error", error);
}

const seedDatabase = async () => {

  console.log(customFaker.word.words(5))
  try {
    await users.deleteMany();
    await events.deleteMany();

    const userData = Array.from({ length: 20 }, () => ({
      name: customFaker.person.fullName(),
      email: customFaker.internet.email(),
      password: customFaker.internet.password(),
      profilePicture: customFaker.image.avatar(),
      bio: customFaker.lorem.sentence(),
      verified: customFaker.datatype.boolean(),
      skillsTaught: customFaker.helpers.shuffle(['JavaScript', 'Node.js', 'React', 'Python', 'Django']).slice(0, 2),
      skillsLearning: customFaker.helpers.shuffle(['Blockchain', 'Docker', 'GraphQL', 'AI', 'ML']).slice(0, 2),
      mentorRequests: [],
      learnerRequests: [],
      mentorRating: customFaker.number.int({ min: 0, max: 5, precision: 0.1 }),
    }));

    const createdUsers = await users.insertMany(userData);
    const userIds = createdUsers.map(user => user._id);

    const eventData = Array.from({ length: 10 }, () => {
      const hostId = customFaker.helpers.arrayElement(userIds);
      const participantCount = customFaker.number.int({ min: 1, max: 5 });
      const participants = customFaker.helpers.shuffle(userIds.filter(id => id.toString() !== hostId.toString())).slice(0, participantCount);

      return {
        title: customFaker.lorem.words(3),
        description: customFaker.lorem.paragraph(),
        host: hostId,
        date: customFaker.date.future(),
        maxParticipants: customFaker.number.int({ min: 10, max: 100 }),
        minParticipants: customFaker.number.int({ min: 2, max: 10 }),
        duration: `${customFaker.number.int({ min: 1, max: 3 })} hours`,
        media: customFaker.image.url,
        venue: customFaker.location.streetAddress(),
        registrationFee: customFaker.number.int({ min: 0, max: 100 }),
        type: customFaker.helpers.arrayElement(['Offline','Online']),
        status: customFaker.helpers.arrayElement(['upcoming', 'ongoing', 'completed']),
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

// await seedDatabase()