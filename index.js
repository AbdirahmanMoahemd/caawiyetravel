import express from "express";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import dotenv from 'dotenv'


dotenv.config()
connectDB();
const app = express();



app.use('/api/users', userRoutes)


const port = 5000;
app.listen(port, console.log(`Server is running on port ${port}`));
