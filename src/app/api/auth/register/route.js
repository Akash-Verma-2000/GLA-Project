import { NextResponse } from 'next/server';
import { AdminModel } from '../../../../../modals/admin';
import connectToDatabase from '../../../../../configurations/mongoose.config';

export async function POST(req) {
    const response = { status: "error", message: "Something went wrong", data: {}, error: "Something went wrong" };

    try {
        await connectToDatabase();

        const { email, password } = await req.json();

        // Check if admin already exists
        const existingAdmin = await AdminModel.findOne({ email });
        
        if (existingAdmin) {
            response.status = "error";
            response.message = "Email already registered";
            response.error = "Email already registered";
            return NextResponse.json(response, { status: 400 });
        }

        const newAdmin = new AdminModel({ email, password });

        const savedAdmin = await newAdmin.save();

        response.status = "success";
        response.error = "";
        response.message = "Registration successful";
        response.data = { email: savedAdmin.email, id: savedAdmin._id };

        return NextResponse.json(response, { status: 201 });

    } catch (error) {
        console.error("Registration error:", error); // Debug log
        response.error = error.message;
        response.status = "error";
        response.message = "Registration failed";
        return NextResponse.json(response, { status: 500 });
    }
}
