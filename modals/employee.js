import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
    sno: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    designation: {
        type: String,
        required: [true, "Designation is required"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
    },
    image: {
        type: String,
        required: [true, "Image is required"],
    },
    websiteLink: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true
});

export const EmployeeModal = mongoose.models.Employee || mongoose.model('Employee', employeeSchema); 