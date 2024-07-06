export default function Footer() {
  return (
    <footer className="bg-white">
      <div className="flex flex-col sm:flex-row-reverse sm:justify-between space-y-6 sm:space-y-0 text-center sm:text-left text-sm lg:text-base container xl:max-w-7xl mx-auto px-4 py-16 lg:px-8 lg:py-32">
        <nav className="space-x-2 sm:space-x-4">
          <a href="/" className="font-medium text-gray-900 hover:text-gray-500">
            About
          </a>
          <a href="/" className="font-medium text-gray-900 hover:text-gray-500">
            Terms of Service
          </a>
          <a href="/" className="font-medium text-gray-900 hover:text-gray-500">
            Privacy Policy
          </a>
        </nav>
        <div className="text-gray-600">
          <span className="font-medium">Next Blog</span> ©
        </div>
      </div>
    </footer>
  );
}
