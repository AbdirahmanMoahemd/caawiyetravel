import express from "express";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import dotenv from 'dotenv'



dotenv.config()
connectDB();
const app = express();



app.use('/api/users', userRoutes)
app.use('/api/projects', projectRoutes) 
app.use('/api/upload', uploadRoutes)


const port = 5000;
app.listen(port, console.log(`Server is running on port ${port}`));
