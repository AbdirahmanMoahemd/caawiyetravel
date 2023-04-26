import express from 'express'
import { createProject, deleteProject, getCANADAProjects, getMyProjects, getProjects, getUSAProjects, updateProject, updateProjectApproved } from '../controllers/projectControllers.js'
import { admin, protect } from '../middlewares/authMiddleware.js'


const router = express.Router()

router.route('/').get(protect, admin, getProjects).post(protect, createProject)
router.route('/usa/list').get(protect, getUSAProjects)
router.route('/canada/list').get(protect, getCANADAProjects)
router.route('/update/:id').put(protect, admin, updateProjectApproved)
router.route('/:id').put(protect, updateProject).delete(protect, admin, deleteProject)
router.route('/myprojects/:id').get(protect, getMyProjects)

export default router