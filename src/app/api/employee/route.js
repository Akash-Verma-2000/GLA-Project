import { NextResponse } from "next/server";
import connectToDatabase from "../../../../configurations/mongoose.config";
import { EmployeeModal } from "../../../../modals/employee";
import { verifyToken } from "../../../../middlewares/authorization/auth";
import { clearSearch } from "@/utils/utility";

export async function POST(req) {
    const response = { status: "error", message: "Something went wrong", data: {}, error: "Something went wrong" };
    try {
        await connectToDatabase();

        const decoded = await verifyToken(req);
        if (!decoded) {
            response.message = "Please login again";
            return NextResponse.json(response, { status: 401 });
        }

        const { _id, sno, name, designation, description, image, websiteLink } = await req.json();
        const maxSno = await EmployeeModal.findOne({}).sort({ sno: -1 });

        if (websiteLink) {
            try {
                new URL(websiteLink);
            } catch (error) {
                response.message = "Website link is invalid";
                response.error = "Invalid URL format";
                return NextResponse.json(response, { status: 400 });
            }
        }

        if (_id) {

            // Check if all required fields are present for new creation
            if (!sno || !name || !designation || !description || !image) {
                response.message = "S No, Name, Designation, Description, and Image is required";
                response.error = "Missing required fields";
                return NextResponse.json(response, { status: 400 });
            }

            const employee = await EmployeeModal.findById(_id);

            if (!employee) {
                response.message = "Employee not found";
                response.error = "Employee not found";
                return NextResponse.json(response, { status: 404 });
            }

            if (sno < employee.sno) {

                await EmployeeModal.updateMany(
                    { sno: { $gte: sno, $lt: employee.sno } },
                    { $inc: { sno: 1 } }
                );
            }

            if (sno > employee.sno) {
                await EmployeeModal.updateMany(
                    { sno: { $gt: employee.sno, $lte: sno } },
                    { $inc: { sno: -1 } }
                );

            }

            const updatedEmployee = await EmployeeModal.findByIdAndUpdate(
                _id,
                {
                    sno: maxSno.sno >= sno ? sno : maxSno.sno,
                    name,
                    designation,
                    description,
                    image,
                    websiteLink
                },
                { new: true }
            );

            response.data = updatedEmployee;
            response.status = "success";
            response.message = "Employee updated successfully";
            response.error = "";
            return NextResponse.json(response, { status: 200 });

        } else {
            // Check if all required fields are present for new creation
            if (!name || !designation || !description || !image) {
                response.message = "Name, Designation, Description, and Image is required";
                response.error = "Missing required fields";
                return NextResponse.json(response, { status: 400 });
            }

            const snoPresent = await EmployeeModal.findOne({ sno });

            if (snoPresent) {
                await EmployeeModal.updateMany(
                    { sno: { $gte: sno } },
                    { $inc: { sno: 1 } }
                );
            }

            const newEmployee = new EmployeeModal({
                sno: sno ? sno : maxSno.sno ? maxSno.sno + 1 : 1,
                name,
                designation,
                description,
                image,
                websiteLink
            });

            response.data = await newEmployee.save();
            response.status = "success";
            response.message = "Employee created successfully";
            response.error = "";
            return NextResponse.json(response, { status: 201 });
        }
    } catch (error) {
        console.log("ERROR =>", error);
        response.error = error.message;
        response.status = "error";
        response.message = "Internal server error";
        return NextResponse.json(response, { status: 500 });
    }
}

export async function GET(req) {
    const response = { status: "error", message: "Something went wrong", data: {}, error: "Something went wrong" };
    try {
        await connectToDatabase();

        const { searchParams } = new URL(req.url);

        const limit = parseInt(searchParams.get('limit')) || 10;
        const page = parseInt(searchParams.get('page')) || 1;

        const search_value = searchParams.get('search_value');

        const search = {
            $or: [
                {
                    name: { '$regex': new RegExp(search_value || ''), $options: 'i' }
                },
                {
                    designation: { '$regex': new RegExp(search_value || ''), $options: 'i' }
                },
                {
                    description: { '$regex': new RegExp(search_value || ''), $options: 'i' }
                },
            ],
        }

        clearSearch(search);

        const employees = await EmployeeModal.find(search).sort({ sno: 1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const totalEmployees = await EmployeeModal.countDocuments(search);
        const totalPages = Math.ceil(totalEmployees / limit);

        response.status = "success";
        response.message = "Employees fetched successfully";
        response.data = {
            employees,
            totalPages,
            totalEmployees,
        };
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

export async function DELETE(req) {
    const response = { status: "error", message: "Something went wrong", data: {}, error: "Something went wrong" };
    try {
        await connectToDatabase();

        const decoded = await verifyToken(req);
        if (!decoded) {
            response.message = "Please login again";
            return NextResponse.json(response, { status: 401 });
        }

        const { _id } = await req.json();
        if (!_id) {
            response.message = "_id is required";
            response.error = "_id is required";
            return NextResponse.json(response, { status: 400 });
        }
        const deleted = await EmployeeModal.findByIdAndDelete(_id);

        await EmployeeModal.updateMany(
            { sno: { $gt: deleted.sno } },
            { $inc: { sno: -1 } }
        );

        if (!deleted) {
            response.message = "Employee not found";
            response.error = "Employee not found";
            return NextResponse.json(response, { status: 404 });
        }
        response.status = "success";
        response.message = "Employee deleted successfully";
        response.data = deleted;
        response.error = "";
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.log("ERROR =>", error);
        response.error = error.message;
        response.status = "error";
        response.message = "Something went wrong";
        return NextResponse.json(response, { status: 500 });
    }
}
