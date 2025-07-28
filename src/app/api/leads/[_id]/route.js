import { NextResponse } from "next/server";
import connectToDatabase from "../../../../../configurations/mongoose.config";
import { LeadModal } from "../../../../../modals/leads";
import { verifyToken } from "../../../../../middlewares/authorization/auth";

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
            response.message = "Lead ID is required";
            response.error = "Lead ID is required";
            return NextResponse.json(response, { status: 400 });
        }
        const lead = await LeadModal.findById(_id);
        if (!lead) {
            response.message = "Lead not found";
            response.error = "Lead not found";
            return NextResponse.json(response, { status: 404 });
        }
        response.status = "success";
        response.message = "Lead fetched successfully";
        response.data = lead;
        response.error = "";
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        response.error = error.message;
        response.status = "error";
        response.message = "Internal server error";
        return NextResponse.json(response, { status: 500 });
    }
} 