
import React, { useState, useEffect, useRef } from 'react';
import FloatingHearts from './components/FloatingHearts';
import CardForm from './components/CardForm';
import BirthdayCard from './components/BirthdayCard';
import { CardData } from './types';
import { generateBirthdayMessage } from './services/geminiService';

const App: React.FC = () => {
  const [step, setStep] = useState<'form' | 'card'>('form');
  const [cardData, setCardData] = useState<CardData | null>(null);
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleSubmit = async (data: CardData) => {
    setLoading(true);
    try {
      const aiMessage = await generateBirthdayMessage(data);
      const finalData = { ...data, aiMessage, id: Date.now().toString() };
      
      setCardData(finalData);
      setStep('card');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      // Auto-play music on reveal if possible (browser permitting)
      setTimeout(() => {
        if (audioRef.current && !isPlaying) {
          audioRef.current.play().catch(() => console.log("Waiting for user interaction for music..."));
          setIsPlaying(true);
        }
      }, 2000);
    } catch (error) {
      console.error(error);
      alert("Something went wrong baking the birthday surprise. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("User interaction required"));
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#020617] flex flex-col items-center justify-center px-4 py-16">
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(236,72,153,0.1)_0%,_transparent_50%)] z-0"></div>
      <FloatingHearts />
      
      {/* Catchy Upbeat Song placeholder for Jaane Kyun vibe */}
      <audio ref={audioRef} loop src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />

      <div className="relative z-10 w-full flex flex-col items-center max-w-5xl mx-auto">
        {step === 'form' ? (
          <div className="animate-in fade-in zoom-in duration-1000 w-full">
            <header className="text-center mb-16">
              <h1 className="text-8xl sm:text-9xl font-romantic text-white drop-shadow-[0_0_30px_rgba(236,72,153,0.5)] mb-6">AmourCard</h1>
              <p className="text-pink-400 font-bold tracking-[0.4em] uppercase text-xs">The Ultimate Birthday Experience</p>
            </header>
            <CardForm onSubmit={handleSubmit} isLoading={loading} />
          </div>
        ) : (
          <div className="w-full flex flex-col items-center animate-in fade-in slide-in-from-bottom-20 duration-1000">
            <header className="text-center mb-16">
               <div className="text-pink-500 font-black tracking-[0.5em] uppercase text-[10px] mb-4">A Special Surprise For</div>
               <h2 className="text-5xl sm:text-7xl font-romantic text-white italic drop-shadow-lg">{cardData?.recipientName}</h2>
            </header>
            
            {cardData && <BirthdayCard data={cardData} />}

            <div className="mt-20 flex flex-col items-center gap-8">
              <button 
                onClick={toggleMusic}
                className={`relative p-8 rounded-full border-2 transition-all duration-700 z-10 ${isPlaying ? 'bg-pink-500 border-pink-300 scale-110 shadow-[0_0_50px_rgba(236,72,153,0.6)]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
              >
                {isPlaying ? (
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                ) : (
                  <svg className="w-10 h-10 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                )}
              </button>
              
              <button onClick={() => setStep('form')} className="text-white/30 hover:text-white/60 text-[10px] tracking-[0.3em] uppercase transition-all">
                ← Create New Card
              </button>
            </div>
          </div>
        )}
      </div>

      <footer className="fixed bottom-8 left-1/2 -translate-x-1/2 z-10 text-white/5 text-[8px] tracking-[0.5em] uppercase whitespace-nowrap">
        Crafted with Love &bull; AI Powered Artistry &bull; AmourCard 2025
      </footer>
    </div>
  );
};

export default App;
