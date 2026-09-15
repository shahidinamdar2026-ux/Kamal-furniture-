import React, { useState } from 'react';
import { CartItem } from '../types';
import { WOOD_FINISHES, FABRICS } from '../data/furnitureData';
import { X, Trash2, Send, ShoppingBag, Phone, CheckCircle2, ShieldCheck, MessageSquare } from 'lucide-react';
import { playBrassChime } from '../utils/audioAmbience';
import confetti from 'canvas-confetti';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  currency: 'INR' | 'USD' | 'EUR' | 'AED';
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export const InquiryDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  cartItems,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientCity, setClientCity] = useState('');
  const [inquiryNotes, setInquiryNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const totalINR = cartItems.reduce((acc, item) => acc + item.piece.priceINR * item.quantity, 0);

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

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playBrassChime();
    setSubmitted(true);

    confetti({
      particleCount: 70,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#d4a359', '#ffd98a', '#82161b'],
    });

    setTimeout(() => {
      setSubmitted(false);
      onClearCart();
      onClose();
    }, 4000);
  };

  const handleWhatsAppInquiry = () => {
    playBrassChime();
    const itemsList = cartItems
      .map(
        (it) =>
          `• ${it.piece.name} (${it.quantity}x) in ${WOOD_FINISHES[it.selectedWood]?.name || it.selectedWood}${
            it.selectedFabric ? ` with ${FABRICS[it.selectedFabric]?.name || it.selectedFabric}` : ''
          }`
      )
      .join('%0A');

    const message = `Namaste Kamal Furniture,%0A%0AI would like to inquire about the following bespoke pieces:%0A${itemsList}%0A%0AEstimated Total: ${formatPrice(
      totalINR
    )}%0AClient: ${clientName || 'Inquirer'}%0ACity: ${clientCity || 'Not specified'}`;

    const whatsappUrl = `https://wa.me/917378671779?text=${message}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full sm:max-w-lg h-full bg-[#120c08] border-l border-[#3e2b1d] shadow-2xl flex flex-col justify-between overflow-hidden animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-4 sm:p-6 border-b border-[#2d1e13] flex items-center justify-between bg-[#18110b]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#d4a359]" />
            <div>
              <h3 className="font-serif text-lg font-bold text-white">Bespoke Inquiry Brief</h3>
              <span className="text-xs text-stone-400 font-mono">
                {cartItems.length} Piece{cartItems.length === 1 ? '' : 's'} Selected
              </span>
            </div>
          </div>
          <button
            type="button"
            id="close-inquiry-drawer"
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-white hover:bg-[#25180f] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Items List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-stone-400">
              <ShoppingBag className="w-12 h-12 text-stone-600 mb-3" />
              <p className="font-serif text-base text-stone-300">Your brief is currently empty.</p>
              <p className="text-xs text-stone-500 mt-1 max-w-xs">
                Explore our 3D Atelier or Dynastic Collections to add handcrafted furniture pieces.
              </p>
            </div>
          ) : (
            cartItems.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-[#18110b] border border-[#342216] flex flex-col gap-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-serif text-sm font-bold text-amber-100">{item.piece.name}</h4>
                    <span className="text-[11px] text-stone-400 font-serif italic block">
                      {item.piece.hindiName}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemoveItem(idx)}
                    className="text-stone-500 hover:text-rose-400 transition-colors p-1"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Customizations tags */}
                <div className="flex flex-wrap gap-2 text-[10px]">
                  <span className="px-2 py-0.5 rounded-full bg-[#25180f] text-stone-300 border border-[#442f1f] flex items-center gap-1">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: WOOD_FINISHES[item.selectedWood]?.hex }}
                    />
                    {WOOD_FINISHES[item.selectedWood]?.name.split(' ')[0]}
                  </span>
                  {item.selectedFabric && (
                    <span className="px-2 py-0.5 rounded-full bg-[#25180f] text-stone-300 border border-[#442f1f] flex items-center gap-1">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: FABRICS[item.selectedFabric]?.hex }}
                      />
                      {FABRICS[item.selectedFabric]?.name.split(' ')[0]}
                    </span>
                  )}
                  <span className="px-2 py-0.5 rounded-full bg-[#20150d] text-[#d4a359] border border-[#d4a359]/30">
                    Lead time: {item.piece.leadTimeWeeks} Wks
                  </span>
                </div>

                {/* Quantity & Price */}
                <div className="flex items-center justify-between border-t border-[#291b11] pt-2">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(idx, Math.max(1, item.quantity - 1))}
                      className="w-6 h-6 rounded-lg bg-[#25180f] text-stone-300 hover:text-white flex items-center justify-center font-bold text-xs"
                    >
                      -
                    </button>
                    <span className="text-xs font-mono font-bold text-white px-1">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                      className="w-6 h-6 rounded-lg bg-[#25180f] text-stone-300 hover:text-white flex items-center justify-center font-bold text-xs"
                    >
                      +
                    </button>
                  </div>
                  <span className="font-serif text-sm font-bold text-[#f3d393]">
                    {formatPrice(item.piece.priceINR * item.quantity)}
                  </span>
                </div>
              </div>
            ))
          )}

          {cartItems.length > 0 && (
            <form onSubmit={handleInquirySubmit} className="space-y-3 pt-4 border-t border-[#2d1e13]">
              <span className="text-xs font-serif font-bold text-amber-200 block">
                Your Contact Details for Senior Ustaad:
              </span>

              <input
                type="text"
                required
                placeholder="Full Name / Title"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full bg-[#18110b] text-stone-200 text-xs py-2 px-3 rounded-xl border border-[#342216] focus:outline-none focus:border-[#d4a359]"
              />

              <input
                type="tel"
                required
                placeholder="WhatsApp Number / Phone"
                value={clientPhone}
                onChange={(e) => setClientPhone(e.target.value)}
                className="w-full bg-[#18110b] text-stone-200 text-xs py-2 px-3 rounded-xl border border-[#342216] focus:outline-none focus:border-[#d4a359]"
              />

              <input
                type="text"
                placeholder="Delivery City & Country (e.g. Mumbai, Dubai, London)"
                value={clientCity}
                onChange={(e) => setClientCity(e.target.value)}
                className="w-full bg-[#18110b] text-stone-200 text-xs py-2 px-3 rounded-xl border border-[#342216] focus:outline-none focus:border-[#d4a359]"
              />

              <textarea
                rows={2}
                placeholder="Special architectural requests, ceiling hook hardware..."
                value={inquiryNotes}
                onChange={(e) => setInquiryNotes(e.target.value)}
                className="w-full bg-[#18110b] text-stone-200 text-xs py-2 px-3 rounded-xl border border-[#342216] focus:outline-none focus:border-[#d4a359]"
              />

              <button
                type="submit"
                id="submit-inquiry-form-btn"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#d4a359] via-[#c49147] to-[#9f6a29] text-[#120a05] font-bold text-xs tracking-wide shadow-lg hover:brightness-110 active:scale-95 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Inquiry to Royal Atelier</span>
              </button>

              <button
                type="button"
                id="whatsapp-inquiry-btn"
                onClick={handleWhatsAppInquiry}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#1e2f23] text-emerald-300 border border-emerald-800/60 font-semibold text-xs hover:bg-[#253d2d] transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>Chat Instantly on WhatsApp (+91 7378671779)</span>
              </button>

              <a
                href="tel:+917378671779"
                id="drawer-call-btn"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#22160d] text-amber-200 border border-[#4a3424] font-semibold text-xs hover:bg-[#2d1d12] transition-all"
              >
                <Phone className="w-3.5 h-3.5 text-[#d4a359]" />
                <span>Call Us (+91 7378671779)</span>
              </a>
            </form>
          )}

          {submitted && (
            <div className="p-4 rounded-xl bg-emerald-950/90 border border-emerald-700/60 text-emerald-200 text-xs text-center space-y-1 animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 mx-auto text-emerald-400 mb-1" />
              <p className="font-bold">Inquiry Successfully Registered!</p>
              <p className="text-[11px] text-emerald-300">
                Our Master Ustaad will send timber wood grain samples and custom CAD drawings to your WhatsApp.
              </p>
            </div>
          )}
        </div>

        {/* Drawer Footer Total */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-6 border-t border-[#2d1e13] bg-[#18110b]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-stone-400">Total Estimated Value:</span>
              <span className="font-serif text-xl font-bold text-[#f3d393]">
                {formatPrice(totalINR)}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-stone-500">
              <ShieldCheck className="w-3.5 h-3.5 text-[#d4a359]" />
              <span>Includes white-glove packaging in custom timber crates.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
