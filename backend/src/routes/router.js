import { Router } from "express";

const router  =  Router();



import userRouter from "./userRouter.js";
import propiedadRouter from "./propiedadRouter.js";
import citaRouter from "./citaRouter.js";
//import multerRouter from "./multerRouter.js"

//import authRouter from "./authRouter.js";

//import { hasSession } from "../middlewares/authMiddleware.js";



router.use("/user", userRouter);
router.use("/propiedad", propiedadRouter);
router.use("/cita", citaRouter);

//router.use("/upload", multerRouter);




//router.use("/",authRouter);


export default router;