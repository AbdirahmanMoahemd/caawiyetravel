import express from "express";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import dotenv from 'dotenv'
import { errorHandler, notFound } from './middlewares/errorMidlleware.js';



dotenv.config()
connectDB();
const app = express();


app.use(express.json());
app.use('/api/users', userRoutes)
app.use('/api/projects', projectRoutes) 
app.use('/api/upload', uploadRoutes)


app.use(notFound);
app.use(errorHandler);


const port = 5000;
app.listen(port, console.log(`Server is running on port ${port}`));
