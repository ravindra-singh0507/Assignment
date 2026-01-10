**Form Builder — React (assign2)**

**Project:** A lightweight drag-and-drop form builder and renderer built with React, and Vite. It provides a canvas to compose forms using a toolbox of fields, a properties editor, sortable fields, and a renderer for running the form (including repeaters).

**Features:**
- **Drag & drop form composition:** Build forms with a visual canvas and toolbox.
- **Property editor:** Edit field properties (labels, options, validations).
- **Sortable fields:** Reorder form fields using drag handles.
- **Form renderer:** Render and interact with built forms, including repeater fields.

**File structure (key files):**
- `src/components/builder/FormBuilderCanvas.jsx`: Canvas for composing forms.
- `src/components/builder/Toolbox.jsx`: Field toolbox for adding components.
- `src/components/builder/PropertyEditor.jsx`: Editor for selected field properties.
- `src/components/builder/SortableField.jsx`: Sortable field wrapper used in the builder.
- `src/components/renderer/FormRenderer.jsx`: Renders a saved form for end-user input.
- `src/components/renderer/RepeaterField.jsx`: Repeater (dynamic list) field renderer.

**Prerequisites:**
- Node.js 18+ (or compatible LTS)
- npm (or yarn)

**Getting started (development):**
1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Open the app in your browser at `http://localhost:5173` (Vite default).

**Build & preview:**

```bash
npm run build
npm run preview
```

**Where to look next:**
- Source entry: `src/main.jsx`
- App shell: `src/App.jsx`
- Styles: `src/index.css`, `src/App.css`

---
