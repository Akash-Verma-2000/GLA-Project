import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    sno: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: [true, "Image is required"],
    },
    title: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true,
    },
    phone: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },

}, {
    timestamps: true
});

export const ProjectModal = mongoose.models.Project || mongoose.model('Project', projectSchema); 