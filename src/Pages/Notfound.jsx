import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="container-x grid min-h-[60vh] place-items-center py-24 text-center">
      <div>
        <p className="font-display text-8xl italic text-brand-600 sm:text-9xl">404</p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink">This page wandered off</h1>
        <p className="mx-auto mt-3 max-w-sm text-neutral-600">The page you’re looking for doesn’t exist or has moved.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/" className="btn-primary">
            Back to home
          </Link>
          <Link to="/contact" className="btn-secondary">
            Contact us
          </Link>
        </div>
      </div>
    </main>
  );
}
