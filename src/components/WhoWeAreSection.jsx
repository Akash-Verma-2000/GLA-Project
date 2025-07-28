'use client';

import Image from 'next/image';

export default function WhoWeAreSection() {
  return (
    <section className="bg-gradient-to-b from-gray-100 to-white py-16 px-5 sm:px-10 lg:px-20">
      <div className="max-w-5xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12">
        {/* Text Content */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-primary to-blue-900 bg-clip-text text-transparent">
            Who We Are
          </h2>
          <p className="text-md text-gray-600 mb-5">
            <span className="text-primary">Om Network India</span> founded by  <span className="text-primary">Er. Mohit Verma</span>, is the premier CCTV installation service provider in Hathras with over 10 years of industry experience. We have installed more than 40,000 cameras, securing over 5,000 homes and 1,000 businesses across more than 10 cities. With a client satisfaction rate of 95.5% and a strong base of repeat clients, our dedicated team is committed to delivering innovative, reliable, and affordable security solutions tailored to your needs. Our mission is to combine the latest technology with personalized service to ensure the safety and peace of mind of every customer.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
            <div className="flex items-center gap-3">
              <Image
                src="/images/Mohit-Profile-Picture.jpg"
                alt="Founder Mohit"
                width={56}
                height={56}
                className="rounded-full border-2 border-primary shadow-md"
              />
              <div className="text-left">
                <div className="font-bold text-primary">ER.Mohit Verma</div>
                <div className="text-xs text-gray-500">Founder & CEO</div>
              </div>
            </div>
            <span className="hidden sm:inline-block text-gray-400 text-2xl">|</span>
            <div className="text-sm text-gray-500 italic">
              "We Secure What Matters"
            </div>
          </div>
        </div>
        {/* Founder Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-2 bg-gradient-to-tr from-primary/30 to-black/10 rounded-3xl blur-lg opacity-60 group-hover:opacity-80 transition" />
            <Image
              src="/images/Mohit-Profile-Picture.jpg"
              alt="Founder Mohit"
              width={350}
              height={350}
              className="rounded-3xl shadow-2xl object-cover border-4 border-white"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
