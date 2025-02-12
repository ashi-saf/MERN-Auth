import User from '../models/userModels.js';
import bcrypt from 'bcryptjs';

// @desc to get all users
// @route  get /users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: true, message: error.message });
  }
};

// @desc to update a specific user
// @route put /user/:id
export const updateUser = async (req, res) => {
  try {
    const { id, name, email, password } = req.body;
    // Check if user exists
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    // Hash password only if it's being updated
    let hashPassword = user.password;
    if (password) {
      hashPassword = await bcrypt.hash(password, 10);
    }
    // Update user data
    await User.findByIdAndUpdate(
      id,
      { name, email, password: hashPassword },
      { new: true }
    );
    res
      .status(200)
      .json({ success: true, message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc to delete a specific users
// @route  DELETE /users/:id
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    // Check if user exists
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }
    await User.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
