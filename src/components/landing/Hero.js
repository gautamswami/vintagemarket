"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/components/gsapClient";
import { reducedMotion } from "@/lib/motion";
import { Plate } from "@/components/Plate";

export default function Hero({ image }) {
  const rootRef = useRef(null);
  const driveRef = useRef(null);
  const lineRef = useRef(null);
  const ruleRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reducedMotion()) return undefined;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "+=180%",
          pin: true,
          scrub: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      tl.to(driveRef.current, { x: "38vw", ease: "none" }, 0);
      tl.fromTo(
        lineRef.current,
        { letterSpacing: "-0.06em" },
        { letterSpacing: "0.22em", ease: "none" },
        0,
      );
      tl.fromTo(
        ruleRef.current,
        { scaleY: 0 },
        { scaleY: 1, ease: "none", transformOrigin: "top center" },
        0,
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      data-hero
      className="relative flex h-screen flex-col overflow-hidden bg-ink text-cream"
    >
      <h1 className="sr-only">YARD. Modified, inherited, still loud.</h1>
      <div className="relative flex flex-1 items-center justify-center pt-14">
        <svg
          className="h-[58vh] w-[128vw] max-w-none overflow-visible md:h-[68vh]"
          viewBox="0 0 1600 520"
          role="img"
          aria-label="YARD"
        >
          <defs>
            <mask id="yard-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="1600" height="520">
              <rect width="1600" height="520" fill="black" />
              <text
                x="800"
                y="430"
                textAnchor="middle"
                fontSize="470"
                fill="white"
                className="yard-svg-text"
              >
                YARD
              </text>
            </mask>
          </defs>
          <text x="800" y="430" textAnchor="middle" fontSize="470" fill="#f4ecdc" className="yard-svg-text">
            YARD
          </text>
          <g ref={driveRef} className="hero-drive" mask="url(#yard-mask)">
            <image
              href={image}
              x="-80"
              y="30"
              width="1100"
              height="470"
              preserveAspectRatio="xMidYMid slice"
            />
          </g>
        </svg>
      </div>
      <p
        ref={lineRef}
        className="hero-tagline px-4 text-center font-display text-[clamp(1.15rem,2.6vw,2.6rem)] italic"
      >
        modified. inherited. still loud.
      </p>
      <div className="flex items-end justify-between gap-4 px-4 pt-8 pb-7 md:px-8">
        <Plate>DL 07 Y 1998</Plate>
        <div className="flex items-end gap-3">
          <p className="max-w-[9rem] text-right font-spec text-[10px] leading-tight tracking-[0.22em] uppercase">
            Scroll to open the shutter
          </p>
          <span ref={ruleRef} className="hero-rule" />
        </div>
      </div>
    </section>
  );
}
