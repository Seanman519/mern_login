// Assuming you have already defined the User model in models/User.js
import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Controller for user registration
export const registerUser = async (req, res) => {
  try {
    // Get user data from the request body
    const { username, email, password } = req.body;

    // Check if the user with the given email or username already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User with the same email or username already exists' });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user document and save it to the database
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    // Return success response
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while registering the user' });
  }
};

// Controller for user login
export const loginUser = async (req, res) => {
  try {
    // Get user data from the request body
    const { username, password } = req.body;

    // Check if the user exists in the database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare the password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Create a JWT token for the user
    const token = jwt.sign({ userId: user._id }, 'your_secret_key');

    // Return the token as a response
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while logging in' });
  }
};

// Controller for resetting the password (assuming you have a forgot password flow)
export const resetPassword = async (req, res) => {
  try {
    // Get user data from the request body
    const { username, newPassword } = req.body;

    // Find the user in the database by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Hash the new password before updating it in the database
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    user.password = hashedPassword;
    await user.save();

    // Return success response
    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while resetting the password' });
  }
};

// Controller for sending a forgot password email (assuming you have a forgot password flow)
export const forgotPassword = async (req, res) => {
  try {
    // Get user data from the request body
    const { email } = req.body;

    // Find the user in the database by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Logic for sending the forgot password email
    // This can include generating a reset token, sending an email with a link, etc.

    // For simplicity, we'll just return a success message
    res.status(200).json({ message: 'Forgot password email sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while sending the forgot password email' });
  }
};
