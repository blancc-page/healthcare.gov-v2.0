import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./config/mongodb.js";
import authRouter from './routes/authRoutes.js'
import userRouter from "./routes/userRoutes.js";
import mongoose from "mongoose";


const app = express();
const port = process.env.PORT || 4000;

const allowedOrigins = ['http://localhost:5173','https://healthcare-gov-frontend.onrender.com', 'https://healthcare-gov-backend.onrender.com/', 'http://localhost:4000/']

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}));

  
  // MongoDB Connection
  connectDB();

// API Endpoints
app.get('/',(req, res)=> res.send("API Working!"));
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.listen(port, ()=> console.log(`Server started on PORT:${port}`));
