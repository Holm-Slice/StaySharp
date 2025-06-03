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
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    centerMode: true,
    centerPadding: '0px'
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
                <div className="flex flex-col justify-center items-center p-4 m-2 md:p-8 md:m-8">
                  <main className="bg-white border-2 border-ss_purple w-full max-w-sm sm:max-w-lg md:max-w-2xl min-h-[450px] sm:min-h-[500px] md:h-[400px] p-4 sm:p-6 md:p-10 flex flex-col md:grid md:grid-cols-2 md:gap-8 shadow-[8px_8px_0px_#453393] hover:transition-transform md:hover:scale-[1.08] hover:duration-[2000ms] duration-[3000ms] cursor-pointer gap-4 sm:gap-6 overflow-hidden">
                    <div
                      className="relative w-full h-40 sm:h-48 md:h-full overflow-hidden flex-shrink-0"
                      onMouseEnter={() => setHoveredKnife(knife)}
                      onMouseLeave={() => setHoveredKnife(null)}
                    >
                      <img
                        src={knife.image}
                        alt={`Professional knife sharpening service Austin Texas - Premium kitchen knife ${knife.id}`}
                        title={knife.name}
                        className="object-cover w-full h-full"
                        loading="lazy"
                        decoding="async"
                        width="800"
                        height="600"
                      />

                      {/* Hover Popup - Only over image, hidden on mobile */}
                      {hoveredKnife?.id === knife.id && (
                        <div className="hidden md:block absolute bottom-2 right-2 bg-white border-2 border-ss_purple rounded-lg shadow-lg p-3 z-10 min-w-48">
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
                      <div className="flex-1">
                        <h1 className="font-title font-bold text-lg sm:text-xl md:text-2xl text-center mb-2 sm:mb-0">
                          {knife.name}
                        </h1>

                        <h2 className="text-base sm:text-lg md:text-xl text-gray-500 font-light my-2 md:my-3 text-center line-clamp-2 md:line-clamp-none">
                          {knife.description}
                        </h2>

                        {/* Mobile-only details */}
                        <div className="md:hidden mt-3 text-center">
                          <div className="flex justify-center space-x-4 text-xs text-gray-600">
                            <span>{knife.style}</span>
                            <span>•</span>
                            <span>{knife.length}</span>
                            <span>•</span>
                            <span>{knife.brand}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-center space-y-3 mt-4">
                        <p className="font-light text-black text-center text-base sm:text-lg font-semibold">
                          ${knife.price}
                        </p>
                        {knife.stock > 0 && knife.stock <= 3 && (
                          <p className="text-orange-500 text-sm font-medium">
                            Only {knife.stock} left!
                          </p>
                        )}
                        <button
                          onClick={() => handleViewShop(knife.id)}
                          className="uppercase py-2 sm:py-3 px-4 sm:px-6 w-full max-w-xs sm:max-w-48 transition-colors duration-[1300ms] border-4 text-xs sm:text-sm font-medium bg-ss_purple text-white border-ss_purple hover:bg-white hover:text-ss_purple"
                        >
                          View in Shop
                        </button>
                      </div>
                    </section>
                    {/* SEO optimized text - hidden */}
                    <div style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
                      Austin Texas premium kitchen knives chef knife collection professional cutlery 
                      Japanese knives German knives knife sales Austin kitchen knife store professional 
                      knife sharpening Austin Texas culinary knife experts premium blade collection
                    </div>
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