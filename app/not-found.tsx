import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 text-slate-900 px-4 text-center">
      <h2 className="text-2xl font-bold">Page Not Found</h2>
      <p className="text-slate-600 mt-2">Could not find requested resource</p>
      <Link href="/" className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 text-sm font-medium transition-colors cursor-pointer">
        Return Home
      </Link>
    </div>
  );
}
