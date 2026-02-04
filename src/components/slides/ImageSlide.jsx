import React from 'react';

const ImageSlide = ({ slide, theme: t }) => {
  return (
    <div className="animate-in fade-in duration-500 text-center">
      <h2 className={`text-6xl md:text-8xl font-black mb-4 ${t.textOnPage}`}>{slide.title}</h2>
      <div className={`mt-8 p-4 border-4 ${t.accentBorder} ${t.cardBg} rounded-lg inline-block`}>
        <img src={slide.image} alt={slide.title} className="max-h-[60vh] rounded-lg" />
      </div>
    </div>
  );
};

export default ImageSlide;
