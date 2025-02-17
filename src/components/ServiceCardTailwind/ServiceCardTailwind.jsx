function ServiceCardTailwind() {
  return (
    <div className="bg-white flex flex-col justify-center items-center">
      <h1 className="text-4xl text-ss_purple p-4 ">Menu of Services </h1>
      <main className="bg-white border-2 border-ss_purple w-full max-w-xs m-10 p-3 md:grid md:grid-cols-2 md:max-w-3xl md:gap-4 md:p-5 bg-mobile bg-no-repeat bg-bottom md:bg-desktop shadow-[8px_8px_0px_#453393] hover:transition-transform hover:scale-105 duration-700 cursor-pointer ">
        <img
          src="orange.jpg"
          alt="orange with stem and leaf on a white-gray background"
        />
        <section>
          <h1 className="font-title font-bold text-2xl md:text-3xl text-center">
            Western Style Knife Sharpening
          </h1>
          <h2 className="text-3xl font-light my-3 text-center">
            {" "}
            Starting at $1 per inch
          </h2>
          <p className="font-light text-gray-500">
            Experience a burst of sunshine in every bite with this hand-picked,
            sun-drenched jewel of the citrus world.
          </p>
          <section className="flex items-center justify-center my-4">
            <button className="bg-gradient-to-b from-ss_light_purple to-ss_purple text-white uppercase pt-2 pb-1 px-4 flex-grow hover:bg-gradient-to-t md:flex-none">
              Book Now!
            </button>
            <svg
              className="fill-ss_pink ml-2 transition-transform hover:scale-125 duration-300"
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
            >
              <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
            </svg>
          </section>
          <section className="flex flex-col items-center justify-center">
            <h3 className="uppercase font-light text-lg">Features</h3>
            <ul className="list-disc marker:text-ss_purple text-sm text-gray-600 font-light">
              <li className="ml-3 pl-2">
                <span className="font-medium">Nature's candy</span>: A symphony
                of sweet and tangy notes
              </li>
              <li className="ml-3 pl-2">
                <span className="font-medium">Vibrant hue</span>: A visual feast
                for the eyes
              </li>
              <li className="ml-3 pl-2">
                <span className="font-medium">Invigorating aroma</span>: A
                sensory delight
              </li>
              <li className="ml-3 pl-2">
                <span className="font-medium">Nutrient-rich</span>: Bursting
                with Vitamin C
              </li>
              <li className="ml-3 pl-2">
                <span className="font-medium">Perfect for</span>: snacking,
                juicing, or culinary creations
              </li>
            </ul>
          </section>
        </section>
      </main>
    </div>
  );
}

export default ServiceCardTailwind;
