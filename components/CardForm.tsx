
import React, { useState } from 'react';
import { CardData, RelationType, BirthdayVibe, MessageTone } from '../types';

interface CardFormProps {
  onSubmit: (data: CardData) => void;
  isLoading: boolean;
}

const CardForm: React.FC<CardFormProps> = ({ onSubmit, isLoading }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<CardData>({
    senderName: '',
    recipientName: '',
    relation: RelationType.BOYFRIEND,
    vibe: BirthdayVibe.PARTY,
    tone: MessageTone.HYPE,
    favMemory: '',
    photoUrl: null,
  });

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => setFormData({ ...formData, photoUrl: event.target?.result as string });
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const getRelationColor = (type: RelationType) => {
    if (formData.relation !== type) return 'bg-white/5 text-pink-200 border-white/10 hover:bg-white/10';
    switch (type) {
      case RelationType.BOYFRIEND: return 'bg-blue-600 text-white border-blue-400 shadow-[0_0_15px_rgba(37,99,235,0.4)]';
      case RelationType.GIRLFRIEND: return 'bg-pink-600 text-white border-pink-400 shadow-[0_0_15px_rgba(219,39,119,0.4)]';
      default: return 'bg-purple-600 text-white border-purple-400 shadow-[0_0_15px_rgba(147,51,234,0.4)]';
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-slate-900/40 backdrop-blur-3xl p-8 sm:p-12 rounded-[3rem] border border-white/10 shadow-2xl relative">
      <div className="absolute top-0 left-0 h-1.5 bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-700 rounded-full" style={{ width: `${(step / 3) * 100}%` }}></div>
      
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className="space-y-8">
        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-10 duration-500">
            <h3 className="text-4xl font-serif text-white mb-8 text-center bg-gradient-to-r from-pink-200 to-white bg-clip-text text-transparent italic">The Birthday Star</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-pink-400 text-[10px] uppercase tracking-[0.2em] font-bold block mb-3">Your Name</label>
                <input required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-pink-500 outline-none transition-all" 
                  value={formData.senderName} onChange={e => setFormData({...formData, senderName: e.target.value})} placeholder="Alex" />
              </div>
              <div>
                <label className="text-pink-400 text-[10px] uppercase tracking-[0.2em] font-bold block mb-3">Birthday Person</label>
                <input required className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-pink-500 outline-none transition-all" 
                  value={formData.recipientName} onChange={e => setFormData({...formData, recipientName: e.target.value})} placeholder="Sam" />
              </div>
            </div>
            <div className="mt-8">
              <label className="text-pink-400 text-[10px] uppercase tracking-[0.2em] font-bold block mb-3">Relationship Status</label>
              <div className="flex flex-wrap gap-3">
                {Object.values(RelationType).map(rel => (
                  <button key={rel} type="button" onClick={() => setFormData({...formData, relation: rel})}
                    className={`px-6 py-3 rounded-full text-xs font-bold transition-all border transform active:scale-95 ${getRelationColor(rel)}`}>
                    {rel === RelationType.BOYFRIEND ? '♂ ' : rel === RelationType.GIRLFRIEND ? '♀ ' : ''}{rel}
                  </button>
                ))}
              </div>
            </div>
            <button type="button" onClick={nextStep} disabled={!formData.senderName || !formData.recipientName} 
              className="w-full mt-10 py-5 bg-white text-slate-900 font-black tracking-widest uppercase rounded-2xl hover:bg-pink-100 transition-all disabled:opacity-20 transform active:scale-95">Set the Vibe</button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-10 duration-500">
             <h3 className="text-4xl font-serif text-white mb-8 text-center bg-gradient-to-r from-pink-200 to-white bg-clip-text text-transparent italic">Aesthetic & Tone</h3>
             <div className="space-y-8">
               <div>
                  <label className="text-pink-400 text-[10px] uppercase tracking-[0.2em] font-bold block mb-4">Choose the Visual Style</label>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.values(BirthdayVibe).map(v => (
                      <button key={v} type="button" onClick={() => setFormData({...formData, vibe: v})}
                        className={`py-4 rounded-2xl text-xs font-bold border transition-all ${formData.vibe === v ? 'bg-white text-slate-900 border-white' : 'bg-white/5 text-white border-white/10'}`}>
                        {v}
                      </button>
                    ))}
                  </div>
               </div>
               <div>
                  <label className="text-pink-400 text-[10px] uppercase tracking-[0.2em] font-bold block mb-4">Message Tone</label>
                  <select className="w-full bg-slate-800 border border-white/10 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-pink-500 outline-none appearance-none"
                    value={formData.tone} onChange={e => setFormData({...formData, tone: e.target.value as MessageTone})}>
                    {Object.values(MessageTone).map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
               </div>
             </div>
             <div className="flex gap-4 mt-12">
               <button type="button" onClick={prevStep} className="flex-1 py-5 border border-white/10 text-white rounded-2xl font-bold hover:bg-white/5">Back</button>
               <button type="button" onClick={nextStep} className="flex-[2] py-5 bg-white text-slate-900 font-black tracking-widest uppercase rounded-2xl hover:bg-pink-100">Final Touch</button>
             </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right-10 duration-500">
            <h3 className="text-4xl font-serif text-white mb-8 text-center bg-gradient-to-r from-pink-200 to-white bg-clip-text text-transparent italic">Personalize</h3>
            <div className="space-y-6">
              <div>
                <label className="text-pink-400 text-[10px] uppercase tracking-[0.2em] font-bold block mb-3">A Favorite Memory</label>
                <textarea required rows={3} className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-pink-500 outline-none resize-none"
                  placeholder="e.g. That road trip to the beach last summer..." value={formData.favMemory} onChange={e => setFormData({...formData, favMemory: e.target.value})} />
              </div>
              <div>
                <label className="text-pink-400 text-[10px] uppercase tracking-[0.2em] font-bold block mb-3">Upload a Photo</label>
                <div className="relative group">
                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" id="photo-upload" />
                  <label htmlFor="photo-upload" className="w-full h-32 border-2 border-dashed border-white/20 rounded-2xl flex flex-col items-center justify-center cursor-pointer group-hover:border-pink-500 transition-colors">
                    {formData.photoUrl ? (
                      <img src={formData.photoUrl} className="w-full h-full object-cover rounded-2xl" alt="Preview" />
                    ) : (
                      <>
                        <span className="text-3xl mb-2">📸</span>
                        <span className="text-xs text-white/40">Click to pick a photo</span>
                      </>
                    )}
                  </label>
                </div>
              </div>
            </div>
            <div className="flex gap-4 mt-10">
              <button type="button" onClick={prevStep} className="flex-1 py-5 border border-white/10 text-white rounded-2xl font-bold hover:bg-white/5 transition-all">Back</button>
              <button type="submit" disabled={isLoading} className="flex-[2] py-5 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-black tracking-widest uppercase rounded-2xl shadow-[0_10px_40px_rgba(236,72,153,0.3)] hover:scale-105 transition-all flex items-center justify-center gap-3">
                {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : 'Bake the Surprise'}
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default CardForm;
