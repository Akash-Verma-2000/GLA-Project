import mongoose from 'mongoose';

const leadSchema = new mongoose.Schema({
    type: {
        type: String,
        required: [true, "Reason for contacting is required"],
        enum: ['Complaint', 'Inquiry', 'Others'],
        default: 'Inquiry'
    },
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [2, "Name must be at least 2 characters long"],
        maxlength: [100, "Name cannot exceed 100 characters"]
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        trim: true,
        match: [/^\+?[0-9]{10,15}$/, 'Please enter a valid phone number']
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    message: { // Written by the users
        type: String
    },
    status: {
        type: String,
        enum: ['New', 'Contacted', 'In Progress', 'Proposal Sent', 'Converted', 'Lost', 'Follow-Up Scheduled', 'No Response', 'Spam'],
        default: 'New'
    },
    statusHistory: [ // This is the timeline
        {
            status: {
                type: String,
                enum: ['New', 'Contacted', 'In Progress', 'Proposal Sent', 'Converted', 'Lost', 'Follow-Up Scheduled', 'No Response', 'Spam'],
                default: 'New'
            },
            remark: {
                type: String,
            },
            updatedAt: {
                type: Date,
                default: Date.now
            }
        }
    ],
    isDeleted: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
});

export const LeadModal = mongoose.models.Lead || mongoose.model('Lead', leadSchema);
