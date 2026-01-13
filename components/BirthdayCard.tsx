
import React, { useState, useRef } from 'react';
import { CardData, BirthdayVibe } from '../types';
import html2canvas from 'html2canvas';
import GiftBox from './GiftBox';
import confetti from 'canvas-confetti';

interface BirthdayCardProps {
  data: CardData;
}

const BirthdayCard: React.FC<BirthdayCardProps> = ({ data }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleOpen = () => {
    setIsOpen(true);
    const end = Date.now() + 3 * 1000;
    const colors = ['#ec4899', '#8b5cf6', '#3b82f6'];

    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors
      });
      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!cardRef.current) return;
    setIsCapturing(true);
    try {
      const canvas = await html2canvas(cardRef.current, { useCORS: true, backgroundColor: null, scale: 2 });
      const link = document.createElement('a');
      link.download = `${data.recipientName}-BirthdayCard.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } finally {
      setIsCapturing(false);
    }
  };

  const getVibeStyles = () => {
    switch (data.vibe) {
      case BirthdayVibe.GLITCH: return "bg-black border-cyan-400 text-cyan-400 shadow-[0_0_50px_rgba(34,211,238,0.2)]";
      case BirthdayVibe.ROYAL: return "bg-gradient-to-br from-amber-50 to-yellow-100 border-yellow-500 text-amber-900";
      case BirthdayVibe.PASTEL: return "bg-gradient-to-br from-pink-50 to-blue-50 border-pink-200 text-pink-900";
      default: return "bg-gradient-to-br from-purple-500 to-pink-500 border-white text-white";
    }
  };

  if (!isOpen) {
    return <GiftBox onOpen={handleOpen} />;
  }

  return (
    <div className="flex flex-col items-center gap-10 w-full animate-in zoom-in-95 duration-1000">
      <div className="perspective-1000 w-[340px] h-[520px] sm:w-[420px] sm:h-[600px] cursor-pointer" onClick={() => setIsFlipped(!isFlipped)}>
        <div className={`card-inner relative w-full h-full preserve-3d shadow-[0_20px_80px_rgba(0,0,0,0.5)] rounded-[3rem] transition-all duration-1000 ${isFlipped ? 'flipped' : ''}`}>
          <div ref={!isFlipped ? cardRef : null} className={`backface-hidden absolute inset-0 w-full h-full rounded-[3rem] border-[14px] ${getVibeStyles()} p-12 flex flex-col items-center justify-between text-center overflow-hidden`}>
             <div className="absolute inset-0 shimmer-effect opacity-30"></div>
             <div className="z-10 mt-12 space-y-4">
               <span className="text-[10px] uppercase tracking-[0.5em] font-black opacity-60">Celebrating You</span>
               <h1 className="text-5xl sm:text-7xl font-romantic leading-none">{data.recipientName}</h1>
               <div className="w-16 h-1 bg-current mx-auto opacity-40 rounded-full"></div>
             </div>
             <div className="relative z-10 flex flex-col items-center">
                <div className="text-8xl filter drop-shadow-2xl animate-bounce">🎂</div>
                <div className="text-sm font-black uppercase tracking-widest mt-4">Happy Birthday</div>
             </div>
             <div className="z-10 mb-8 font-serif italic opacity-60 text-sm">"Tap to flip the magic"</div>
          </div>
          <div ref={isFlipped ? cardRef : null} className={`backface-hidden absolute inset-0 w-full h-full rounded-[3rem] border-[14px] ${getVibeStyles()} rotate-y-180 p-10 flex flex-col items-center overflow-y-auto scrollbar-hide`}>
            {data.photoUrl ? (
              <div className="w-full aspect-[4/5] rounded-3xl overflow-hidden border-8 border-white shadow-2xl mb-8 rotate-3 hover:rotate-0 transition-all duration-500">
                <img src={data.photoUrl} className="w-full h-full object-cover" alt="Memory" />
              </div>
            ) : (
              <div className="w-32 h-32 rounded-full bg-white/20 flex items-center justify-center text-6xl mb-8 shadow-inner">🎁</div>
            )}
            <div className="text-center space-y-8 px-2 flex-grow flex flex-col justify-center">
              <p className="text-xl sm:text-2xl font-serif italic leading-relaxed">"{data.aiMessage}"</p>
              <div className="pt-8 border-t border-current/20">
                 <p className="text-[10px] uppercase tracking-[0.3em] opacity-60 mb-2">With all my love,</p>
                 <p className="text-4xl font-romantic">{data.senderName}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        <button onClick={() => setIsFlipped(!isFlipped)} className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white rounded-2xl border border-white/20 backdrop-blur-xl transition-all font-bold shadow-xl">
          {isFlipped ? 'Show Front' : 'Read Message'}
        </button>
        <button disabled={isCapturing} onClick={handleDownload} className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-600 text-white rounded-2xl shadow-2xl transition-all font-black uppercase tracking-widest text-xs flex items-center gap-3">
          {isCapturing ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Download Image'}
        </button>
      </div>
    </div>
  );
};

export default BirthdayCard;
