import express from 'express'
import { createProject, getMyProjects, getProjects } from '../controllers/projectControllers.js'
import { admin, protect } from '../middlewares/authMiddleware.js'


const router = express.Router()

router.route('/').get(getProjects).post(protect, createProject)
router.route('/myprojects/:id').get(protect, getMyProjects)

export default router