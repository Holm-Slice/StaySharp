import React, { useState } from "react";
import ServiceCardTailwind from "./components/ServiceCardTailwind/ServiceCardTailwind";
import Divider from "./components/Divider/Divider";
const KnifeLeftIcon = "/assets/imgs/SVGs/knife-left.svg";
const KnifeRightIcon = "/assets/imgs/SVGs/knife-right.svg";

const serviceCards = [
  {
    title: "Western Style Knife Sharpening",
    description: "Wustof, Zwilling, Shun, yooooou name it!",
    price: "Starting at $1 per inch",
    image: "orange.jpg",
  },
  {
    title: "Japanese Style Knife Sharpening",
    description: "Shun, Global, Miyabi, and more!",
    price: "Starting at $2 per inch",
    image: "japanese-knife.jpg",
  },

  {
    title: "Single Bevel Knives",
    description: "Yanagiba, Deba, Usuba, Etc",
    price: "Starting at $3",
    image: "serrated-knife.jpg",
  },

  {
    title: "Chip Repair",
    description: "Repair of any chips in the edge",
    price: "Starting at $5",
    image: "serrated-knife.jpg",
  },
  {
    title: "Tip Repair",
    description: "Repair that tip you accidentally broke",
    price: "Starting at $7",
    image: "serrated-knife.jpg",
  },

  {
    title: "Bevel Repair",
    description: "Bread Knives, Serrated Knives, and more!",
    price: "Starting at $10",
    image: "serrated-knife.jpg",
  },
  {
    title: "Thinning",
    description: "Maintenance to keep that edge workin'",
    price: "Starting at $15",
    image: "serrated-knife.jpg",
  },
  {
    title: "Shears",
    description: "Kitchen, Hair or Pruning",
    price: "Starting at $20",
    image: "serrated-knife.jpg",
  },
  {
    title: "Mandolins",
    description: "Cut your finger off easily again",
    price: "Starting at $7",
    image: "serrated-knife.jpg",
  },
  {
    title: "Rehandling",
    description: "Replace that handle you broke",
    price: "Starting at $15",
    image: "serrated-knife.jpg",
  },
  {
    title: "Total Restoration",
    description: "Get that beaster piece RTG",
    price: "Starting at $50",
    image: "serrated-knife.jpg",
  },
  // Add more service cards as needed
];

function ActiveSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? serviceCards.length - 1 : prevIndex - 1,
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === serviceCards.length - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-8 md:p-8 overflow-hidden">
      {/* Previous Button */}
      <button
        onClick={handlePrev}
        className="absolute lg:ml-40 left-2 sm:left-6 md:left-10 top-1/2 transform -translate-y-1/2 rounded-full p-2 text-ss_purple font-bold focus:outline-none z-50"
      >
        <img
          src={KnifeLeftIcon}
          alt="Previous"
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 transform rotate-45 transition-transform duration-500 ease-in-out hover:-rotate-45"
        />
        <p className="hidden md:block text-center mt-2">Dice</p>
      </button>

      {/* Slider Content */}
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-6xl overflow-hidden relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {serviceCards.map((card, index) => (
            <div
              key={index}
              className="w-full flex-shrink-0 flex justify-center"
            >
              <div className="w-full max-w-2xl">
                <ServiceCardTailwind
                  title={card.title}
                  description={card.description}
                  price={card.price}
                  image={card.image}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="absolute lg:mr-40 right-2 sm:right-6 md:right-10 top-1/2 transform -translate-y-1/2 rounded-full p-2 text-ss_purple font-bold focus:outline-none z-50"
        aria-label="Next service card"
        type="button"
      >
        <img
          src={KnifeRightIcon}
          alt=""
          role="presentation"
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 transform -rotate-45 transition-transform duration-500 ease-in-out hover:rotate-45"
        />
        <p className="hidden md:block text-center mt-2" aria-hidden="true">Mince</p>
      </button>

      {/* Service Cards */}
      <div 
        className="flex items-center justify-center w-full max-w-4xl mx-auto"
        role="region"
        aria-label={`Service ${currentIndex + 1} of ${serviceCards.length}`}
        aria-live="polite"
      >
        {serviceCards[currentIndex]}
      </div>
    </div>   
  );
}



export default ActiveSlider;