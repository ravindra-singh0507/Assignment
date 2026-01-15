import Form from '../models/Form.js';

export const createForm = async (req, res) => {
    try {
        const { title, fields } = req.body;
        const newForm = new Form({ title, fields });
        const savedForm = await newForm.save();
        res.status(201).json(savedForm);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getForms = async (req, res) => {
    try {
        const forms = await Form.find();
        res.status(200).json(forms);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getFormById = async (req, res) => {
    try {
        const form = await Form.findById(req.params.id);
        if (!form) return res.status(404).json({ message: 'Form not found' });
        res.status(200).json(form);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateForm = async (req, res) => {
    try {
        const { title, fields } = req.body;
        const updatedForm = await Form.findByIdAndUpdate(
            req.params.id,
            { title, fields },
            { new: true }
        );
        if (!updatedForm) return res.status(404).json({ message: 'Form not found' });
        res.status(200).json(updatedForm);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteForm = async (req, res) => {
    try {
        const deletedForm = await Form.findByIdAndDelete(req.params.id);
        if (!deletedForm) return res.status(404).json({ message: 'Form not found' });
        res.status(200).json({ message: 'Form deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
