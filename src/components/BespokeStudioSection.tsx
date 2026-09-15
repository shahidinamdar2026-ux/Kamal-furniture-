import React, { useState } from 'react';
import { WoodFinish, FabricType, BespokeConfig } from '../types';
import { WOOD_FINISHES, FABRICS } from '../data/furnitureData';
import { Sparkles, Sliders, CheckCircle2, Send, ShieldAlert, Award } from 'lucide-react';
import { playBrassChime } from '../utils/audioAmbience';
import confetti from 'canvas-confetti';

interface Props {
  currency: 'INR' | 'USD' | 'EUR' | 'AED';
  onBespokeSubmit: (config: BespokeConfig) => void;
}

export const BespokeStudioSection: React.FC<Props> = ({ currency, onBespokeSubmit }) => {
  const [furnitureType, setFurnitureType] = useState('Maharaja Jharokha Jhula');
  const [wood, setWood] = useState<WoodFinish>('sheesham');
  const [width, setWidth] = useState(72);
  const [depth, setDepth] = useState(32);
  const [height, setHeight] = useState(78);
  const [fabric, setFabric] = useState<FabricType>('crimson_silk');
  const [brassWork, setBrassWork] = useState<'hand_hammered' | 'antique_patina' | 'pure_mirror_brass' | 'brass_inlay'>('brass_inlay');
  const [customPlaque, setCustomPlaque] = useState('The Singhania Heritage • Est. 2026');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Dynamic estimate formula based on volume & craft complexity
  const cubicFeet = (width * depth * height) / 1728;
  const baseRate = wood === 'rosewood' ? 1800 : wood === 'teak' ? 1650 : wood === 'antique_walnut' ? 1500 : 1350;
  const brassMultiplier = brassWork === 'brass_inlay' ? 1.35 : brassWork === 'hand_hammered' ? 1.25 : 1.15;
  const estimatedINR = Math.round(cubicFeet * baseRate * brassMultiplier + 45000);

  const formatPrice = (inr: number) => {
    switch (currency) {
      case 'USD':
        return `$${Math.round(inr / 86).toLocaleString()}`;
      case 'EUR':
        return `€${Math.round(inr / 93).toLocaleString()}`;
      case 'AED':
        return `AED ${(Math.round(inr / 23.4)).toLocaleString()}`;
      default:
        return `₹${inr.toLocaleString('en-IN')}`;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playBrassChime();
    const config: BespokeConfig = {
      furnitureType,
      wood,
      widthInches: width,
      depthInches: depth,
      heightInches: height,
      fabric,
      brassWork,
      customPlaqueText: customPlaque,
      notes,
    };
    onBespokeSubmit(config);
    setSubmitted(true);

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.8 },
      colors: ['#d4a359', '#ffd98a', '#82161b', '#ffffff'],
    });

    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <section id="bespoke-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#2e1e13]/80">
      {/* Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1e130a] border border-[#d4a359]/40 text-[#f3d393] text-xs font-display tracking-widest uppercase mb-3">
          <Sliders className="w-3.5 h-3.5 text-[#d4a359]" />
          <span>Made to Measure Commissions</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#f7f2ea] tracking-tight">
          Bespoke Commission Studio
        </h2>
        <p className="mt-3 text-sm sm:text-base text-stone-400 max-w-2xl font-sans">
          Every royal home has distinct architectural proportions. Specify your custom dimensions, timber variety, brass accents, and custom engraved lineage plaque.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Configuration Controls (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6 p-6 sm:p-8 rounded-3xl bg-[#140e09]/95 border border-[#3e2b1d] shadow-xl">
          {/* Furniture Type Selector */}
          <div>
            <label className="text-xs font-serif font-bold text-amber-100 block mb-2">
              Select Furniture Archetype:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                'Maharaja Jharokha Jhula',
                'Royal Baithak Throne',
                'Jaisalmer Damchiya Chest',
                'Gopuram Teak Mandir',
                'Darbhanga Jaali Table',
                'Bespoke Diwan Daybed',
              ].map((type) => (
                <button
                  key={type}
                  type="button"
                  id={`type-btn-${type.replace(/\s+/g, '-')}`}
                  onClick={() => setFurnitureType(type)}
                  className={`p-3 rounded-xl text-xs font-display text-left border transition-all ${
                    furnitureType === type
                      ? 'bg-[#2b1b10] border-[#d4a359] text-amber-200 font-bold shadow'
                      : 'bg-[#18110b] border-[#382618] text-stone-300 hover:border-stone-500'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Dimension Sliders */}
          <div className="space-y-4 p-4 rounded-2xl bg-[#18110b] border border-[#342216]">
            <span className="text-xs font-serif font-bold text-amber-100 block">
              Custom Proportions (Inches):
            </span>

            {/* Width */}
            <div>
              <div className="flex justify-between text-xs text-stone-300 mb-1">
                <span>Width:</span>
                <span className="font-mono text-[#d4a359] font-bold">{width} inches ({Math.round(width * 2.54)} cm)</span>
              </div>
              <input
                type="range"
                min={36}
                max={108}
                step={2}
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="w-full accent-[#d4a359] bg-stone-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Depth */}
            <div>
              <div className="flex justify-between text-xs text-stone-300 mb-1">
                <span>Depth:</span>
                <span className="font-mono text-[#d4a359] font-bold">{depth} inches ({Math.round(depth * 2.54)} cm)</span>
              </div>
              <input
                type="range"
                min={18}
                max={48}
                step={2}
                value={depth}
                onChange={(e) => setDepth(Number(e.target.value))}
                className="w-full accent-[#d4a359] bg-stone-800 rounded-lg cursor-pointer"
              />
            </div>

            {/* Height */}
            <div>
              <div className="flex justify-between text-xs text-stone-300 mb-1">
                <span>Height:</span>
                <span className="font-mono text-[#d4a359] font-bold">{height} inches ({Math.round(height * 2.54)} cm)</span>
              </div>
              <input
                type="range"
                min={24}
                max={96}
                step={2}
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full accent-[#d4a359] bg-stone-800 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Timber Species */}
          <div>
            <label className="text-xs font-serif font-bold text-amber-100 block mb-2">
              Primary Seasoned Timber:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(Object.keys(WOOD_FINISHES) as WoodFinish[]).slice(0, 4).map((f) => (
                <button
                  key={f}
                  type="button"
                  id={`bespoke-wood-${f}`}
                  onClick={() => setWood(f)}
                  className={`p-2.5 rounded-xl text-xs font-display flex items-center gap-2 border transition-all ${
                    wood === f
                      ? 'bg-[#2b1b10] border-[#d4a359] text-amber-200 font-bold'
                      : 'bg-[#18110b] border-[#382618] text-stone-400'
                  }`}
                >
                  <span
                    className="w-3 h-3 rounded-full border border-black/30 shrink-0"
                    style={{ backgroundColor: WOOD_FINISHES[f].hex }}
                  />
                  <span className="truncate">{WOOD_FINISHES[f].name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Brass Hardware Finish */}
          <div>
            <label className="text-xs font-serif font-bold text-amber-100 block mb-2">
              Brass Accents & Hardware Finish:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'brass_inlay', label: 'Tarkashi Wire Inlay' },
                { id: 'hand_hammered', label: 'Hand-Hammered Repoussé' },
                { id: 'antique_patina', label: 'Aged Temple Patina' },
                { id: 'pure_mirror_brass', label: 'Mirror Polished Brass' },
              ].map((b) => (
                <button
                  key={b.id}
                  type="button"
                  id={`bespoke-brass-${b.id}`}
                  onClick={() => setBrassWork(b.id as any)}
                  className={`p-2.5 rounded-xl text-xs text-center border transition-all ${
                    brassWork === b.id
                      ? 'bg-[#2b1b10] border-[#d4a359] text-amber-200 font-bold'
                      : 'bg-[#18110b] border-[#382618] text-stone-400'
                  }`}
                >
                  {b.label}
                </button>
              ))}
            </div>
          </div>

          {/* Custom Engraved Plaque Text */}
          <div>
            <label className="text-xs font-serif font-bold text-amber-100 block mb-1.5">
              Custom Engraved Brass Heirloom Plaque (Optional):
            </label>
            <input
              type="text"
              id="bespoke-plaque-input"
              value={customPlaque}
              onChange={(e) => setCustomPlaque(e.target.value)}
              placeholder="e.g. The Singhania Heritage • Est. 2026"
              className="w-full bg-[#18110b] text-amber-200 text-sm py-2.5 px-3.5 rounded-xl border border-[#3e2b1d] focus:outline-none focus:border-[#d4a359]"
            />
          </div>

          {/* Custom Notes */}
          <div>
            <label className="text-xs font-serif font-bold text-amber-100 block mb-1.5">
              Special Architectural Notes or Ceiling Suspension Height:
            </label>
            <textarea
              id="bespoke-notes-input"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Living room ceiling height is 11.5 feet, need additional brass chain length..."
              className="w-full bg-[#18110b] text-stone-200 text-xs py-2 px-3 rounded-xl border border-[#3e2b1d] focus:outline-none focus:border-[#d4a359]"
            />
          </div>
        </div>

        {/* Right: Live Plaque & Quote Dossier (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Real-time Engraved Brass Plaque Preview */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#d4a359] via-[#b8853b] to-[#78511e] p-[2px] shadow-2xl">
            <div className="bg-[#1a120b] p-6 rounded-[22px] flex flex-col items-center text-center relative overflow-hidden">
              {/* Brass Screws at Corners */}
              <div className="absolute top-3 left-3 w-2.5 h-2.5 rounded-full bg-[#d4a359] border border-black/60 shadow" />
              <div className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-[#d4a359] border border-black/60 shadow" />
              <div className="absolute bottom-3 left-3 w-2.5 h-2.5 rounded-full bg-[#d4a359] border border-black/60 shadow" />
              <div className="absolute bottom-3 right-3 w-2.5 h-2.5 rounded-full bg-[#d4a359] border border-black/60 shadow" />

              <span className="text-[10px] font-mono tracking-widest text-[#d4a359] uppercase mb-1">
                Hand-Chiseled Brass Plaque
              </span>
              <div className="w-full py-4 border-y border-[#d4a359]/30 my-2">
                <span className="font-serif text-base sm:text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ffe4aa] via-[#f7d69e] to-[#c99547] tracking-wider uppercase drop-shadow">
                  {customPlaque || 'KAMAL FURNITURE HEIRLOOM'}
                </span>
              </div>
              <span className="text-[10px] text-stone-400 font-serif italic">
                Affixed to the underside of the central carved plank
              </span>
            </div>
          </div>

          {/* Real-Time Price Dossier */}
          <div className="p-6 sm:p-8 rounded-3xl bg-[#140e09]/95 border border-[#3e2b1d] shadow-xl flex flex-col gap-5">
            <div className="border-b border-[#342216] pb-4">
              <span className="text-xs font-mono text-[#d4a359] uppercase tracking-wider block mb-1">
                Live Commission Estimate
              </span>
              <h3 className="font-serif text-3xl font-extrabold text-[#f3d393]">
                {formatPrice(estimatedINR)}
              </h3>
              <span className="text-xs text-stone-400">
                Inclusive of master karigar hand carving & packaging.
              </span>
            </div>

            <div className="space-y-2 text-xs text-stone-300">
              <div className="flex justify-between border-b border-[#291b11] pb-1.5">
                <span className="text-stone-500">Timber Volume:</span>
                <span className="font-mono text-stone-200">{cubicFeet.toFixed(2)} Cu. Ft.</span>
              </div>
              <div className="flex justify-between border-b border-[#291b11] pb-1.5">
                <span className="text-stone-500">Selected Species:</span>
                <span className="font-medium text-stone-200">{WOOD_FINISHES[wood].name}</span>
              </div>
              <div className="flex justify-between border-b border-[#291b11] pb-1.5">
                <span className="text-stone-500">Hardware Accents:</span>
                <span className="text-stone-200 capitalize">{brassWork.replace(/_/g, ' ')}</span>
              </div>
              <div className="flex justify-between border-b border-[#291b11] pb-1.5">
                <span className="text-stone-500">Estimated Craft Time:</span>
                <span className="font-mono text-amber-200">4 to 6 Weeks</span>
              </div>
            </div>

            <button
              type="submit"
              id="bespoke-submit-brief-btn"
              className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-gradient-to-r from-[#d4a359] via-[#c28f45] to-[#a3702e] text-[#140c06] font-bold text-sm tracking-wide shadow-xl hover:brightness-110 active:scale-95 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Submit Bespoke Commission Brief</span>
            </button>

            {submitted && (
              <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-200 text-xs text-center animate-in fade-in">
                ✓ Commission brief registered! Our Senior Ustaad will review your proportions and reach out within 24 hours.
              </div>
            )}
          </div>
        </div>
      </form>
    </section>
  );
};
