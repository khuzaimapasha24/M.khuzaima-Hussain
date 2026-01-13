
import React, { useState } from 'react';

interface GiftBoxProps {
  onOpen: () => void;
}

const GiftBox: React.FC<GiftBoxProps> = ({ onOpen }) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    // Delay the actual card reveal until the animation finishes
    setTimeout(onOpen, 1200);
  };

  return (
    <div className="relative w-64 h-64 perspective-1000 cursor-pointer group" onClick={handleOpen}>
      {/* Box Lid */}
      <div className={`absolute top-0 left-0 w-full h-12 bg-pink-600 rounded-t-lg z-30 transition-all duration-700 ease-in-out origin-bottom ${isOpening ? '-translate-y-48 -rotate-x-45 opacity-0' : 'group-hover:-translate-y-2'}`}>
        <div className="absolute top-1/2 left-0 w-full h-2 bg-pink-400 -translate-y-1/2 shadow-sm"></div>
        <div className="absolute top-0 left-1/2 w-8 h-full bg-pink-400 -translate-x-1/2 shadow-sm"></div>
        {/* Ribbon Bow */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-16 h-12 flex justify-center">
            <div className="w-8 h-8 bg-pink-400 rounded-full rotate-45 mr-[-8px]"></div>
            <div className="w-8 h-8 bg-pink-400 rounded-full -rotate-45 ml-[-8px]"></div>
        </div>
      </div>

      {/* Box Body */}
      <div className={`relative w-full h-52 bg-pink-500 rounded-b-lg border-x-4 border-b-4 border-pink-700 z-20 transition-transform duration-500 ${isOpening ? 'scale-95 opacity-50' : ''}`}>
        <div className="absolute top-0 left-1/2 w-8 h-full bg-pink-400 -translate-x-1/2"></div>
        <div className="absolute inset-0 flex items-center justify-center">
           <span className="text-white/20 font-bold text-4xl">?</span>
        </div>
      </div>

      {/* Glow Effect */}
      <div className="absolute inset-0 bg-pink-500 blur-3xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
      
      {!isOpening && (
        <p className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-pink-300 font-serif italic whitespace-nowrap animate-bounce">
          Tap to open your gift
        </p>
      )}
    </div>
  );
};

export default GiftBox;
