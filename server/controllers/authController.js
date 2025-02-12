import User from '../models/userModels.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// @desc to register the user
// @route POST /api/auth/register
//@access public
export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: 'All fields are required' });
  }
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: 'User already exists' });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be atleast 8 charecters',
      });
    }

    //hashing password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();

    //creating JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    //sending cookie to the browser
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res
      .status(201)
      .json({ success: true, message: `New user ${name} created` });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc to login the user
// @route POST /api/auth/login
//@access public
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide the valid details to login.',
    });
  }
  const foundUser = await User.findOne({ email });

  if (!foundUser) {
    return res.status(400).json({ success: false, message: 'User not exists' });
  }
  try {
    const matchPassword = await bcrypt.compare(password, foundUser.password);

    if (!matchPassword) {
      return res
        .status(400)
        .json({ success: false, message: 'Invalid Password' });
    }

    //creating JWT token
    const token = jwt.sign({ id: foundUser._id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    //sending cookie to the browser
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: `User ${foundUser.name} logged in successfully`,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc to logout the user
// @route POST /api/auth/logout
//@access public
export const logout = async (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    });
    res
      .status(200)
      .json({ success: true, message: 'user logged out sucessfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
