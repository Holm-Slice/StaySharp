import React from "react";
import Slider from "react-slick";
import ServiceCardTailwind from "./ServiceCardTailwind/ServiceCardTailwind";

import { useState, useRef, useEffect } from "react";

const ServiceCardSlider = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);
  const cardWidth = 300; // Adjust as needed
  const gapWidth = 16; // Gap between cards in pixels (adjust as needed)

  const totalCardWidth = cardWidth + gapWidth;

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(prevIndex + 1, (children?.length || 0) - 1)
    );
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = currentIndex * totalCardWidth;
    }
  }, [currentIndex, totalCardWidth]);

  // If no children are provided, return null or a placeholder
  if (!children || children.length === 0) {
    return (
      <div className="relative w-full overflow-hidden p-8 text-center">
        <p className="text-gray-500">No services available</p>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-hidden">
      <div
        ref={containerRef}
        className="flex snap-x snap-mandatory overflow-x-auto scroll-smooth"
      >
        {children.map((child, index) => (
          <div
            key={index}
            className="snap-start shrink-0"
            style={{ width: cardWidth, marginRight: gapWidth }}
          >
            {child}
          </div>
        ))}
      </div>
      <button
        onClick={handlePrev}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2 "
      >
        Prev
      </button>
      <button
        onClick={handleNext}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 rounded-full p-2"
      >
        Next
      </button>
    </div>
  );
};

// const Card = ({ children }) => {
//   return <div className="border rounded shadow-md p-4">{children}</div>;
// };

// const App = () => {
//   return (
//     <div className="p-4">
//       <CardCarousel>
//         <Card>Card 1 Content</Card>
//         <Card>Card 2 Content</Card>
//         <Card>Card 3 Content</Card>
//         <Card>Card 4 Content</Card>
//         <Card>Card 5 Content</Card>
//       </CardCarousel>
//     </div>
//   );
// };

export default ServiceCardSlider;