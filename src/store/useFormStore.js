import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

const initialPrimaryFields = [
    { id: 'candidateName', type: 'text', label: 'Candidate Name', required: true, isSystem: true, enabled: true },
    { id: 'candidateEmail', type: 'email', label: 'Candidate Email', required: true, isSystem: true, enabled: true },
    { id: 'candidatePhone', type: 'tel', label: 'Candidate Phone', required: true, isSystem: true, enabled: true },
    { id: 'primarySkills', type: 'text', label: 'Primary Skill Set', required: true, isSystem: true, enabled: true },
    { id: 'secondarySkills', type: 'text', label: 'Secondary Skill Set', required: false, isSystem: true, enabled: true },
    { id: 'candidateLocation', type: 'text', label: 'Candidate Location', required: true, isSystem: true, enabled: true },
    { id: 'preferredLocation', type: 'text', label: 'Preferred Job Location', required: true, isSystem: true, enabled: true },
    { id: 'secondaryLocation', type: 'text', label: 'Secondary Preferred Job Location', required: false, isSystem: true, enabled: true },
    { id: 'totalExperience', type: 'number', label: 'Experience (Years)', required: true, isSystem: true, enabled: true },
    { id: 'coreExperience', type: 'number', label: 'Core Experience (Years)', required: true, isSystem: true, enabled: true },
    { id: 'expectedSalary', type: 'number', label: 'Expectation (LPA)', required: true, isSystem: true, enabled: true },
    {
        id: 'companiesWorked', type: 'repeater', label: 'List of Companies Worked', required: false, isSystem: true, enabled: true,
        subFields: [
            { id: 'companyName', type: 'text', label: 'Company Name', required: true },
            { id: 'designation', type: 'text', label: 'Designation', required: true },
            { id: 'duration', type: 'text', label: 'Duration', required: true }
        ]
    },
];

export const useFormStore = create(
    persist(
        (set) => ({
            fields: initialPrimaryFields,
            selectedFieldId: null,
            submissions: [],
            theme: 'light',

            toggleTheme: () => set((state) => {
                const newTheme = state.theme === 'light' ? 'dark' : 'light';
                document.body.setAttribute('data-theme', newTheme);
                return { theme: newTheme };
            }),

            addField: (type) => set((state) => {
                const newField = {
                    id: uuidv4(),
                    type,
                    label: 'New Field',
                    required: false,
                    isSystem: false,
                    enabled: true,
                    options: type === 'select' || type === 'checkbox' ? ['Option 1', 'Option 2'] : undefined,
                };
                return { fields: [...state.fields, newField], selectedFieldId: newField.id };
            }),

            updateField: (id, updates) => set((state) => ({
                fields: state.fields.map((f) => (f.id === id ? { ...f, ...updates } : f)),
            })),

            removeField: (id) => set((state) => ({
                fields: state.fields.filter((f) => f.id !== id),
                selectedFieldId: state.selectedFieldId === id ? null : state.selectedFieldId,
            })),

            reorderFields: (newFields) => set({ fields: newFields }),

            selectField: (id) => set({ selectedFieldId: id }),

            addSubmission: (data) => set((state) => ({
                submissions: [...state.submissions, { id: uuidv4(), ...data, submittedAt: new Date().toISOString() }],
            })),
        }),
        {
            name: 'job-portal-storage',
        }
    )
);
