
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ImageCarousel.css";

// Import the same mock data from ShopDashboard
const mockKnives = [
  {
    id: 1,
    name: "Wusthof Classic Chef's Knife",
    brand: "Wusthof",
    style: "German",
    length: "8 inch",
    price: 149.99,
    image: "/assets/Images/chef-knife1.jpg",
    description: "Professional German chef's knife with full tang construction",
    stock: 3,
  },
  {
    id: 2,
    name: "Shun Premier Santoku",
    brand: "Shun",
    style: "Japanese",
    length: "7 inch",
    price: 189.99,
    image: "/assets/Images/chef-knife2.jpg",
    description: "Hand-forged Japanese santoku with Damascus steel",
    stock: 2,
  },
  {
    id: 3,
    name: "Miyabi Kaizen Gyuto",
    brand: "Miyabi",
    style: "Japanese",
    length: "9.5 inch",
    price: 299.99,
    image: "/assets/Images/chef-knife3.jpg",
    description: "Premium Japanese gyuto with VG10 steel core",
    stock: 1,
  },
  {
    id: 4,
    name: "Henckels Pro Paring Knife",
    brand: "Henckels",
    style: "German",
    length: "3.5 inch",
    price: 39.99,
    image: "/assets/Images/chef-knife1.jpg",
    description: "Precision paring knife for detailed work",
    stock: 8,
  },
  {
    id: 5,
    name: "Global G-2 Chef's Knife",
    brand: "Global",
    style: "Japanese",
    length: "8 inch",
    price: 119.99,
    image: "/assets/Images/chef-knife2.jpg",
    description: "Lightweight stainless steel Japanese chef's knife",
    stock: 5,
  },
  {
    id: 6,
    name: "Zwilling Twin Signature Bread Knife",
    brand: "Zwilling",
    style: "German",
    length: "10 inch",
    price: 89.99,
    image: "/assets/Images/chef-knife3.jpg",
    description: "Serrated bread knife with ice-hardened blade",
    stock: 4,
  },
];

const ImageCarousel = () => {
  const navigate = useNavigate();
  const [shuffledKnives, setShuffledKnives] = useState([]);
  const [hoveredKnife, setHoveredKnife] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
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

  const handleViewShop = () => {
    navigate("/shop");
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
              <div className="flex justify-center px-4">
                <div className="flex flex-col justify-center items-center">
                  <main className="bg-white border-2 border-ss_purple w-full max-w-lg md:max-w-2xl h-[500px] md:h-[400px] p-6 md:p-10 md:grid md:grid-cols-2 md:gap-8 shadow-[8px_8px_0px_#453393] hover:transition-transform hover:scale-[1.08] hover:duration-[2000ms] duration-[3000ms] cursor-pointer gap-6 overflow-hidden">
                    <div
                      className="relative w-full h-48 md:h-full overflow-hidden"
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

                    <section className="flex flex-col h-full justify-between">
                      <div>
                        <h1 className="font-title font-bold text-xl md:text-2xl text-center">
                          {knife.name}
                        </h1>

                        <h2 className="text-lg md:text-xl text-gray-500 font-light my-2 md:my-3 text-center">
                          {knife.description}
                        </h2>
                      </div>

                      <div className="flex flex-col items-center space-y-2">
                        <p className="font-light text-black text-center text-sm md:text-base">
                          ${knife.price}
                        </p>
                        {knife.stock > 0 && knife.stock <= 3 && (
                          <p className="text-orange-500 text-sm">
                            Only {knife.stock} left in stock!
                          </p>
                        )}
                        <button
                          onClick={handleViewShop}
                          className="uppercase py-1 px-6 w-full max-w-48 transition-colors duration-[1300ms] border-4 text-sm md:text-base bg-ss_purple text-white border-ss_purple hover:bg-white hover:text-ss_purple"
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
        
        <div className="text-center mt-8">
          <button
            onClick={handleViewShop}
            className="bg-ss_purple text-white px-8 py-3 text-lg font-semibold hover:bg-ss_pale_purple transition-colors duration-300 border-2 border-ss_purple hover:bg-white hover:text-ss_purple"
          >
            Browse Full Collection
          </button>
        </div>
      </div>
    </section>
  );
};

export default ImageCarousel;
