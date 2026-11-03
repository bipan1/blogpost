type Props = {
  children: React.ReactNode;
  className?: string;
};

/** Page-width wrapper shared by the header, footer and every page. */
const Container = ({ children, className = '' }: Props) => (
  <div className={`mx-auto w-full max-w-5xl px-5 sm:px-6 ${className}`}>
    {children}
  </div>
);

export default Container;
