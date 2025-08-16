import React from 'react';

function Greeting() {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long', // Friday
    day: 'numeric', // 15
    month: 'long', // August
    year: 'numeric', // 2025
  });

  return (
    <div>
      <h1 className="text-h1 font-bold">Hello, Carlos</h1>
      <p className="text-xs text-neutral-500">Today is {formattedDate}</p>
    </div>
  );
}

export default Greeting;
