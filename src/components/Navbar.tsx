import React, { useState } from 'react';
import { Volume2, VolumeX, ShoppingBag, Sparkles, Menu, X, Phone, MessageSquare } from 'lucide-react';
import { toggleRoyalAmbience, isAmbienceActive, playBrassChime } from '../utils/audioAmbience';
import { CartItem } from '../types';

interface Props {
  cartItems: CartItem[];
  currency: 'INR' | 'USD' | 'EUR' | 'AED';
  onCurrencyChange: (curr: 'INR' | 'USD' | 'EUR' | 'AED') => void;
  onOpenDrawer: () => void;
}

export const Navbar: React.FC<Props> = ({
  cartItems,
  currency,
  onCurrencyChange,
  onOpenDrawer,
}) => {
  const [audioPlaying, setAudioPlaying] = useState(isAmbienceActive());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleAudioToggle = () => {
    const active = toggleRoyalAmbience();
    setAudioPlaying(active);
    if (active) {
      playBrassChime();
    }
  };

  const totalItemCount = cartItems.reduce((acc, it) => acc + it.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0e0a07]/95 backdrop-blur-md border-b border-[#3d2a1b]/80 transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-2 sm:gap-3 group shrink min-w-0">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#d4a359] to-[#8c5e2a] flex items-center justify-center p-0.5 shadow-lg group-hover:scale-105 transition-transform shrink-0">
            <div className="w-full h-full rounded-[10px] bg-[#120c08] flex items-center justify-center">
              <span className="font-serif font-black text-base sm:text-lg text-[#d4a359]">क</span>
            </div>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-serif font-bold text-sm sm:text-lg md:text-xl tracking-wide sm:tracking-wider text-[#f4efe8] flex items-center gap-1 truncate">
              KAMAL FURNITURE <span className="text-[10px] sm:text-xs font-mono text-[#d4a359] font-normal tracking-widest uppercase">कमल</span>
            </span>
            <span className="hidden sm:block text-[8px] sm:text-[9px] md:text-[10px] font-sans tracking-widest text-[#a89078] uppercase truncate">
              Handcrafted Indian Furniture • Est. 1994
            </span>
          </div>
        </a>

        {/* Desktop Highlights & Navigation */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6 text-xs font-display text-stone-300">
          <a
            href="#select-handcrafted-masterpiece"
            className="text-stone-300 hover:text-[#d4a359] transition-colors whitespace-nowrap"
          >
            Handcrafted Masterpieces
          </a>
          <span className="w-1 h-1 rounded-full bg-[#523824]" />
          <a
            href="#select-your-furniture"
            className="flex items-center gap-1.5 text-amber-200/90 hover:text-white transition-colors whitespace-nowrap"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#d4a359]" />
            <span>Select Your Furniture</span>
          </a>
          <span className="w-1 h-1 rounded-full bg-[#523824]" />
          <a
            href="#faq-section"
            className="text-stone-300 hover:text-[#d4a359] transition-colors whitespace-nowrap"
          >
            FAQ
          </a>
          <span className="w-1 h-1 rounded-full bg-[#523824]" />
          <span className="text-stone-400 whitespace-nowrap hidden xl:inline">100-Year Timber Warranty</span>
        </div>

        {/* Actions (Sound toggle, Currency, Inquiry Cart, Mobile Menu) */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 md:gap-3 shrink-0">
          {/* Quick WhatsApp Call / Chat link in desktop & tablet navbar */}
          <a
            href="https://wa.me/917378671779"
            target="_blank"
            rel="noopener noreferrer"
            title="Chat on WhatsApp (+91 7378671779)"
            className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#17271c] hover:bg-[#203627] text-emerald-300 border border-emerald-800/60 text-xs font-medium transition-all"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden xl:inline font-mono text-[11px]">+91 7378671779</span>
            <span className="xl:hidden font-mono text-[11px]">WhatsApp</span>
          </a>

          <a
            href="tel:+917378671779"
            title="Call +91 7378671779"
            className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#1d140e] hover:bg-[#2a1d14] text-amber-200 border border-[#4a3424] text-xs font-medium transition-all"
          >
            <Phone className="w-3.5 h-3.5 text-[#d4a359]" />
            <span className="font-mono text-[11px]">Call</span>
          </a>

          {/* Royal Tanpura Ambience Sound Toggle */}
          <button
            type="button"
            id="navbar-ambience-toggle"
            onClick={handleAudioToggle}
            className={`flex items-center justify-center w-8 h-8 sm:w-auto sm:px-3 sm:py-1.5 rounded-xl sm:rounded-full text-xs font-medium border transition-all shrink-0 ${
              audioPlaying
                ? 'bg-amber-950/80 text-amber-200 border-amber-600/60 shadow-[0_0_12px_rgba(212,163,89,0.3)]'
                : 'bg-[#18110b] text-stone-400 border-[#3d2a1b] hover:text-stone-200'
            }`}
            title="Toggle Royal Sitar & Tanpura Sound Ambience"
          >
            {audioPlaying ? (
              <>
                <Volume2 className="w-4 h-4 text-[#d4a359] animate-pulse" />
                <span className="hidden md:inline font-mono text-[11px] ml-1.5">Tanpura On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4" />
                <span className="hidden md:inline font-mono text-[11px] ml-1.5">Palace Sound</span>
              </>
            )}
          </button>

          {/* Currency Switcher (Hidden on mobile < sm to preserve space for Brief Bag & Menu) */}
          <div className="relative hidden sm:block shrink-0">
            <select
              value={currency}
              onChange={(e) => onCurrencyChange(e.target.value as any)}
              className="bg-[#18110b] text-stone-200 text-xs font-mono font-semibold py-1.5 px-2.5 rounded-xl border border-[#3d2a1b] focus:outline-none focus:border-[#d4a359] cursor-pointer"
            >
              <option value="INR">₹ INR</option>
              <option value="USD">$ USD</option>
              <option value="EUR">€ EUR</option>
              <option value="AED">AED د.إ</option>
            </select>
          </div>

          {/* Cart / Inquiry Drawer Button (ALWAYS PROMINENT AND VISIBLE ON ALL VIEWPORTS) */}
          <button
            type="button"
            id="navbar-inquiry-drawer-btn"
            onClick={() => {
              playBrassChime();
              onOpenDrawer();
            }}
            className="relative flex items-center justify-center gap-1.5 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl bg-gradient-to-r from-[#d4a359] via-[#c49247] to-[#b3823e] text-[#140d07] font-semibold text-xs tracking-wide shadow-lg hover:brightness-110 active:scale-95 transition-all shrink-0"
            title="Open Bespoke Inquiry Brief"
          >
            <ShoppingBag className="w-4 h-4 text-[#140d07] shrink-0" />
            <span className="hidden md:inline font-bold">Inquiry Brief</span>
            <span className="min-w-4 h-4 sm:min-w-5 sm:h-5 px-1 rounded-full bg-[#140d07] text-[#f4d08e] text-[9px] sm:text-[10px] font-bold flex items-center justify-center">
              {totalItemCount}
            </span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            id="navbar-mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-stone-300 hover:text-white bg-[#1a110a] border border-[#3d2a1b] shrink-0"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-3 pb-5 bg-[#140d08] border-b border-[#3d2a1b] animate-in slide-in-from-top-4 duration-200 space-y-3">
          {/* Mobile Currency Selection */}
          <div className="sm:hidden flex items-center justify-between py-2 px-3 rounded-xl bg-[#18110a] border border-[#342315]">
            <span className="text-xs text-stone-400 font-medium">Currency:</span>
            <select
              value={currency}
              onChange={(e) => onCurrencyChange(e.target.value as any)}
              className="bg-[#22160d] text-amber-200 text-xs font-mono font-semibold py-1 px-2.5 rounded-lg border border-[#4a3424] focus:outline-none"
            >
              <option value="INR">₹ INR (Indian Rupee)</option>
              <option value="USD">$ USD (US Dollar)</option>
              <option value="EUR">€ EUR (Euro)</option>
              <option value="AED">AED د.إ (UAE Dirham)</option>
            </select>
          </div>

          <div className="flex flex-col gap-2.5 text-xs font-display text-stone-300 pb-3 border-b border-[#2e1f14]">
            <a
              href="#select-handcrafted-masterpiece"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-stone-300 hover:text-[#d4a359] py-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#d4a359]" />
              <span>Handcrafted Masterpieces (3D Atelier)</span>
            </a>
            <a
              href="#select-your-furniture"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-amber-200 font-bold py-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#d4a359]" />
              <span>Select Your Furniture (Readymade Catalog)</span>
            </a>
            <a
              href="#faq-section"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-stone-300 hover:text-[#d4a359] py-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#d4a359]" />
              <span>Frequently Asked Questions (FAQ)</span>
            </a>
          </div>

          {/* Mobile Direct Contact buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1 pb-1">
            <a
              href="https://wa.me/917378671779"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#18291d] text-emerald-300 border border-emerald-800/60 text-xs font-semibold"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>
            <a
              href="tel:+917378671779"
              className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#20150e] text-amber-200 border border-[#483323] text-xs font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-[#d4a359]" />
              <span>Call Us</span>
            </a>
          </div>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenDrawer();
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#d4a359] to-[#c28f45] text-[#140c06] text-xs font-bold flex items-center justify-center gap-2 shadow-md"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Open Inquiry Brief ({totalItemCount})</span>
          </button>
        </div>
      )}
    </header>
  );
};
