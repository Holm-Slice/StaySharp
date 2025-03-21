// import React, { useState } from "react";
// import ServiceCardTailwind from "./components/ServiceCardTailwind/ServiceCardTailwind";

// const serviceCards = [
//   {
//     title: "Western Style Knife Sharpening",
//     description: "Wustof, Zwilling, Shun, yooooou name it!",
//     price: "Starting at $1 per inch",
//     image: "orange.jpg",
//   },
//   {
//     title: "Japanese Style Knife Sharpening",
//     description: "Shun, Global, Miyabi, and more!",
//     price: "Starting at $2 per inch",
//     image: "japanese-knife.jpg",
//   },
//   {
//     title: "Serrated Knife Sharpening",
//     description: "Bread knives, steak knives, and more!",
//     price: "Starting at $1.50 per inch",
//     image: "serrated-knife.jpg",
//   },
//   // Add more service cards as needed
// ];

// function ActiveSlider() {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handlePrev = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? serviceCards.length - 1 : prevIndex - 1
//     );
//   };

//   const handleNext = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === serviceCards.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   return (
//     <div className="relative w-full h-full flex items-center justify-center">
//       <button
//         onClick={handlePrev}
//         className="absolute left-0 bg-white rounded-full pl-5 ml-10 p-2 text-ss_purple font-bold"
//       >
//         Prev
//       </button>
//       <div className="w-full max-w-4xl flex overflow-hidden">
//         {serviceCards.map((card, index) => (
//           <div
//             key={index}
//             className={`transition-transform duration-500 ease-in-out transform ${
//               index === currentIndex ? "translate-x-0" : "translate-x-full"
//             }`}
//             style={{ minWidth: "100%" }}
//           >
//             <ServiceCardTailwind
//               title={card.title}
//               description={card.description}
//               price={card.price}
//               image={card.image}
//             />
//           </div>
//         ))}
//       </div>
//       <button
//         onClick={handleNext}
//         className="absolute right-0 bg-white rounded-full pr-5 mr-10 p-2 text-ss_purple font-bold"
//       >
//         Next
//       </button>
//     </div>
//   );
// }

// export default ActiveSlider;

import React, { useState } from "react";
import ServiceCardTailwind from "./components/ServiceCardTailwind/ServiceCardTailwind";
import KnifeLeftIcon from "../public/assets/imgs/SVGs/knife-left.svg";
import KnifeRightIcon from "../public/assets/imgs/SVGs/knife-right.svg";

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
    title: "Serrated Knife Sharpening",
    description: "Bread knives, steak knives, and more!",
    price: "Starting at $1.50 per inch",
    image: "serrated-knife.jpg",
  },
  // Add more service cards as needed
];

function ActiveSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? serviceCards.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === serviceCards.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-8 md:p-8">
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
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-4xl flex md:overflow-hidden sm:overflow-auto relative justify-center">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {serviceCards.map((card, index) => (
            <div key={index} className="w-full flex-shrink-0 ">
              <ServiceCardTailwind
                title={card.title}
                description={card.description}
                price={card.price}
                image={card.image}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        className="absolute lg:mr-40 right-2 sm:right-6 md:right-10 top-1/2 transform -translate-y-1/2 rounded-full p-2 text-ss_purple font-bold"
      >
        <img
          src={KnifeRightIcon}
          alt="Next"
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 transform -rotate-45 transition-transform duration-500 ease-in-out hover:rotate-45"
        />
        <p className="hidden md:block text-center mt-2">Slice</p>
      </button>
    </div>
  );
}

export default ActiveSlider;
