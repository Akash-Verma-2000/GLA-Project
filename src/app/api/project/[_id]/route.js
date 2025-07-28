import { NextResponse } from "next/server";
import { verifyToken } from "../../../../../middlewares/authorization/auth";
import connectToDatabase from "../../../../../configurations/mongoose.config";
import { ProjectModal } from "../../../../../modals/project";

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
            response.message = "Project ID is required";
            response.error = "Project ID is required";
            return NextResponse.json(response, { status: 400 });
        }
        const project = await ProjectModal.findById(_id);

        if (!project) {
            response.message = "Project not found";
            response.error = "Project not found";
            return NextResponse.json(response, { status: 404 });
        }

        response.status = "success";
        response.message = "Project fetched successfully";
        response.data = project;
        response.error = "";
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        response.error = error.message;
        response.status = "error";
        response.message = "Internal server error";
        return NextResponse.json(response, { status: 500 });
    }
} 