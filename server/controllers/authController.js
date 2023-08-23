import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Controller for user registration
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User with the same email or username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while registering the user' });
  }
};

// Controller for user login
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ userId: user._id }, 'sean', { expiresIn: '1h' }); // Replace with your own secret key

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while logging in' });
  }
};

// Controller for resetting the password (assuming you have a forgot password flow)
export const resetPassword = async (req, res) => {
  try {
    const { username, newPassword } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while resetting the password' });
  }
};

// Controller for sending a forgot password email (assuming you have a forgot password flow)
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

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

export const generateOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate a 6-digit OTP
    const otp = crypto.randomBytes(3).toString('hex').toUpperCase();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 15 * 60 * 1000); // OTP valid for 15 minutes
    await user.save();

    // TODO: Send the OTP via email or SMS to the user

    res.status(200).json({ message: 'OTP generated and sent' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while generating the OTP' });
  }
};

export const validateOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.otp !== otp || Date.now() > user.otpExpires) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // OTP is valid, so nullify it
    user.otp = null;
    user.otpExpires = null;
    await user.save();

    res.status(200).json({ message: 'OTP validated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while validating the OTP' });
  }
};
