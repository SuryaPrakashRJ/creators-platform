const Hero = () => {
  return (
    <div className="">
      <div className="">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-24 space-y-8">
          <div className="flex justify-center">
            <a
              className="group inline-block bg-white/[.05] hover:bg-white/[.1] border border-white/[.05] p-1 pl-4 rounded-full shadow-md"
              href="../figma.html"
            >
              <p className="mr-2 inline-block text-white text-sm">
                Coming Soon
              </p>
              {/* <span className="group-hover:bg-white/[.1] py-2 px-3 inline-flex justify-center items-center gap-x-2 rounded-full bg-white/[.075] font-semibold text-white text-sm">
            <svg className="w-2.5 h-2.5" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </span> */}
            </a>
          </div>

          <div className="max-w-3xl text-center mx-auto">
            <h1 className="block font-extrabold text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
              Effortless Selling Starts Here.
            </h1>
          </div>

          <div className="max-w-3xl text-center mx-auto">
            <p className="text-lg text-green-200">
              Empowering influencers worldwide with tools to transform passion
              into effortless impactful sales and monetization.
            </p>
          </div>

          <div className="text-center ">
            <a
              className=" hover:bg-green-500   justify-center items-center gap-x-3 text-center bg-green-600 shadow-transparent  border border-transparent text-white text-sm font-medium rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-6 "
              href="#"
            >
              Get started
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
