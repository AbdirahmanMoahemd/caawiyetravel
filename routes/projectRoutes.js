import express from 'express'
import { chargeToPay, createProject, deleteProject, getCANADAProjects, getCANADAProjectsByAdmin, getMyProjects, getProjects, getUSAProjects, getUSAProjectsByAdmin, getUnApprovedProjects, updateProject, updateProjectApproved, updateProjectToPaid } from '../controllers/projectControllers.js'
import { admin, protect } from '../middlewares/authMiddleware.js'
import { createBuyerUser } from '../controllers/userController.js'

 
const router = express.Router()

router.route('/').get(protect, admin, getProjects).post(createProject)
router.route('/register').post(createBuyerUser)
router.route('/usa/list').get(protect, getUSAProjects)
router.route('/usa/list/admin').get(protect, admin, getUSAProjectsByAdmin)
router.route('/unapproved/list').get(protect,admin, getUnApprovedProjects)
router.route('/canada/list').get(protect, getCANADAProjects)
router.route('/canada/list/admin').get(protect,admin, getCANADAProjectsByAdmin)
router.route('/update/:id').put(protect, admin, updateProjectApproved)
router.route('/:id').put(protect, updateProject).delete(protect, deleteProject)
router.route('/myprojects/:id').get(protect, getMyProjects)
router.route('/projects/charge/:id').put(protect,admin, chargeToPay)
router.route('/updatedToPaid/:id').put(protect, updateProjectToPaid)

export default router