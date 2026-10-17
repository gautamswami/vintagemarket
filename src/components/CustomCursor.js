"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/components/gsapClient";

export default function CustomCursor() {
  const ringRef = useRef(null);

  useEffect(() => {
    const ring = ringRef.current;
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!ring || !fine || reduced) return undefined;

    gsap.set(ring, { xPercent: -50, yPercent: -50, opacity: 0, scale: 1 });
    const xTo = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });

    const onMove = (event) => {
      xTo(event.clientX);
      yTo(event.clientY);
      if (Number(gsap.getProperty(ring, "opacity")) < 1) {
        gsap.to(ring, { opacity: 1, duration: 0.2 });
      }
    };

    const onOver = (event) => {
      const hit = event.target.closest?.("a, button");
      gsap.to(ring, {
        scale: hit ? 1.85 : 1,
        duration: 0.3,
        ease: "power3.out",
      });
    };

    window.addEventListener("pointermove", onMove);
    document.addEventListener("pointerover", onOver);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      gsap.killTweensOf(ring);
    };
  }, []);

  return <div ref={ringRef} className="cursor-ring" aria-hidden="true" />;
}
