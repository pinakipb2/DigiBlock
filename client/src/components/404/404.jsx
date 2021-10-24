import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => (
  <section className="text-gray-600 body-font">
    <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
      <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
        <img className="object-cover object-center rounded" alt="hero" src="/assets/error.svg" />
      </div>
      <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:text-left mb-16 md:mb-0 justify-center items-center text-center">
        <div className="title-font mb-4 font-bold font-roboto text-center flex flex-col justify-center items-center">
          <h1 className="text-5xl sm:text-8xl text-indigo-600">404</h1>
          <br className="hidden lg:inline-block" />
          <h1 className="text-2xl sm:text-3xl text-black tracking-wider">Page Not Found</h1>
        </div>
        <p className="mb-8 leading-relaxed text-gray-800 font-raleway text-center">A one-stop platform for your Digital Identity to be Safe and Organized. This platform is made using Blockchain Technology which makes it Fast, Trustworthy and Immutable. </p>
        <Link to="/" type="button" className="inline-flex text-white bg-prime border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 text-lg font-roboto rounded-md">
          Go Home
        </Link>
      </div>
    </div>
  </section>
);

export default ErrorPage;
