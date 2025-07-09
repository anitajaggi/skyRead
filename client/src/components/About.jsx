export const About = () => {
  return (
    <section className="bg-white text-indigo-900 py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-indigo-700 mb-4">
            About SkyRead
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Fueling curiosity and sparking meaningful conversations — one
            article at a time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-base text-gray-700 leading-relaxed">
          <div className="space-y-6">
            <p>
              SkyRead is a digital platform built for modern minds. Whether
              you’re here for inspiration, information, or innovation — we’ve
              got content that matters.
            </p>
            <p>
              Our mission is to create a thoughtful space where ideas are shared
              freely, and quality always comes first. From tech to culture, we
              blend passion with purpose in every piece we publish.
            </p>
            <p>
              With a team of passionate creators and contributors, we’re
              redefining what it means to stay informed — without the clutter.
            </p>
          </div>

          <div className="space-y-6">
            <p>
              We believe in storytelling that resonates. That’s why every
              article, guide, or commentary you find on SkyRead is carefully
              curated to offer clarity and value.
            </p>
            <p>
              Our journey is just getting started. As we grow, we remain
              committed to keeping our platform honest, engaging, and
              community-driven.
            </p>
            <p className="text-indigo-600 font-medium">
              Thank you for being a part of the SkyRead community. Together,
              we're making knowledge beautiful.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <span className="inline-block text-sm text-gray-500">
            &mdash; The SkyRead Team
          </span>
        </div>
      </div>
    </section>
  );
};
