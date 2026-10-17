"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/components/gsapClient";
import { reducedMotion } from "@/lib/motion";

const LINES = [
  { text: "The yard keeps what the", accent: "" },
  { text: "showroom would not.", accent: "" },
  { text: "A Contessa that still", accent: "Contessa" },
  { text: "takes third when it is cold.", accent: "" },
  { text: "A Mustang with a blower", accent: "Mustang" },
  { text: "loud enough for Bandra.", accent: "" },
  { text: "An Ambassador that", accent: "Ambassador" },
  { text: "never learned a quiet idle.", accent: "" },
];

function renderLine(line) {
  if (!line.accent || !line.text.includes(line.accent)) return line.text;
  const index = line.text.indexOf(line.accent);
  return (
    <>
      {line.text.slice(0, index)}
      <em className="text-rust italic">{line.accent}</em>
      {line.text.slice(index + line.accent.length)}
    </>
  );
}

export default function Manifesto({ count }) {
  const rootRef = useRef(null);
  const facts = [
    "1980–2006",
    `${count} cars in the yard`,
    "papers checked by hand",
  ];

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray(".mask-line", root);
      const factEls = gsap.utils.toArray(".fact", root);
      if (!lines.length) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 72%",
          end: "bottom 58%",
          scrub: 1,
        },
      });
      tl.fromTo(lines, { yPercent: 110 }, { yPercent: 0, stagger: 0.08, ease: "none" }, 0);
      tl.fromTo(
        factEls,
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, stagger: 0.1, ease: "none" },
        0.05,
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="bg-cream text-ink">
      <div className="grid gap-14 px-5 py-28 md:grid-cols-12 md:px-8 md:py-40">
        <div className="md:col-span-7">
          {LINES.map((line) => (
            <div key={line.text} className="overflow-hidden">
              <p className="mask-line font-display text-[8vw] leading-[1.05] md:text-5xl">
                {renderLine(line)}
              </p>
            </div>
          ))}
        </div>
        <aside className="flex flex-col justify-end gap-8 md:col-span-4 md:col-start-9">
          {facts.map((fact) => (
            <p key={fact} className="fact border-t border-ink/20 pt-3 font-display text-3xl leading-tight">
              {fact}
            </p>
          ))}
        </aside>
      </div>
    </section>
  );
}
