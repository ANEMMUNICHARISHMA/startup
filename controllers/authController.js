import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already in use' });
    }

    // Create new User document
    // In a real app with Mongoose pre-save hooks, hashing is often done in the User model.
    // If not, it should be done here: const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      name,
      email,
      password, // assuming User model has a pre('save') hook for hashing
    });

    // Generate JWT
    const token = generateToken(user._id);

    // Remove password from response
    user.password = undefined;

    return res.status(201).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email and include password for comparison
    const user = await User.findOne({ email }).select('+password');

    // Check if user exists and password is correct (checking bcrypt here in case it's not a model method)
    // If you have a user.comparePassword method, you can use that instead.
    let isMatch = false;
    if (user) {
      if (typeof user.comparePassword === 'function') {
        isMatch = await user.comparePassword(password);
      } else {
        isMatch = await bcrypt.compare(password, user.password);
      }
    }

    if (!user || !isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    if (user.isActive === false) {
      return res.status(403).json({ success: false, message: 'Account is deactivated' });
    }

    // Generate JWT
    const token = generateToken(user._id);

    // Remove password from response
    user.password = undefined;

    return res.status(200).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res, next) => {
  try {
    // req.user is already attached by protect middleware
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const { name, oldPassword, newPassword } = req.body;
    
    // We get the user from req.user, but we might need their password if they are updating it
    const user = await User.findById(req.user._id).select('+password');

    if (name) {
      user.name = name;
    }

    if (newPassword) {
      if (!oldPassword) {
         return res.status(400).json({ success: false, message: 'Please provide old password to set a new one' });
      }
      
      let isMatch = false;
      if (typeof user.comparePassword === 'function') {
        isMatch = await user.comparePassword(oldPassword);
      } else {
        isMatch = await bcrypt.compare(oldPassword, user.password);
      }

      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid credentials' });
      }
      
      // If we don't have a mongoose hook for hashing, we should hash here:
      // user.password = await bcrypt.hash(newPassword, 12);
      user.password = newPassword;
    }

    await user.save();
    
    user.password = undefined;

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

export { generateToken };
