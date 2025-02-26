import React, { useState, useEffect } from "react";
import "./ImageCarousel.css";
import Divider from "../Divider/Divider";

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <div className="max-w-full h-auto z-10">
      <Divider />
      {/* <button className="carousel-button prev" onClick={prevSlide}>
        &#10094;
      </button> */}
      <img
        src={images[currentIndex]}
        alt={`Slide ${currentIndex}`}
        className="carousel-image"
      />
      {/* <button className="carousel-button next" onClick={nextSlide}>
        &#10095;
      </button> */}
      <Divider />
    </div>
  );
};

export default ImageCarousel;
