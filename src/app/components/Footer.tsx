const Footer = () => {
  return (
    <footer className="bg-purple-900 text-white py-4 mt-10">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Bipan Chhetri. All rights reserved.
        </p>
        <div className="mt-4 flex justify-center space-x-4">
          <a
            href="https://github.com/bipan1"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-300"
          >
            GitHub
          </a>
          <a
            href="https://www.facebook.com/bipan.chhetri.90"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-300"
          >
            Facebook
          </a>
          <a
            href="https://www.linkedin.com/in/bipan-chhetri-08bbb3201/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-300"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
