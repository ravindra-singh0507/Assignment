import React from 'react';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useFormStore } from '../../store/useFormStore';
import { SortableField } from './SortableField';

export function FormBuilderCanvas() {
    const { fields, reorderFields } = useFormStore();

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (active.id !== over.id) {
            const oldIndex = fields.findIndex((f) => f.id === active.id);
            const newIndex = fields.findIndex((f) => f.id === over.id);
            reorderFields(arrayMove(fields, oldIndex, newIndex));
        }
    };

    return (
        <div className="w-full">
            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
            >
                <SortableContext items={fields} strategy={verticalListSortingStrategy}>
                    {fields.map((field) => (
                        <SortableField key={field.id} field={field} />
                    ))}
                </SortableContext>
            </DndContext>

            {fields.length === 0 && (
                <div className="text-center p-8 text-gray-500 border-2 border-dashed border-gray-200 rounded-lg">
                    No fields added. Start by adding a field from the toolbox.
                </div>
            )}
        </div>
    );
}
