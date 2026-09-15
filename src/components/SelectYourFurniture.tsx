import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ShoppingBag, Check, Eye, X, Truck, ShieldCheck, Box } from 'lucide-react';
import { READYMADE_FURNITURE, READY_CATEGORIES, ReadyFurnitureItem } from '../data/readymadeFurnitureData';
import { FurniturePiece, WoodFinish } from '../types';
import { WOOD_FINISHES } from '../data/furnitureData';
import { playBrassChime } from '../utils/audioAmbience';
import confetti from 'canvas-confetti';

interface Props {
  currency: 'INR' | 'USD' | 'EUR' | 'AED';
  onAddToCart: (piece: FurniturePiece, wood: WoodFinish) => void;
  onOpenDrawer: () => void;
}

export const SelectYourFurniture: React.FC<Props> = ({ currency, onAddToCart, onOpenDrawer }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedFinishes, setSelectedFinishes] = useState<Record<string, WoodFinish>>({});
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});
  const [modalItem, setModalItem] = useState<ReadyFurnitureItem | null>(null);

  const carouselRef = useRef<HTMLDivElement>(null);

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

  const filteredItems = activeCategory === 'all'
    ? READYMADE_FURNITURE
    : READYMADE_FURNITURE.filter((item) => item.category === activeCategory);

  const handleScroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = 360;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleSelectFinish = (itemId: string, finish: WoodFinish) => {
    playBrassChime();
    setSelectedFinishes((prev) => ({ ...prev, [itemId]: finish }));
  };

  const handleAddCart = (item: ReadyFurnitureItem) => {
    playBrassChime();
    const finish = selectedFinishes[item.id] || item.finishOptions[0] || 'sheesham';

    // Map to FurniturePiece for the inquiry brief
    const mappedPiece: FurniturePiece = {
      id: item.id,
      name: item.name,
      hindiName: item.categoryName,
      tagline: item.tagline,
      region: 'Rajasthan',
      category: item.category === 'teapoy' || item.category === 'tables'
        ? 'Tables & Jharokhas'
        : item.category === 'sofa'
        ? 'Seating (Baithak)'
        : item.category === 'swings'
        ? 'Swings (Jhula)'
        : 'Chests & Storage',
      priceINR: item.priceINR,
      dimensions: item.dimensions,
      woodSpecies: item.woodSpecies,
      craftTechnique: 'Precision Joinery & Natural Oil Polishing',
      artisanLineage: 'Quality Inspected & Pre-Assembled',
      historicalEra: 'Contemporary Solid Timber Series',
      description: item.tagline,
      features: item.features,
      hotspots: [],
      modelKey: item.category === 'tables' || item.category === 'teapoy' ? 'tables' : 'desk',
      defaultWood: finish,
      inStock: item.inStock,
      leadTimeWeeks: Math.max(1, Math.round(item.dispatchDays / 7)),
    };

    onAddToCart(mappedPiece, finish);

    setAddedItemIds((prev) => ({ ...prev, [item.id]: true }));
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#d4a359', '#ffd98a', '#c28f45'],
    });

    setTimeout(() => {
      setAddedItemIds((prev) => ({ ...prev, [item.id]: false }));
    }, 2000);
  };

  return (
    <section id="select-your-furniture" className="relative w-full py-16 px-4 sm:px-6 lg:px-12 bg-[#0c0704] border-t border-[#2e1d12] overflow-hidden">
      {/* Background Ambience Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#d4a359]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#c28f45]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.55 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1e130a] border border-[#d4a359]/30 text-[#e0b46e] text-xs font-mono uppercase tracking-widest mb-3">
              <Box className="w-3.5 h-3.5 text-[#d4a359]" />
              <span>Ready-To-Dispatch Catalog</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-black text-[#f7f2ea] tracking-tight mb-3">
              Select Your Furniture
            </h2>
            <p className="text-sm sm:text-base text-stone-300 font-sans leading-relaxed">
              Explore our curated catalog of readymade, precision-designed solid wood furniture. Engineered for durability, timeless architectural aesthetics, and swift direct-to-home dispatch across all categories.
            </p>
          </div>

          {/* Carousel Sliding Navigation Controls */}
          <div className="flex items-center gap-2.5 self-start md:self-end">
            <span className="text-xs text-stone-400 font-mono hidden sm:inline-block">Slide Catalog:</span>
            <button
              type="button"
              id="sliding-prev-btn"
              onClick={() => handleScroll('left')}
              className="p-2.5 rounded-xl bg-[#1c120a] hover:bg-[#281a0f] border border-[#3f2a1b] text-[#d4a359] transition-all hover:scale-105 active:scale-95 shadow-md"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              id="sliding-next-btn"
              onClick={() => handleScroll('right')}
              className="p-2.5 rounded-xl bg-[#1c120a] hover:bg-[#281a0f] border border-[#3f2a1b] text-[#d4a359] transition-all hover:scale-105 active:scale-95 shadow-md"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* Sliding Subsections Filter Track */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none"
        >
          <button
            type="button"
            id="category-all"
            onClick={() => {
              playBrassChime();
              setActiveCategory('all');
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
              activeCategory === 'all'
                ? 'bg-[#d4a359] text-[#140c06] border-[#d4a359] shadow-[0_0_15px_rgba(212,163,89,0.3)]'
                : 'bg-[#18100a] text-stone-300 border-[#382618] hover:border-[#d4a359]/60 hover:text-white'
            }`}
          >
            All Subsections ({READYMADE_FURNITURE.length})
          </button>

          {READY_CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                id={`category-${cat.id}`}
                onClick={() => {
                  playBrassChime();
                  setActiveCategory(cat.id);
                }}
                className={`pl-1.5 pr-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border flex items-center gap-2 ${
                  isSelected
                    ? 'bg-[#d4a359] text-[#140c06] border-[#d4a359] shadow-[0_0_15px_rgba(212,163,89,0.3)]'
                    : 'bg-[#18100a] text-stone-300 border-[#382618] hover:border-[#d4a359]/60 hover:text-white'
                }`}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-6 h-6 rounded-lg object-cover border border-black/30 shrink-0"
                />
                <span>{cat.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                  isSelected ? 'bg-[#140c06]/20 text-[#140c06]' : 'bg-[#281c12] text-stone-400'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* Sliding Carousel of Furniture Cards */}
        <div
          ref={carouselRef}
          className="flex gap-5 overflow-x-auto scroll-smooth pb-6 pt-1 px-1 scrollbar-none snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none' }}
        >
          {filteredItems.map((item) => {
            const currentFinish = selectedFinishes[item.id] || item.finishOptions[0] || 'sheesham';
            const isAdded = !!addedItemIds[item.id];

            return (
              <div
                key={item.id}
                id={`furniture-card-${item.id}`}
                className="flex-none w-[84vw] xs:w-[290px] sm:w-[320px] md:w-[340px] lg:w-[350px] rounded-2xl bg-[#160e08]/90 border border-[#3c281a] hover:border-[#d4a359]/70 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(212,163,89,0.12)] flex flex-col snap-start overflow-hidden group"
              >
                {/* Product Image Stage */}
                <div className="relative w-full h-48 bg-[#1f150d] overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#160e08] via-transparent to-black/30" />

                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#140c06]/85 backdrop-blur-sm border border-[#d4a359]/40 text-[#f3d393] text-[10px] font-mono uppercase tracking-wider font-bold">
                    {item.categoryName}
                  </div>

                  {/* Dispatch Badge */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-950/85 backdrop-blur-sm border border-emerald-600/40 text-emerald-300 text-[10px] font-medium">
                    <Truck className="w-3 h-3 text-emerald-400" />
                    <span>{item.dispatchDays}d Dispatch</span>
                  </div>

                  {/* Quick View Button */}
                  <button
                    type="button"
                    id={`quick-view-${item.id}`}
                    onClick={() => {
                      playBrassChime();
                      setModalItem(item);
                    }}
                    className="absolute bottom-3 right-3 p-2 rounded-lg bg-[#1a110a]/90 text-stone-300 hover:text-white border border-[#442e1d] hover:border-[#d4a359] transition-all opacity-90 group-hover:opacity-100 shadow-md"
                    title="Quick View Specifications"
                  >
                    <Eye className="w-4 h-4 text-[#d4a359]" />
                  </button>
                </div>

                {/* Card Body */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Species & Specs */}
                    <span className="text-[11px] font-mono text-[#d4a359] block tracking-wide truncate mb-1">
                      {item.woodSpecies}
                    </span>

                    {/* Title */}
                    <h3 className="font-serif text-base font-bold text-white leading-snug line-clamp-1 mb-1">
                      {item.name}
                    </h3>

                    {/* Tagline */}
                    <p className="text-xs text-stone-400 font-sans line-clamp-2 mb-3">
                      {item.tagline}
                    </p>

                    {/* Dimensions Chip */}
                    <div className="text-[11px] text-stone-400 font-mono bg-[#1f150d] p-2 rounded-lg border border-[#3a2718] mb-3">
                      <span>{item.dimensions.width}"W × {item.dimensions.depth}"D × {item.dimensions.height}"H</span>
                      <span className="text-stone-500 mx-1.5">•</span>
                      <span>{item.dimensions.weightKg} kg</span>
                    </div>

                    {/* Finish Selector */}
                    <div className="mb-4">
                      <span className="text-[10px] font-mono text-stone-400 block mb-1.5 uppercase">
                        Select Wood Finish:
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5">
                        {item.finishOptions.map((finish) => {
                          const isFinishSelected = currentFinish === finish;
                          return (
                            <button
                              key={finish}
                              type="button"
                              id={`finish-${item.id}-${finish}`}
                              onClick={() => handleSelectFinish(item.id, finish)}
                              className={`flex items-center gap-1 px-2 py-1 rounded-md text-[10px] border transition-all ${
                                isFinishSelected
                                  ? 'bg-[#291b10] border-[#d4a359] text-amber-200'
                                  : 'bg-[#181009] border-[#382618] text-stone-400 hover:text-stone-200'
                              }`}
                            >
                              <span
                                className="w-2 h-2 rounded-full border border-black/40"
                                style={{ backgroundColor: WOOD_FINISHES[finish]?.hex || '#63391d' }}
                              />
                              <span className="capitalize">{finish.replace('_', ' ')}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Price & Add to Brief CTA */}
                  <div className="pt-3 border-t border-[#2e1d12] flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-stone-400 block">Price</span>
                      <span className="font-serif text-lg font-bold text-white">
                        {formatPrice(item.priceINR)}
                      </span>
                    </div>

                    <button
                      type="button"
                      id={`add-brief-${item.id}`}
                      onClick={() => handleAddCart(item)}
                      className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold text-xs transition-all ${
                        isAdded
                          ? 'bg-emerald-700 text-white'
                          : 'bg-[#d4a359] hover:bg-[#e0b46e] text-[#140c06] hover:shadow-[0_0_15px_rgba(212,163,89,0.3)] active:scale-95'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>Add to Brief</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Assurance Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-8 p-4 rounded-2xl bg-[#140d08] border border-[#342215] grid grid-cols-1 sm:grid-cols-3 gap-4 text-center"
        >
          <div className="flex items-center justify-center gap-2 text-stone-300 text-xs">
            <Truck className="w-4 h-4 text-[#d4a359]" />
            <span>Direct Safe Dispatch Across All Major Cities</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-stone-300 text-xs">
            <ShieldCheck className="w-4 h-4 text-[#d4a359]" />
            <span>10-Year Solid Timber Structural Warranty</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-stone-300 text-xs">
            <Box className="w-4 h-4 text-[#d4a359]" />
            <span>Multi-Layer Protective Crating & Transit Insurance</span>
          </div>
        </motion.div>
      </div>

      {/* Quick View Item Specification Modal */}
      {modalItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm">
          <div
            className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto rounded-2xl bg-[#160e08] border border-[#d4a359]/40 p-4 sm:p-6 shadow-2xl"
            role="dialog"
            aria-modal="true"
          >
            {/* Close Button */}
            <button
              type="button"
              id="modal-close-btn"
              onClick={() => setModalItem(null)}
              className="absolute top-3 sm:top-4 right-3 sm:right-4 p-2 rounded-xl bg-[#22160e] text-stone-400 hover:text-white border border-[#442c1c] z-10"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 mb-5 mt-2 sm:mt-0">
              <div className="w-full sm:w-1/2 h-44 sm:h-48 rounded-xl overflow-hidden bg-[#20150e] shrink-0">
                <img
                  src={modalItem.image}
                  alt={modalItem.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="w-full sm:w-1/2 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] sm:text-xs font-mono text-[#d4a359] uppercase tracking-wider block mb-1">
                    {modalItem.categoryName} • Ready Stock
                  </span>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-white leading-tight mb-2">
                    {modalItem.name}
                  </h3>
                  <p className="text-xs text-stone-300 mb-3">
                    {modalItem.tagline}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] sm:text-xs text-stone-400 block">Unit Price</span>
                  <span className="font-serif text-xl sm:text-2xl font-bold text-[#e0b46e]">
                    {formatPrice(modalItem.priceINR)}
                  </span>
                </div>
              </div>
            </div>

            {/* Specifications Grid */}
            <div className="p-3.5 rounded-xl bg-[#1f140c] border border-[#3e291a] mb-5 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-stone-400 block text-[11px]">Material</span>
                <span className="text-stone-200 font-semibold">{modalItem.woodSpecies}</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[11px]">Dimensions</span>
                <span className="text-stone-200 font-semibold">{modalItem.dimensions.width}"W × {modalItem.dimensions.depth}"D × {modalItem.dimensions.height}"H</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[11px]">Gross Weight</span>
                <span className="text-stone-200 font-semibold">{modalItem.dimensions.weightKg} kg</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[11px]">Dispatch Schedule</span>
                <span className="text-emerald-400 font-semibold">{modalItem.dispatchDays} Business Days</span>
              </div>
            </div>

            {/* Engineered Key Features */}
            <div className="mb-5">
              <span className="text-xs font-mono text-stone-400 uppercase tracking-widest block mb-2">
                Engineered Features & Build:
              </span>
              <ul className="space-y-1.5">
                {modalItem.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-stone-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4a359] mt-1.5 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-end gap-2.5 pt-3 border-t border-[#311f12]">
              <button
                type="button"
                onClick={() => setModalItem(null)}
                className="px-4 py-2.5 rounded-xl bg-[#22160e] text-stone-300 hover:text-white border border-[#442c1c] text-xs font-medium text-center"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  handleAddCart(modalItem);
                  setModalItem(null);
                  onOpenDrawer();
                }}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4a359] to-[#c28f45] text-[#140c06] text-xs font-bold shadow-lg hover:brightness-110 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Brief & View Details</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
