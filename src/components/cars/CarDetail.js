"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/components/gsapClient";
import { formatKm, formatPrice } from "@/lib/format";
import { reducedMotion } from "@/lib/motion";
import { Plate, Stamp, stampTone } from "@/components/Plate";

export default function CarDetail({ car }) {
  const rootRef = useRef(null);
  const frameRef = useRef(null);
  const imageRef = useRef(null);
  const [held, setHeld] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray(".title-line", root);
      if (lines.length) {
        gsap.fromTo(
          lines,
          { yPercent: 110 },
          { yPercent: 0, duration: 0.8, ease: "power3.out", stagger: 0.08 },
        );
      }
      if (imageRef.current && frameRef.current) {
        gsap.fromTo(
          imageRef.current,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: frameRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: 1,
            },
          },
        );
      }
    }, root);

    return () => ctx.revert();
  }, []);

  const rows = [
    ["Engine", car.specs.engine],
    ["Power", car.specs.power],
    ["Odometer", formatKm(car.km)],
    ["Fuel", car.fuel],
    ["Transmission", car.transmission],
    ["Owners", String(car.specs.owners)],
    ["Papers", car.specs.papers],
  ];

  return (
    <article ref={rootRef}>
      <header data-hero className="bg-ink px-5 pt-28 pb-10 text-cream md:px-8 md:pt-36">
        <div className="flex items-start justify-between gap-4">
          <Plate>{car.plate}</Plate>
          <p className="font-spec text-[10px] tracking-[0.28em] uppercase">{car.city}</p>
        </div>
        <h1 className="mt-8 max-w-6xl">
          <span className="block overflow-hidden">
            <span className="title-line block font-display text-[22vw] leading-[0.82] font-black md:text-[12vw]">
              {car.year}
            </span>
          </span>
          <span className="mt-2 block overflow-hidden">
            <span className="title-line block font-display text-4xl leading-[0.9] md:text-7xl">
              {car.name}
            </span>
          </span>
        </h1>
        <p className="mt-6 font-spec text-3xl text-yellow md:text-4xl">{formatPrice(car.priceLakh)}</p>
      </header>

      <div className="grid items-stretch gap-3 bg-ink px-5 pb-12 md:grid-cols-12 md:px-8 md:pb-16">
        <figure ref={frameRef} className="relative h-[68vh] overflow-hidden md:col-span-7">
          <img
            ref={imageRef}
            src={car.images[0]}
            alt={`${car.year} ${car.name}, front three-quarter`}
            className="parallax-img absolute inset-x-0 top-[-10%] h-[120%] w-full max-w-none object-cover contrast-[1.06]"
          />
        </figure>
        <figure className="relative h-[42vh] md:col-span-5 md:h-[68vh]">
          <img
            src={car.images[1]}
            alt={`${car.year} ${car.name}, second view`}
            className="h-full w-full object-cover contrast-[1.06]"
          />
        </figure>
      </div>

      <div className="grid gap-12 bg-cream px-5 py-16 text-ink md:grid-cols-12 md:px-8 md:py-24">
        <dl className="md:col-span-5">
          {rows.map(([label, value]) => (
            <div key={label} className="grid grid-cols-2 gap-4 border-t border-ink/20 py-3 font-spec text-sm">
              <dt className="text-[10px] tracking-[0.22em] uppercase text-ink/70">{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <div className="md:col-span-6 md:col-start-7">
          <div className="flex flex-wrap gap-2">
            {car.tags.slice(0, 2).map((item) => (
              <Stamp key={item} tone={stampTone(item)}>
                {item}
              </Stamp>
            ))}
          </div>
          <p className="mt-6 max-w-xl font-display text-2xl leading-snug md:text-3xl">{car.story}</p>
          <button
            type="button"
            aria-pressed={held}
            onClick={() => setHeld((value) => !value)}
            className={`mt-10 px-5 py-3 font-condensed text-lg tracking-[0.16em] ${
              held ? "bg-green text-cream normal-case" : "bg-rust text-cream"
            }`}
          >
            {held ? "Held until Sunday." : "HOLD THIS CAR"}
          </button>
        </div>
      </div>
    </article>
  );
}
