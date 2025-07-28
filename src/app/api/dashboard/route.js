import { NextResponse } from "next/server";
import connectMongoDB from "../../../../configurations/mongoose.config";
import { LeadModal } from "../../../../modals/leads";
import { ProjectModal } from "../../../../modals/project";
import { FaqModal } from "../../../../modals/faq";
import { EmployeeModal } from "../../../../modals/employee";
import { verifyToken } from "../../../../middlewares/authorization/auth";

export async function GET(req) {
    const response = { status: "error", message: "Something went wrong", data: {}, error: "Something went wrong" };

    try {
        await connectMongoDB();

        const decoded = await verifyToken(req);
        if (!decoded) {
            response.message = "Please login again";
            return NextResponse.json(response, { status: 401 });
        }

        const totalLeads = await LeadModal.countDocuments({ isDeleted: false });
        const totalInquiry = await LeadModal.countDocuments({ type: "Inquiry", isDeleted: false });
        const totalComplaint = await LeadModal.countDocuments({ type: "Complaint", isDeleted: false });
        const totalTeamMembers = await EmployeeModal.countDocuments();
        const totalProjects = await ProjectModal.countDocuments();
        const totalFaqs = await FaqModal.countDocuments();

        response.data = {
            totalLeads,
            totalInquiry,
            totalComplaint,
            totalTeamMembers,
            totalProjects,
            totalFaqs,
        };
        response.status = "success";
        response.message = "Dashboard data fetched";
        response.error = "";
        return NextResponse.json(response, { status: 201 });

    } catch (error) {
        console.log("ERROR =>", error);
        response.error = error.message;
        response.status = "error";
        response.message = "Internal server error";
        return NextResponse.json(response, { status: 500 });
    }
}
