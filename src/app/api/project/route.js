import { NextResponse } from "next/server";
import connectToDatabase from "../../../../configurations/mongoose.config";
import { verifyToken } from "../../../../middlewares/authorization/auth";
import { clearSearch } from "@/utils/utility";
import { ProjectModal } from "../../../../modals/project";

export async function POST(req) {
    const response = { status: "error", message: "Something went wrong", data: {}, error: "Something went wrong" };
    try {
        await connectToDatabase();

        const decoded = await verifyToken(req);
        if (!decoded) {
            response.message = "Please login again";
            return NextResponse.json(response, { status: 401 });
        }

        const { _id, sno, image, title, description, phone, email, address } = await req.json();
        const maxSno = await ProjectModal.findOne({}).sort({ sno: -1 });


        if (_id) {

            if (!sno || !image || !title || !description) {
                response.message = "S No, Image, Title, and Description is required";
                response.error = "Missing required fields";
                return NextResponse.json(response, { status: 400 });
            }

            const project = await ProjectModal.findById(_id);

            if (!project) {
                response.message = "Project not found";
                response.error = "Project not found";
                return NextResponse.json(response, { status: 404 });
            }

            if (sno < project.sno) {
                await ProjectModal.updateMany(
                    { sno: { $gte: sno, $lt: project.sno } },
                    { $inc: { sno: 1 } }
                );
            }

            if (sno > project.sno) {
                await ProjectModal.updateMany(
                    { sno: { $gt: project.sno, $lte: sno } },
                    { $inc: { sno: -1 } }
                );
            }

            const updatedProject = await ProjectModal.findByIdAndUpdate(
                _id,
                {
                    sno: maxSno.sno >= sno ? sno : maxSno.sno,
                    image,
                    title,
                    description,
                    phone,
                    email,
                    address
                },
                { new: true }
            );

            response.data = updatedProject;
            response.status = "success";
            response.message = "Project updated successfully";
            response.error = "";
            return NextResponse.json(response, { status: 200 });

        } else {
            // Check if all required fields are present for new creation
            if (!image || !title || !description) {
                response.message = "Title, Image, and Description is required";
                response.error = "Missing required fields";
                return NextResponse.json(response, { status: 400 });
            }

            const snoPresent = await ProjectModal.findOne({ sno });

            if (snoPresent) {
                await ProjectModal.updateMany(
                    { sno: { $gte: sno } },
                    { $inc: { sno: 1 } }
                );
            }

            const newProject = new ProjectModal({
                sno: sno ? sno : maxSno.sno ? maxSno.sno + 1 : 1,
                image,
                title,
                description,
                phone,
                email,
                address
            });

            response.data = await newProject.save();
            response.status = "success";
            response.message = "Project created successfully";
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
                    title: { '$regex': new RegExp(search_value || ''), $options: 'i' }
                },
                {
                    description: { '$regex': new RegExp(search_value || ''), $options: 'i' }
                },
                {
                    phone: { '$regex': new RegExp(search_value || ''), $options: 'i' }
                },
                {
                    email: { '$regex': new RegExp(search_value || ''), $options: 'i' }
                },
                {
                    address: { '$regex': new RegExp(search_value || ''), $options: 'i' }
                },
            ],
        }

        clearSearch(search);

        const projects = await ProjectModal.find(search).sort({ sno: 1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const totalProjects = await ProjectModal.countDocuments(search);
        const totalPages = Math.ceil(totalProjects / limit);

        response.status = "success";
        response.message = "Projects fetched successfully";
        response.data = {
            projects,
            totalPages,
            totalProjects,
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
        const deleted = await ProjectModal.findByIdAndDelete(_id);

        await ProjectModal.updateMany(
            { sno: { $gt: deleted.sno } },
            { $inc: { sno: -1 } }
        );

        if (!deleted) {
            response.message = "Project not found";
            response.error = "Project not found";
            return NextResponse.json(response, { status: 404 });
        }
        response.status = "success";
        response.message = "Project deleted successfully";
        response.data = deleted;
        response.error = "";
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        response.error = error.message;
        response.status = "error";
        response.message = "Something went wrong";
        return NextResponse.json(response, { status: 500 });
    }
}
