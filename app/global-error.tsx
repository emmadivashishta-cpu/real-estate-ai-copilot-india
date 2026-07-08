'use client';

import React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error(error);
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center justify-center p-4 text-center">
        <h2 className="text-2xl font-bold">Something went wrong</h2>
        <p className="text-slate-600 mt-2">An unexpected error occurred.</p>
        <button
          onClick={() => reset()}
          className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-colors cursor-pointer"
        >
          Try again
        </button>
      </body>
    </html>
  );
}
