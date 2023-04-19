import express from 'express'
import { createProject, getProjects } from '../controllers/projectControllers.js'
import { admin, protect } from '../middlewares/authMiddleware.js'


const router = express.Router()

router.route('/').get(getProjects).post(protect, createProject)

export default router