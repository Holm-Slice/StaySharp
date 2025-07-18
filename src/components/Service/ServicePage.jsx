import React from "react";
import ActiveSlider from "../../ActiveSlider";

function ServicePage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-ss_purple mb-4 uppercase">
            Our Services
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
            Professional knife sharpening and restoration services to keep your
            blades in perfect condition.
          </p>
        </div>

        {/* Services Section */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl text-center text-ss_purple mb-8 uppercase">
            Fixin&apos;s
          </h2>
          <ActiveSlider />
        </section>

        {/* Call to Action */}
        <div className="text-center bg-ss_purple text-white py-12 px-6 rounded-lg">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Get Your Knives Sharp?
          </h3>
          <p className="text-lg mb-6">
            Book a service today and experience the difference of professionally
            sharpened blades.
          </p>
          <a
            href="/#contact"
            className="inline-block bg-white text-ss_purple px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}

export default ServicePage;
