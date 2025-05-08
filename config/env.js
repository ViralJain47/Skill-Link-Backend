import dotenv from "dotenv";
dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  env: process.env.NODE_ENV || "development",
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  requestUri: process.env.REQUEST_URI,
  refreshToken: process.env.REFRESH_TOKEN,
};