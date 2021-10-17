import React from 'react';

const Hero = () => (
  <section className="text-gray-600 body-font">
    <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
      <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
        <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold text-black font-roboto">
          Keep Your Digital Identity
          <br className="hidden lg:inline-block" />
          Safe & Organised
        </h1>
        <p className="mb-8 leading-relaxed text-gray-800 font-raleway">A one-stop platform for your Digital Identity to be Safe and Organized. This platform is made using Blockchain Technology which makes it Fast, Trustworthy and Immutable. </p>
        <div className="flex justify-center">
          <button type="button" className="inline-flex text-white bg-prime border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg font-roboto">Get Started</button>
          <button type="button" className="ml-4 inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg font-roboto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mt-0.5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
            Watch Video
          </button>
        </div>
      </div>
      <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
        <img className="object-cover object-center rounded" alt="hero" src="/assets/hero.svg" />
      </div>
    </div>
  </section>
);

export default Hero;
