import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="relative w-full max-w-[400px] h-[300px] mb-8">

        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-[120px] font-black text-primary/10 tracking-tighter">404</h1>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-black mb-4">Oops! Page not found.</h2>
      <p className="text-secondary max-w-md mb-8">
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </p>

      <Link
        href="/"
        className="bg-primary text-white px-8 py-3 rounded-2xl font-semibold hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl active:scale-95"
      >
        Back to Home
      </Link>
    </div>
  );
}
