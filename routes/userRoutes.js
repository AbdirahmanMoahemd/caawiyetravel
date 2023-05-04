import express from 'express'
import {addToWishlist, createBuyerUser, createUser, deletUser, getAllUser, getUserProfileById, login, updateUser, updateUserRole } from '../controllers/userController.js'
import { admin, protect } from '../middlewares/authMiddleware.js'

const router = express.Router()

router.route('/').get(protect, admin, getAllUser).post(createUser)
router.route('/register').post(createBuyerUser)
router.route('/:id').put(updateUser).delete(deletUser)
router.route('/login').post(login)
router.route('/profile/:id').post(getUserProfileById)
router.route('/role/:id').put(protect, admin, updateUserRole)
router.route('/add-to-wishlist/:id').post(protect, addToWishlist)


export default router;