import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization;

  // If the token is not present or invalid, return an error response
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized. Token not provided.' });
  }

  // Verify the token using the secret key (same key used for signing in authController)
  jwt.verify(token, 'your_secret_key', (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized. Invalid token.' });
    }

    // If the token is valid, store the decoded token in the request object for future use
    req.user = decodedToken;
    next(); // Move on to the next middleware or route handler
  });
};

export default authMiddleware;
