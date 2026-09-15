import React, { useState } from 'react';
import { FurniturePiece, WoodFinish, FabricType } from '../types';
import { FURNITURE_PIECES, WOOD_FINISHES } from '../data/furnitureData';
import { Sparkles, Eye, ShoppingBag, ShieldCheck, MapPin, Feather } from 'lucide-react';
import { playBrassChime } from '../utils/audioAmbience';

interface Props {
  currency: 'INR' | 'USD' | 'EUR' | 'AED';
  onSelectPieceForAtelier: (pieceId: string) => void;
  onAddToCart: (piece: FurniturePiece, wood: WoodFinish, fabric?: FabricType) => void;
}

export const CollectionSection: React.FC<Props> = ({
  currency,
  onSelectPieceForAtelier,
  onAddToCart,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filterOptions = [
    { key: 'all', label: 'All Dynasties' },
    { key: 'Rajasthan', label: 'Rajasthan (Mewar)' },
    { key: 'Saharanpur', label: 'Saharanpur (Awadh)' },
    { key: 'Chettinad', label: 'Chettinad (Dravidian)' },
    { key: 'Kashmir', label: 'Kashmir (Walnut)' },
  ];

  const filteredPieces = FURNITURE_PIECES.filter((piece) => {
    if (activeFilter === 'all') return true;
    return piece.region === activeFilter;
  });

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
    <section id="collections-section" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-[#2e1e13]/80">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1e130a] border border-[#d4a359]/40 text-[#f3d393] text-xs font-display tracking-widest uppercase mb-3">
          <Feather className="w-3.5 h-3.5 text-[#d4a359]" />
          <span>The Sovereign Catalog</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#f7f2ea] tracking-tight">
          Dynastic Collections
        </h2>
        <p className="mt-3 text-sm sm:text-base text-stone-400 max-w-2xl font-sans">
          Archival reproductions and authentic commissions preserving the distinct woodworking lineages of India's most celebrated artisan hubs.
        </p>

        {/* Region Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {filterOptions.map((opt) => (
            <button
              key={opt.key}
              type="button"
              id={`filter-btn-${opt.key}`}
              onClick={() => {
                setActiveFilter(opt.key);
                playBrassChime();
              }}
              className={`px-4 py-2 rounded-xl text-xs font-display transition-all ${
                activeFilter === opt.key
                  ? 'bg-[#d4a359] text-[#140d07] font-bold shadow-lg scale-102'
                  : 'bg-[#18110b] text-stone-300 hover:text-white border border-[#342216]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Furniture Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPieces.map((piece) => {
          return (
            <div
              key={piece.id}
              className="group flex flex-col justify-between rounded-3xl bg-[#140e09]/90 border border-[#3d2a1b] overflow-hidden hover:border-[#d4a359]/70 transition-all duration-300 shadow-xl hover:shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
            >
              {/* Card Visual Header / Banner */}
              <div className="relative h-64 w-full bg-gradient-to-b from-[#21160e] to-[#120b07] flex items-center justify-center p-6 overflow-hidden">
                {/* Visual Indian Arch Watermark */}
                <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
                  <div className="w-48 h-48 rounded-full border-4 border-[#d4a359] rotate-45" />
                </div>

                {/* Model Graphic Representation */}
                <div className="relative z-10 flex flex-col items-center text-center">
                  <span className="font-serif text-5xl text-[#d4a359]/40 mb-2 group-hover:scale-110 group-hover:text-[#d4a359]/70 transition-all duration-300">
                    {piece.modelKey === 'jhula'
                      ? '🏛️'
                      : piece.modelKey === 'damchiya'
                      ? '🧰'
                      : piece.modelKey === 'throne_chair'
                      ? '👑'
                      : piece.modelKey === 'mandir'
                      ? '🛕'
                      : '🏺'}
                  </span>
                  <span className="text-xs font-serif text-amber-200/90 italic font-semibold">
                    {piece.hindiName}
                  </span>
                </div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#18110a]/90 border border-[#3d2a1b] text-[10px] font-mono text-[#d4a359]">
                  <MapPin className="w-3 h-3" />
                  <span>{piece.region}</span>
                </div>

                <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-[#18110a]/90 border border-[#3d2a1b] text-[10px] font-mono text-stone-300">
                  {piece.category}
                </div>

                {/* Quick 3D Inspect Hover Overlay */}
                <div className="absolute inset-0 bg-[#0e0a07]/80 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    type="button"
                    onClick={() => {
                      onSelectPieceForAtelier(piece.id);
                      playBrassChime();
                      const el = document.getElementById('atelier-section');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#d4a359] text-[#140c06] font-bold text-xs shadow-lg hover:brightness-110 active:scale-95 transition-all"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View in 3D Atelier</span>
                  </button>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#f7f2ea] mb-1 group-hover:text-[#f3d393] transition-colors">
                    {piece.name}
                  </h3>
                  <p className="text-xs text-stone-400 font-sans line-clamp-2 mb-4 leading-relaxed">
                    {piece.tagline}
                  </p>

                  {/* Highlights */}
                  <div className="space-y-1.5 mb-5 text-[11px] text-stone-300">
                    <div className="flex items-center justify-between border-b border-[#291b11] pb-1">
                      <span className="text-stone-500">Wood:</span>
                      <span className="font-medium text-stone-200">{piece.woodSpecies.split('(')[0]}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-[#291b11] pb-1">
                      <span className="text-stone-500">Dimensions:</span>
                      <span className="font-mono text-stone-200">
                        {piece.dimensions.width}" × {piece.dimensions.depth}" × {piece.dimensions.height}"
                      </span>
                    </div>
                    <div className="flex items-center justify-between border-b border-[#291b11] pb-1">
                      <span className="text-stone-500">Weight:</span>
                      <span className="font-mono text-stone-200">{piece.dimensions.weightKg} kg</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer: Price & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-[#291b11]">
                  <div>
                    <span className="text-[10px] text-stone-500 uppercase tracking-wider block">Price</span>
                    <span className="font-serif text-lg font-bold text-[#f3d393]">
                      {formatPrice(piece.priceINR)}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      id={`card-3d-${piece.id}`}
                      onClick={() => {
                        onSelectPieceForAtelier(piece.id);
                        playBrassChime();
                        const el = document.getElementById('atelier-section');
                        el?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="p-2.5 rounded-xl bg-[#1b120c] hover:bg-[#25180f] text-stone-300 border border-[#3d2a1b] transition-all"
                      title="Open 3D Model"
                    >
                      <Eye className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      id={`card-add-${piece.id}`}
                      onClick={() => {
                        onAddToCart(piece, piece.defaultWood, piece.defaultFabric);
                        playBrassChime();
                      }}
                      className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-[#d4a359] text-[#120a05] font-bold text-xs hover:brightness-110 active:scale-95 transition-all shadow"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Inquire</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
