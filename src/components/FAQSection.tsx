import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronDown,
  HelpCircle,
  Sparkles,
  MessageCircle,
  CheckCircle2,
  Phone,
  MessageSquare
} from 'lucide-react';
import { playBrassChime } from '../utils/audioAmbience';

interface FAQItem {
  id: string;
  category: 'timber' | 'ordering' | 'delivery';
  categoryLabel: string;
  question: string;
  answer: string;
  highlights: string[];
}

const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-timber-species',
    category: 'timber',
    categoryLabel: 'Timber & Sourcing',
    question: 'What types of solid wood are used in Kamal Furniture?',
    answer:
      'We exclusively work with premium certified solid Indian hardwoods—primarily Grade-A Seasoned Sheesham (Dalbergia sissoo) sourced from traditional Saharanpur groves, and authentic CP Sagwan (Tectona grandis) Teak. Every timber log undergoes an extensive multi-week vacuum kiln-drying schedule to reach an optimal 8–12% equilibrium moisture content, ensuring total resistance to seasonal contraction, thermal warping, and splitting.',
    highlights: [
      '100% Solid hardwood—strictly zero MDF, HDF, or particle board',
      'Vacuum kiln-dried to 8–12% moisture level',
      'Naturally dense grain with rich chatoyancy'
    ]
  },
  {
    id: 'faq-vriksh-certification',
    category: 'timber',
    categoryLabel: 'Timber & Sourcing',
    question: 'Is your timber legally harvested and environmentally certified?',
    answer:
      'Yes. Every piece of timber utilized in our creations is certified under the Vriksh Timber Legality Assessment and Verification Scheme, fully complying with international CITES regulations and sustainable agro-forestry standards. Each product shipment is accompanied by an authenticated procurement certificate documenting legal harvest origin.',
    highlights: [
      'Vriksh Timber Legality verified',
      'Strict CITES non-endangered wood compliance',
      'Sustainable farm-sourced timber lineage'
    ]
  },
  {
    id: 'faq-readymade-vs-bespoke',
    category: 'ordering',
    categoryLabel: 'Ordering & Dispatch',
    question: 'What is the difference between "Select Your Furniture" and "Handcrafted Masterpieces"?',
    answer:
      'The "Select Your Furniture" section showcases our curated catalog of precision-engineered, readymade solid wood furniture (Teapoys, Sofas, Beds, Swings, Dining Tables, and Mirrors). These items are pre-milled, kept in structural stock, and dispatched within 2 to 5 business days. In contrast, our "Handcrafted Masterpieces" are monumental, bespoke architectural commissions carved by master generational ustad artisans, requiring 3 to 6 weeks of dedicated hand craftsmanship.',
    highlights: [
      'Readymade Catalog: Dispatched in 2 to 5 days',
      'Masterpiece Atelier: Commissioned built-to-order (3 to 6 weeks)',
      'Both carry our lifetime solid timber structural guarantee'
    ]
  },
  {
    id: 'faq-custom-dimensions',
    category: 'ordering',
    categoryLabel: 'Ordering & Dispatch',
    question: 'Can I customize dimensions or wood finishes for readymade furniture?',
    answer:
      'Yes. You can select your preferred timber finish (Sheesham Honey, Natural Teak, Antique Walnut, or Royal Rosewood) directly on each product card. If your interior layout requires bespoke dimensions (such as custom table lengths or modified bed clearances), add the item to your Inquiry Brief and specify your dimensions in the special instructions. Our design atelier will review and accommodate your architectural specifications.',
    highlights: [
      'Multiple heritage wood finish choices',
      'Architectural dimensional scaling on request',
      'Direct consult with atelier drafting team'
    ]
  },
  {
    id: 'faq-packaging-protection',
    category: 'delivery',
    categoryLabel: 'Delivery & Assembly',
    question: 'How is the furniture packaged to ensure zero transit damage?',
    answer:
      'We employ a stringent 5-layer export-grade packaging system. Each piece is first enveloped in non-abrasive foam wrap, fitted with high-density EPS edge protectors on all corners, sealed within a moisture-barrier poly film, housed inside an impact-resistant 7-ply corrugated outer carton, and finally bound in a reinforced heat-treated wooden pallet cage. All consignments carry 100% comprehensive transit insurance.',
    highlights: [
      '5-Layer protective packaging with EPS corner armor',
      'Reinforced wooden perimeter pallet crating',
      'Full transit insurance coverage for complete peace of mind'
    ]
  },
  {
    id: 'faq-assembly-requirements',
    category: 'delivery',
    categoryLabel: 'Delivery & Assembly',
    question: 'Does the furniture require complex assembly upon arrival?',
    answer:
      'The vast majority of our catalog—including Teapoys, Mirrors, Sofas, and Console Tables—arrives fully assembled and ready for immediate placement. Larger architectural items such as 4-poster beds and hydraulic storage units feature precision pre-drilled steel brackets and color-coded alignment guides requiring only basic tightening with the included brass hardware kit. Professional white-glove doorstep assembly is also provided in all major metropolitan regions.',
    highlights: [
      'Pre-assembled monolithic construction for tables and teapoys',
      'Modular precision joint hardware for large beds',
      'White-glove doorstep unboxing and assembly service available'
    ]
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Questions' },
  { id: 'timber', label: 'Timber & Sourcing' },
  { id: 'ordering', label: 'Ordering & Dispatch' },
  { id: 'delivery', label: 'Delivery & Assembly' }
];

