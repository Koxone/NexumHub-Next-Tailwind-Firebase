'use client';

import React, { useState } from 'react';
import { SignInButton } from '@clerk/nextjs';

export default function SecretPage() {
  const [input, setInput] = useState('');
  const [authorized, setAuthorized] = useState(false);
  const PASSWORD = 'Skyrim88*%';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input === PASSWORD) setAuthorized(true);
    else alert('Incorrect password');
  };

  if (!authorized) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-900">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-lg bg-gray-800 p-6 shadow-lg"
        >
          <input
            type="password"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter password"
            className="rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-white focus:ring focus:ring-blue-500 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
          >
            Unlock
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-900">
      <div className="rounded-lg bg-gray-800 p-8 text-center shadow-lg">
        <h1 className="mb-4 text-xl font-bold text-white">Access Granted</h1>
        <SignInButton mode="modal">
          <button className="rounded-md bg-green-600 px-4 py-2 font-semibold text-white hover:bg-green-700">
            Sign In with Clerk
          </button>
        </SignInButton>
      </div>
    </div>
  );
}
