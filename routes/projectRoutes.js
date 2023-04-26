import express from 'express'
import { createProject, getMyProjects, getProjects, getUSAProjects, updateProject, updateProjectApproved } from '../controllers/projectControllers.js'
import { admin, protect } from '../middlewares/authMiddleware.js'


const router = express.Router()

router.route('/').get(protect, admin, getProjects).post(protect, createProject)
router.route('/usa/list').get(protect, getUSAProjects)
router.route('/update/:id').put(protect, admin, updateProjectApproved)
router.route('/:id').put(protect, updateProject)
router.route('/myprojects/:id').get(protect, getMyProjects)

export default router