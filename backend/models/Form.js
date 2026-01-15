import mongoose from 'mongoose';

const formSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    fields: [{
        id: String,
        type: { type: String, required: true },
        label: String,
        placeholder: String,
        required: Boolean,
        options: [String], // For select, radio, etc.
        validation: Object
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Form = mongoose.model('Form', formSchema);
export default Form;
