'use client';

import Title from '@/Components/Text/Title';
import { useEffect, useRef, useState } from 'react';
import { useTaskModal } from '@/Stores/useTaskModal';
import { X, Plus } from 'lucide-react';

export default function CreateTaskModal({ onSubmit }) {
  // Zustand
  const { isOpen, close } = useTaskModal();

  // useRef
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);

  // useState
  const [open, setOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);

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

  // Submit handler to collect form data
  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    onSubmit?.(data);
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
            <div className="flex items-center justify-between border-b border-gray-600 p-4 md:p-5">
              <Title id="create-task-title" title="Create New Task" />

              {/* Close Modal Button */}
              <button
                ref={closeBtnRef}
                type="button"
                onClick={close}
                className="hover: ms-auto inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-sm text-gray-400 hover:bg-gray-600 hover:text-white"
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
                    className="mb-2 block text-sm font-medium text-white"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="block w-full rounded-lg border border-gray-500 bg-gray-600 p-2.5 text-sm text-white placeholder-gray-400"
                    placeholder="Type task name"
                  />
                </div>

                {/* Select a Project */}
                <div className="col-span-2">
                  <label
                    htmlFor="project"
                    className="mb-2 block text-sm font-medium text-white"
                  >
                    Select a Project
                  </label>
                  <select
                    id="project"
                    name="project"
                    defaultValue=""
                    className="block w-full rounded-lg border border-gray-500 bg-gray-600 p-2.5 text-sm text-white placeholder-gray-400"
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
                    className="mb-2 block text-sm font-medium text-white"
                  >
                    Priority
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    defaultValue=""
                    className="block w-full rounded-lg border border-gray-500 bg-gray-600 p-2.5 text-sm text-white placeholder-gray-400"
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
                    className="mb-2 block text-sm font-medium text-white"
                  >
                    Tags
                  </label>

                  <div className="relative">
                    {/* Trigger button */}
                    <button
                      type="button"
                      className="block w-full rounded-lg border border-gray-500 bg-gray-600 p-2.5 text-left text-sm text-white"
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
                              className={`flex cursor-pointer items-center gap-2 p-2 text-sm text-white hover:bg-gray-600 ${i === 0 ? 'rounded-t-lg' : ''} ${i === arr.length - 1 ? 'rounded-b-lg' : ''}`}
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
                    className="mb-2 block text-sm font-medium text-white"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    className="block w-full rounded-lg border border-gray-500 bg-gray-600 p-2.5 text-sm text-white placeholder-gray-400"
                    placeholder="Write task description here"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800"
              >
                <Plus />
                Add new task
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
