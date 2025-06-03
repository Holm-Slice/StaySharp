import { useState, useRef } from "react";
import Divider from "../Divider/Divider";

function About() {
  const [isExpanded, setIsExpanded] = useState(false);
  const contentRef = useRef(null);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <>
      <div
        id="about"
        className="flex flex-col mt-12 md:flex-row mb-8 ml-8 md:ml-0"
      >
        {/* Image Section */}
        <div className="w-full md:w-1/2 h-auto flex items-center justify-center mb-8 md:mb-0">
          <img
            className="about-img object-cover w-4/5 sm:w-3/4 md:w-2/3 lg:w-1/2"
            src="assets/Images/chris at pop up.jpeg"
            alt="Chris at Stay Sharp knife sharpening pop-up event"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center px-4 sm:px-8 md:pr-34 h-auto md:h-full">
          <div className="top-bio-banner w-full mb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-ss_purple text-center mb-4">
              About Stay Sharp
            </h2>

            <div
              className={`transition-all duration-500 ease-in-out overflow-hidden ${
                isExpanded ? "max-h-none" : "max-h-40"
              }`}
            >
              <section className="mb-4">
                <p className="text-ss_purple text-lg text-center leading-relaxed">
                  Welcome to Stay Sharp, where passion meets precision in the world of professional knife sharpening and premium cutlery sales.
                </p>
              </section>

              {isExpanded && (
                <section>
                  <p className="text-ss_purple text-lg text-center leading-relaxed">
                    Along the way I fell in love with a subgenre of chef culture,
                    that being the cult of really high end and beautiful kitchen
                    knives. Hours of research and hours spent talking to other
                    knife shop owners has led me to this place today. The still
                    poor owner of a tiny, online sharpening and kitchen knife (and
                    other cooking and dining things) shop. Welcome!
                  </p>
                </section>
              )}
            </div>

            {/* Learn More / Learn Less Button */}
            <section className="flex items-center justify-center my-2 md:my-4">
              <button
                onClick={handleToggle}
                className="bg-ss_purple text-white uppercase py-1 px-2 md:pt-2 md:pb-1 md:px-4 flex-grow hover:bg-white hover:text-ss_purple transition-colors duration-[1300ms] md:flex-none border-4 border-ss_purple"
                aria-expanded={isExpanded}
                aria-label={isExpanded ? "Show less information" : "Show more information"}
              >
                {isExpanded ? "Learn Less" : "Learn More"}
              </button>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;