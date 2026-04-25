"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const commands = [
  { text: "> sudo system-check --full", color: "text-slate-400" },
  { text: "Scanning system hardware...", color: "text-cyan-400" },
  { text: "Verifying Windows Registry...", color: "text-cyan-400" },
  { text: "Status: 42% completed", color: "text-yellow-400" },
  { text: "Checking for malware signatures...", color: "text-cyan-400" },
  { text: "Virus detected: 0", color: "text-green-400", delay: 1000 },
  { text: "Optimization in progress...", color: "text-blue-400" },
  { text: "Cleaning temp files: 1.2GB removed", color: "text-green-400" },
  { text: "System latency optimized: -15ms", color: "text-green-400" },
  { text: "Optimization: 100%", color: "text-green-500 font-bold" },
  { text: "System is now SECURE & FAST", color: "text-cyan-500 font-bold" },
  { text: "> ready_for_support_", color: "text-white animate-pulse" },
];

export default function TerminalMockup() {
  const [visibleCommands, setVisibleCommands] = useState<typeof commands>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < commands.length) {
      const timer = setTimeout(() => {
        setVisibleCommands(prev => [...prev, commands[currentIndex]]);
        setCurrentIndex(prev => prev + 1);
      }, commands[currentIndex].delay || 600);
      return () => clearTimeout(timer);
    } else {
      // Loop the animation
      const restartTimer = setTimeout(() => {
        setVisibleCommands([]);
        setCurrentIndex(0);
      }, 5000);
      return () => clearTimeout(restartTimer);
    }
  }, [currentIndex]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Laptop Frame */}
      <div className="relative bg-slate-800 rounded-t-2xl p-2 pb-0 shadow-2xl border border-slate-700">
        {/* Top bar with dots */}
        <div className="flex items-center gap-1.5 mb-2 px-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
          <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
          <div className="ml-2 text-[10px] text-slate-500 font-mono uppercase tracking-widest">FastFix_Terminal_v2.0</div>
        </div>
        
        {/* Screen Content */}
        <div className="bg-[#0f172a] rounded-t-lg p-6 h-[400px] font-mono text-sm overflow-hidden relative border border-white/5">
          {/* Scanline Effect */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] z-10 bg-[length:100%_4px,3px_100%]"></div>
          
          <div className="relative z-0 space-y-2">
            <AnimatePresence>
              {visibleCommands.map((cmd, idx) => (
                <motion.div
                  key={`${currentIndex}-${idx}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`${cmd.color} flex items-start gap-2`}
                >
                  <span className="shrink-0">{idx === 0 || idx === commands.length - 1 ? "" : "::"}</span>
                  <span>{cmd.text}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          
          {/* Matrix-like faint background */}
          <div className="absolute inset-0 opacity-[0.03] text-[8px] leading-none text-green-500 pointer-events-none select-none overflow-hidden font-black">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="whitespace-nowrap">
                {Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Laptop Base (SVG) */}
      <div className="relative">
        <div className="h-4 bg-slate-700 rounded-b-lg shadow-inner border-t border-slate-600/50"></div>
        <div className="w-32 h-1 bg-slate-900 mx-auto rounded-full mt-1 opacity-20"></div>
      </div>

      {/* Decorative Glows */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
    </div>
  );
}
