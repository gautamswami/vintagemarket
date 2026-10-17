"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/components/gsapClient";
import { groupDigits } from "@/lib/format";

const START = 241880;

export default function Odometer() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    let value = START;
    let frame = 0;
    const tick = () => {
      frame += 1;
      if (frame % 8 !== 0) return;
      value += 1;
      el.textContent = `${groupDigits(value)} km`;
    };
    gsap.ticker.add(tick);
    return () => gsap.ticker.remove(tick);
  }, []);

  return (
    <p ref={ref} className="font-spec text-2xl tabular-nums tracking-wide md:text-4xl">
      {groupDigits(START)} km
    </p>
  );
}
