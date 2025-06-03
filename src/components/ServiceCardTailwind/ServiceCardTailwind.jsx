
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ServiceCardTailwind({ title, description, price, image }) {
  const navigate = useNavigate();
  const [hoveredService, setHoveredService] = useState(null);

  const handleBookNow = () => {
    navigate("/booking", {
      state: {
        service: {
          title,
          description,
          price,
          image,
        },
      },
    });
  };

  return (
    <div className="flex flex-col justify-center items-center p-6 m-4 md:p-8 md:m-8">
      <main className="bg-white border-2 border-ss_purple w-full max-w-lg md:max-w-2xl h-[500px] md:h-[400px] p-6 md:p-10 md:grid md:grid-cols-2 md:gap-8 shadow-[8px_8px_0px_#453393] hover:transition-transform hover:scale-[1.08] hover:duration-[2000ms] duration-[3000ms] cursor-pointer gap-6 overflow-hidden">
        <div
          className="relative w-full h-48 md:h-full overflow-hidden"
          onMouseEnter={() => setHoveredService({ title, description, price })}
          onMouseLeave={() => setHoveredService(null)}
        >
          <img
            src={image}
            alt={title}
            title={title}
            className="object-cover w-full h-full"
          />

          {/* Hover Popup - Only over image */}
          {hoveredService && (
            <div className="absolute bottom-2 right-2 bg-white border-2 border-ss_purple rounded-lg shadow-lg p-3 z-10 min-w-48">
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">
                    Service:
                  </span>
                  <span className="text-ss_purple font-semibold">
                    {hoveredService.title}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-700">
                    Price:
                  </span>
                  <span className="text-ss_purple font-semibold">
                    {hoveredService.price}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        <section className="flex flex-col h-full justify-between">
          <div>
            <h1 className="font-title font-bold text-xl md:text-2xl text-center">
              {title}
            </h1>

            <h2 className="text-lg md:text-xl text-gray-500 font-light my-2 md:my-3 text-center">
              {description}
            </h2>
          </div>

          <div className="flex flex-col items-center space-y-2">
            <p className="font-light text-black text-center text-sm md:text-base">
              {price}
            </p>
            <button
              onClick={handleBookNow}
              className="uppercase py-1 px-6 w-full max-w-48 transition-colors duration-[1300ms] border-4 text-sm md:text-base bg-ss_purple text-white border-ss_purple hover:bg-white hover:text-ss_purple"
            >
              Book Now!
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ServiceCardTailwind;
