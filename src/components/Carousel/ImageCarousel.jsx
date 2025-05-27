
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ImageCarousel.css";

const ImageCarousel = ({ images }) => {
  const [loadedImages, setLoadedImages] = useState(new Set());

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    lazyLoad: 'ondemand',
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
        }
      }
    ]
  };

  const handleImageLoad = (index) => {
    setLoadedImages(prev => new Set(prev).add(index));
  };

  return (
    <section className="image-carousel-container py-12" aria-label="Kitchen knife gallery">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-ss_purple mb-8">
          Premium Kitchen Knives
        </h2>
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index} className="carousel-slide">
              <div className="relative">
                <img
                  src={image}
                  alt={`Professional kitchen knife ${index + 1} - high-quality cutlery for chefs`}
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                  loading="lazy"
                  decoding="async"
                  onLoad={() => handleImageLoad(index)}
                  style={{
                    opacity: loadedImages.has(index) ? 1 : 0,
                    transition: 'opacity 0.3s ease-in-out'
                  }}
                />
                {!loadedImages.has(index) && (
                  <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
                    <span className="text-gray-400">Loading...</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default ImageCarousel;
