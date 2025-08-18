'use client';

import Title from '@/Components/Text/Title';
import { useEffect, useRef, useState } from 'react';
import { X, Plus } from 'lucide-react';
import { useProjectModal } from '@/Stores/useProjectModal';

// Firebase
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function CreateProjectModal({ onSubmit }) {
  // Zustand
  const { isOpen, closeProject } = useProjectModal();

  // useRef
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);

  // Close on ESC
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => e.key === 'Escape' && closeProject();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, closeProject]);

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
  const [formData, setFormData] = useState({
    name: '',
    id: '',
    url: '',
    projectImage: null,
  });

  // Submit Button Animation State
  const [status, setStatus] = useState('idle');

  // Form onChange Function
  const handleChange = (e) => {
    const { name, value, files, type } = e.target;
    if (type === 'file' && files && files[0]) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Form Handle Submit Function
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      let imageUrl = null;

      // Si el usuario subió imagen
      if (formData.projectImage) {
        const imageRef = ref(
          storage,
          `projects/${formData.id || 'no-id'}/${Date.now()}_${formData.projectImage.name}`
        );
        await uploadBytes(imageRef, formData.projectImage);
        imageUrl = await getDownloadURL(imageRef);
      }

      await addDoc(collection(db, 'projects'), {
        name: formData.name,
        id: formData.id,
        url: formData.url,
        imageUrl,
        createdAt: serverTimestamp(),
      });

      setStatus('success');
      setTimeout(() => {
        closeProject();
        setFormData({
          name: '',
          id: '',
          url: '',
          projectImage: null,
        });
      }, 1500);
      setTimeout(() => setStatus('idle'), 1500);
    } catch (error) {
      console.error('Error uploading project:', error);
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
        onClick={closeProject}
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
              <Title id="create-task-title" title="Create New Project" />

              {/* Close Modal Button */}
              <button
                ref={closeBtnRef}
                type="button"
                onClick={closeProject}
                className="ms-auto inline-flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-sm text-gray-400 hover:bg-gray-600 hover:text-white"
                aria-label="Close modal"
              >
                <X />
              </button>
            </div>

            {/* Body / Form */}
            <form className="p-4 md:p-5" onSubmit={handleSubmit}>
              <div className="mb-4 grid grid-cols-2 gap-4">
                {/* Project Name */}
                <div className="col-span-2">
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium text-white"
                  >
                    Project Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-gray-500 bg-gray-600 p-2.5 text-sm text-white placeholder-gray-400"
                    placeholder="Type project name"
                  />
                </div>

                {/* Upload Image */}
                <div className="col-span-2">
                  <label
                    htmlFor="projectImage"
                    className="mb-2 block text-sm font-medium text-white"
                  >
                    Upload Project Image
                  </label>
                  <input
                    id="projectImage"
                    name="projectImage"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className="block w-full cursor-pointer rounded-lg border border-gray-500 bg-gray-600 p-2.5 text-sm text-white placeholder-gray-400 file:mr-4 file:rounded-lg file:border-0 file:bg-gray-500 file:px-4 file:py-2 file:text-sm file:font-medium hover:file:bg-gray-400"
                  />
                </div>

                {/* Project ID */}
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="id"
                    className="mb-2 block text-sm font-medium text-white"
                  >
                    Project ID
                  </label>
                  <input
                    id="id"
                    name="id"
                    type="text"
                    required
                    value={formData.id}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-gray-500 bg-gray-600 p-2.5 text-sm text-white placeholder-gray-400"
                    placeholder="Type project ID"
                  />
                </div>

                {/* Project URL */}
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="url"
                    className="mb-2 block text-sm font-medium text-white"
                  >
                    Project URL
                  </label>
                  <input
                    id="url"
                    name="url"
                    type="text"
                    required
                    value={formData.url}
                    onChange={handleChange}
                    className="block w-full rounded-lg border border-gray-500 bg-gray-600 p-2.5 text-sm text-white placeholder-gray-400"
                    placeholder="Type project URL"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className={`inline-flex cursor-pointer items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-colors duration-300 ${
                  status === 'loading'
                    ? 'cursor-not-allowed bg-blue-400'
                    : status === 'success'
                      ? 'bg-green-600'
                      : status === 'error'
                        ? 'bg-red-600'
                        : 'bg-blue-600 hover:bg-blue-800'
                }`}
              >
                {status === 'loading' && (
                  <svg
                    className="h-4 w-4 animate-spin text-white"
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
                    className="h-4 w-4 text-white"
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
                    className="h-4 w-4 text-white"
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

                {status === 'idle' && 'Add New Project'}
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
