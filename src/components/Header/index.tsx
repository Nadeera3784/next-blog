export default function Header() {
  return (
    <div className="bg-gray-300">
      <div className="space-y-16 container xl:max-w-7xl mx-auto px-4 py-16 lg:px-8 lg:py-32">
        <div className="text-center">
          <div className="text-sm uppercase font-bold tracking-wider mb-1 text-indigo-700">
            Documentation
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Getting Started with Tailkit
          </h2>
          <h3 className="text-lg md:text-xl md:leading-relaxed font-medium text-gray-600 lg:w-2/3 mx-auto">
            Get to know how it can help you build the User Interface of your
            website and web application with the minimal effort.
          </h3>
        </div>
      </div>
    </div>
  );
}
