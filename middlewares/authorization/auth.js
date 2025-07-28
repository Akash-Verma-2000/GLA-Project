import jwt from 'jsonwebtoken';
import { AdminModel } from '../../modals/admin'; // Import the AdminModal

export async function verifyToken(req) {
    try {
        const token = req.headers.get('Authorization')?.split(' ')[1];
        if (!token) {
            throw new Error('No token provided');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Fetch admin to check if they exist
        const admin = await AdminModel.findById(decoded._id);

        if (!admin || !admin.isLoggedIn) {
            throw new Error('Admin not found.');
        }

        return decoded;
    } catch (error) {
        throw new Error('Please login');
    }
};
