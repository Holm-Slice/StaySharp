// import Divider from "../Divider/Divider";

// function ServiceCardTailwind() {
//   return (
//     <div className="bg-white flex flex-col justify-center items-center uppercase z-50 ">
//       <h1 className="text-4xl text-ss_purple uppercase ">Fixin's </h1>
//       <main className="bg-white border-2 border-ss_purple w-full max-w-xs m-10 p-3 md:grid md:grid-cols-2 md:max-w-3xl md:gap-4 md:p-5 bg-mobile bg-no-repeat bg-bottom md:bg-desktop shadow-[8px_8px_0px_#453393] hover:transition-transform hover:scale-110 hover:duration-[2000ms] duration-[3000ms] cursor-pointer gap-4">
//         <img
//           src="orange.jpg"
//           alt="orange with stem and leaf on a white-gray background"
//         />
//         <section>
//           <h1 className="font-title font-bold text-2xl md:text-3xl text-center">
//             Western Style <br /> Knife Sharpening
//           </h1>
//           <h2 className="text-xl text-gray-500 font-light my-3 text-center">
//             {" "}
//             Wustof, Zwilling, Shun <br /> yooooou name it!{" "}
//           </h2>
//           <section className="flex items-center justify-center my-4">
//             <button className="bg-ss_purple text-white uppercase pt-2 pb-1 px-4 flex-grow hover:bg-white hover:text-ss_purple transition-colors duration-[1300ms] md:flex-none border-4 border-ss_purple">
//               Book Now!
//             </button>
//           </section>
//           <p className="font-light text-black text-center">
//             Starting at $1 per inch
//           </p>
//         </section>
//       </main>
//       {/* <Divider /> */}
//     </div>
//   );
// }

// export default ServiceCardTailwind;
import React from "react";

function ServiceCardTailwind({ title, description, price, image }) {
  return (
    <div className="flex flex-col justify-center items-center p-4 m-4 md:p-8 md:m-8 ">
      <main className="bg-white border-2 border-ss_purple w-full max-w-xs md:max-w-lg p-4 md:p-8 md:grid md:grid-cols-2  md:gap-8 shadow-[8px_8px_0px_#453393] hover:transition-transform hover:scale-110 hover:duration-[2000ms] duration-[3000ms] cursor-pointer gap-4">
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-48 md:h-full"
        />
        <section>
          <h1 className="font-title font-bold text-xl md:text-2xl text-center">
            {title}
          </h1>
          <h2 className="text-lg md:text-xl text-gray-500 font-light my-2 md:my-3 text-center">
            {description}
          </h2>
          <section className="flex items-center justify-center my-2 md:my-4">
            <button className="bg-ss_purple text-white uppercase py-1 px-2 md:pt-2 md:pb-1 md:px-4 flex-grow hover:bg-white hover:text-ss_purple transition-colors duration-[1300ms] md:flex-none border-4 border-ss_purple">
              Book Now!
            </button>
          </section>
          <p className="font-light text-black text-center text-sm md:text-base">
            {price}
          </p>
        </section>
      </main>
    </div>
  );
}

export default ServiceCardTailwind;
