const PageHeader = ({
  title,
  description,
  children,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
}) => (
  <header className="pt-12 pb-8 sm:pt-16">
    <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
      {title}
    </h1>
    {description && (
      <p className="mt-3 max-w-2xl text-lg text-zinc-600">{description}</p>
    )}
    {children}
  </header>
);

export default PageHeader;
