// Import JWT for verifying the authentication token
import jwt from 'jsonwebtoken';

// Middleware function to protect routes by checking token
const authMiddleware = async (req, res, next) => {

    // Extract token from request headers
    const { token } = req.headers;

    // If token is missing, deny access
    if (!token) {
        return res.json({ success: false, message: 'Not Authorized Login Again' });
    }

    try {
        // Verify token using JWT_SECRET from environment variables
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        // Attach user ID from decoded token to req body for use in next func
        req.body.userId = token_decode.id;

        // Move to next middleware or route handler
        next();

    } catch (error) {
        // If token is invalid or expired, return error
        return res.json({ success: false, message: error.message });
    }
}

// Export the middleware for use in route protection
export default authMiddleware;



/* -----------------------------------------
   ✅ FILE SUMMARY
   This middleware:
   - Protects routes by verifying JWT tokens sent in headers
   - If valid, adds `userId` to `req.body` and continues
   - If invalid/missing, sends an unauthorized error response

   ✅ LIBRARIES & CONCEPTS USED
   - jsonwebtoken (JWT): For verifying user identity
   - Environment variables: `JWT_SECRET` for decoding token
   - Express middleware: Custom function inserted before route logic

   ✅ REVISION TIPS
   - Always extract token from headers (not cookies here)

   */
