"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/components/gsapClient";
import { reducedMotion } from "@/lib/motion";

const STEPS = [
  {
    n: "01",
    title: "Spot",
    copy: "You find it in the row. We say what was swapped and what was left alone.",
  },
  {
    n: "02",
    title: "Inspect",
    copy: "Compression, leaks, rust in the sills. If it does not still run, it does not get a bay.",
  },
  {
    n: "03",
    title: "Paper",
    copy: "RC, insurance, and the name on the book, checked against the chassis by hand.",
  },
  {
    n: "04",
    title: "Hand over keys",
    copy: "Transfer, the key, the jack, and whatever is still living in the boot.",
  },
];

export default function SaleSteps() {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      const strokes = gsap.utils.toArray(".sale-stroke", root);
      const nums = gsap.utils.toArray(".sale-num", root);
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 70%",
          end: "bottom 60%",
          scrub: 1,
        },
      });
      tl.fromTo(strokes, { scaleX: 0 }, { scaleX: 1, ease: "none", transformOrigin: "left center" }, 0);
      tl.fromTo(
        nums,
        { y: 40, rotation: -8, opacity: 0 },
        { y: 0, rotation: 0, opacity: 1, stagger: 0.12, ease: "none" },
        0,
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="bg-ink text-cream">
      <div className="px-5 py-24 md:px-8 md:py-32">
        <p className="font-spec text-[10px] tracking-[0.32em] text-yellow uppercase">
          How a sale moves
        </p>
        <div className="relative mt-12">
          <div className="sale-stroke absolute top-8 right-0 left-0 hidden h-px bg-rust md:block" />
          <ol className="grid gap-12 md:grid-cols-4">
            {STEPS.map((step) => (
              <li key={step.n} className="relative">
                <p className="sale-num font-display text-6xl leading-none text-rust md:text-7xl">
                  {step.n}
                </p>
                <h2 className="mt-6 font-condensed text-4xl tracking-wide uppercase md:text-5xl">
                  {step.title}
                </h2>
                <p className="mt-4 max-w-xs font-display text-lg leading-snug text-chrome">
                  {step.copy}
                </p>
              </li>
            ))}
          </ol>
          <div className="sale-stroke mt-2 h-px w-full bg-rust md:hidden" />
        </div>
      </div>
    </section>
  );
}
