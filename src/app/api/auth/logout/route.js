import { NextResponse } from 'next/server';
import { AdminModel } from '../../../../../modals/admin';
import connectToDatabase from '../../../../../configurations/mongoose.config';

export async function POST(req) {
    const response = { status: "error", message: "Something went wrong", data: {}, error: "Something went wrong" };
    try {
        await connectToDatabase();

        const updatedAdmin = await AdminModel.findOneAndUpdate({}, { isLoggedIn: false }, { new: true });

        if (!updatedAdmin) {
            response.status = "error";
            response.message = "Admin not found";
            return NextResponse.json(response, { status: 404 });
        }

        response.status = "success";
        response.message = "Logged out successfully";
        response.error = "";
        return NextResponse.json(response, { status: 200 });

    } catch (error) {
        response.error = error.message;
        response.status = "error";
        response.message = "Internal server error";
        return NextResponse.json(response, { status: 500 });
    }
}
