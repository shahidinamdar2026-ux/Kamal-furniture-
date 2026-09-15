/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SelectYourFurniture } from './components/SelectYourFurniture';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { InquiryDrawer } from './components/InquiryDrawer';
import { CartItem, FurniturePiece, WoodFinish, FabricType } from './types';
import { FURNITURE_PIECES } from './data/furnitureData';

export default function App() {
  // State for inquiry brief items
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      piece: FURNITURE_PIECES[0], // Desk as default curated piece
      selectedWood: 'sheesham',
      selectedFabric: 'crimson_silk',
      quantity: 1,
    },
  ]);

  const [currency, setCurrency] = useState<'INR' | 'USD' | 'EUR' | 'AED'>('INR');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Smooth scroll progress indicator
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Add piece to brief
  const handleAddToCart = (piece: FurniturePiece, wood: WoodFinish, fabric?: FabricType) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (it) => it.piece.id === piece.id && it.selectedWood === wood && it.selectedFabric === fabric
      );
      if (existingIdx >= 0) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      } else {
        return [...prev, { piece, selectedWood: wood, selectedFabric: fabric, quantity: 1 }];
      }
    });
  };

  const handleUpdateQuantity = (idx: number, qty: number) => {
    setCartItems((prev) => {
      const copy = [...prev];
      copy[idx].quantity = qty;
      return copy;
    });
  };

  const handleRemoveItem = (idx: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-[#0e0a07] text-[#f4efe8] flex flex-col justify-between selection:bg-[#d4a359] selection:text-[#1c120c] relative">
      {/* Dynamic Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#d4a359] via-[#f5d59a] to-[#d4a359] z-50 origin-left pointer-events-none shadow-[0_0_10px_rgba(212,163,89,0.5)]"
      />

      {/* Navigation Bar */}
      <Navbar
        cartItems={cartItems}
        currency={currency}
        onCurrencyChange={setCurrency}
        onOpenDrawer={() => setIsDrawerOpen(true)}
      />

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <HeroSection
          currency={currency}
          onAddToCart={handleAddToCart}
          onOpenDrawer={() => setIsDrawerOpen(true)}
        />

        {/* Section: Select Your Furniture (Readymade & Designed in Sliding Format) */}
        <SelectYourFurniture
          currency={currency}
          onAddToCart={handleAddToCart}
          onOpenDrawer={() => setIsDrawerOpen(true)}
        />

        {/* Section: FAQ & Knowledge Base */}
        <FAQSection onOpenInquiryDrawer={() => setIsDrawerOpen(true)} />
      </main>

      {/* Footer */}
      <Footer onOpenInquiryDrawer={() => setIsDrawerOpen(true)} />

      {/* Slide-over Inquiry Brief / Cart Drawer */}
      <InquiryDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        cartItems={cartItems}
        currency={currency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
