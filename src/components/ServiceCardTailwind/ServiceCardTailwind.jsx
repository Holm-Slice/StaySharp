function ServiceCardTailwind() {
  return (
    <div className="bg-white flex flex-col justify-center items-center uppercase">
      <h1 className="text-4xl text-ss_purple pt-4 ">Fixin's </h1>
      <main className="bg-white border-2 border-ss_purple w-full max-w-xs m-10 p-3 md:grid md:grid-cols-2 md:max-w-3xl md:gap-4 md:p-5 bg-mobile bg-no-repeat bg-bottom md:bg-desktop shadow-[8px_8px_0px_#453393] hover:transition-transform hover:scale-110 hover:duration-[2000ms] duration-[3000ms] cursor-pointer gap-4">
        <img
          src="orange.jpg"
          alt="orange with stem and leaf on a white-gray background"
        />
        <section>
          <h1 className="font-title font-bold text-2xl md:text-3xl text-center">
            Western Style <br /> Knife Sharpening
          </h1>
          <h2 className="text-xl text-gray-500 font-light my-3 text-center">
            {" "}
            Wustof, Zwilling, Shun <br /> yooooou name it!{" "}
          </h2>
          <section className="flex items-center justify-center my-4">
            <button className="bg-ss_purple text-white uppercase pt-2 pb-1 px-4 flex-grow hover:bg-white hover:text-ss_purple transition-colors duration-[1300ms] md:flex-none border-4 border-ss_purple">
              Book Now!
            </button>
          </section>
          <p className="font-light text-black text-center">
            Starting at $1 per inch
          </p>
        </section>
      </main>
    </div>
  );
}

export default ServiceCardTailwind;
