import express from 'express'
import { createUser, deletUser, getAllUser, getUserProfileById, login, updateUser } from '../controllers/userController.js'

const router = express.Router()

router.route('/').get(getAllUser).post(createUser)
router.route('/:id').put(updateUser).delete(deletUser)
router.route('/login').post(login)
router.route('/profile/:id').post(getUserProfileById)



export default router;