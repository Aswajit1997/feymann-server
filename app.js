import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import errorHandler from "./middlewares/errorMiddleware.js";
import userRoute from './routes/userRoute.js'
import cookieParser from "cookie-parser";
const app = express();
dotenv.config();


//appLevel middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors())
// app.use(express.urlencoded({extended:false}));
//routes middleware
app.use('/api/users',userRoute);

//error middleware
app.use(errorHandler)

export default app

