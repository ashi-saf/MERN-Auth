import express from 'express';
import {
  deleteUser,
  getAllUsers,
  updateUser,
} from '../controllers/userController.js';
import userAuth from '../middleware/userAuth.js';

const router = express.Router();

//@desc all the routes here are starting with /users
router.get('/', getAllUsers);

router.put('/:id', userAuth, updateUser);
router.delete('/:id', userAuth, deleteUser);
export default router;
