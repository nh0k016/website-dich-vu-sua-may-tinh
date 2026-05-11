"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FAQItem {
  q: string;
  a: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <div className="space-y-4">
      {items.map((item, i) => (
        <div 
          key={i} 
          className={`bg-white rounded-3xl border transition-colors duration-200 ${
            activeIndex === i ? 'border-cyan-500 shadow-xl shadow-cyan-500/10' : 'border-slate-100'
          }`}
        >
          <button
            onClick={() => setActiveIndex(activeIndex === i ? null : i)}
            className="w-full text-left p-6 md:p-8 flex items-center justify-between gap-4 outline-none"
          >
            <h3 className={`text-lg md:text-xl font-bold transition-colors duration-200 ${
              activeIndex === i ? 'text-cyan-700' : 'text-slate-800'
            }`}>
              {item.q}
            </h3>
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
              activeIndex === i ? 'bg-cyan-500 text-white rotate-180 shadow-md' : 'bg-slate-50 text-slate-400'
            }`}>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </button>
          
          <AnimatePresence initial={false}>
            {activeIndex === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
                style={{ overflow: 'hidden', willChange: 'height' }}
              >
                <div className="px-6 md:px-8 pb-8 text-slate-500 leading-relaxed text-lg border-t border-slate-50 pt-6">
                  {item.a}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
