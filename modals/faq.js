import mongoose from 'mongoose';

const faqSchema = new mongoose.Schema({
    
    sno: {
        type: Number,
        required: true,
    },
    
    question: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
    },

    answere: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
    },

}, {
    timestamps: true
});

export const FaqModal = mongoose.models.FAQ || mongoose.model('FAQ', faqSchema);
