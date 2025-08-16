import React from 'react';

function Title({ title }) {
  return (
    <h3 className="text-lg font-bold text-white md:text-sm md:font-medium lg:text-lg">
      {title}
    </h3>
  );
}

export default Title;
