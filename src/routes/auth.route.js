import { Router } from "express"
import {registerMiddleware} from "../middlewares/auth.middleware.js";
import { registerController } from "../controllers/auth.controller.js";


const authRoute = Router();

authRoute.post("/register", registerMiddleware, registerController)

export default authRoute;