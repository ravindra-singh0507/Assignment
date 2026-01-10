import React from 'react';
import { useFormStore } from '../../store/useFormStore';
import { Type, Mail, Phone, Hash, List, CheckSquare, AlignLeft, Briefcase } from 'lucide-react';

const fieldTypes = [
    { type: 'text', label: 'Text Input', icon: Type },
    { type: 'email', label: 'Email', icon: Mail },
    { type: 'tel', label: 'Phone', icon: Phone },
    { type: 'number', label: 'Number', icon: Hash },
    { type: 'select', label: 'Dropdown', icon: List },
    { type: 'checkbox', label: 'Checkbox', icon: CheckSquare },
    { type: 'textarea', label: 'Comments', icon: AlignLeft },
    // { type: 'repeater', label: 'Repeater', icon: Briefcase }, // Optional for custom fields, keeping simple for now
];

export function Toolbox() {
    const { addField } = useFormStore();

    return (
        <div className="card">
            <h3 className="text-lg font-semibold mb-4">Toolbox</h3>
            <div className="grid grid-cols-2 gap-2">
                {fieldTypes.map((item) => (
                    <button
                        key={item.type}
                        onClick={() => addField(item.type)}
                        className="flex flex-col items-center justify-center gap-2 p-3 border border-gray-200 rounded hover:bg-gray-50 hover:border-primary transition-colors"
                    >
                        <item.icon size={20} className="text-gray-600" />
                        <span className="text-xs font-medium">{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
