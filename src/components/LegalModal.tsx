import React, { useState, useEffect } from 'react';
import { X, Shield, FileText, Cookie, Check, Phone, MessageSquare, AlertCircle } from 'lucide-react';
import { LegalPageType } from '../types';
import { playBrassChime } from '../utils/audioAmbience';

interface Props {
  initialTab: LegalPageType;
  isOpen: boolean;
  onClose: () => void;
}

export const LegalModal: React.FC<Props> = ({ initialTab, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<LegalPageType>(initialTab);

  // Cookie settings state
  const [cookiePreferences, setCookiePreferences] = useState({
    essential: true,
    preferences: true,
    analytics: false,
  });
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('kamal_cookie_settings');
      if (stored) {
        setCookiePreferences(JSON.parse(stored));
      }
    } catch {
      // ignore
    }
  }, []);

  if (!isOpen) return null;

  const handleSaveCookiePreferences = (newPrefs: typeof cookiePreferences) => {
    playBrassChime();
    setCookiePreferences(newPrefs);
    try {
      localStorage.setItem('kamal_cookie_settings', JSON.stringify(newPrefs));
    } catch {
      // ignore
    }
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleAcceptAllCookies = () => {
    handleSaveCookiePreferences({
      essential: true,
      preferences: true,
      analytics: true,
    });
  };

  const handleRejectNonEssential = () => {
    handleSaveCookiePreferences({
      essential: true,
      preferences: false,
      analytics: false,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-2xl bg-[#140d08] border border-[#d4a359]/40 shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Header Bar */}
        <div className="p-4 sm:p-6 border-b border-[#311f13] bg-[#1a110a] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#d4a359]/20 border border-[#d4a359]/50 flex items-center justify-center text-[#d4a359]">
              {activeTab === 'privacy' && <Shield className="w-4 h-4" />}
              {activeTab === 'terms' && <FileText className="w-4 h-4" />}
              {activeTab === 'cookies' && <Cookie className="w-4 h-4" />}
            </div>
            <div>
              <h2 className="font-serif text-base sm:text-lg font-bold text-white tracking-wide">
                Kamal Furniture Sovereign Legal Registry
              </h2>
              <span className="text-[10px] sm:text-[11px] font-mono text-[#d4a359] block">
                Last Updated: September 2026 • Jodhpur Heritage Atelier
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-white bg-[#22160d] border border-[#3e2819] transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selection Bar */}
        <div className="px-3 sm:px-6 pt-3 pb-2 bg-[#170f09] border-b border-[#2b1b10] flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
          <button
            type="button"
            onClick={() => {
              playBrassChime();
              setActiveTab('privacy');
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
              activeTab === 'privacy'
                ? 'bg-[#d4a359] text-[#140c06] border-[#d4a359] shadow-md font-bold'
                : 'bg-[#1f150d] text-stone-300 border-[#382517] hover:text-white'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>Privacy Policy</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playBrassChime();
              setActiveTab('terms');
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
              activeTab === 'terms'
                ? 'bg-[#d4a359] text-[#140c06] border-[#d4a359] shadow-md font-bold'
                : 'bg-[#1f150d] text-stone-300 border-[#382517] hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Terms & Conditions</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playBrassChime();
              setActiveTab('cookies');
            }}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all border ${
              activeTab === 'cookies'
                ? 'bg-[#d4a359] text-[#140c06] border-[#d4a359] shadow-md font-bold'
                : 'bg-[#1f150d] text-stone-300 border-[#382517] hover:text-white'
            }`}
          >
            <Cookie className="w-3.5 h-3.5" />
            <span>Cookie Consent</span>
          </button>
        </div>

        {/* Scrollable Content Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-7 text-xs sm:text-sm text-stone-300 space-y-6 leading-relaxed">
          {/* ============================================================ */}
          {/* TAB 1: PRIVACY POLICY */}
          {/* ============================================================ */}
          {activeTab === 'privacy' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="p-4 rounded-xl bg-[#1b120a] border border-[#3d2719]">
                <h3 className="font-serif text-base font-bold text-amber-200 mb-1">
                  1. Our Commitment to Discretion & Data Protection
                </h3>
                <p className="text-stone-300 text-xs leading-relaxed">
                  At <strong>Kamal Furniture</strong> (established 1994, Jodhpur, Rajasthan), we treat patron information with the same reverence and integrity as our 45-year naturally seasoned timber. This Privacy Policy details how we handle client names, delivery destinations, custom floor plans, and CAD briefs submitted through our interactive 3D atelier or direct telephone and WhatsApp communications.
                </p>
              </div>

              <div>
                <h4 className="font-serif font-bold text-amber-100 text-sm mb-2">
                  2. Information We Collect
                </h4>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-stone-300">
                  <li><strong>Inquiry Brief Details:</strong> Selected wooden pieces, custom dimension requirements, desired timber finish (Sheesham, Teak, Rosewood, Antique Walnut), and brass hardware specifications.</li>
                  <li><strong>Contact Details:</strong> Client full name, delivery city or international jurisdiction, and telephone/WhatsApp number for CAD renderings and logistics coordination.</li>
                  <li><strong>Zero Unsolicited Marketing:</strong> We never sell, lease, or monetize your contact records to third-party ad networks or brokers. All communications are direct between the client and our Master Ustaads.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-serif font-bold text-amber-100 text-sm mb-2">
                  3. Communication via WhatsApp & Direct Phone
                </h4>
                <p className="text-xs text-stone-300">
                  When you initiate an inquiry via WhatsApp or direct phone call (+91 7378671779), your conversation is end-to-end encrypted according to WhatsApp's security standards. We use these channels exclusively to share timber grain photographs, video progress updates of your hand-carved piece, and dispatch freight waybills.
                </p>
              </div>

              <div>
                <h4 className="font-serif font-bold text-amber-100 text-sm mb-2">
                  4. Data Retention & Right to Erasure
                </h4>
                <p className="text-xs text-stone-300">
                  Client architectural briefs and commission archives are maintained solely to honor our 100-Year Timber Heirloom Guarantee and provide future restoration support. You may at any moment request complete erasure of your contact records by sending a request to our concierge at <strong>+91 7378671779</strong>.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-[#1b120a] border border-[#3e2b1d] flex items-center justify-between gap-3 text-xs">
                <div>
                  <span className="text-stone-400 block text-[11px]">Privacy Officer & Concierge Desk:</span>
                  <span className="text-amber-200 font-semibold">Kamal Furniture Heritage Atelier, Jodhpur</span>
                </div>
                <a
                  href="tel:+917378671779"
                  className="px-3 py-1.5 rounded-lg bg-[#25180e] hover:bg-[#322013] text-amber-200 border border-[#483323] text-xs font-mono font-medium inline-flex items-center gap-1.5"
                >
                  <Phone className="w-3 h-3 text-[#d4a359]" />
                  <span>+91 7378671779</span>
                </a>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 2: TERMS AND CONDITIONS */}
          {/* ============================================================ */}
          {activeTab === 'terms' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="p-4 rounded-xl bg-[#1b120a] border border-[#3d2719]">
                <h3 className="font-serif text-base font-bold text-amber-200 mb-1">
                  1. Scope of Heirloom Craftsmanship
                </h3>
                <p className="text-stone-300 text-xs leading-relaxed">
                  Every article produced by <strong>Kamal Furniture</strong> is an individually hand-chiseled heirloom chiseled from certified Indian hardwood (Grade-A Seasoned Sheesham, Malabar Rosewood, and CP Teak). By placing a bespoke inquiry or procurement order, you agree to the craft conditions set forth herein.
                </p>
              </div>

              <div>
                <h4 className="font-serif font-bold text-amber-100 text-sm mb-2">
                  2. Natural Timber Character & Grain Authenticity
                </h4>
                <p className="text-xs text-stone-300 mb-2">
                  Solid natural timber possesses living biological individuality. Variations in organic grain streaks, natural knot signatures, and seasonal micro-expansion are natural hallmarks of authentic timber and do not constitute structural flaws.
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-stone-300">
                  <li>No two pieces will ever be machine-identical; each piece carries unique grain swirls and chisel strokes of the resident artisan.</li>
                  <li>Interlocking woodwork uses traditional <em>Chool-Salai</em> (mortise-and-tenon) joinery and wooden dowels without synthetic steel nails.</li>
                </ul>
              </div>

              <div>
                <h4 className="font-serif font-bold text-amber-100 text-sm mb-2">
                  3. Production Lead Times & Bespoke Commissions
                </h4>
                <p className="text-xs text-stone-300">
                  Standard ready catalog pieces ship within 3 to 7 business days. Custom architectural commissions (such as royal swings with hand-cast peacock chains or sanctum doors) require 2 to 6 weeks of dedicated master hand-carving and multi-coat lacquer curing. Exact schedules are confirmed on your official atelier dispatch receipt.
                </p>
              </div>

              <div>
                <h4 className="font-serif font-bold text-amber-100 text-sm mb-2">
                  4. White-Glove Crate Transit & Inspection
                </h4>
                <p className="text-xs text-stone-300">
                  All furniture leaves our atelier cushioned in 5-layer protective foam, edge corner guards, and water-sealed solid pine outer crate frameworks. Patrons must inspect external crating upon arrival. In the rare event of transit damage, notify our concierge at +91 7378671779 within 48 hours for immediate white-glove rectification or restoration.
                </p>
              </div>

              <div>
                <h4 className="font-serif font-bold text-amber-100 text-sm mb-2">
                  5. 100-Year Timber Heirloom Guarantee
                </h4>
                <p className="text-xs text-stone-300">
                  We warrant that all core load-bearing timber components are protected against termite infestation, structural joint collapse, and wood rot for 100 years, provided customary moisture and sun care protocols (described in our Hardwood Care Guide) are observed.
                </p>
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* TAB 3: COOKIE CONSENT & PREFERENCES */}
          {/* ============================================================ */}
          {activeTab === 'cookies' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div className="p-4 rounded-xl bg-[#1b120a] border border-[#3d2719]">
                <h3 className="font-serif text-base font-bold text-amber-200 mb-1">
                  Cookie & Local Storage Preferences
                </h3>
                <p className="text-stone-300 text-xs leading-relaxed">
                  We use cookies and browser local storage to preserve your selected currency, active 3D timber finish preferences, inquiry brief items, and royal palace sitar sound settings. We do not use third-party invasive cross-site advertising cookies.
                </p>
              </div>

              {savedNotice && (
                <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-200 text-xs flex items-center gap-2 animate-in fade-in">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Your cookie and privacy preferences have been updated!</span>
                </div>
              )}

              <div className="space-y-3">
                {/* Category 1: Strictly Necessary */}
                <div className="p-4 rounded-xl bg-[#18110b] border border-[#382618] flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-serif font-bold text-white text-sm">Essential & Functional Storage</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#291b10] border border-[#543b23] text-[10px] text-amber-300 font-mono">
                        Always Active
                      </span>
                    </div>
                    <p className="text-xs text-stone-400 leading-relaxed">
                      Required for basic navigation, keeping your curated inquiry brief alive across pages, and rendering the 3D WebGL model viewport accurately.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={true}
                    disabled={true}
                    className="w-4 h-4 accent-[#d4a359] mt-1 cursor-not-allowed opacity-75"
                  />
                </div>

                {/* Category 2: Preferences & Audio */}
                <div className="p-4 rounded-xl bg-[#18110b] border border-[#382618] flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-serif font-bold text-white text-sm">Patron Experience & Sound Preferences</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#1b251d] border border-emerald-800/60 text-[10px] text-emerald-300 font-mono">
                        Optional
                      </span>
                    </div>
                    <p className="text-xs text-stone-400 leading-relaxed">
                      Remembers your preferred currency (₹ INR, $ USD, € EUR, AED), selected wood finish choices, and palace acoustic tanpura ambience sound state.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={cookiePreferences.preferences}
                    onChange={(e) =>
                      setCookiePreferences((prev) => ({ ...prev, preferences: e.target.checked }))
                    }
                    className="w-4 h-4 accent-[#d4a359] mt-1 cursor-pointer"
                  />
                </div>

                {/* Category 3: Anonymous Analytics */}
                <div className="p-4 rounded-xl bg-[#18110b] border border-[#382618] flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-serif font-bold text-white text-sm">Atelier Navigation Performance</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#1b251d] border border-emerald-800/60 text-[10px] text-emerald-300 font-mono">
                        Optional
                      </span>
                    </div>
                    <p className="text-xs text-stone-400 leading-relaxed">
                      Helps our engineering team measure 3D rendering frame rates and page load performance anonymously across different mobile and desktop devices.
                    </p>
                  </div>
                  <input
                    type="checkbox"
                    checked={cookiePreferences.analytics}
                    onChange={(e) =>
                      setCookiePreferences((prev) => ({ ...prev, analytics: e.target.checked }))
                    }
                    className="w-4 h-4 accent-[#d4a359] mt-1 cursor-pointer"
                  />
                </div>
              </div>

              {/* Cookie Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pt-3 border-t border-[#311f12]">
                <button
                  type="button"
                  onClick={handleRejectNonEssential}
                  className="px-4 py-2.5 rounded-xl bg-[#20150d] hover:bg-[#281b11] text-stone-300 border border-[#3e2819] text-xs font-medium text-center transition-colors"
                >
                  Essential Only
                </button>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleSaveCookiePreferences(cookiePreferences)}
                    className="px-4 py-2.5 rounded-xl bg-[#2b1c11] hover:bg-[#382517] text-amber-200 border border-[#523824] text-xs font-semibold text-center transition-colors"
                  >
                    Save Preferences
                  </button>
                  <button
                    type="button"
                    onClick={handleAcceptAllCookies}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4a359] to-[#c28f45] text-[#140c06] text-xs font-bold shadow-lg hover:brightness-110 text-center transition-all"
                  >
                    Accept All Cookies
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 border-t border-[#311f13] bg-[#160e09] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 text-xs">
          <div className="flex items-center gap-2 text-stone-400 text-[11px]">
            <AlertCircle className="w-3.5 h-3.5 text-[#d4a359]" />
            <span>Direct Concierge: +91 7378671779 (WhatsApp & Calls)</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-[#22160d] hover:bg-[#2b1c11] text-stone-300 border border-[#3e2819] text-xs font-medium transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
