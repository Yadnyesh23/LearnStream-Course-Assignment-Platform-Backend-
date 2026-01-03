import { AsyncHandler } from "../utils/AsyncHandler.js"
import jwt from 'jsonwebtoken';

const validateToken = AsyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization || ''
    if(!authHeader.startsWith('Bearer')){
         return res.status(401).json({
            success: false,
            message: "Unauthorized: Token missing or invalid format",
        });
    }
    
    const token = authHeader.split(' ')[1]
})

try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    req.user = decoded
} catch (error) {
    return res.status(401).json({
            success: false,
            message: "Unauthorized: Invalid or expired token",
        });

}
export default validateToken;