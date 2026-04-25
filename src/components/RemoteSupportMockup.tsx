"use client";

import React from 'react';
import { motion } from 'framer-motion';

export default function RemoteSupportMockup() {
  return (
    <div className="relative w-full max-w-2xl mx-auto animate-in zoom-in duration-1000">
      {/* UltraViewer Window Frame */}
      <div className="bg-[#f0f0f0] rounded-xl shadow-2xl border border-slate-300 overflow-hidden">
        {/* Title Bar */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-500 px-4 py-2 flex items-center justify-between text-white shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
              <div className="w-3 h-3 bg-blue-600 rounded-sm"></div>
            </div>
            <span className="text-xs font-bold tracking-tight">UltraViewer - Remote Support (ID: 877 023 032)</span>
          </div>
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-white/20 rounded-sm"></div>
            <div className="w-3 h-3 bg-white/20 rounded-sm"></div>
            <div className="w-3 h-3 bg-red-500/80 rounded-sm"></div>
          </div>
        </div>

        {/* Remote Content Area */}
        <div className="relative bg-[#334155] h-[400px] overflow-hidden">
          {/* Mock Desktop Background */}
          <div className="absolute inset-0 opacity-50 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1000')] bg-cover"></div>
          
          {/* Floating Windows / Taskbar */}
          <div className="absolute bottom-0 left-0 right-0 h-10 bg-black/40 backdrop-blur-md border-t border-white/10 flex items-center px-4 gap-4">
            <div className="w-6 h-6 bg-blue-500 rounded-sm"></div>
            <div className="w-32 h-4 bg-white/10 rounded-full"></div>
          </div>

          {/* Simulated Mouse Cursor */}
          <motion.div 
            className="absolute z-50 pointer-events-none"
            animate={{ 
              x: [100, 400, 250, 450, 100], 
              y: [100, 150, 300, 200, 100] 
            }}
            transition={{ 
              duration: 15, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg className="w-6 h-6 drop-shadow-lg" viewBox="0 0 24 24" fill="white">
              <path d="M7 2l12 11.13l-4.47 1.02l3.47 6.85l-2 1l-3.47-6.85L7 22V2z" stroke="black" strokeWidth="1"/>
            </svg>
          </motion.div>

          {/* "Processing" Dialog */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 bg-white rounded-xl shadow-2xl border border-slate-200 p-6 z-40"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-600">
                <svg className="w-6 h-6 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Đang tối ưu hệ thống...</div>
                <div className="text-[10px] text-slate-500">FastFix Technician connected</div>
              </div>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <motion.div 
                className="bg-cyan-500 h-full"
                animate={{ width: ["0%", "100%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>

          {/* Success Badge */}
          <motion.div 
            className="absolute top-10 right-10 bg-green-500 text-white px-4 py-2 rounded-lg font-bold text-xs shadow-lg flex items-center gap-2"
            animate={{ 
              opacity: [0, 1, 1, 0],
              y: [20, 0, 0, -20]
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              times: [0, 0.1, 0.9, 1]
            }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
            Lỗi đã được sửa!
          </motion.div>
        </div>

        {/* Footer info */}
        <div className="bg-slate-50 px-4 py-3 flex items-center justify-between border-t border-slate-200">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-[10px] font-bold text-slate-600 uppercase">Status: Connected (DESKTOP-VINH)</span>
          </div>
          <div className="text-[10px] text-slate-400 font-medium">Bảo mật tuyệt đối: AES-256 bits</div>
        </div>
      </div>

      {/* Decorative Glow */}
      <div className="absolute -inset-4 bg-blue-500/10 rounded-[2rem] blur-2xl -z-10"></div>
    </div>
  );
}
