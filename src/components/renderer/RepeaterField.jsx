import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { Plus, Trash } from 'lucide-react';

export function RepeaterField({ control, register, name, label, subFields, errors }) {
    const { fields, append, remove } = useFieldArray({
        control,
        name
    });

    return (
        <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
                <label className="label text-lg">{label}</label>
                <button
                    type="button"
                    onClick={() => append({})}
                    className="btn btn-outline text-sm"
                >
                    <Plus size={16} /> Add Company
                </button>
            </div>

            <div className="flex flex-col gap-4">
                {fields.map((fieldItem, index) => (
                    <div key={fieldItem.id} className="card relative pt-8">
                        <button
                            type="button"
                            onClick={() => remove(index)}
                            className="absolute top-2 right-2 text-danger hover:bg-red-50 p-1 rounded"
                        >
                            <Trash size={16} />
                        </button>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {subFields.map(sub => (
                                <div key={sub.id} className={sub.id === 'duration' ? 'md:col-span-2' : ''}>
                                    <label className="label">
                                        {sub.label} {sub.required && <span className="text-danger">*</span>}
                                    </label>
                                    <input
                                        {...register(`${name}.${index}.${sub.id}`, { required: sub.required })}
                                        className="input"
                                        type={sub.type}
                                        placeholder={sub.label}
                                    />
                                    {errors?.[name]?.[index]?.[sub.id] && (
                                        <span className="text-xs text-danger">Required</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                {fields.length === 0 && (
                    <div className="text-center p-4 text-gray-500 border border-dashed rounded">
                        No history added. Click "Add Company" to start.
                    </div>
                )}
            </div>
        </div>
    );
}
