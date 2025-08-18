import React from 'react';

function MenuButton({
  icon: Icon,
  text,
  aria,
  onClick,
  notification,
  disabled = false,
  downloadResume = false, // new prop
}) {
  // comments in English
  const handleClick = (e) => {
    if (disabled) return;

    // If downloadResume is true, trigger download from /public
    if (downloadResume) {
      const link = document.createElement('a');
      link.href = '/resume.docx'; // /public/resume.docx
      link.download = 'resume.docx'; // suggested filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    // Preserve original onClick behavior if provided
    if (typeof onClick === 'function') {
      onClick(e);
    }
  };

  return (
    <li className="h-fit list-none">
      <button
        onClick={handleClick}
        aria-label={aria}
        disabled={disabled}
        title={disabled ? 'Coming Soon' : ''}
        className={`group flex items-center rounded-lg p-2 ${
          disabled
            ? 'cursor-not-allowed text-gray-400 opacity-50 dark:text-gray-500'
            : 'cursor-pointer text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
        }`}
      >
        <Icon className="h-5 w-5" />
        <span className="ms-3 flex-1 whitespace-nowrap">{text}</span>
        {notification && !disabled && (
          <span className="ms-3 inline-flex h-3 w-3 items-center justify-center rounded-full bg-blue-100 p-3 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-300">
            3
          </span>
        )}
      </button>
    </li>
  );
}

export default MenuButton;
