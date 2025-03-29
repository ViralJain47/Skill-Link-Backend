import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import { config } from "../config/env.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());


mongoose.connect(config.mongoUri)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

export default app;
export {mongoose};