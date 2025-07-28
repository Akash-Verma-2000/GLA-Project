import { NextResponse } from 'next/server';
import { AdminModel } from '../../../../../modals/admin';
import connectToDatabase from '../../../../../configurations/mongoose.config';
import { verifyToken } from '../../../../../middlewares/authorization/auth';

export async function GET(req) {
    const response = { status: "error", message: "Something went wrong", data: {}, error: "Something went wrong" };

    try {
        await connectToDatabase();

        const decoded = await verifyToken(req);
        if (!decoded) {
            response.message = "Please login again";
            return NextResponse.json(response, { status: 401 });
        }

        const admin = await AdminModel.findOne({ email: decoded.email }).select('-password');

        if (!admin) {
            response.status = "error";
            response.message = "Admin not found";
            return NextResponse.json(response, { status: 404 });
        }

        response.status = "success";
        response.message = "Admin information retrieved successfully";
        response.data = admin;
        response.error = "";
        return NextResponse.json(response, { status: 200 });

    } catch (error) {
        console.log("ERROR =>", error);
        response.error = error.message;
        response.status = "error";
        response.message = "Internal server error";
        return NextResponse.json(response, { status: 500 });
    }
} 