"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/components/gsapClient";
import { reducedMotion } from "@/lib/motion";

const LINES = [
  "A modified Zen, a tired Contessa, a car that came down from a grandfather.",
  "If the papers match the shell and it still runs, it can sit in the row.",
  "Tell us the city, what was swapped, and a number that picks up.",
];

export default function SellStrip() {
  const rootRef = useRef(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray(".sell-line", root);
      const form = root.querySelector(".sell-form");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 75%",
          end: "bottom 65%",
          scrub: 1,
        },
      });
      tl.fromTo(lines, { yPercent: 110 }, { yPercent: 0, stagger: 0.1, ease: "none" }, 0);
      if (form) {
        tl.fromTo(form, { opacity: 0, y: 36 }, { opacity: 1, y: 0, ease: "none" }, 0.1);
      }
    }, root);

    return () => ctx.revert();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <section id="sell" ref={rootRef} className="bg-ink text-cream">
      <div className="grid gap-14 px-5 py-24 md:grid-cols-12 md:px-8 md:py-32">
        <div className="md:col-span-6">
          <h2 className="font-display text-6xl leading-[0.85] font-black tracking-[-0.04em] uppercase md:text-8xl">
            Park it here
          </h2>
          <div className="mt-8 max-w-xl space-y-1">
            {LINES.map((line) => (
              <div key={line} className="overflow-hidden">
                <p className="sell-line font-display text-xl leading-snug text-chrome md:text-2xl">
                  {line}
                </p>
              </div>
            ))}
          </div>
        </div>
        <form className="sell-form md:col-span-5 md:col-start-8" onSubmit={onSubmit}>
          {sent ? (
            <p className="font-display text-4xl leading-tight">{"We'll walk the yard and call you."}</p>
          ) : (
            <div className="space-y-8">
              {[
                ["name", "Name", "text"],
                ["city", "City", "text"],
                ["car", "Car", "text"],
                ["phone", "Phone", "tel"],
              ].map(([name, label, type]) => (
                <label key={name} className="block">
                  <span className="font-spec text-[10px] tracking-[0.28em] uppercase text-chrome">
                    {label}
                  </span>
                  <input
                    name={name}
                    type={type}
                    required
                    autoComplete={name === "phone" ? "tel" : name}
                    className="mt-2 w-full border-0 border-b border-cream/35 bg-transparent py-2 font-display text-2xl text-cream outline-none focus:border-yellow"
                  />
                </label>
              ))}
              <button type="submit" className="list-car mt-2">
                Leave the number
              </button>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
