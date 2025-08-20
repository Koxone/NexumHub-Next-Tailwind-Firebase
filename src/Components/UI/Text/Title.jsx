import React from 'react';

function Title({ title, className }) {
  return <p className={`text-lg ${className} font-bold text-white`}>{title}</p>;
}

export default Title;
