import React from 'react';
import { motion } from 'motion/react';
import { Droplet, Sun, Shield, Sparkles, MapPin, Phone, MessageSquare, ArrowUpRight } from 'lucide-react';
import { playBrassChime } from '../utils/audioAmbience';

interface Props {
  onOpenInquiryDrawer?: () => void;
}

export const Footer: React.FC<Props> = ({ onOpenInquiryDrawer }) => {
  const handleInquiryClick = () => {
    playBrassChime();
    if (onOpenInquiryDrawer) {
      onOpenInquiryDrawer();
    }
  };

  return (
    <footer className="bg-[#090604] border-t border-[#342216] text-stone-400 text-xs relative z-10 overflow-hidden">
      {/* Indian Hardwood Care Guide Callout */}
      <div className="border-b border-[#24170e] bg-[#110b07] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 mb-6"
          >
            <Sparkles className="w-4 h-4 text-[#d4a359]" />
            <h4 className="font-serif text-base font-bold text-amber-100 uppercase tracking-wider">
              Heirloom Timber Preservation Rituals
            </h4>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-5 rounded-2xl bg-[#18100a] border border-[#2d1e13] hover:border-[#d4a359]/40 transition-colors"
            >
              <div className="flex items-center gap-2 text-amber-200 font-serif font-bold text-sm mb-2">
                <Droplet className="w-4 h-4 text-[#d4a359]" />
                <span>Annual Mustard Oil Curing</span>
              </div>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                Rub seasoned Sheesham and Teak with warm cold-pressed mustard oil using a soft muslin cloth once a year after the monsoon season to replenish natural wood lipids.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-5 rounded-2xl bg-[#18100a] border border-[#2d1e13] hover:border-[#d4a359]/40 transition-colors"
            >
              <div className="flex items-center gap-2 text-amber-200 font-serif font-bold text-sm mb-2">
                <Sun className="w-4 h-4 text-[#d4a359]" />
                <span>Atmospheric Equilibrium</span>
              </div>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                Avoid placing carved furniture directly adjacent to forced-air air conditioning vents. Solid timber breathes with ambient relative humidity.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-5 rounded-2xl bg-[#18100a] border border-[#2d1e13] hover:border-[#d4a359]/40 transition-colors"
            >
              <div className="flex items-center gap-2 text-amber-200 font-serif font-bold text-sm mb-2">
                <Shield className="w-4 h-4 text-[#d4a359]" />
                <span>Brass Hardware Patina</span>
              </div>
              <p className="text-[11px] text-stone-400 leading-relaxed">
                Hand-forged brass chains and rivets will naturally age into a rich imperial temple patina. To restore high mirror luster, polish gently with tamarind pulp and dry cotton.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Information */}
      <div className="max-w-7xl mx-auto py-14 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand Column */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#d4a359] text-[#120c08] flex items-center justify-center font-serif font-black text-base shadow-sm">
              क
            </div>
            <span className="font-serif font-bold text-lg text-white tracking-wide">
              KAMAL FURNITURE
            </span>
          </div>
          <p className="text-stone-400 leading-relaxed text-xs">
            Handcrafted solid wood heritage furniture. Preserving master timber traditions across Rajasthan, Saharanpur, and Chettinad.
          </p>
          <div className="flex items-center gap-2 pt-2">
            <span className="px-2.5 py-1 rounded-full bg-[#1b120c] border border-[#382618] text-[10px] text-amber-200/90 font-mono">
              Vriksh Certified
            </span>
            <span className="px-2.5 py-1 rounded-full bg-[#1b120c] border border-[#382618] text-[10px] text-amber-200/90 font-mono">
              GI Tag Provenance
            </span>
          </div>
        </motion.div>

        {/* Sovereign Ateliers & Galleries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h4 className="font-serif font-bold text-amber-100 text-sm mb-3">
            Sovereign Ateliers
          </h4>
          <ul className="space-y-2.5 text-stone-400">
            <li className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#d4a359] shrink-0 mt-0.5" />
              <span>Heritage Quarter, Near Clock Tower, Jodhpur 342001</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#d4a359] shrink-0 mt-0.5" />
              <span>Colaba Causeway, South Mumbai 400005</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#d4a359] shrink-0 mt-0.5" />
              <span>Mehrauli Heritage Complex, New Delhi 110030</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#d4a359] shrink-0 mt-0.5" />
              <span>DIFC Gate Avenue, Dubai, United Arab Emirates</span>
            </li>
          </ul>
        </motion.div>

        {/* Dynastic Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h4 className="font-serif font-bold text-amber-100 text-sm mb-3">
            Dynastic Directory
          </h4>
          <ul className="space-y-2.5 text-stone-400">
            <li>
              <a href="#hero-section" className="hover:text-[#d4a359] transition-colors flex items-center gap-1.5">
                <span>Interactive 3D Atelier</span>
              </a>
            </li>
            <li>
              <a href="#select-handcrafted-masterpiece" className="hover:text-[#d4a359] transition-colors flex items-center gap-1.5">
                <span>Handcrafted Masterpieces</span>
              </a>
            </li>
            <li>
              <a href="#select-your-furniture" className="hover:text-[#d4a359] transition-colors flex items-center gap-1.5">
                <span>Select Your Furniture Catalog</span>
              </a>
            </li>
            <li>
              <a href="#faq-section" className="hover:text-[#d4a359] transition-colors flex items-center gap-1.5">
                <span>Curator's Knowledge Base & FAQ</span>
              </a>
            </li>
            {onOpenInquiryDrawer && (
              <li>
                <button
                  type="button"
                  onClick={handleInquiryClick}
                  className="text-amber-200/90 hover:text-white transition-colors flex items-center gap-1.5 font-medium"
                >
                  <span>Open Inquiry Brief</span>
                  <ArrowUpRight className="w-3 h-3 text-[#d4a359]" />
                </button>
              </li>
            )}
          </ul>
        </motion.div>

        {/* Private Inquiries & Direct Line */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h4 className="font-serif font-bold text-amber-100 text-sm mb-3">
            Concierge & Inquiries
          </h4>
          <p className="text-stone-400 text-xs mb-3 leading-relaxed">
            For custom architectural commissions, timber selection, or showroom visits:
          </p>
          <div className="space-y-2.5">
            <a
              href="tel:+917378671779"
              title="Call Kamal Furniture"
              className="flex items-center gap-2 text-stone-300 hover:text-amber-200 transition-colors group"
            >
              <Phone className="w-3.5 h-3.5 text-[#d4a359] group-hover:scale-110 transition-transform" />
              <div className="flex flex-col">
                <span className="font-mono text-xs font-semibold text-stone-200">+91 7378671779</span>
                <span className="text-[10px] text-stone-400">Direct Phone Calls</span>
              </div>
            </a>

            <a
              href="https://wa.me/917378671779"
              target="_blank"
              rel="noopener noreferrer"
              title="WhatsApp Kamal Furniture"
              className="flex items-center gap-2 text-emerald-300 hover:text-emerald-200 transition-colors group"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400 group-hover:scale-110 transition-transform" />
              <div className="flex flex-col">
                <span className="font-mono text-xs font-semibold text-emerald-300">+91 7378671779</span>
                <span className="text-[10px] text-emerald-500">Instant WhatsApp Chat</span>
              </div>
            </a>

            {onOpenInquiryDrawer && (
              <button
                type="button"
                id="footer-inquiry-btn"
                onClick={handleInquiryClick}
                className="mt-2 w-full py-2 px-3 rounded-xl bg-[#1b120c] hover:bg-[#251910] border border-[#442e1d] hover:border-[#d4a359] text-amber-200 text-xs font-semibold transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#d4a359]" />
                <span>Request Custom Commission</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Bottom Legal bar */}
      <div className="border-t border-[#1e140d] py-6 px-4 text-center text-[11px] text-stone-500">
        <p>
          © 1994–2026 Kamal Furniture. All rights reserved. Handcrafted in India.
        </p>
      </div>
    </footer>
  );
};
