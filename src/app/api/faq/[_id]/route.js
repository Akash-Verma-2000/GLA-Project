import { NextResponse } from "next/server";
import connectToDatabase from "../../../../../configurations/mongoose.config";
import { verifyToken } from "../../../../../middlewares/authorization/auth";
import { FaqModal } from "../../../../../modals/faq";

export async function GET(req, { params }) {
    const response = { status: "error", message: "Something went wrong", data: {}, error: "Something went wrong" };
    try {
        await connectToDatabase();
        
        const decoded = await verifyToken(req);
        if (!decoded) {
            response.message = "Please login again";
            return NextResponse.json(response, { status: 401 });
        }

        const { _id } = params;
        if (!_id) {
            response.message = "FAQ ID is required";
            response.error = "FAQ ID is required";
            return NextResponse.json(response, { status: 400 });
        }
        const FAQ = await FaqModal.findById(_id);
        if (!FAQ) {
            response.message = "FAQ not found";
            response.error = "FAQ not found";
            return NextResponse.json(response, { status: 404 });
        }
        response.status = "success";
        response.message = "FAQ fetched successfully";
        response.data = FAQ;
        response.error = "";
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        response.error = error.message;
        response.status = "error";
        response.message = "Internal server error";
        return NextResponse.json(response, { status: 500 });
    }
} 