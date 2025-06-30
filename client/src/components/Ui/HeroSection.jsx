export const HeroSection = () => {
  return (
    <section className="bg-white border-b border-red-200 mb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid gap-8 lg:gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <span className="inline-block px-3 py-1 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-full mb-4">
              Welcome
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Elevate Your Digital Reading Experience
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              With our robust platform, discover engaging, quick, and
              contemporary ways to read articles. Our experience, which combines
              slick design with lightning-fast performance to deliver the
              stories that matter, is made for inquisitive minds and avid
              readers. Explore carefully chosen material on a range of subjects,
              read without interruptions, and keep up with the most recent
              findings — all within a simple, sophisticated interface designed
              for readers just like you.
            </p>
          </div>

          <div className="order-1 lg:order-2">
            <img
              src="/e-reader-image.jpg"
              alt="Digital Reading Illustration"
              className="w-full h-80 md:h-96 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
