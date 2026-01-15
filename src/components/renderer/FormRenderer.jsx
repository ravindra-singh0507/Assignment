import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useFormStore } from '../../store/useFormStore';
import { RepeaterField } from './RepeaterField';
import { Download } from 'lucide-react';
import Papa from 'papaparse';

export function FormRenderer({ previewMode = false }) {
    const { fields, addSubmission } = useFormStore();
    const { register, handleSubmit, control, formState: { errors }, reset } = useForm();

    // Only render enabled fields
    const activeFields = fields.filter(f => f.enabled);

    const onSubmit = async (data) => {
        if (previewMode) {
            alert("This is a preview. Form valid!");
            console.log(data);
            return;
        }

        // Transform data: ID -> Label, and flatten single-element arrays
        const transformedData = {};

        // Helper to process specific fields or structured data
        activeFields.forEach(field => {
            const value = data[field.id];

            // Skip undefined values
            if (value === undefined || value === null || value === '') return;

            let finalValue = value;

            // Flatten single-element arrays for readability (common with checkbox/select)
            if (Array.isArray(value) && value.length === 1) {
                finalValue = value[0];
            } else if (Array.isArray(value) && value.length > 1) {
                // keeps it as array for multi-select
                finalValue = value;
            }

            // Handle Repeater Fields specifically
            if (field.type === 'repeater' && Array.isArray(value) && field.subFields) {
                finalValue = value.map(item => {
                    const itemObj = {};
                    field.subFields.forEach(sub => {
                        if (item[sub.id]) {
                            itemObj[sub.label] = item[sub.id];
                        }
                    });
                    return itemObj;
                });
            }

            transformedData[field.label] = finalValue;
        });

        try {
            const response = await fetch('http://localhost:5000/api/forms/default/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data: transformedData }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Submission failed');
            }

            const result = await response.json();
            console.log('Submission successful:', result);

            addSubmission(transformedData);

            alert("Application Submitted Successfully!");
            reset();
        } catch (error) {
            console.error('Error submitting form:', error);
            alert(`Submission Error: ${error.message}`);
        }
    };

    if (activeFields.length === 0) {
        return <div className="text-center p-10">Form is empty.</div>;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl mx-auto p-4 md:p-8">
            <div className="bg-white dark:bg-slate-800 shadow-xl rounded-2xl p-8 border-t-4 border-primary">
                <h2 className="text-3xl font-bold mb-2">Job Application</h2>
                <p className="text-gray-500 mb-8">Please complete the form below to apply.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {activeFields.map((field) => {
                        if (field.type === 'repeater') {
                            return (
                                <div className="md:col-span-2" key={field.id}>
                                    <RepeaterField
                                        key={field.id}
                                        {...field}
                                        register={register}
                                        control={control}
                                        name={field.id}
                                        errors={errors}
                                    />
                                </div>
                            );
                        }

                        const isFullWidth = ['candidateLocation', 'preferredLocation', 'textarea'].includes(field.type) || field.type === 'textarea';

                        return (
                            <div key={field.id} className={isFullWidth ? "md:col-span-2" : ""}>
                                <label className="label">
                                    {field.label} {field.required && <span className="text-danger">*</span>}
                                </label>

                                {field.type === 'select' ? (
                                    <select {...register(field.id, { required: field.required })} className="input">
                                        <option value="">Select...</option>
                                        {field.options?.map(opt => (
                                            <option key={opt} value={opt}>{opt}</option>
                                        ))}
                                    </select>
                                ) : field.type === 'textarea' ? (
                                    <textarea
                                        {...register(field.id, { required: field.required })}
                                        className="input min-h-[100px]"
                                    />
                                ) : field.type === 'checkbox' ? (
                                    <div className="flex flex-col gap-2 mt-2">
                                        {field.options?.map(opt => (
                                            <label key={opt} className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    value={opt}
                                                    {...register(field.id, { required: field.required })}
                                                />
                                                <span>{opt}</span>
                                            </label>
                                        ))}
                                    </div>
                                ) : (
                                    <input
                                        type={field.type}
                                        {...register(field.id, { required: field.required })}
                                        className="input"
                                    />
                                )}

                                {errors[field.id] && (
                                    <span className="text-xs text-danger mt-1">This field is required</span>
                                )}
                            </div>
                        );
                    })}
                </div>

                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                    <button type="submit" className="btn btn-primary px-8 py-3 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
                        Submit Application
                    </button>
                </div>
            </div>
        </form>
    );
}
