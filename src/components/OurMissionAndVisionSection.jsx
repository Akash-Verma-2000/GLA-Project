'use client';

export default function OurMissionAndVisionSection({ addIntro = true }) {
  return (
    <section className="relative bg-gray-200 overflow-hidden px-5 sm:px-10 md:px-20 py-10 sm:py-14 lg:py-20 ">
      {/* Decorative blurred blobs */}
      <div className="absolute -top-32 left-0 w-96 h-96 bg-gradient-to-tr from-primary/20 via-blue-300/20 to-transparent rounded-full blur-3xl opacity-60 z-0" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-br from-black/10 via-primary/10 to-transparent rounded-full blur-2xl opacity-40 z-0" />

      {/* <div className="relative z-10"> */}


        {addIntro && (
          <div className="mb-10">
            <h2 className="bg-gradient-to-r from-primary to-black bg-clip-text text-transparent text-3xl sm:text-4xl lg:text-5xl text-center font-bold mb-5 scale-y-125 origin-top">
              Our Mission & Vision
            </h2>
            <p className="text-center !text-gray-800 text-sm md:text-md lg:text-lg">
              At Om Network India, our mission and vision drive us to deliver reliable and affordable CCTV security solutions. We are committed to protecting homes and businesses with advanced technology and exceptional service.
            </p>
          </div>
        )}

        <div className="flex flex-col md:flex-row items-stretch gap-5 md:gap-0 relative">
          {/* Mission Card */}
          <div className="flex-1 flex flex-col justify-center items-center bg-white/90 backdrop-blur-md rounded-l-3xl rounded-r-3xl md:rounded-r-none shadow-2xl p-10 md:pr-16 border-b-8 md:border-b-0 md:border-r-8 border-primary/70 relative group overflow-hidden">
            {/* Icon */}
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-tr from-primary to-blue-900 shadow-lg mb-6 relative group-hover:scale-105 transition-transform duration-300">
              <svg className="w-10 h-10 text-white drop-shadow-lg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 19V6M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-primary mb-2">Our Mission</h3>
            <p className="text-gray-600">
              Our mission is to provide top-quality CCTV installation and maintenance services that deliver reliable surveillance and protection for homes and businesses. We strive to combine advanced technology with expert support to ensure our clients enjoy complete security and peace of mind.
            </p>
          </div>
          {/* Vertical Accent Divider */}
          <div className="hidden md:flex flex-col items-center justify-center px-2">
            <div className="w-2 h-40 bg-gradient-to-b from-primary via-blue-400 to-black rounded-full shadow-lg" />
            <div className="w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-tr from-primary to-blue-400 shadow-lg mt-2">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          {/* Vision Card */}
          <div className="flex-1 flex flex-col justify-center items-center bg-white/90 backdrop-blur-md rounded-r-3xl rounded-l-3xl md:rounded-l-none shadow-2xl p-10 md:pl-16 border-t-8 md:border-t-0 md:border-l-8 border-primary/70 relative group overflow-hidden">
            {/* Icon */}
            <div className="w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-tr from-primary to-blue-900 shadow-lg mb-6 relative group-hover:scale-105 transition-transform duration-300">
              <svg className="w-10 h-10 text-white drop-shadow-lg" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <path d="M12 6v6l4 2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-primary 2xl:text-3xl mb-2">Our Vision</h3>
            <p className="text-gray-600">
              Our vision is to become the leading CCTV service provider in India, recognized for excellence, innovation, and customer satisfaction. We aim to make advanced security technology accessible and affordable for all, helping homes and businesses stay protected with reliable surveillance solutions and expert support.
            </p>
          </div>
        </div>
      {/* </div> */}
    </section>
  );
}
