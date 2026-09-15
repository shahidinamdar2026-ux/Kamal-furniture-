import React from 'react';
import { HaveliRoomViewer } from '../three/HaveliRoomViewer';
import { Sparkles, Home, Compass } from 'lucide-react';

export const HaveliExperienceSection: React.FC = () => {
  return (
    <section id="haveli-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#2e1e13]/80">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1e130a] border border-[#d4a359]/40 text-[#f3d393] text-xs font-display tracking-widest uppercase mb-3">
          <Home className="w-3.5 h-3.5 text-[#d4a359]" />
          <span>Spatial 3D Architecture</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#f7f2ea] tracking-tight">
          The Virtual Haveli Experience
        </h2>
        <p className="mt-3 text-sm sm:text-base text-stone-400 max-w-2xl font-sans">
          See how Indian royal furniture commands presence in an authentic sandstone courtyard. Orbit around the room, switch between evening Diwali diyas and golden hour, or change the baithak layout.
        </p>
      </div>

      {/* 3D Scene Viewport */}
      <div className="w-full">
        <HaveliRoomViewer />
      </div>

      {/* Architectural Context Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <div className="p-6 rounded-2xl bg-[#140e09] border border-[#382618]">
          <h4 className="font-serif text-base font-bold text-amber-100 mb-2">
            Mewari Cusped Arches
          </h4>
          <p className="text-xs text-stone-400 leading-relaxed">
            Pillars chiseled from pink Jodhpur sandstone create microclimates that keep domestic interiors naturally cool throughout harsh Indian summers.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#140e09] border border-[#382618]">
          <h4 className="font-serif text-base font-bold text-amber-100 mb-2">
            Acoustics & Brass Chimes
          </h4>
          <p className="text-xs text-stone-400 leading-relaxed">
            The gentle swaying of the Sheesham Jhula swing rings tuned cast-brass bells, producing frequency vibrations traditionally believed to clear stagnant energy.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-[#140e09] border border-[#382618]">
          <h4 className="font-serif text-base font-bold text-amber-100 mb-2">
            Checkered Baithak Flooring
          </h4>
          <p className="text-xs text-stone-400 leading-relaxed">
            Alternating Makrana white and Bidasar green marble slabs provide a high-contrast reflective stage for the dark golden grain of aged Sheesham timber.
          </p>
        </div>
      </div>
    </section>
  );
};
