export default function NotFound() {
  // Keep this as a simple server component. If you want localized text,
  // either hardcode minimal strings or render a small client child that reads the context.
  return (
    <div className="mx-auto max-w-3xl py-16 px-6">
      <h1 className="text-3xl font-bold mb-2">Page not found</h1>
      <p className="opacity-80">Sorry, we couldn’t find the page you’re looking for.</p>
    </div>
  );
}
