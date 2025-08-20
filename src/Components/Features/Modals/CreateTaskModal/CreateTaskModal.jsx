'use client';

import Title from '@/Components/UI/Text/Title';
import { useEffect, useRef, useState } from 'react';
import { useTaskModal } from '@/Stores/useTaskModal';
import { X, Plus } from 'lucide-react';

// Firebase
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function CreateTaskModal({ onSubmit }) {
  // Zustand
  const { isOpen, close } = useTaskModal();

  // useRef
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);

  // useState
  const [open, setOpen] = useState(false);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === 'Escape' && close();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, close]);

  // Focus management and lock scroll while open
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => closeBtnRef.current?.focus(), 0);
      const prev = document.documentElement.style.overflow;
      document.documentElement.style.overflow = 'hidden';
      return () => {
        clearTimeout(t);
        document.documentElement.style.overflow = prev || '';
      };
    }
  }, [isOpen]);

  // ------------------FORM LOGIC--------------------------

  // Form States
  const [selectedTags, setSelectedTags] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    project: '',
    priority: '',
    description: '',
  });

  // Submit Button Animation State
  const [status, setStatus] = useState('idle');

  // Form onChange Function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form Handle Submit Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await addDoc(collection(db, 'tasks'), {
        ...formData,
        tags: selectedTags,
        createdAt: serverTimestamp(),
      });

      setStatus('success');
      setTimeout(() => {
        close();
        setFormData({ name: '', project: '', priority: '', description: '' });
        setSelectedTags([]);
      }, 1500);
      setTimeout(() => setStatus('idle'), 1500);
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 1500);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[1px]"
        onClick={close}
        aria-hidden="true"
      />

      {/* Modal root */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:inset-0"
        role="dialog"
        aria-modal="true"
        aria-labelledby="create-task-title"
      >
        <div ref={modalRef} className="relative w-full max-w-md">
          {/* Modal content */}
          <div className="bg-bg-main relative rounded-lg shadow-sm">
            {/* Header */}
            <div className="border-border-strong flex items-center justify-between border-b p-4 md:p-5">
              <Title id="create-task-title" title="Create New Task" />

              {/* Close Modal Button */}
              <button
                ref={closeBtnRef}
                type="button"
                onClick={close}
                className="hover: hover:text-text-primary text-text-secondary ms-auto inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-sm hover:bg-gray-600"
                aria-label="Close modal"
              >
                <X />
              </button>
            </div>

            {/* Body / Form */}
            <form className="p-4 md:p-5" onSubmit={handleSubmit}>
              <div className="mb-4 grid grid-cols-2 gap-4">
                {/* Task Name */}
                <div className="col-span-2">
                  <label
                    htmlFor="name"
                    className="text-text-primary mb-2 block text-sm font-medium"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="text-text-primary block w-full rounded-lg border border-gray-500 bg-gray-600 p-2.5 text-sm placeholder-gray-400"
                    placeholder="Type task name"
                  />
                </div>

                {/* Select a Project */}
                <div className="col-span-2">
                  <label
                    htmlFor="project"
                    className="text-text-primary mb-2 block text-sm font-medium"
                  >
                    Select a Project
                  </label>
                  <select
                    id="project"
                    name="project"
                    value={formData.project}
                    onChange={handleChange}
                    className="text-text-primary block w-full rounded-lg border border-gray-500 bg-gray-600 p-2.5 text-sm placeholder-gray-400"
                  >
                    <option value="" disabled>
                      Select project
                    </option>
                    <option value="fws">FWS</option>
                    <option value="testigo">TestigoMX</option>
                    <option value="learn">Learn Frontend</option>
                  </select>
                </div>

                {/* Select Priority */}
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="priority"
                    className="text-text-primary mb-2 block text-sm font-medium"
                  >
                    Priority
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="text-text-primary block w-full rounded-lg border border-gray-500 bg-gray-600 p-2.5 text-sm placeholder-gray-400"
                  >
                    <option value="" disabled>
                      Select Priority
                    </option>
                    <option value="urgent">Urgent</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                {/* Tags */}
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="tags"
                    className="text-text-primary mb-2 block text-sm font-medium"
                  >
                    Tags
                  </label>

                  <div className="relative">
                    {/* Trigger button */}
                    <button
                      type="button"
                      className="text-text-primary block w-full rounded-lg border border-gray-500 bg-gray-600 p-2.5 text-left text-sm"
                      onClick={() => setOpen((prev) => !prev)}
                    >
                      {selectedTags.length > 0
                        ? selectedTags.join(', ')
                        : 'Select Tags'}
                    </button>

                    {/* Dropdown with checkboxes */}
                    {open && (
                      <div className="absolute z-10 mt-1 w-full rounded-lg border border-gray-500 bg-gray-700 shadow-lg">
                        {['UI', 'UX', 'Feature', 'Bug', 'Enhancement'].map(
                          (tag, i, arr) => (
                            <label
                              key={tag}
                              className={`text-text-primary flex cursor-pointer items-center gap-2 p-2 text-sm hover:bg-gray-600 ${i === 0 ? 'rounded-t-lg' : ''} ${i === arr.length - 1 ? 'rounded-b-lg' : ''}`}
                            >
                              <input
                                type="checkbox"
                                value={tag.toLowerCase()}
                                checked={selectedTags.includes(tag)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedTags([...selectedTags, tag]);
                                  } else {
                                    setSelectedTags(
                                      selectedTags.filter((t) => t !== tag)
                                    );
                                  }
                                }}
                                className="rounded border-gray-500 bg-gray-600"
                              />
                              {tag}
                            </label>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                <div className="col-span-2">
                  <label
                    htmlFor="description"
                    className="text-text-primary mb-2 block text-sm font-medium"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                    className="text-text-primary block w-full rounded-lg border border-gray-500 bg-gray-600 p-2.5 text-sm placeholder-gray-400"
                    placeholder="Write task description here"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className={`text-text-primary inline-flex cursor-pointer items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-colors duration-300 ${
                  status === 'loading'
                    ? 'bg-accent-light cursor-not-allowed'
                    : status === 'success'
                      ? 'bg-green-600'
                      : status === 'error'
                        ? 'bg-red-600'
                        : 'bg-blue-600 hover:bg-blue-800'
                }`}
              >
                {status === 'loading' && (
                  <svg
                    className="text-text-primary h-4 w-4 animate-spin"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                )}

                {status === 'success' && (
                  <svg
                    className="text-text-primary h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}

                {status === 'error' && (
                  <svg
                    className="text-text-primary h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}

                {status === 'idle' && <Plus />}

                {status === 'idle' && 'Add new task'}
                {status === 'loading' && 'Sending...'}
                {status === 'success' && 'Success'}
                {status === 'error' && 'Error'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
