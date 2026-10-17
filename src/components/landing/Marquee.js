"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/components/gsapClient";
import { reducedMotion } from "@/lib/motion";

const NAMES = [
  "AMBASSADOR",
  "CONTESSA",
  "MUSTANG GT 98",
  "PADMINI",
  "ZEN",
  "ESTEEM",
  "ASTRA",
  "CITY VTEC",
  "LANCER",
  "HERALD",
];

function Row({ reverse = false, className = "" }) {
  const trackRef = useRef(null);
  const tweenRef = useRef(null);
  const names = [...NAMES, ...NAMES];

  useEffect(() => {
    const track = trackRef.current;
    if (!track || reducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      tweenRef.current = gsap.fromTo(
        track,
        { xPercent: reverse ? -50 : 0 },
        {
          xPercent: reverse ? 0 : -50,
          duration: reverse ? 36 : 32,
          ease: "none",
          repeat: -1,
        },
      );
    }, track);

    return () => ctx.revert();
  }, [reverse]);

  return (
    <div
      className={`overflow-hidden ${className}`}
      onMouseEnter={() => tweenRef.current?.pause()}
      onMouseLeave={() => tweenRef.current?.play()}
    >
      <div ref={trackRef} className="flex w-max">
        {names.map((name, index) => (
          <span
            key={`${name}-${index}`}
            className="pr-8 font-condensed text-[12vw] leading-none tracking-wide md:pr-12 md:text-[6.5rem]"
          >
            {name}
            <span className="px-4 opacity-70">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section className="relative z-20 -mt-10 overflow-hidden bg-ink md:-mt-24" aria-label="Models in the yard">
      <div className="bg-ink py-3 text-cream md:py-4">
        <Row />
      </div>
      <div className="origin-center -rotate-[1.5deg] bg-rust py-3 text-ink md:py-4">
        <Row reverse />
      </div>
    </section>
  );
}
