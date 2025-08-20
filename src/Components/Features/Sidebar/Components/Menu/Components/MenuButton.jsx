import React from 'react';

function MenuButton({
  icon: Icon,
  text,
  aria,
  onClick,
  notification,
  disabled = false,
  contact,
  textColor = '',
  downloadResume = false,
}) {
  // click handler
  const handleClick = (e) => {
    if (disabled) return;

    // contact email
    if (contact) {
      const subject = encodeURIComponent('Contacto desde el portafolio');
      const body = encodeURIComponent(
        'Hola Kox, me gustaría ponerme en contacto contigo.'
      );
      window.location.href = `mailto:admin@koxland.net?subject=${subject}&body=${body}`;
      return;
    }

    // resume download
    if (downloadResume) {
      const link = document.createElement('a');
      link.href = '/resume.docx';
      link.download = 'resume.docx';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }

    if (typeof onClick === 'function') {
      onClick(e);
    }
  };

  return (
    <li
      onClick={handleClick}
      className="h-fit w-full cursor-pointer list-none rounded-lg hover:bg-gray-700"
    >
      <button
        aria-label={aria}
        disabled={disabled}
        title={disabled ? 'Coming Soon' : ''}
        className={`group flex items-center rounded-lg p-2 ${
          disabled
            ? 'cursor-not-allowed text-gray-400 opacity-50 dark:text-gray-500'
            : 'dark:text-text-primary cursor-pointer text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700'
        }`}
      >
        <Icon className="h-5 w-5" />
        <span className={`ms-3 ${textColor} flex-1 whitespace-nowrap`}>
          {text}
        </span>
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
