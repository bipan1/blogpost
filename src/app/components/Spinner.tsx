const Spinner = () => (
  <div role="status" className="flex min-h-[40vh] items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-200 border-t-violet-600" />
    <span className="sr-only">Loading...</span>
  </div>
);

export default Spinner;
