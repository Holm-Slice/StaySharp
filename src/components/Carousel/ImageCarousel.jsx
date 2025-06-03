import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ImageCarousel.css";
import { mockKnives } from "../../data/mockKnives";

const ImageCarousel = () => {
  const navigate = useNavigate();
  const [shuffledKnives, setShuffledKnives] = useState([]);
  const [hoveredKnife, setHoveredKnife] = useState(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        }
      }
    ]
  };

  // Shuffle the knives array when component mounts
  useEffect(() => {
    const shuffled = [...mockKnives].sort(() => Math.random() - 0.5);
    setShuffledKnives(shuffled);
  }, []);

  const handleViewShop = (productId = null) => {
    if (productId) {
      // Navigate to shop with selected product ID and scroll to top
      navigate("/shop", { 
        state: { selectedProductId: productId },
        replace: false 
      });
    } else {
      navigate("/shop");
    }
  };

  return (
    <section className="image-carousel-container py-12" aria-label="Featured products from our knife collection">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-ss_purple mb-8">
          Featured Knife Collection
        </h2>
        <Slider {...settings}>
          {shuffledKnives.map((knife) => (
            <div key={knife.id} className="carousel-slide">
              <div className="flex justify-center px-2 lg:px-4">
                <div className="flex flex-col justify-center items-center px-2 lg:px-4">
                  <main className="bg-white border-2 border-ss_purple w-full max-w-xs sm:max-w-sm lg:max-w-md h-[400px] lg:h-[320px] p-4 lg:p-6 lg:grid lg:grid-cols-2 lg:gap-4 shadow-[4px_4px_0px_#453393] lg:shadow-[6px_6px_0px_#453393] hover:transition-transform lg:hover:scale-[1.08] hover:duration-[2000ms] duration-[3000ms] cursor-pointer gap-4 overflow-hidden">
                    <div
                      className="relative w-full h-48 lg:h-full overflow-hidden flex-shrink-0"
                      onMouseEnter={() => setHoveredKnife(knife)}
                      onMouseLeave={() => setHoveredKnife(null)}
                    >
                      <img
                        src={knife.image}
                        alt={knife.name}
                        title={knife.name}
                        className="object-cover w-full h-full"
                        loading="lazy"
                        decoding="async"
                      />

                      {/* Hover Popup - Only over image */}
                      {hoveredKnife?.id === knife.id && (
                        <div className="absolute bottom-2 right-2 bg-white border-2 border-ss_purple rounded-lg shadow-lg p-3 z-10 min-w-48">
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="font-medium text-gray-700">
                                Style:
                              </span>
                              <span className="text-ss_purple font-semibold">
                                {knife.style}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-medium text-gray-700">
                                Length:
                              </span>
                              <span className="text-ss_purple font-semibold">
                                {knife.length}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="font-medium text-gray-700">
                                Brand:
                              </span>
                              <span className="text-ss_purple font-semibold">
                                {knife.brand}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    <section className="flex flex-col flex-1 justify-between min-h-0">
                      <div>
                        <h1 className="font-title font-bold text-lg md:text-xl text-center">
                          {knife.name}
                        </h1>

                        <h2 className="text-xs md:text-sm lg:text-base text-gray-500 font-light my-1 text-center">
                          {knife.description}
                        </h2>
                      </div>

                      <div className="flex flex-col items-center space-y-1">
                        <p className="font-light text-black text-center text-sm">
                          ${knife.price}
                        </p>
                        {knife.stock > 0 && knife.stock <= 3 && (
                          <p className="text-orange-500 text-xs">
                            Only {knife.stock} left!
                          </p>
                        )}
                        <button
                          onClick={() => handleViewShop(knife.id)}
                          className="uppercase py-1 px-4 w-full max-w-40 transition-colors duration-[1300ms] border-2 text-xs md:text-sm bg-ss_purple text-white border-ss_purple hover:bg-white hover:text-ss_purple"
                        >
                          View in Shop
                        </button>
                      </div>
                    </section>
                  </main>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default ImageCarousel;