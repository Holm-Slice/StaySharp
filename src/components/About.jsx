import React from "react";
import Divider from "./Divider/Divider";

function About() {
  return (
    <>
      <Divider />
      <div className="flex flex-col mt-12 md:flex-row mb-8 ml-8">
        <div className=" md:w-1/2 h-600 w-auto items-center justify-center">
          <img
            className="about-img object-cover  "
            src="assets/Images/chris at pop up.jpeg"
            alt=""
          />
        </div>

        <div className="centered-container md:w-1/2 justify-center align-center pr-34 ">
          <div className="top-bio-banner"></div>

          <div className="flex flex-col justify-center align-center text-ss_purple text-xl sm:p-12 text-center  px-8 ">
            <div className="flex flex-col justify-center align-center text-ss_purple text-4xl  text-center sm:p-12">
              <h2 className="mt-36">Lore...</h2>
            </div>

            <br />
            {/* 
            <section className=" sm:pb-8 flex flex-col text-wrap justify-center align-center text-ss_purple text-lg  text-center">
              <p className="flex flex-col text-wrap justify-center align-center text-ss_purple text-lg text-center">
                Yep, That's me. You're probably wondering how I got here... Well
                It all started about 12 years ago in the back of a pizza shop in
                Nowhere, Colorado. Well...That's where I started cooking at
                least, but it was never my plan to end up in this industry. I
                always thought I would be a designer of some sort, most likely
                an architect.
              </p>
              <br />
            </section> */}

            <section className="">
              <p className="flex flex-col text-wrap justify-center align-center text-ss_purple text-lg text-center">
                Yep, That's me. You're probably wondering how I got here... Well
                It all started about 12 years ago in the back of a pizza shop in
                Nowhere, Colorado. Well...That's where I started cooking at
                least, but it was never my plan to end up in this industry. I
                always thought I would be a designer of some sort, most likely
                an architect.
                <br />
              </p>
            </section>

            <section className="">
              <p className="flex flex-col text-wrap justify-center align-center text-ss_purple text-lg text-center pt-6">
                So that is what took me to attend School at Arizona State
                University. It was while studying architorture there that I
                realized I would rather be poor in a kitchen than be poor in a
                studio. So I started cooking at real restaurants, not just
                slinging pizzas out of my mothers Honda Civic. This took me from
                Phoenix to California and Mexico back to Colorado and finally to
                my place of residence today, Austin, TX.
                <br />
              </p>
            </section>
            <section className="">
              <p className="flex flex-col text-wrap justify-center align-center text-ss_purple text-lg pt-6 text-center">
                Along the way I fell in love with a subgenre of chef culture,
                that being the cult of really high end and beautiful kitchen
                knives, Hours of research and hours spent talking to other knife
                shop owners has led me to this place today. The still poor owner
                of a tiny, online sharpening and kitchen knife (and other
                cooking and dining things) shop. Welcome!
              </p>

              <br />
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default About;
