import { NextResponse } from "next/server";
import { verifyToken } from "../../../../../middlewares/authorization/auth";
import { EmployeeModal } from "../../../../../modals/employee";
import connectToDatabase from "../../../../../configurations/mongoose.config";

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
            response.message = "Employee ID is required";
            response.error = "Employee ID is required";
            return NextResponse.json(response, { status: 400 });
        }
        const employee = await EmployeeModal.findById(_id);

        if (!employee) {
            response.message = "Employee not found";
            response.error = "Employee not found";
            return NextResponse.json(response, { status: 404 });
        }

        response.status = "success";
        response.message = "Employee fetched successfully";
        response.data = employee;
        response.error = "";
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        response.error = error.message;
        response.status = "error";
        response.message = "Internal server error";
        return NextResponse.json(response, { status: 500 });
    }
} 