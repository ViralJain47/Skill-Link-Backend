import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import { config } from "../config/env.js";
import  "./utils/oauth.js";
import "./utils/redis.js";
import "./models/user.model.js";
import "./models/session.model.js";
import "./models/event.model.js";
import "./models/message.model.js";
import "./models/notification.model.js";
import "./models/review.model.js";
import "./models/skill.model.js";
import "./models/blog.model.js";
import "./models/comment.model.js";
import eventRoute from "./routes/event.route.js";
import authRoute from "./routes/auth.route.js";
import skillRouter from "./routes/skill.route.js";
import blogRoute from "./routes/blog.route.js";
import mongoerr from "./middlewares/mongoerr.middleware.js";
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import {__storageFolder} from "./utils/storage.js"
import logger from "./utils/logger.js";
import morgan from "morgan";

const app = express();

app.use(morgan('combined', {
  stream: {
    write: (message) => logger.info(message.trim()),
  },
}));
app.use('/storage', express.static(__storageFolder));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute)
app.use("/api/event", eventRoute);
app.use("/api/skill", skillRouter);
app.use("/api/blog", blogRoute);
app.use("/api/message", messageRoute)


app.use((req, res, next) => {
  const oldSend = res.send;
  res.send = function (data) {
    logger.info(`Response: ${res.statusCode} ${data}`);
    oldSend.apply(res, arguments);
  };
  next();
});

app.use(mongoerr)



try { 
  mongoose.connect(config.mongoUri)
  .then(() => logger.info("MONGODB CONNECTED"))
  .catch(err => logger.error("MongoDB Connection Error:", err));  
} catch (error) {
  logger.log(error.message);
}


export default app;
export {mongoose};