import Submission from '../models/Submission.js';
import Form from '../models/Form.js';

export const submitForm = async (req, res) => {
    try {
        console.log('Received submission request:', req.params, req.body);
        let { formId } = req.params;
        const { data } = req.body;

        let form;
        if (formId === 'default') {
            // Find the most recent form or create one if none exists
            form = await Form.findOne().sort({ createdAt: -1 });
            if (!form) {
                console.log('No forms found, creating default form...');
                form = await new Form({
                    title: 'Default Form',
                    fields: [] // Allow empty fields for now
                }).save();
            }
            formId = form._id;
            console.log('Using default form ID:', formId);
        } else {
            // Verify form exists
            form = await Form.findById(formId);
        }

        if (!form) {
            console.error('Form not found for ID:', formId);
            return res.status(404).json({ message: 'Form not found' });
        }

        const newSubmission = new Submission({
            formId,
            data
        });

        const savedSubmission = await newSubmission.save();
        console.log('Submission saved successfully:', savedSubmission._id);
        res.status(201).json(savedSubmission);
    } catch (error) {
        console.error('Error in submitForm:', error);
        res.status(500).json({ message: error.message });
    }
};

export const getSubmissions = async (req, res) => {
    try {
        const { formId } = req.params;
        const submissions = await Submission.find({ formId }).sort({ submittedAt: -1 });
        res.status(200).json(submissions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
