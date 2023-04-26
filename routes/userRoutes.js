import express from 'express'
import { createUser, deletUser, getAllUser, getUserProfileById, login, updateUser, updateUserRole } from '../controllers/userController.js'
import { admin, protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/').get(getAllUser).post(createUser)
router.route('/:id').put(updateUser).delete(deletUser)
router.route('/login').post(login)
router.route('/profile/:id').post(getUserProfileById)
router.route('/role/:id').put(protect, admin, updateUserRole)



export default router;