import React, { useState } from 'react';
import { useFormStore } from './store/useFormStore';
import { FormBuilderCanvas } from './components/builder/FormBuilderCanvas';
import { Toolbox } from './components/builder/Toolbox';
import { PropertyEditor } from './components/builder/PropertyEditor';
import { FormRenderer } from './components/renderer/FormRenderer';
import { Moon, Sun, Settings, Layout, Download, FileText } from 'lucide-react';
import Papa from 'papaparse';
import clsx from 'clsx';

function App() {
  const { theme, toggleTheme, submissions } = useFormStore();
  const [mode, setMode] = useState('build'); // 'build' | 'preview' | 'submissions'

  const downloadCSV = () => {
    if (submissions.length === 0) {
      alert("No submissions to export");
      return;
    }

    // Flatten submissions for CSV
    const flatSubmissions = submissions.map(sub => {
      const { companiesWorked, ...rest } = sub;
      // Simple flattening for demo: join companies into a string or ignore
      const companiesString = Array.isArray(companiesWorked)
        ? companiesWorked.map(c => `${c.companyName} (${c.designation})`).join('; ')
        : '';

      return {
        ...rest,
        'companies worked': companiesString
      };
    });

    const csv = Papa.unparse(flatSubmissions);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'submissions.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`min-h-screen pb-20 ${theme}`}>
      {/* Header */}
      <header className="bg-[var(--color-surface)] border-b border-[var(--color-border)] sticky top-0 z-50">
        <div className="container h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg text-primary">
              <Layout size={24} className="text-[var(--color-primary)]" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[var(--color-primary)] to-purple-600">
              JobPortal<span className="font-light text-[var(--color-text)]">Builder</span>
            </h1>
          </div>

          <div className="flex items-center gap-2 bg-[var(--color-bg)] p-1 rounded-lg border border-[var(--color-border)]">
            <button
              onClick={() => setMode('build')}
              className={clsx("btn btn-sm text-sm px-4", mode === 'build' ? 'bg-white shadow text-black dark:bg-slate-700 dark:text-white' : 'text-gray-500')}
            >
              <Settings size={16} /> Builder
            </button>
            <button
              onClick={() => setMode('preview')}
              className={clsx("btn btn-sm text-sm px-4", mode === 'preview' ? 'bg-white shadow text-black dark:bg-slate-700 dark:text-white' : 'text-gray-500')}
            >
              <EyeIcon /> Preview
            </button>
            <button
              onClick={() => setMode('submissions')}
              className={clsx("btn btn-sm text-sm px-4", mode === 'submissions' ? 'bg-white shadow text-black dark:bg-slate-700 dark:text-white' : 'text-gray-500')}
            >
              <FileText size={16} /> Submissions ({submissions.length})
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={toggleTheme} className="btn btn-ghost rounded-full p-2">
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mt-8">

        {mode === 'build' && (
          <div className="grid grid-cols-12 gap-6 h-[calc(100vh-140px)]">
            <div className="col-span-12 md:col-span-2 overflow-y-auto">
              <Toolbox />
              <div className="mt-4 p-4 bg-blue-50 dark:bg-slate-900 rounded-lg text-xs leading-relaxed text-blue-800 dark:text-blue-200">
                <p className="font-bold mb-1">How to use:</p>
                <p>1. Drag fields to reorder.</p>
                <p>2. Click a field to edit properties.</p>
                <p>3. Use the toggle eye to show/hide fields.</p>
              </div>
            </div>

            <div className="col-span-12 md:col-span-7 overflow-y-auto px-4">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Form Canvas</h2>
                <span className="text-sm text-gray-400">Drag to reorder</span>
              </div>
              <FormBuilderCanvas />
            </div>

            <div className="col-span-12 md:col-span-3 h-full overflow-y-auto">
              <PropertyEditor />
            </div>
          </div>
        )}

        {mode === 'preview' && (
          <div className="max-w-4xl mx-auto animation-fade-in">
            <FormRenderer />
          </div>
        )}

        {mode === 'submissions' && (
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Submissions</h2>
              <button onClick={downloadCSV} className="btn btn-primary">
                <Download size={18} /> Export CSV
              </button>
            </div>

            {submissions.length === 0 ? (
              <div className="text-center py-20 bg-[var(--color-surface)] rounded-xl border border-[var(--color-border)]">
                <p className="text-gray-500">No submissions yet.</p>
              </div>
            ) : (
              <div className="bg-[var(--color-surface)] rounded-lg shadow overflow-hidden border border-[var(--color-border)]">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-[var(--color-bg)] border-b border-[var(--color-border)]">
                      <tr>
                        <th className="p-4 font-semibold">Date</th>
                        <th className="p-4 font-semibold">Name</th>
                        <th className="p-4 font-semibold">Email</th>
                        <th className="p-4 font-semibold">Primary Skill</th>
                        <th className="p-4 font-semibold">Exp (Yrs)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {submissions.map(sub => (
                        <tr key={sub.id} className="border-b border-[var(--color-border)] hover:bg-[var(--color-bg)]">
                          <td className="p-4">{new Date(sub.submittedAt).toLocaleDateString()}</td>
                          <td className="p-4 font-medium">{sub.candidateName}</td>
                          <td className="p-4">{sub.candidateEmail}</td>
                          <td className="p-4">{sub.primarySkills}</td>
                          <td className="p-4">{sub.totalExperience}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

      </main>
    </div>
  );
}

function EyeIcon({ size = 16 }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
}

export default App;
