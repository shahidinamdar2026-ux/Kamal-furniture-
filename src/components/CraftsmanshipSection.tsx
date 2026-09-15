import React, { useState } from 'react';
import { CRAFT_TECHNIQUES } from '../data/furnitureData';
import { Sparkles, Layers, Grid, Droplet, Clock, CheckCircle2, ChevronRight } from 'lucide-react';
import { playBrassChime } from '../utils/audioAmbience';

export const CraftsmanshipSection: React.FC = () => {
  const [activeTechniqueId, setActiveTechniqueId] = useState<string>(CRAFT_TECHNIQUES[0].id);

  const activeTechnique = CRAFT_TECHNIQUES.find((t) => t.id === activeTechniqueId) || CRAFT_TECHNIQUES[0];

  const getIcon = (name: string) => {
    switch (name) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#d4a359]" />;
      case 'Grid':
        return <Grid className="w-5 h-5 text-[#d4a359]" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-[#d4a359]" />;
      case 'Droplet':
        return <Droplet className="w-5 h-5 text-[#d4a359]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#d4a359]" />;
    }
  };

  return (
    <section id="craft-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#2e1e13]/80">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1e130a] border border-[#d4a359]/40 text-[#f3d393] text-xs font-display tracking-widest uppercase mb-3">
          <Layers className="w-3.5 h-3.5 text-[#d4a359]" />
          <span>Vedic Sthapatya & Awadhi Woodcraft</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#f7f2ea] tracking-tight">
          Anatomy of Royal Craftsmanship
        </h2>
        <p className="mt-3 text-sm sm:text-base text-stone-400 max-w-2xl font-sans">
          In an era of flat-pack disposable furniture, our karigars uphold ancient manual methods where every joint expands with the seasons and outlasts generations.
        </p>
      </div>

      {/* Interactive Technique Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Technique Tabs (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {CRAFT_TECHNIQUES.map((tech) => {
            const isSelected = tech.id === activeTechniqueId;
            return (
              <button
                key={tech.id}
                type="button"
                id={`tech-tab-${tech.id}`}
                onClick={() => {
                  setActiveTechniqueId(tech.id);
                  playBrassChime();
                }}
                className={`flex items-start gap-4 p-5 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-[#20150d] border-[#d4a359] shadow-[0_4px_20px_rgba(212,163,89,0.15)] scale-[1.01]'
                    : 'bg-[#140e09]/80 border-[#382618] hover:border-stone-500'
                }`}
              >
                <div className={`p-3 rounded-xl border ${isSelected ? 'bg-[#2b1b10] border-[#d4a359]' : 'bg-[#18110b] border-[#382618]'}`}>
                  {getIcon(tech.iconName)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-base font-bold text-[#f7f2ea]">
                      {tech.title}
                    </h3>
                    <ChevronRight className={`w-4 h-4 text-stone-500 transition-transform ${isSelected ? 'text-[#d4a359] translate-x-1' : ''}`} />
                  </div>
                  <span className="text-xs font-display text-[#d4a359] block mb-1">
                    {tech.subtitle}
                  </span>
                  <p className="text-xs text-stone-400 font-sans line-clamp-2">
                    {tech.description}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Deep Dive Stage (7 cols) */}
        <div className="lg:col-span-7 p-8 sm:p-10 rounded-3xl bg-[#140e09]/95 border border-[#3e2b1d] shadow-2xl relative overflow-hidden">
          {/* Subtle gold ornamentation glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#d4a359]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col gap-6">
            <div className="flex items-center justify-between border-b border-[#342216] pb-4">
              <div>
                <span className="text-xs font-mono text-[#d4a359] uppercase tracking-widest block">
                  Heritage Masterclass
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  {activeTechnique.title}
                </h3>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#20150e] border border-[#442f1f] text-xs font-mono text-amber-200">
                <Clock className="w-3.5 h-3.5 text-[#d4a359]" />
                <span>{activeTechnique.timeToComplete}</span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-stone-300 leading-relaxed font-sans">
              {activeTechnique.description}
            </p>

            {/* Visual Process Diagram Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-2">
              <div className="p-4 rounded-2xl bg-[#1a110b] border border-[#382618]">
                <span className="text-[11px] font-mono text-stone-400 uppercase block mb-1">Origin & Guild</span>
                <span className="font-serif text-sm font-bold text-amber-100">{activeTechnique.heritage}</span>
              </div>
              <div className="p-4 rounded-2xl bg-[#1a110b] border border-[#382618]">
                <span className="text-[11px] font-mono text-stone-400 uppercase block mb-1">Artisanal Cluster</span>
                <span className="font-serif text-sm font-bold text-amber-100">{activeTechnique.region}</span>
              </div>
            </div>

            {/* Why it Matters Checklist */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-serif font-bold text-amber-200 uppercase tracking-wider">
                Preservation Standards:
              </h4>
              <div className="flex items-start gap-2.5 text-xs text-stone-300">
                <CheckCircle2 className="w-4 h-4 text-[#d4a359] shrink-0 mt-0.5" />
                <span>Harvested solely from government-approved sustainable plantations with Vriksh Certification.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-stone-300">
                <CheckCircle2 className="w-4 h-4 text-[#d4a359] shrink-0 mt-0.5" />
                <span>Zero toxic formaldehyde or solvent-based synthetic adhesives used anywhere in construction.</span>
              </div>
              <div className="flex items-start gap-2.5 text-xs text-stone-300">
                <CheckCircle2 className="w-4 h-4 text-[#d4a359] shrink-0 mt-0.5" />
                <span>Naturally termite-proofed through immersion in hot mustard oil and crushed neem seed extract.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
