import { NextResponse } from "next/server";
import connectToDatabase from "../../../../../configurations/mongoose.config.js";
import { verifyToken } from "../../../../../middlewares/authorization/auth.js";
import { LeadModal } from "../../../../../modals/leads.js";


export async function GET(req) {
    const response = { status: "error", message: "Something went wrong", data: {}, error: "something went wrong" };
    try {
        await connectToDatabase();

        const decoded = await verifyToken(req);
        if (!decoded) {
            response.message = "Please login again";
            return NextResponse.json(response, { status: 401 });
        }

        const totalOthers = await LeadModal.countDocuments({ type: "Others", isDeleted: false });
        const totalInquiry = await LeadModal.countDocuments({ type: "Inquiry", isDeleted: false });
        const totalComplaint = await LeadModal.countDocuments({ type: "Complaint", isDeleted: false });

        response.data = [{ name: "Inquiries", value: totalInquiry }, { name: "Complaints", value: totalComplaint }, { name: "Others", value: totalOthers }];


        response.status = 'success';
        response.message = "Data fetched";
        response.error = "";

        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error('Data fetching error:', error);
        response.message = "Internal server error";
        return NextResponse.json(response, { status: 500 });
    }
} 