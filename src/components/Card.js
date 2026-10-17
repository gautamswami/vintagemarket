"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "@/components/gsapClient";
import { formatKm, formatPrice } from "@/lib/format";
import { Plate, Stamp, stampTone } from "@/components/Plate";

export default function Card({ car, large = false, aspect = "aspect-[5/4]" }) {
  const mediaRef = useRef(null);
  const tapeRef = useRef(null);
  const priceRef = useRef(null);
  const priceTween = useRef(null);

  const finePointer = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const onEnter = () => {
    if (!finePointer()) return;
    gsap.to(mediaRef.current, { scale: 1.06, duration: 0.7, ease: "power3.out" });
    gsap.to(tapeRef.current, {
      opacity: 1,
      y: 0,
      rotation: -8,
      duration: 0.4,
      ease: "power3.out",
    });
    priceTween.current?.kill();
    const state = { value: Math.max(0.4, car.priceLakh - 1.2) };
    priceTween.current = gsap.to(state, {
      value: car.priceLakh,
      duration: 0.45,
      ease: "power3.out",
      onUpdate: () => {
        if (priceRef.current) priceRef.current.textContent = formatPrice(state.value);
      },
    });
  };

  const onLeave = () => {
    if (!finePointer()) return;
    gsap.to(mediaRef.current, { scale: 1, duration: 0.6, ease: "power3.out" });
    gsap.to(tapeRef.current, { opacity: 0, y: -16, duration: 0.3, ease: "power3.out" });
    priceTween.current?.kill();
    if (priceRef.current) priceRef.current.textContent = formatPrice(car.priceLakh);
  };

  return (
    <Link
      href={`/cars/${car.slug}`}
      className="group block h-full"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <article className="flex h-full flex-col border border-ink/20 bg-cream">
        <div className={`relative overflow-hidden ${large ? "aspect-[16/10]" : aspect}`}>
          <div ref={mediaRef} className="absolute inset-0 origin-center">
            <img
              src={car.images[0]}
              alt={`${car.year} ${car.name} parked in ${car.city}`}
              className="h-full w-full object-cover contrast-[1.06]"
            />
          </div>
          <span ref={tapeRef} className="for-sale-tape">
            FOR SALE
          </span>
          <Plate className="absolute top-3 left-3">{car.plate}</Plate>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-4 md:p-5">
          <div className="flex items-baseline justify-between gap-3 font-spec text-[10px] tracking-[0.18em] uppercase">
            <span>{car.year}</span>
            <span>{car.city}</span>
          </div>
          <h3
            className={`font-display leading-[0.9] tracking-[-0.03em] ${
              large ? "text-4xl md:text-6xl" : "text-3xl md:text-4xl"
            }`}
          >
            {car.name}
          </h3>
          <div className="mt-auto flex items-end justify-between gap-3 pt-3">
            <p className="font-spec text-xs tracking-wide">{formatKm(car.km)}</p>
            <p ref={priceRef} className="font-spec text-lg tabular-nums md:text-xl">
              {formatPrice(car.priceLakh)}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {car.tags.slice(0, 2).map((tag, index) => (
              <Stamp
                key={tag}
                tone={stampTone(tag)}
                className={index % 2 ? "rotate-2" : "-rotate-6"}
              >
                {tag}
              </Stamp>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
