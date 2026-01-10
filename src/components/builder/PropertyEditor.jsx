import React from 'react';
import { useFormStore } from '../../store/useFormStore';
import { X, Plus, Trash } from 'lucide-react';

export function PropertyEditor() {
    const { fields, selectedFieldId, updateField, selectField } = useFormStore();
    const field = fields.find((f) => f.id === selectedFieldId);

    if (!field) {
        return (
            <div className="p-4 text-center text-gray-500">
                Select a field to edit its properties.
            </div>
        );
    }

    const handleOptionChange = (idx, value) => {
        const newOptions = [...(field.options || [])];
        newOptions[idx] = value;
        updateField(field.id, { options: newOptions });
    };

    const addOption = () => {
        updateField(field.id, { options: [...(field.options || []), `Option ${field.options.length + 1}`] });
    };

    const removeOption = (idx) => {
        const newOptions = field.options.filter((_, i) => i !== idx);
        updateField(field.id, { options: newOptions });
    };

    return (
        <div className="card h-full">
            <div className="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
                <h3 className="text-lg font-semibold">Edit Field</h3>
                <button onClick={() => selectField(null)} className="btn btn-ghost p-1"><X size={16} /></button>
            </div>

            <div className="flex flex-col gap-4">
                <div>
                    <label className="label">Label</label>
                    <input
                        type="text"
                        className="input"
                        value={field.label}
                        onChange={(e) => updateField(field.id, { label: e.target.value })}
                    />
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="req-check"
                        checked={field.required}
                        onChange={(e) => updateField(field.id, { required: e.target.checked })}
                    />
                    <label htmlFor="req-check" className="cursor-pointer select-none">Required Field</label>
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="enable-check"
                        checked={field.enabled}
                        onChange={(e) => updateField(field.id, { enabled: e.target.checked })}
                    />
                    <label htmlFor="enable-check" className="cursor-pointer select-none">Visible in Form</label>
                </div>

                {(field.type === 'select' || field.type === 'checkbox') && (
                    <div>
                        <label className="label">Options</label>
                        <div className="flex flex-col gap-2">
                            {field.options?.map((opt, idx) => (
                                <div key={idx} className="flex gap-2">
                                    <input
                                        className="input text-sm"
                                        value={opt}
                                        onChange={(e) => handleOptionChange(idx, e.target.value)}
                                    />
                                    <button onClick={() => removeOption(idx)} className="btn btn-ghost text-danger p-1">
                                        <Trash size={14} />
                                    </button>
                                </div>
                            ))}
                            <button onClick={addOption} className="btn btn-outline text-sm w-full mt-2">
                                <Plus size={14} /> Add Option
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
