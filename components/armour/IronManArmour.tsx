"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import metadata from "@/public/armours/iron-man/metadata.json";

const ASSET_ROOT = "/armours/iron-man";

type LayerProps = {
  src: string;
  className?: string;
  preload?: boolean;
};

function ArmourLayer({ src, className = "", preload = false }: LayerProps) {
  return (
    <Image
      src={`${ASSET_ROOT}/${src}`}
      alt=""
      fill
      preload={preload}
      unoptimized
      sizes="(max-width: 767px) 94vw, (max-width: 1199px) 52vw, 44vw"
      className={`pointer-events-none select-none object-contain object-center ${className}`}
      draggable={false}
    />
  );
}

export function IronManArmour() {
  const [isOpen, setIsOpen] = useState(false);
  const [announcement, setAnnouncement] = useState("Helmet closed");
  const closeTimer = useRef<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const openHelmet = useCallback(() => {
    clearCloseTimer();
    setIsOpen(true);
    setAnnouncement("Helmet open. Kapil Jangid is visible inside the armour.");
  }, [clearCloseTimer]);

  const closeHelmet = useCallback(() => {
    clearCloseTimer();
    setIsOpen(false);
    setAnnouncement("Helmet closed");
  }, [clearCloseTimer]);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(closeHelmet, 150);
  }, [clearCloseTimer, closeHelmet]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) closeHelmet();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (isOpen && stageRef.current && !stageRef.current.contains(event.target as Node)) {
        closeHelmet();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      clearCloseTimer();
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [clearCloseTimer, closeHelmet, isOpen]);

  const duration = reducedMotion ? 0.12 : 0.74;
  const easing: "linear" | [number, number, number, number] = reducedMotion
    ? "linear"
    : [0.22, 0.72, 0.14, 1];

  return (
    <div
      ref={stageRef}
      className="iron-man-armour-stage"
      role="img"
      aria-label="Interactive red-and-gold KJ armour system; open the helmet to reveal Kapil Jangid"
      onPointerEnter={clearCloseTimer}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") scheduleClose();
      }}
    >
      <div className="iron-man-ground-glow" aria-hidden="true" />

      <motion.div
        className="iron-man-layer iron-man-face-layer"
        initial={false}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{
          duration: reducedMotion ? 0.1 : 0.28,
          delay: isOpen && !reducedMotion ? 0.18 : 0,
        }}
      >
        <ArmourLayer src="kapil-face-layer.webp" preload />
      </motion.div>

      <div className="iron-man-layer iron-man-body-layer">
        <ArmourLayer src="body-open.webp" preload />
      </div>

      <motion.div
        className="iron-man-layer iron-man-interior-layer"
        initial={false}
        animate={{ opacity: isOpen ? 1 : 0.15 }}
        transition={{ duration: reducedMotion ? 0.1 : 0.3 }}
      >
        <ArmourLayer src="helmet-interior.webp" />
      </motion.div>

      <motion.div
        className="iron-man-layer iron-man-plate-shadow"
        aria-hidden="true"
        initial={false}
        animate={{ opacity: isOpen ? 0.58 : 0, y: isOpen ? "-1.2%" : "0%" }}
        transition={{ duration, ease: easing }}
      />

      <motion.div
        className="iron-man-layer iron-man-faceplate-layer"
        initial={false}
        animate={
          reducedMotion
            ? { opacity: isOpen ? 0 : 1 }
            : {
                opacity: 1,
                rotateX: isOpen ? metadata.openTransform.rotateX : 0,
                y: isOpen ? `${metadata.openTransform.translateYPercent}%` : "0%",
                scale: isOpen ? metadata.openTransform.scale : 1,
              }
        }
        transition={{ duration, ease: easing }}
        style={{
          transformOrigin: `${metadata.hinge.xPercent}% ${metadata.hinge.yPercent}%`,
          transformStyle: "preserve-3d",
        }}
      >
        <ArmourLayer src="faceplate.webp" preload />
      </motion.div>

      <motion.div
        className="iron-man-layer iron-man-eyes-layer"
        initial={false}
        animate={{ opacity: isOpen ? 0.08 : 1 }}
        transition={{ duration: reducedMotion ? 0.1 : 0.24 }}
      >
        <ArmourLayer src="eyes.webp" />
      </motion.div>

      <div className="iron-man-layer iron-man-reactor-layer">
        <ArmourLayer src="reactor.webp" preload />
      </div>

      <div className="iron-man-layer iron-man-highlights-layer">
        <ArmourLayer src="highlights.webp" />
      </div>

      <button
        type="button"
        className="iron-man-helmet-hotspot focus-ring"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close KJ armour helmet" : "Open KJ armour helmet and reveal Kapil Jangid"}
        onPointerEnter={(event) => {
          if (event.pointerType === "mouse") openHelmet();
        }}
        onPointerDown={(event) => {
          if (event.pointerType !== "mouse") {
            event.preventDefault();
            if (isOpen) closeHelmet();
            else openHelmet();
          }
        }}
        onClick={(event) => {
          if (event.detail === 0) {
            if (isOpen) closeHelmet();
            else openHelmet();
          }
        }}
        onFocus={openHelmet}
        onBlur={scheduleClose}
      >
        <span className="sr-only">{isOpen ? "Close helmet" : "Open helmet"}</span>
      </button>

      <p className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </p>
    </div>
  );
}