interface Props {
  onOpenInquiryDrawer?: () => void;
}

export const FAQSection: React.FC<Props> = ({ onOpenInquiryDrawer }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    'faq-timber-species': true,
    'faq-readymade-vs-bespoke': true
  });

  const toggleItem = (id: string) => {
    playBrassChime();
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAll = () => {
    playBrassChime();
    const allExpanded: Record<string, boolean> = {};
    FAQ_ITEMS.forEach((item) => {
      allExpanded[item.id] = true;
    });
    setExpandedIds(allExpanded);
  };

  const collapseAll = () => {
    playBrassChime();
    setExpandedIds({});
  };

  const filteredFAQs = useMemo(() => {
    return FAQ_ITEMS.filter((item) => {
      return activeCategory === 'all' || item.category === activeCategory;
    });
  }, [activeCategory]);

  return (
    <section
      id="faq-section"
      className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0e0a07] via-[#140d08] to-[#0c0805] border-t border-[#2e1e12] scroll-mt-20 relative overflow-hidden"
    >
      {/* Background Decorative Accent */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#d4a359]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#8c5a2b]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#24170d] border border-[#d4a359]/30 text-[#d4a359] text-xs font-mono uppercase tracking-widest mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Frequently Asked Questions</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl text-[#f3ede3] font-bold tracking-tight mb-3">
            Curator's Knowledge Base & Assurance
          </h2>

          <p className="text-stone-400 text-sm sm:text-base max-w-2xl mx-auto font-sans leading-relaxed">
            Everything you need to know about our seasoned solid hardwoods, dispatch timelines,
            and protective transit packaging.
          </p>
        </motion.div>

        {/* Controls: Category Filter Tabs & Expand/Collapse */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6"
        >
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  id={`faq-filter-${cat.id}`}
                  onClick={() => {
                    playBrassChime();
                    setActiveCategory(cat.id);
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
                    isSelected
                      ? 'bg-[#d4a359] text-[#140c06] border-[#d4a359] shadow-[0_0_15px_rgba(212,163,89,0.3)] font-bold'
                      : 'bg-[#18100a] text-stone-300 border-[#382618] hover:border-[#d4a359]/60 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Quick Expand / Collapse Actions */}
          <div className="flex items-center gap-2 text-xs shrink-0 self-end sm:self-auto">
            <button
              type="button"
              id="faq-expand-all-btn"
              onClick={expandAll}
              className="px-3 py-1.5 rounded-lg bg-[#1a110a] text-stone-300 border border-[#3e2b1d] hover:border-[#d4a359]/70 hover:text-white transition-colors"
            >
              Expand All
            </button>
            <button
              type="button"
              id="faq-collapse-all-btn"
              onClick={collapseAll}
              className="px-3 py-1.5 rounded-lg bg-[#1a110a] text-stone-300 border border-[#3e2b1d] hover:border-[#d4a359]/70 hover:text-white transition-colors"
            >
              Collapse All
            </button>
          </div>
        </motion.div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {filteredFAQs.map((faq, idx) => {
            const isExpanded = !!expandedIds[faq.id];
            return (
              <motion.div
                key={faq.id}
                id={faq.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.45, delay: (idx % 6) * 0.07 }}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isExpanded
                    ? 'bg-[#19110a] border-[#d4a359]/50 shadow-[0_4px_20px_rgba(0,0,0,0.4)]'
                    : 'bg-[#140d08]/85 border-[#352316] hover:border-[#523824]'
                }`}
              >
                <button
                  type="button"
                  id={`faq-trigger-${faq.id}`}
                  onClick={() => toggleItem(faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isExpanded}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#d4a359] mt-2 shrink-0" />
                    <div>
                      <span className="text-[10px] font-mono text-[#d4a359]/90 uppercase tracking-widest block mb-1">
                        {faq.categoryLabel}
                      </span>
                      <h3 className="text-base sm:text-lg font-serif font-bold text-stone-100">
                        {faq.question}
                      </h3>
                    </div>
                  </div>
                  <div
                    className={`p-2 rounded-lg bg-[#22170f] border border-[#442f1f] text-[#d4a359] shrink-0 transition-transform duration-200 ${
                      isExpanded ? 'rotate-180 bg-[#d4a359]/10' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 pt-1 text-stone-300 text-sm leading-relaxed border-t border-[#291b11]/60">
                    <p className="mb-4 text-stone-300 font-sans">{faq.answer}</p>

                    {/* Key Highlight Bullets */}
                    <div className="bg-[#120b06]/80 rounded-xl p-3.5 border border-[#2d1c10] space-y-1.5">
                      <span className="text-[11px] font-mono text-[#d4a359] uppercase tracking-wider block font-bold mb-1">
                        Key Assurance:
                      </span>
                      {faq.highlights.map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2 text-xs text-stone-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#d4a359] shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Still Have Questions CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.55 }}
          className="mt-12 p-5 sm:p-8 rounded-2xl bg-gradient-to-r from-[#20140c] via-[#291a10] to-[#1c1109] border border-[#523824] flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-xl bg-[#d4a359]/15 border border-[#d4a359]/40 flex items-center justify-center shrink-0 text-[#d4a359]">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-serif text-lg sm:text-xl font-bold text-white mb-1">
                Have a Specific Architectural Inquiry?
              </h4>
              <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
                Our timber specialists can assist with custom floor plans, bespoke wood finishes, and international shipping logistics.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 shrink-0 justify-center lg:justify-end w-full lg:w-auto">
            <a
              href="https://wa.me/917378671779"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-[#1c2c20] hover:bg-[#243929] text-emerald-300 border border-emerald-800/60 font-semibold text-xs transition-all flex items-center justify-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp Us</span>
            </a>

            <a
              href="tel:+917378671779"
              className="px-4 py-2.5 rounded-xl bg-[#20150e] hover:bg-[#2c1e14] text-amber-200 border border-[#4d3523] font-semibold text-xs transition-all flex items-center justify-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#d4a359]" />
              <span>Call +91 7378671779</span>
            </a>

            {onOpenInquiryDrawer && (
              <button
                type="button"
                id="faq-open-inquiry-btn"
                onClick={() => {
                  playBrassChime();
                  onOpenInquiryDrawer();
                }}
                className="px-5 py-2.5 rounded-xl bg-[#d4a359] hover:bg-[#e4be7d] text-[#140c06] font-bold text-xs uppercase tracking-wider transition-all shadow-[0_4px_15px_rgba(212,163,89,0.3)] hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Open Inquiry Brief</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
