"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/components/gsapClient";
import { reducedMotion } from "@/lib/motion";

export default function Preloader({ count }) {
  const rootRef = useRef(null);
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const digitRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    const finish = (store) => {
      if (store) sessionStorage.setItem("yard-shutter", "1");
      document.documentElement.classList.add("shutter-done");
      window.dispatchEvent(new Event("yard:open"));
    };

    if (document.documentElement.classList.contains("shutter-done") || reducedMotion()) {
      finish(false);
      return undefined;
    }

    const counter = { value: 0 };
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => finish(true),
      });
      tl.to(counter, {
        value: count,
        duration: 1.55,
        ease: "power1.inOut",
        snap: { value: 1 },
        onUpdate: () => {
          if (digitRef.current) {
            digitRef.current.textContent = String(Math.round(counter.value)).padStart(4, "0");
          }
        },
      });
      tl.to(topRef.current, { yPercent: -100, duration: 0.9, ease: "power3.inOut" });
      tl.to(bottomRef.current, { yPercent: 100, duration: 0.9, ease: "power3.inOut" }, "<");
    }, root);

    return () => ctx.revert();
  }, [count]);

  return (
    <div ref={rootRef} className="shutter" role="status" aria-live="polite">
      <div ref={topRef} className="shutter-half top-0">
        <p
          ref={digitRef}
          className="absolute inset-x-0 bottom-2 text-center font-spec text-[22vw] leading-none tabular-nums text-cream md:text-[12rem]"
        >
          0000
        </p>
      </div>
      <div ref={bottomRef} className="shutter-half bottom-0">
        <p className="absolute inset-x-0 top-4 text-center font-spec text-[10px] tracking-[0.42em] text-chrome md:text-xs">
          rolling the shutter
        </p>
      </div>
    </div>
  );
}
