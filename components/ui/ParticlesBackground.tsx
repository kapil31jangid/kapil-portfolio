"use client";

import { useEffect, useRef } from "react";

type ParticlesBackgroundProps = {
  density?: number;
};

export function ParticlesBackground({ density = 36 }: ParticlesBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let animationId = 0;
    const particles = Array.from({ length: density }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 1.8 + 0.4,
      speed: Math.random() * 0.00035 + 0.00008,
      hue: Math.random() > 0.5 ? "rgba(34,211,238," : "rgba(139,92,246,",
    }));

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      context.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      context.clearRect(0, 0, width, height);

      particles.forEach((particle) => {
        particle.y -= particle.speed;
        if (particle.y < 0) particle.y = 1;

        context.beginPath();
        context.fillStyle = `${particle.hue}${0.35 + Math.random() * 0.25})`;
        context.arc(
          particle.x * width,
          particle.y * height,
          particle.size,
          0,
          Math.PI * 2,
        );
        context.fill();
      });

      animationId = window.requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-70"
    />
  );
}
