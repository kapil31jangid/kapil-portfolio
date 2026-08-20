"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Zap } from "lucide-react";

export function BootSequence() {
  const [booting, setBooting] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => {
      setBooting(false);
    }, shouldReduceMotion ? 0 : 1500);
    return () => clearTimeout(timer);
  }, [shouldReduceMotion]);

  if (!booting) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-[100] bg-[#020305] flex flex-col items-center justify-center pointer-events-auto"
      >
        {/* Skip Button */}
        <button
          type="button"
          onClick={() => setBooting(false)}
          className="absolute top-6 right-6 px-4 py-2 bg-slate-900 border border-slate-700 text-slate-300 hover:text-amber-400 font-mono text-xs font-bold rounded uppercase tracking-widest transition"
        >
          Skip Boot [ESC]
        </button>

        {/* Core Ring Alignment Animation */}
        <div className="relative flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0.4, opacity: 0, rotate: 0 }}
            animate={{ scale: 1, opacity: 1, rotate: 180 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-40 h-40 rounded-full border-4 border-dashed border-amber-400 flex items-center justify-center shadow-[0_0_40px_rgba(214,164,59,0.5)]"
          >
            <div className="w-24 h-24 rounded-full border-2 border-cyan-400 flex items-center justify-center bg-cyan-400/20">
              <div className="w-10 h-10 rounded-full bg-white shadow-[0_0_30px_#ffffff]" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-6 flex flex-col items-center gap-1.5"
          >
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-widest">
              <Zap size={16} className="text-cyan-400 animate-pulse" />
              <span>KJ ARC SYSTEM // INITIALIZING</span>
            </div>
            <span className="text-slate-400 font-mono text-[10px] tracking-wider uppercase">
              IDENTITY: KAPIL JANGID · AI FULL STACK DEVELOPER
            </span>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
