import React from 'react';
import Image from 'next/image';

export default function HeroTransformation() {
  return (
    <div className="relative w-full h-screen min-h-[600px] flex items-center bg-[#0a101d] overflow-hidden font-sans">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.jpg"
          alt="Modern Architecture"
          fill
          className="object-cover object-center opacity-80"
          priority
        />
        {/* Dark Gradient Overlay to improve text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a101d] via-[#0a101d]/80 to-transparent z-10" />
      </div>

      {/* Main Content Container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex justify-between items-center h-full">
        
        {/* Left Content (Text) */}
        <div className="max-w-2xl flex flex-col gap-4">
          <span className="text-[#facc15] font-semibold text-sm tracking-widest uppercase">
            Chapter 05
          </span>
          <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-bold uppercase leading-tight tracking-tight">
            The<br />Transformation
          </h1>
          <p className="text-gray-300 text-lg md:text-xl font-light mt-4 max-w-lg leading-relaxed">
            Technical planning becomes a physical environment. From drawings and coordination to project delivery.
          </p>
        </div>

        {/* Right Content (Vertical Navigation) */}
        <div className="hidden md:flex flex-col gap-6 items-end justify-center text-sm font-medium pr-4">
          {[
            { num: '01', active: false },
            { num: '02', active: false },
            { num: '03', active: false },
            { num: '04', active: false },
            { num: '05', active: true },
            { num: '06', active: false },
          ].map((item) => (
            <div
              key={item.num}
              className={`flex items-center gap-4 cursor-pointer transition-colors duration-300 ${
                item.active ? 'text-[#facc15]' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              <span className="tracking-widest">{item.num}</span>
              {/* Optional small line indicator for active state, based on typical designs though not explicitly in original image, it looks better */}
              {item.active && <div className="h-[2px] w-4 bg-[#facc15]" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
