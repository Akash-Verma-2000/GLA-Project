import { NextResponse } from "next/server";
import connectToDatabase from "../../../../configurations/mongoose.config";
import { LeadModal } from "../../../../modals/leads";
import { verifyToken } from "../../../../middlewares/authorization/auth";
import { clearSearch } from "@/utils/utility";

export async function POST(req) {
    const response = { status: "error", message: "Something went wrong", data: {}, error: "Something went wrong" };
    try {
        await connectToDatabase();
        const { name, phone, email, message, type = 'Inquiry' } = await req.json();

        // Create new lead with status history
        const newConsultation = new LeadModal({
            name,
            phone,
            email,
            message,
            type,
            statusHistory: [{
                status: 'New',
                remark: 'Lead created',
                updatedAt: new Date()
            }]
        });

        response.data = await newConsultation.save();
        response.status = "success";
        response.message = "Request submitted successfully";
        response.error = "";
        return NextResponse.json(response, { status: 201 });
    } catch (error) {
        response.error = error.message;
        response.status = "error";
        response.message = "Internal server error";
        return NextResponse.json(response, { status: 500 });
    }
}

export async function GET(req) {
    const response = { status: "error", message: "Something went wrong", data: {}, error: "Something went wrong", extra: {} };
    try {
        // await verifyToken(req);
        await connectToDatabase();

        const decoded = await verifyToken(req);
        if (!decoded) {
            response.message = "Please login again";
            return NextResponse.json(response, { status: 401 });
        }

        const { searchParams } = new URL(req.url);

        const limit = parseInt(searchParams.get('limit')) || 10;
        const page = parseInt(searchParams.get('page')) || 1;

        const type = searchParams.get('type');
        const search_value = searchParams.get('search_value');
        const status = searchParams.get('status');

        const search = {
            type: type ? type : undefined,
            status: status ? status : undefined,

            $or: [
                {
                    name: { '$regex': new RegExp(search_value || ''), $options: 'i' }
                },
                {
                    phone: { '$regex': new RegExp(search_value || ''), $options: 'i' }
                },
                {
                    email: { '$regex': new RegExp(search_value || ''), $options: 'i' }
                },
                {
                    message: { '$regex': new RegExp(search_value || ''), $options: 'i' }
                },
            ],
        }

        clearSearch(search);

        const leads = await LeadModal.find({ isDeleted: false, ...search }).sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const totalLeads = await LeadModal.countDocuments({ isDeleted: false, ...search });
        const totalPages = Math.ceil(totalLeads / limit);

        response.status = "success";
        response.message = "Contacts fetched successfully";
        response.data = {
            leads,
            totalPages,
            totalLeads,
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
        const updated = await LeadModal.findByIdAndUpdate(_id, { isDeleted: true }, { new: true });
        if (!updated) {
            response.message = "Lead not found";
            response.error = "Lead not found";
            return NextResponse.json(response, { status: 404 });
        }
        response.status = "success";
        response.message = "Lead deleted successfully";
        response.data = updated;
        response.error = "";
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        response.error = error.message;
        response.status = "error";
        response.message = "Something went wrong";
        return NextResponse.json(response, { status: 500 });
    }
}

export async function PUT(req) {
    const response = { status: "error", message: "Something went wrong", data: {}, error: "Something went wrong" };
    try {
        await connectToDatabase();

        const decoded = await verifyToken(req);
        if (!decoded) {
            response.message = "Please login again";
            return NextResponse.json(response, { status: 401 });
        }

        const { _id, status, remark } = await req.json();
        if (!_id || !status || !remark) {
            response.message = "Status, and Remark is required";
            response.error = "Status, and Remark is required";
            return NextResponse.json(response, { status: 400 });
        }

        const lead = await LeadModal.findById(_id);
        if (!lead) {
            response.message = "Lead not found";
            response.error = "Lead not found";
            return NextResponse.json(response, { status: 404 });
        }
        lead.statusHistory.push({ status, remark, updatedAt: new Date() });
        lead.status=status;

        await lead.save();

        response.status = "success";
        response.message = "Lead status updated successfully";
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

