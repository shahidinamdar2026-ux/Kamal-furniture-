import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ThreeFurnitureViewer } from '../three/ThreeFurnitureViewer';
import { FURNITURE_PIECES, WOOD_FINISHES, FABRICS } from '../data/furnitureData';
import { FurniturePiece, WoodFinish, FabricType } from '../types';
import { Sparkles, ShoppingBag, Send, ShieldCheck, Check, MessageSquare, Phone } from 'lucide-react';
import { playBrassChime } from '../utils/audioAmbience';
import confetti from 'canvas-confetti';

interface Props {
  currency: 'INR' | 'USD' | 'EUR' | 'AED';
  onAddToCart: (piece: FurniturePiece, wood: WoodFinish, fabric?: FabricType) => void;
  onOpenDrawer: () => void;
}

export const HeroSection: React.FC<Props> = ({ currency, onAddToCart, onOpenDrawer }) => {
  const [selectedPieceId, setSelectedPieceId] = useState<string>(FURNITURE_PIECES[0].id);
  const [selectedWood, setSelectedWood] = useState<WoodFinish>('sheesham');
  const [selectedFabric, setSelectedFabric] = useState<FabricType>('crimson_silk');
  const [addedAnimation, setAddedAnimation] = useState(false);

  const activePiece = FURNITURE_PIECES.find((p) => p.id === selectedPieceId) || FURNITURE_PIECES[0];

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

  const handlePieceChange = (piece: FurniturePiece) => {
    playBrassChime();
    setSelectedPieceId(piece.id);
    setSelectedWood(piece.defaultWood);
    if (piece.defaultFabric) {
      setSelectedFabric(piece.defaultFabric);
    }
  };

  const handleAddBrief = () => {
    playBrassChime();
    onAddToCart(activePiece, selectedWood, selectedFabric);
    setAddedAnimation(true);

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#d4a359', '#ffd98a', '#82161b'],
    });

    setTimeout(() => {
      setAddedAnimation(false);
    }, 2500);
  };

  const handleWhatsAppInquiry = () => {
    playBrassChime();
    const message = `Namaste Kamal Furniture,%0A%0AI am interested in inquiring about:%0A• ${activePiece.name} (${activePiece.hindiName})%0A• Selected Wood: ${WOOD_FINISHES[selectedWood].name}%0A• Dimensions: ${activePiece.dimensions.width}"W × ${activePiece.dimensions.depth}"D × ${activePiece.dimensions.height}"H%0A• Estimated Price: ${formatPrice(activePiece.priceINR)}`;
    const whatsappUrl = `https://wa.me/917378671779?text=${message}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="hero-section" className="relative min-h-[calc(100vh-80px)] flex flex-col justify-between overflow-hidden pt-6 pb-6">
      {/* Background Indian Jali Architectural Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#d4a359]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-[#82161b]/15 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Royal Narrative & Craft Controls (6 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="lg:col-span-6 flex flex-col items-start text-left"
          >
            {/* Regional Heritage Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#20150d] border border-[#d4a359]/40 text-[#f3d393] text-xs font-display tracking-widest uppercase mb-4 shadow-md">
              <Sparkles className="w-3.5 h-3.5 text-[#d4a359]" />
              <span>Rajasthan • Saharanpur • Chettinad</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#f7f2ea] leading-[1.14] tracking-tight mb-3">
              Heirloom Indian Furniture, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e7be7c] via-[#f7d69e] to-[#b37f39]">
                Carved for Dynasties.
              </span>
            </h1>

            {/* Tagline / Subtitle */}
            <p className="text-sm sm:text-base text-stone-300 font-sans leading-relaxed max-w-xl mb-5">
              Interactive 3D royal woodcraft atelier. Chiseled from 45-year naturally seasoned timber, joined by mortise-and-tenon interlocking woodwork, and accented with pure sand-cast brass.
            </p>

            {/* Masterpiece Model Switcher Tabs */}
            <div id="select-handcrafted-masterpiece" className="w-full mb-5 scroll-mt-24">
              <span className="text-[11px] font-mono text-stone-400 uppercase tracking-widest block mb-2.5">
                Select Handcrafted Masterpiece:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {FURNITURE_PIECES.map((piece) => {
                  const isSelected = piece.id === selectedPieceId;
                  return (
                    <button
                      key={piece.id}
                      type="button"
                      id={`hero-piece-${piece.id}`}
                      onClick={() => handlePieceChange(piece)}
                      className={`group p-2 rounded-xl text-left border transition-all flex flex-col gap-2 ${
                        isSelected
                          ? 'bg-[#25180f] border-[#d4a359] text-amber-200 shadow-[0_0_15px_rgba(212,163,89,0.25)] ring-1 ring-[#d4a359]/60'
                          : 'bg-[#150e09]/80 border-[#382618] text-stone-400 hover:text-stone-200 hover:border-[#d4a359]/50'
                      }`}
                    >
                      {piece.image && (
                        <div className="w-full h-16 sm:h-20 rounded-lg overflow-hidden relative bg-[#1c120a] border border-[#3e2b1d]">
                          <img
                            src={piece.image}
                            alt={piece.name}
                            referrerPolicy="no-referrer"
                            className={`w-full h-full object-cover transition-transform duration-300 ${
                              isSelected ? 'scale-105 brightness-105' : 'group-hover:scale-105 opacity-80 group-hover:opacity-100'
                            }`}
                          />
                          {isSelected && (
                            <div className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#d4a359] ring-2 ring-[#25180f]" />
                          )}
                        </div>
                      )}
                      <div>
                        <span className="font-serif text-sm font-bold block truncate text-stone-100">
                          {piece.name}
                        </span>
                        <span className="text-[10px] text-[#d4a359]/90 font-serif italic truncate block">
                          {piece.hindiName}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Piece Dossier Card */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-[#18110b]/90 border border-[#3e2b1d] w-full mb-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3.5">
              <div className="flex items-center gap-3">
                {activePiece.image && (
                  <img
                    src={activePiece.image}
                    alt={activePiece.name}
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl object-cover border border-[#d4a359]/40 shadow-sm shrink-0"
                  />
                )}
                <div>
                  <span className="text-[9px] sm:text-[10px] font-mono text-[#d4a359] uppercase block tracking-wider">
                    {activePiece.region} Guild • {activePiece.craftTechnique}
                  </span>
                  <span className="font-serif text-lg sm:text-xl font-bold text-white block">
                    {formatPrice(activePiece.priceINR)}
                  </span>
                  <span className="text-[10px] sm:text-[11px] text-stone-400 font-sans">
                    {activePiece.dimensions.width}"W × {activePiece.dimensions.depth}"D × {activePiece.dimensions.height}"H • {activePiece.dimensions.weightKg} kg
                  </span>
                </div>
              </div>
              <div className="text-left sm:text-right border-t sm:border-t-0 border-[#2d1e13] pt-2 sm:pt-0 shrink-0">
                <span className="text-[9px] sm:text-[10px] text-stone-500 block">Lead Time</span>
                <span className="text-xs font-mono text-amber-200 font-bold">
                  {activePiece.leadTimeWeeks} Weeks Hand-Carving
                </span>
              </div>
            </div>

            {/* CTA Buttons - Responsive Grid & Flex */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap items-center gap-2.5 w-full mb-6">
              <button
                type="button"
                id="hero-add-brief-btn"
                onClick={handleAddBrief}
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#d4a359] via-[#c28f45] to-[#a3702e] text-[#140c06] font-bold text-xs tracking-wide shadow-xl hover:shadow-[0_0_20px_rgba(212,163,89,0.35)] hover:brightness-110 active:scale-95 transition-all w-full sm:w-auto"
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4 text-[#140c06]" />
                    <span>Added to Inquiry Brief!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Inquiry Brief</span>
                  </>
                )}
              </button>

              <button
                type="button"
                id="hero-whatsapp-btn"
                onClick={handleWhatsAppInquiry}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#1c2c20] hover:bg-[#233829] text-emerald-300 border border-emerald-800/60 font-semibold text-xs tracking-wide transition-all w-full sm:w-auto"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp Inquiry</span>
              </button>

              <a
                href="tel:+917378671779"
                id="hero-call-btn"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#22160e] hover:bg-[#2c1d13] text-amber-200 border border-[#4d3522] font-semibold text-xs tracking-wide transition-all w-full sm:w-auto"
              >
                <Phone className="w-3.5 h-3.5 text-[#d4a359]" />
                <span>Call Us</span>
              </a>

              <button
                type="button"
                id="hero-custom-inquiry-btn"
                onClick={() => {
                  playBrassChime();
                  onOpenDrawer();
                }}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#1c120a] hover:bg-[#25180f] text-stone-300 border border-[#4d3522] font-medium text-xs transition-all w-full sm:w-auto"
              >
                <Send className="w-3.5 h-3.5 text-[#d4a359]" />
                <span>View Brief</span>
              </button>
            </div>

            {/* Craft Credentials Badges */}
            <div className="grid grid-cols-3 gap-2.5 w-full max-w-lg">
              <div className="p-2.5 rounded-xl bg-[#160f0a]/80 border border-[#3f2b1d] flex flex-col">
                <span className="text-xs font-serif font-bold text-[#e0b46e]">45+ Years</span>
                <span className="text-[10px] text-stone-400">Natural Timber Curing</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#160f0a]/80 border border-[#3f2b1d] flex flex-col">
                <span className="text-xs font-serif font-bold text-[#e0b46e]">Chool-Salai</span>
                <span className="text-[10px] text-stone-400">Zero Synthetic Nails</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#160f0a]/80 border border-[#3f2b1d] flex flex-col">
                <span className="text-xs font-serif font-bold text-[#e0b46e]">Hand-Forged</span>
                <span className="text-[10px] text-stone-400">Pure Sand-Cast Brass</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Live 3D Viewport (6 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-6 flex flex-col items-center"
          >
            <div className="relative w-full h-[320px] xs:h-[380px] sm:h-[450px] lg:h-[500px] xl:h-[530px]">
              <ThreeFurnitureViewer
                piece={activePiece}
                wood={selectedWood}
                fabric={selectedFabric}
                lightingMood="haveli_sunset"
                isHero={true}
              />
            </div>

            {/* Quick Timber Finish Selector under hero 3D viewer */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-3 px-4 py-2 rounded-2xl bg-[#140e0a]/90 border border-[#3d2a1b] text-xs">
              <span className="text-stone-400 font-display text-[11px]">Timber Finish:</span>
              {(['sheesham', 'teak', 'rosewood', 'antique_walnut'] as WoodFinish[]).map((finish) => (
                <button
                  key={finish}
                  type="button"
                  id={`hero-wood-${finish}`}
                  onClick={() => {
                    playBrassChime();
                    setSelectedWood(finish);
                  }}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl transition-all text-xs ${
                    selectedWood === finish
                      ? 'bg-[#d4a359] text-[#140c06] font-bold shadow'
                      : 'text-stone-300 hover:text-white'
                  }`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full border border-black/30"
                    style={{ backgroundColor: WOOD_FINISHES[finish].hex }}
                  />
                  <span>
                    {finish === 'sheesham'
                      ? 'Sheesham'
                      : finish === 'teak'
                      ? 'Sagwan Teak'
                      : finish === 'rosewood'
                      ? 'Rosewood'
                      : 'Walnut'}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Marquee Ticker */}
      <div className="w-full mt-6 border-y border-[#342215]/80 bg-[#120b07]/90 py-2.5 overflow-hidden">
        <div className="flex whitespace-nowrap gap-12 text-xs font-display uppercase tracking-[0.25em] text-[#ab927b] animate-marquee">
          <span>• Mewar Royal Court Architecture</span>
          <span>• Saharanpur Floral Filigree</span>
          <span>• Chettinad Vastu Sanctums</span>
          <span>• Pure Brass Wire Tarkashi</span>
          <span>• Generational Heirloom Guarantee</span>
          <span>• Aged Sheesham & Malabar Rosewood</span>
          <span>• Hand-Cast Peacock Link Chains</span>
          <span>• Mewar Royal Court Architecture</span>
          <span>• Saharanpur Floral Filigree</span>
        </div>
      </div>
    </section>
  );
};
