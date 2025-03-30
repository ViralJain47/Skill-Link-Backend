import { Router } from "express"
import {loginMiddleware, OTPVerifyMiddleware, registerMiddleware} from "../middlewares/auth.middleware.js";
import { jwtVerifyController, loginController, OTPVerifyController, registerController } from "../controllers/auth.controller.js";


const authRoute = Router();

authRoute.post("/register", registerMiddleware, registerController)
authRoute.post("/login", loginMiddleware, loginController);
authRoute.post("/verify", OTPVerifyMiddleware, OTPVerifyController)
authRoute.get("/jwtverify", jwtVerifyController)

export default authRoute;