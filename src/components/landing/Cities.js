"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/components/gsapClient";
import { reducedMotion } from "@/lib/motion";

export default function Cities({ cities }) {
  const rootRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { x: "8vw" },
        {
          x: "-8vw",
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        },
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="overflow-hidden bg-cream py-20 text-ink md:py-28">
      <p className="px-5 font-spec text-[10px] tracking-[0.32em] uppercase md:px-8">Cities with a bay</p>
      <div ref={lineRef} className="cities-line mt-6 flex w-max items-baseline gap-6 px-5 md:gap-10 md:px-8">
        {cities.map((city) => (
          <Link
            key={city}
            href={`/cars?city=${encodeURIComponent(city)}`}
            className="font-display text-[12vw] leading-none font-black tracking-[-0.04em] hover:text-rust md:text-[7vw]"
          >
            {city}
          </Link>
        ))}
      </div>
    </section>
  );
}
