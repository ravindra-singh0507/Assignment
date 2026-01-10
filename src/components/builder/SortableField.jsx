import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical, Trash2, Settings, Eye, EyeOff } from 'lucide-react';
import { useFormStore } from '../../store/useFormStore';

export function SortableField({ field }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: field.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.4 : 1,
    };

    const { selectField, removeField, updateField, selectedFieldId } = useFormStore();
    const isSelected = selectedFieldId === field.id;

    const handleToggleEnable = (e) => {
        e.stopPropagation();
        updateField(field.id, { enabled: !field.enabled });
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`card flex items-center gap-4 p-4 mb-2 cursor-default ${isSelected ? 'border-primary' : ''}`}
            onClick={() => selectField(field.id)}
        >
            <div {...attributes} {...listeners} className="cursor-grab text-gray-400 hover:text-gray-600">
                <GripVertical size={20} />
            </div>

            <div className="flex-1">
                <div className="flex items-center gap-2">
                    <span className="font-semibold">{field.label}</span>
                    {!field.enabled && <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded">Hidden</span>}
                    {field.required && <span className="text-danger text-xs">*</span>}
                </div>
                <div className="text-xs text-gray-500 capitalize">{field.type}</div>
            </div>

            <div className="flex items-center gap-2">
                <button
                    className="btn btn-ghost p-2"
                    title={field.enabled ? "Disable Field" : "Enable Field"}
                    onClick={handleToggleEnable}
                >
                    {field.enabled ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>

                {!field.isSystem && (
                    <button
                        className="btn btn-ghost p-2 text-danger hover:bg-red-50"
                        onClick={(e) => { e.stopPropagation(); removeField(field.id); }}
                    >
                        <Trash2 size={18} />
                    </button>
                )}
            </div>
        </div>
    );
}
