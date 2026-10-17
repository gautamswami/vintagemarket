"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/components/gsapClient";
import { formatPrice } from "@/lib/format";
import { reducedMotion } from "@/lib/motion";
import { Stamp } from "@/components/Plate";

function Panel({ car, index }) {
  const tag = car.tags[0];
  return (
    <article className="yard-panel flex h-auto w-full flex-col border-t border-cream/15 bg-ink text-cream md:h-full md:w-[70vw] md:shrink-0 md:flex-row md:border-t-0 md:border-l">
      <div className="flex w-full flex-col justify-between gap-8 px-5 py-8 md:w-[40%] md:px-8 md:py-10">
        <p className="font-spec text-[10px] tracking-[0.28em] text-chrome">
          {String(index + 1).padStart(2, "0")} / ROW
        </p>
        <p
          data-year={car.year}
          className="yard-year font-display text-[28vw] leading-[0.8] font-black tracking-[-0.05em] md:text-[16vh]"
        >
          {car.year}
        </p>
        <div>
          <h3 className="font-condensed text-5xl leading-none tracking-wide md:text-6xl">
            {car.model}
          </h3>
          <p className="mt-3 font-spec text-xs tracking-[0.18em] uppercase">
            {car.city}
          </p>
          <p className="mt-4 font-spec text-2xl text-yellow">{formatPrice(car.priceLakh)}</p>
          <div className="mt-5">
            <Stamp tone="cream">{tag}</Stamp>
          </div>
        </div>
      </div>
      <div className="relative min-h-[52vw] w-full md:h-full md:w-[60%]">
        <img
          src={car.images[0]}
          alt={`${car.year} ${car.name}`}
          className="h-full w-full object-cover contrast-[1.06] md:absolute md:inset-0"
        />
      </div>
    </article>
  );
}

export default function HorizontalYard({ cars }) {
  const rootRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion()) return undefined;

    const counts = [];
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(max-width: 767px)", () => {
        gsap.utils.toArray(".yard-panel", root).forEach((panel) => {
          gsap.fromTo(
            panel,
            { opacity: 0, y: 48 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: panel,
                start: "top 86%",
                toggleActions: "play none none none",
              },
            },
          );
        });
      });

      mm.add("(min-width: 768px)", () => {
        const track = trackRef.current;
        const viewport = viewportRef.current;
        if (!track || !viewport) return;

        const travel = () => Math.max(0, track.scrollWidth - viewport.clientWidth);
        const tween = gsap.to(track, {
          x: () => -travel(),
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => `+=${travel()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        gsap.utils.toArray(".yard-panel", track).forEach((panel) => {
          const yearEl = panel.querySelector(".yard-year");
          const target = Number(yearEl?.dataset.year || 0);

          ScrollTrigger.create({
            trigger: panel,
            containerAnimation: tween,
            start: "left center",
            end: "right center",
            onToggle: (self) => {
              gsap.to(panel, {
                opacity: self.isActive ? 1 : 0.92,
                duration: 0.25,
                overwrite: "auto",
              });
            },
          });

          if (!yearEl) return;

          ScrollTrigger.create({
            trigger: panel,
            containerAnimation: tween,
            start: "left 62%",
            once: true,
            onEnter: () => {
              const state = { value: Math.max(1900, target - 16) };
              ctx.ignore(() => {
                const count = gsap.to(state, {
                  value: target,
                  duration: 0.85,
                  ease: "power3.out",
                  snap: { value: 1 },
                  onUpdate: () => {
                    yearEl.textContent = String(Math.round(state.value));
                  },
                  onInterrupt: () => {
                    yearEl.textContent = String(target);
                  },
                });
                counts.push(count);
              });
            },
          });
        });
      });
    }, root);

    return () => {
      counts.forEach((count) => count.kill());
      ctx.revert();
    };
  }, [cars]);

  return (
    <section ref={rootRef} className="bg-ink text-cream md:h-screen md:overflow-hidden">
      <div className="flex flex-col md:h-full md:flex-row">
        <div className="z-10 flex items-end justify-between gap-6 bg-ink px-5 py-10 md:w-[28vw] md:shrink-0 md:flex-col md:items-start md:px-8 md:py-12">
          <p className="font-spec text-[10px] tracking-[0.32em] text-yellow">
            {String(cars.length).padStart(2, "0")} IN THE ROW
          </p>
          <h2 className="font-display text-6xl leading-[0.8] font-black tracking-[-0.04em] uppercase md:text-7xl">
            Tonight&apos;s
            <br />
            row
          </h2>
        </div>
        <div ref={viewportRef} className="md:h-full md:min-w-0 md:flex-1 md:overflow-hidden">
          <div ref={trackRef} className="flex flex-col md:h-full md:w-max md:flex-row">
            {cars.map((car, index) => (
              <Panel key={car.slug} car={car} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
