"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/components/gsapClient";
import { reducedMotion } from "@/lib/motion";

export default function RevealGrid({ children, className = "", watch = "" }) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray(".reveal-card", root);
      if (!items.length) return;
      ScrollTrigger.batch(items, {
        start: "top 88%",
        once: true,
        onEnter: (batch) => {
          gsap.fromTo(
            batch,
            {
              opacity: 0,
              y: 60,
              rotateX: 12,
              transformPerspective: 900,
              transformOrigin: "top center",
            },
            {
              opacity: 1,
              y: 0,
              rotateX: 0,
              duration: 0.9,
              stagger: 0.08,
              ease: "power3.out",
              overwrite: true,
            },
          );
        },
      });
    }, root);

    return () => ctx.revert();
  }, [watch]);

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
