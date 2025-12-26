"use client";

import { useEffect, useRef, useState } from "react";

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: 50, y: 50 });
  const targetRef = useRef({ x: 50, y: 50 });
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      targetRef.current = { x: event.clientX, y: event.clientY };
      if (frameRef.current) return;

      const loop = () => {
        const { x: tx, y: ty } = targetRef.current;
        setPos((prev) => {
          const lerp = 0.35; // daha hızlı takip için yüksek katsayı
          const nx = prev.x + (tx - prev.x) * lerp;
          const ny = prev.y + (ty - prev.y) * lerp;
          if (Math.abs(nx - tx) < 0.5 && Math.abs(ny - ty) < 0.5) {
            frameRef.current = null;
            return { x: tx, y: ty };
          }
          frameRef.current = requestAnimationFrame(loop);
          return { x: nx, y: ny };
        });
      };

      frameRef.current = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <div
        className="absolute h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[70px] opacity-70 mix-blend-screen"
        style={{
          left: `${pos.x}px`,
          top: `${pos.y}px`,
          transition: "left 30ms linear, top 30ms linear",
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.22), rgba(120,180,255,0.16), transparent 60%)",
        }}
      />
    </div>
  );
}
