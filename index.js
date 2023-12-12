import express from "express";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import requestRoutes from "./routes/requestRoutes.js";
import dotenv from 'dotenv'
import { errorHandler, notFound } from './middlewares/errorMidlleware.js';
import multer from 'multer';
import path from 'path'



dotenv.config()
connectDB();
const app = express();


app.use(express.json());
app.use('/api/users', userRoutes)
app.use('/api/projects', projectRoutes) 
app.use('/api/requests', requestRoutes) 
// app.use('/api/upload', uploadRoutes)


const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, 'uploads/')
    },
    filename(req, file, cb) {
      cb(
        null,
        `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
      )
    },
  })
  
  const upload = multer({ storage: storage });
   
  
  app.post('/upload', upload.single('image'), (req, res) => {
    console.log('Received image upload request'); 
    
      if (!req.file) {
        console.log('No file received');
        return res.status(400).send('No file received');
      }
      console.log('Image uploaded successfully');
      res.status(200).send(`/${req.file.path}`);
      
  
  })
  
  const __dirname = path.resolve();
  app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
  
 

app.use(notFound);
app.use(errorHandler);


const port = 8000;
app.listen(port, console.log(`Server is running on port ${port}`));
