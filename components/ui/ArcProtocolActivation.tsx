"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Zap, ShieldCheck } from "lucide-react";

export function ArcProtocolActivation() {
  const [isActivating, setIsActivating] = useState(false);
  const [coreState, setCoreState] = useState<"subdued" | "online">("subdued");
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Sync state on load
  useEffect(() => {
    const timer = window.setTimeout(() => {
      const saved = window.sessionStorage.getItem("kj-core-state");
      if (saved === "online") {
        setCoreState("online");
        document.documentElement.setAttribute("data-core-state", "online");
      } else {
        document.documentElement.setAttribute("data-core-state", "subdued");
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const triggerActivation = useCallback(() => {
    if (isActivating) return;

    if (shouldReduceMotion) {
      // 150-250ms reduced motion instant transition
      const nextState = coreState === "online" ? "subdued" : "online";
      setCoreState(nextState);
      document.documentElement.setAttribute("data-core-state", nextState);
      window.sessionStorage.setItem("kj-core-state", nextState);
      return;
    }

    const currentY = window.scrollY;
    setIsActivating(true);
    document.body.style.overflow = "hidden";

    // Sequence timing
    setTimeout(() => {
      // Step 7: Core state toggle while covered
      const nextState = coreState === "online" ? "subdued" : "online";
      setCoreState(nextState);
      document.documentElement.setAttribute("data-core-state", nextState);
      window.sessionStorage.setItem("kj-core-state", nextState);
    }, 1000);

    setTimeout(() => {
      // Step 9-10: Retract plates and restore scroll & focus
      setIsActivating(false);
      document.body.style.overflow = "";
      window.scrollTo(0, currentY);
      triggerRef.current?.focus();
    }, 1800);
  }, [isActivating, coreState, shouldReduceMotion]);

  return (
    <>
      {/* Trigger Control Button */}
      <button
        ref={triggerRef}
        type="button"
        onClick={triggerActivation}
        disabled={isActivating}
        className={`relative inline-flex items-center gap-3 px-6 py-3.5 rounded-lg font-mono text-xs font-bold uppercase tracking-widest transition-all duration-300 shadow-xl overflow-hidden focus-ring ${
          coreState === "online"
            ? "bg-red-600 hover:bg-red-500 text-white border-2 border-amber-400 shadow-[0_0_25px_rgba(220,38,38,0.6)]"
            : "bg-slate-900 hover:bg-slate-800 text-amber-400 border-2 border-amber-500/60 shadow-[0_0_15px_rgba(245,158,11,0.3)]"
        }`}
      >
        <Zap
          size={18}
          className={`${
            coreState === "online" ? "text-cyan-300 animate-pulse" : "text-amber-400"
          }`}
        />
        <span>
          {isActivating
            ? "ACTIVATING PROTOCOL..."
            : coreState === "online"
            ? "KJ CORE ONLINE // RE-CALIBRATE"
            : "ACTIVATE ARC PROTOCOL"}
        </span>
      </button>

      {/* Stateful Activation Sequence Modal Overlay */}
      <AnimatePresence>
        {isActivating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md pointer-events-auto"
          >
            {/* Top Red & Gold Armor Plate */}
            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
              className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#8B0000] via-[#1E293B] to-[#0B0F19] border-b-4 border-amber-400 shadow-2xl flex items-end justify-center pb-6"
            >
              <span className="font-mono text-xs font-bold text-amber-400 tracking-widest">
                {"// ARMOUR PANEL ALPHA ENGAGED"}
              </span>
            </motion.div>

            {/* Bottom Red & Gold Armor Plate */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.7, ease: [0.77, 0, 0.175, 1] }}
              className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#8B0000] via-[#1E293B] to-[#0B0F19] border-t-4 border-amber-400 shadow-2xl flex items-start justify-center pt-6"
            >
              <span className="font-mono text-xs font-bold text-amber-400 tracking-widest">
                {"// ARMOUR PANEL OMEGA ENGAGED"}
              </span>
            </motion.div>

            {/* Center Segmented Arc Energy Reactor Assembly */}
            <div className="relative z-20 flex flex-col items-center justify-center">
              <motion.div
                initial={{ scale: 0.5, opacity: 0, rotate: 0 }}
                animate={{ scale: 1.2, opacity: 1, rotate: 360 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
                className="relative w-48 h-48 rounded-full border-4 border-dashed border-cyan-400 flex items-center justify-center shadow-[0_0_50px_rgba(56,189,248,0.8)]"
              >
                <div className="w-32 h-32 rounded-full border-4 border-amber-400 flex items-center justify-center bg-cyan-400/20">
                  <div className="w-16 h-16 rounded-full bg-white shadow-[0_0_35px_#ffffff]" />
                </div>
              </motion.div>

              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="font-mono text-sm font-bold text-white tracking-widest mt-6 uppercase flex items-center gap-2"
              >
                <ShieldCheck size={18} className="text-amber-400" /> INITIALIZING KJ CORE SYSTEM
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
