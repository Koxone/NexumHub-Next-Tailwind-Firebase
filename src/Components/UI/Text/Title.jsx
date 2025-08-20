import React from 'react';

function Title({ title, className }) {
  return (
    <p className={`text-lg ${className} text-text-primary font-bold`}>
      {title}
    </p>
  );
}

export default Title;
