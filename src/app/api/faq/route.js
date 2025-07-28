import { NextResponse } from "next/server";
import connectToDatabase from "../../../../configurations/mongoose.config";
import { verifyToken } from "../../../../middlewares/authorization/auth";
import { clearSearch } from "@/utils/utility";
import { FaqModal } from "../../../../modals/faq";

export async function POST(req) {
    const response = { status: "error", message: "Something went wrong", data: {}, error: "Something went wrong" };
    try {
        await connectToDatabase();

        const decoded = await verifyToken(req);
        if (!decoded) {
            response.message = "Please login again";
            return NextResponse.json(response, { status: 401 });
        }

        const { _id, sno, question, answere } = await req.json();
        const maxSno = await FaqModal.findOne({}).sort({ sno: -1 });


        if (_id) {

            // Check if all required fields are present for new creation
            if (!sno || !question || !answere) {
                response.message = "S No, Question, and Answere is required";
                response.error = "Missing required fields";
                return NextResponse.json(response, { status: 400 });
            }

            const faq = await FaqModal.findById(_id);

            if (!faq) {
                response.message = "FAQ not found";
                response.error = "FAQ not found";
                return NextResponse.json(response, { status: 404 });
            }

            if (sno < faq.sno) {

                await FaqModal.updateMany(
                    { sno: { $gte: sno, $lt: faq.sno } },
                    { $inc: { sno: 1 } }
                );
            }

            if (sno > faq.sno) {
                await FaqModal.updateMany(
                    { sno: { $gt: faq.sno, $lte: sno } },
                    { $inc: { sno: -1 } }
                );

            }

            const updatedFAQ = await FaqModal.findByIdAndUpdate(
                _id,
                {
                    sno: maxSno.sno >= sno ? sno : maxSno.sno,
                    question,
                    answere,
                },
                { new: true }
            );

            response.data = updatedFAQ;
            response.status = "success";
            response.message = "FAQ updated successfully";
            response.error = "";
            return NextResponse.json(response, { status: 200 });

        } else {

            // Check if all required fields are present for new creation
            if (!question || !answere) {
                response.message = "Question, and Answere is required";
                response.error = "Missing required fields";
                return NextResponse.json(response, { status: 400 });
            }

            const snoPresent = await FaqModal.findOne({ sno });

            if (snoPresent) {
                await FaqModal.updateMany(
                    { sno: { $gte: sno } },
                    { $inc: { sno: 1 } }
                );
            }

            const newFaq = new FaqModal({
                sno: sno ? sno : maxSno.sno ? maxSno.sno + 1 : 1,
                question,
                answere
            });

            response.data = await newFaq.save();
            response.status = "success";
            response.message = "FAQ created successfully";
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
    const response = { status: "error", message: "Something went wrong", data: {}, error: "Something went wrong", extra: {} };
    try {
        // await verifyToken(req);
        await connectToDatabase();

        const { searchParams } = new URL(req.url);

        const limit = parseInt(searchParams.get('limit')) || 10;
        const page = parseInt(searchParams.get('page')) || 1;

        const search_value = searchParams.get('search_value');

        const search = {

            $or: [
                {
                    question: { '$regex': new RegExp(search_value || ''), $options: 'i' }
                },
                {
                    answere: { '$regex': new RegExp(search_value || ''), $options: 'i' }
                },
            ],
        }

        clearSearch(search);

        const faqs = await FaqModal.find(search).sort({ sno: 1 })
            .skip((page - 1) * limit)
            .limit(limit);

        const totalFaq = await FaqModal.countDocuments(search);
        const totalPages = Math.ceil(totalFaq / limit);

        response.status = "success";
        response.message = "Contacts fetched successfully";
        response.data = {
            faqs,
            totalPages,
            totalFaq,
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
        const deleted = await FaqModal.findByIdAndDelete(_id);

        await FaqModal.updateMany(
            { sno: { $gt: deleted.sno } },
            { $inc: { sno: -1 } }
        );

        if (!deleted) {
            response.message = "FAQ not found";
            response.error = "FAQ not found";
            return NextResponse.json(response, { status: 404 });
        }
        response.status = "success";
        response.message = "FAQ deleted successfully";
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
