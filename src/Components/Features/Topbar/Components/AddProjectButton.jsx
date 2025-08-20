import React from 'react';

function AddProjectButton() {
  return (
    <button
      aria-label="Create a New Project Button"
      className="text-text-primary w-fit cursor-pointer rounded-lg border bg-neutral-700 px-3 py-2 transition-all duration-200 ease-in-out hover:bg-neutral-600"
    >
      Add New Project
    </button>
  );
}

export default AddProjectButton;
