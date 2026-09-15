import React, { useState } from 'react';
import { FurniturePiece, WoodFinish, FabricType, LightingMood, CartItem } from '../types';
import { FURNITURE_PIECES, WOOD_FINISHES, FABRICS, LIGHTING_MOODS } from '../data/furnitureData';
import { ThreeFurnitureViewer } from '../three/ThreeFurnitureViewer';
import { Sparkles, Check, ShoppingBag, Ruler, Clock, Hammer, ShieldCheck, Sun, Moon, Flame } from 'lucide-react';
import { playBrassChime } from '../utils/audioAmbience';
import confetti from 'canvas-confetti';

interface Props {
  currency: 'INR' | 'USD' | 'EUR' | 'AED';
  onAddToCart: (piece: FurniturePiece, wood: WoodFinish, fabric?: FabricType) => void;
  selectedPieceId?: string;
}

export const Atelier3DSection: React.FC<Props> = ({
  currency,
  onAddToCart,
  selectedPieceId,
}) => {
  const [activePieceIndex, setActivePieceIndex] = useState<number>(() => {
    if (selectedPieceId) {
      const idx = FURNITURE_PIECES.findIndex((p) => p.id === selectedPieceId);
      return idx >= 0 ? idx : 0;
    }
    return 0;
  });

  const activePiece = FURNITURE_PIECES[activePieceIndex] || FURNITURE_PIECES[0];

  const [activeWood, setActiveWood] = useState<WoodFinish>(activePiece.defaultWood);
  const [activeFabric, setActiveFabric] = useState<FabricType>(activePiece.defaultFabric || 'crimson_silk');
  const [activeLighting, setActiveLighting] = useState<LightingMood>('haveli_sunset');
  const [addedToast, setAddedToast] = useState(false);

  // When active piece changes, reset to its defaults
  const handlePieceChange = (idx: number) => {
    setActivePieceIndex(idx);
    const p = FURNITURE_PIECES[idx];
    setActiveWood(p.defaultWood);
    if (p.defaultFabric) {
      setActiveFabric(p.defaultFabric);
    }
    playBrassChime();
  };

  const handleCommissionClick = () => {
    onAddToCart(activePiece, activeWood, activePiece.defaultFabric ? activeFabric : undefined);
    playBrassChime();
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#d4a359', '#82161b', '#f4efe8', '#c97d10'],
    });
  };

  // Currency conversion calculation
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

  return (
    <section id="atelier-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1e130a] border border-[#d4a359]/40 text-[#f3d393] text-xs font-display tracking-widest uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#d4a359]" />
          <span>Interactive 3D Craft Studio</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#f7f2ea] tracking-tight">
          The Royal 3D Atelier
        </h2>
        <p className="mt-3 text-sm sm:text-base text-stone-400 max-w-2xl font-sans">
          Select any heirloom masterpiece below. Rotate 360°, inspect mortise-and-tenon chool joinery in exploded view, customize timber finishes, and test haveli lighting.
        </p>

        {/* Masterpiece Model Switcher Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 rounded-2xl bg-[#140e0a] border border-[#3d2a1b] shadow-xl">
          {FURNITURE_PIECES.map((piece, idx) => {
            const isSelected = idx === activePieceIndex;
            return (
              <button
                key={piece.id}
                type="button"
                id={`piece-tab-${idx}`}
                onClick={() => handlePieceChange(idx)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-display font-medium transition-all ${
                  isSelected
                    ? 'bg-[#d4a359] text-[#140d07] font-bold shadow-lg scale-102'
                    : 'text-stone-300 hover:text-white hover:bg-[#20150d]'
                }`}
              >
                <span>{piece.name.replace('The ', '')}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main 3D Studio Layout: Left 3D Viewport, Right Customization Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: 3D Interactive Viewport (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="relative w-full h-[520px] sm:h-[580px] lg:h-[640px]">
            <ThreeFurnitureViewer
              piece={activePiece}
              wood={activeWood}
              fabric={activeFabric}
              lightingMood={activeLighting}
            />
          </div>

          {/* Lighting Mood Quick Bar */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#140e0a] border border-[#3d2a1b]">
            <span className="text-xs font-display text-stone-400 flex items-center gap-1.5 pl-2">
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>Haveli Lighting:</span>
            </span>
            <div className="flex items-center gap-1.5 flex-wrap">
              {(Object.keys(LIGHTING_MOODS) as LightingMood[]).map((mood) => (
                <button
                  key={mood}
                  type="button"
                  id={`mood-btn-${mood}`}
                  onClick={() => setActiveLighting(mood)}
                  className={`px-2.5 py-1 rounded-xl text-[11px] font-medium transition-all ${
                    activeLighting === mood
                      ? 'bg-[#d4a359] text-[#140c06] font-bold shadow'
                      : 'text-stone-400 hover:text-white bg-[#1b120c]'
                  }`}
                >
                  {LIGHTING_MOODS[mood].name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Masterpiece Dossier & Customization Panel (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6 p-6 sm:p-8 rounded-3xl bg-[#140e09]/95 border border-[#3e2b1d] shadow-2xl backdrop-blur-md">
          {/* Header Title & Hindi Name */}
          <div className="border-b border-[#342216] pb-5">
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-xs font-mono font-bold tracking-widest text-[#d4a359] uppercase">
                {activePiece.region} • {activePiece.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-950/70 text-amber-200 text-[11px] font-medium border border-amber-800/40">
                {activePiece.inStock ? 'Made to Order' : 'Curated Archive'}
              </span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-1">
              {activePiece.name}
            </h3>
            <span className="text-sm font-serif text-[#d4a359]/80 italic">
              {activePiece.hindiName}
            </span>
            <p className="mt-3 text-xs sm:text-sm text-stone-300 leading-relaxed font-sans">
              {activePiece.description}
            </p>
          </div>

          {/* Wood Species Finishes Selector */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-xs font-serif font-bold text-amber-100 flex items-center gap-1.5">
                <span>Wood Species & Finish:</span>
              </label>
              <span className="text-[11px] text-[#d4a359] font-medium">
                {WOOD_FINISHES[activeWood].name}
              </span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {(Object.keys(WOOD_FINISHES) as WoodFinish[]).map((finish) => {
                const isSelected = activeWood === finish;
                return (
                  <button
                    key={finish}
                    type="button"
                    id={`wood-choice-${finish}`}
                    onClick={() => setActiveWood(finish)}
                    className={`group flex flex-col items-center p-2 rounded-xl border transition-all ${
                      isSelected
                        ? 'bg-[#2b1b11] border-[#d4a359] shadow-[0_0_10px_rgba(212,163,89,0.3)]'
                        : 'bg-[#18100a] border-[#382618] hover:border-stone-500'
                    }`}
                  >
                    <div
                      className="w-7 h-7 rounded-full border border-black/40 shadow-inner flex items-center justify-center transition-transform group-hover:scale-105"
                      style={{ backgroundColor: WOOD_FINISHES[finish].hex }}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 text-white drop-shadow" />}
                    </div>
                    <span className="text-[10px] text-stone-300 font-medium mt-1 truncate max-w-full text-center">
                      {finish === 'sheesham'
                        ? 'Sheesham'
                        : finish === 'teak'
                        ? 'Teak'
                        : finish === 'rosewood'
                        ? 'Rosewood'
                        : finish === 'antique_walnut'
                        ? 'Walnut'
                        : 'Sandal'}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="text-[11px] text-stone-400 mt-2 italic">
              {WOOD_FINISHES[activeWood].desc}
            </p>
          </div>

          {/* Fabric Selector (If piece has upholstery) */}
          {activePiece.defaultFabric && (
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <label className="text-xs font-serif font-bold text-amber-100">
                  Upholstery Fabric & Silk:
                </label>
                <span className="text-[11px] text-[#d4a359] font-medium">
                  {FABRICS[activeFabric].name}
                </span>
              </div>
              <div className="grid grid-cols-5 gap-2">
                {(Object.keys(FABRICS) as FabricType[]).map((fab) => {
                  const isSelected = activeFabric === fab;
                  return (
                    <button
                      key={fab}
                      type="button"
                      id={`fabric-choice-${fab}`}
                      onClick={() => setActiveFabric(fab)}
                      className={`group flex flex-col items-center p-2 rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-[#2b1b11] border-[#d4a359] shadow-[0_0_10px_rgba(212,163,89,0.3)]'
                          : 'bg-[#18100a] border-[#382618] hover:border-stone-500'
                      }`}
                    >
                      <div
                        className="w-7 h-7 rounded-full border border-black/40 shadow-inner flex items-center justify-center transition-transform group-hover:scale-105"
                        style={{ backgroundColor: FABRICS[fab].hex }}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 text-white drop-shadow" />}
                      </div>
                      <span className="text-[10px] text-stone-300 font-medium mt-1 truncate max-w-full text-center">
                        {fab === 'crimson_silk'
                          ? 'Crimson'
                          : fab === 'peacock_velvet'
                          ? 'Peacock'
                          : fab === 'marigold_brocade'
                          ? 'Marigold'
                          : fab === 'emerald_velvet'
                          ? 'Emerald'
                          : 'Khadi'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Specifications Grid */}
          <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-[#19110b] border border-[#342216] text-xs">
            <div className="flex items-center gap-2">
              <Ruler className="w-4 h-4 text-[#d4a359]" />
              <div>
                <span className="text-stone-400 block text-[10px]">Dimensions</span>
                <span className="font-mono text-stone-200">
                  {activePiece.dimensions.width}"W × {activePiece.dimensions.depth}"D × {activePiece.dimensions.height}"H
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#d4a359]" />
              <div>
                <span className="text-stone-400 block text-[10px]">Lead Time</span>
                <span className="font-mono text-stone-200">{activePiece.leadTimeWeeks} Weeks</span>
              </div>
            </div>
            <div className="flex items-center gap-2 col-span-2 border-t border-[#2d1e13] pt-2">
              <Hammer className="w-4 h-4 text-[#d4a359]" />
              <div>
                <span className="text-stone-400 block text-[10px]">Master Artisan Lineage</span>
                <span className="text-stone-200 text-[11px]">{activePiece.artisanLineage}</span>
              </div>
            </div>
          </div>

          {/* Price & Add to Inquiry Brief Button */}
          <div className="flex items-center justify-between gap-4 pt-2 border-t border-[#342216]">
            <div>
              <span className="text-[10px] text-stone-400 uppercase tracking-wider block">
                Estimated Atelier Price
              </span>
              <span className="font-serif text-2xl sm:text-3xl font-extrabold text-[#f3d393]">
                {formatPrice(activePiece.priceINR)}
              </span>
            </div>

            <button
              type="button"
              id="atelier-add-inquiry-btn"
              onClick={handleCommissionClick}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#d4a359] via-[#c49147] to-[#a06c2c] text-[#120a05] font-bold text-sm tracking-wide shadow-xl hover:brightness-110 active:scale-95 transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{addedToast ? 'Added to Brief!' : 'Add to Inquiry'}</span>
            </button>
          </div>

          {addedToast && (
            <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-200 text-xs text-center animate-in fade-in">
              ✓ Added {activePiece.name} in {WOOD_FINISHES[activeWood].name} to your custom inquiry brief!
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
