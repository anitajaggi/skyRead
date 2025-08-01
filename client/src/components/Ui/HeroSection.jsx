export const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-b from-white via-gray-50 to-white py-10 md:py-20 border-b border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 sm:gap-10 md:gap-20 items-center">
          <div className="lg:col-span-7 relative z-10">
            <div className="mb-4">
              <span className="text-xs uppercase tracking-widest text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full">
                Hey there, reader!
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-serif font-bold text-gray-900 tracking-tight leading-tight mb-6">
              Make Your{" "}
              <span className="text-indigo-600">Digital Reading</span>{" "}
              better and easier
            </h1>

            <p className="sm:text-xl text-gray-700 leading-relaxed max-w-2xl mb-8">
              Welcome to a smarter way to read -- fast, focused, and free of clutter. Enjoy handpicked content, a clean look, and lightning speed. Perfect for curious minds who want more from every scroll.
            </p>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl ring-1 ring-gray-200">
              <img
                src="/image.jpg"
                alt="Digital Reading Illustration"
                className="w-full h-96 object-cover transition-transform duration-700 ease-in-out hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
      <div className="absolute -bottom-20 -right-20 w-72 h-72 bg-pink-100 rounded-full mix-blend-multiply filter blur-2xl opacity-20" />
    </section>
  );
};
