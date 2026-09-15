import React from 'react';
import { ARTISAN_STORIES, CLIENT_TESTIMONIALS } from '../data/furnitureData';
import { Award, ShieldCheck, Heart, Star, MapPin, Quote } from 'lucide-react';

export const ArtisanStoriesSection: React.FC = () => {
  return (
    <section id="artisans-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#2e1e13]/80">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1e130a] border border-[#d4a359]/40 text-[#f3d393] text-xs font-display tracking-widest uppercase mb-3">
          <Award className="w-3.5 h-3.5 text-[#d4a359]" />
          <span>The Human Hand</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#f7f2ea] tracking-tight">
          Master Karigars & Lineages
        </h2>
        <p className="mt-3 text-sm sm:text-base text-stone-400 max-w-2xl font-sans">
          In our workshops, furniture is not manufactured by machines on an assembly line. It is chiseled by hands whose ancestors carved the gates of Rajput forts and Mughal palaces.
        </p>
      </div>

      {/* Artisan Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {ARTISAN_STORIES.map((artisan, idx) => (
          <div
            key={idx}
            className="group p-8 rounded-3xl bg-[#140e09]/95 border border-[#3e2b1d] hover:border-[#d4a359]/70 transition-all duration-300 flex flex-col justify-between shadow-xl"
          >
            <div>
              {/* Header Avatar Placeholder with Indian Motif */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#d4a359] to-[#7a4f21] p-0.5 shadow-lg">
                  <div className="w-full h-full rounded-[14px] bg-[#1c120a] flex items-center justify-center font-serif text-2xl text-amber-200">
                    {artisan.name.charAt(0)}
                  </div>
                </div>
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#f7f2ea] group-hover:text-[#f3d393] transition-colors">
                    {artisan.name}
                  </h3>
                  <span className="text-xs font-display text-[#d4a359] block">
                    {artisan.lineage}
                  </span>
                  <span className="text-[11px] text-stone-400 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-stone-500" />
                    {artisan.location}
                  </span>
                </div>
              </div>

              {/* Quote */}
              <div className="relative p-4 rounded-2xl bg-[#1a110b] border border-[#342216] mb-6">
                <Quote className="w-6 h-6 text-[#d4a359]/20 absolute top-2 right-2 pointer-events-none" />
                <p className="text-xs text-stone-300 italic leading-relaxed">
                  "{artisan.quote}"
                </p>
              </div>
            </div>

            {/* Specialty & Experience */}
            <div className="border-t border-[#291b11] pt-4 flex items-center justify-between text-xs">
              <div>
                <span className="text-stone-500 block text-[10px]">Specialization</span>
                <span className="font-medium text-stone-200">{artisan.specialty}</span>
              </div>
              <div className="text-right">
                <span className="text-stone-500 block text-[10px]">Devotion</span>
                <span className="font-mono text-[#d4a359] font-bold">{artisan.experienceYears} Years</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust & Certification Guarantee Badges */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#1c120a] via-[#21160d] to-[#170e08] border border-[#442e1d] shadow-2xl mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center md:items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-[#2b1a0e] border border-[#d4a359]/40 text-[#d4a359] shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-amber-100 mb-1">
                100-Year Heirloom Warranty
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Guaranteed against structural joint failure. Seasoned timber expands naturally with monsoons and dry spells without cracking.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center md:items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-[#2b1a0e] border border-[#d4a359]/40 text-[#d4a359] shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-amber-100 mb-1">
                Vriksh Legal Timber Certified
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                Compliant with Indian Forest Department and CITES regulations. Every log is sustainably procured with traceable provenance.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center md:items-start gap-4">
            <div className="p-3.5 rounded-2xl bg-[#2b1a0e] border border-[#d4a359]/40 text-[#d4a359] shrink-0">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-base font-bold text-amber-100 mb-1">
                Direct Artisan Fair Guild Share
              </h4>
              <p className="text-xs text-stone-400 leading-relaxed">
                60% of all commission profits go directly to the master carvers and apprentices, safeguarding endangered heritage crafts.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Heirloom Stories / Client Reviews */}
      <div>
        <h3 className="font-serif text-2xl font-bold text-center text-white mb-8">
          Stories from Sovereign Residences
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CLIENT_TESTIMONIALS.map((test, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-[#140e09] border border-[#342216] flex flex-col justify-between"
            >
              <div>
                {/* Rating stars */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(test.rating)].map((_, s) => (
                    <Star key={s} className="w-4 h-4 fill-[#d4a359] text-[#d4a359]" />
                  ))}
                </div>
                <p className="text-xs text-stone-300 italic leading-relaxed mb-4">
                  "{test.text}"
                </p>
              </div>

              <div className="border-t border-[#291b11] pt-3">
                <span className="font-serif text-sm font-bold text-amber-100 block">
                  {test.author}
                </span>
                <span className="text-[11px] text-stone-400 flex items-center justify-between">
                  <span>{test.location}</span>
                  <span className="font-mono text-[10px] text-[#d4a359]">{test.year}</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
