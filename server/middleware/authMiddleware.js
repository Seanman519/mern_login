import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  // Get the token from the request headers
  const token = req.header('Authorization');

  // Check if the token is missing
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized. Token missing.' });
  }

  try {
    // Verify the token using your secret key
    const decoded = jwt.verify(token, 'sean');

    // Attach the user data to the request object
    req.user = decoded;

    // Proceed to the next middleware
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized. Invalid token.' });
  }
};
