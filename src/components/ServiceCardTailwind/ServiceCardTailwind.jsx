import React from "react";
import { useNavigate } from "react-router-dom";

function ServiceCardTailwind({ title, description, price, image }) {
  const navigate = useNavigate();

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
    <div
      id="services"
      className="flex flex-col justify-center items-center p-6 m-4 md:p-8 md:m-8"
    >
      <main className="bg-white border-2 border-ss_purple w-full max-w-lg md:max-w-2xl h-[500px] md:h-[400px] p-6 md:p-10 md:grid md:grid-cols-2 md:gap-8 shadow-[8px_8px_0px_#453393] hover:transition-transform hover:scale-[1.08] hover:duration-[300ms] duration-[300ms] cursor-pointer gap-6 overflow-hidden">
        <div className="relative w-full h-48 md:h-auto overflow-hidden">
          <img src={image} alt={title} className="object-cover w-full h-full" />
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
          
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <p className="font-light text-black text-sm md:text-base">
                {price}
              </p>
            </div>
            
            <button
              onClick={handleBookNow}
              className="bg-ss_purple text-white uppercase py-2 px-4 hover:bg-white hover:text-ss_purple transition-colors duration-[1300ms] border-4 border-ss_purple text-sm md:text-base"
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
