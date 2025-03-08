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
import PrevIcon from "/assets/imgs/SVGs/knife-left.svg";
import NextIcon from "/assets/imgs/SVGs/knife-right.svg";

const serviceCards = [
  {
    title: "Western Style Knife Sharpening",
    description: "Wustof, Zwilling, MadeIn, yooooou name it!",
    price: "Starting at $1 per inch",
    image: "orange.jpg",
  },
  {
    title: "Japanese Style Knife Sharpening",
    description: "Takayuki, Global, Miyabi, and more!",
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
    <div className="relative w-full h-full flex items-center justify-center">
      <section className="flex flex-col items-center justify-center">
        <button
          onClick={handlePrev}
          className="absolute left-40 rounded-full p-2 text-ss_purple fill-ss_purple font-bold"
        >
          <img
            src={PrevIcon}
            alt="Previous"
            className="w-16 h-auto rotate-45 hover:transition-transform hover:-rotate-45 hover:duration-300 hover:ease-in-out fill-ss_purple ml-4"
          />
          <p>Dice</p>
        </button>
      </section>
      <div className="w-full max-w-4xl flex overflow-hidden relative">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {serviceCards.map((card, index) => (
            <div key={index} className="w-full flex-shrink-0">
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
      <section className="flex flex-col items-center justify-center">
        <button
          onClick={handleNext}
          className="absolute right-40 rounded-full p-2 text-ss_purple fill-ss_purple font-bold"
        >
          <img
            src={NextIcon}
            alt="Next"
            className="w-16 h-auto -rotate-45 hover:transition-transform hover:rotate-45 hover:duration-300 hover:ease-in-out fill-ss_purple mr-6"
          />
          <p>Slice</p>
        </button>
      </section>
    </div>
  );
}

export default ActiveSlider;
