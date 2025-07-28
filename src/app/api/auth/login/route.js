import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { AdminModel } from '../../../../../modals/admin';
import connectToDatabase from '../../../../../configurations/mongoose.config';

export async function POST(req) {
    const response = { status: "error", message: "Something went wrong", data: {}, error: "Something went wrong" };

    try {
        await connectToDatabase();

        const { email, password } = await req.json();

        // Find admin by email
        const admin = await AdminModel.findOne({ email });

        if (!admin) {
            response.status = "error";
            response.message = "Invalid credentials";
            response.error = "Invalid credentials";
            return NextResponse.json(response, { status: 401 });
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, admin.password);

        if (!isValidPassword) {
            response.status = "error";
            response.message = "Invalid credentials";
            response.error = "Invalid credentials";
            return NextResponse.json(response, { status: 401 });
        }

        // Set the login status as true to indecate that the admin is loggedIn
        await AdminModel.findOneAndUpdate({ email }, { isLoggedIn: true }, { new: true });

        const token = jwt.sign({ _id: admin._id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '1d' });
        response.status = "success";
        response.message = "Login successful";
        response.data = { token: token };
        response.error = "";
        return NextResponse.json(response, { status: 200 });

    } catch (error) {
        response.error = error.message;
        response.status = "error";
        response.message = "Internal server error";
        return NextResponse.json(response, { status: 500 });
    }
} 