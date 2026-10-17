"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/components/gsapClient";

export default function NavBar() {
  const pathname = usePathname();
  const navRef = useRef(null);
  const onHome = pathname === "/";
  const sellHref = onHome ? "#sell" : "/#sell";

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return undefined;

    const ctx = gsap.context(() => {
      const hero = document.querySelector("[data-hero]");
      if (!hero) {
        nav.classList.add("is-solid");
        return;
      }
      nav.classList.remove("is-solid");
      ScrollTrigger.create({
        trigger: hero,
        start: "bottom 72px",
        onEnter: () => nav.classList.add("is-solid"),
        onLeaveBack: () => nav.classList.remove("is-solid"),
      });
    }, nav);

    return () => ctx.revert();
  }, [pathname]);

  return (
    <header ref={navRef} className="site-nav">
      <Link href="/" className="leading-none shrink-0">
        <span className="block font-condensed text-base tracking-[0.22em] md:text-lg">
          YARD
        </span>
        <span className="block font-spec text-[8px] tracking-[0.28em] opacity-70 md:text-[9px]">
          EST. BAY 07
        </span>
      </Link>
      <nav className="flex items-center gap-3 md:gap-7" aria-label="Yard">
        <Link
          href="/"
          className={`nav-link ${pathname === "/" ? "is-active" : ""}`}
        >
          Landing
        </Link>
        <Link
          href="/cars"
          className={`nav-link ${pathname.startsWith("/cars") ? "is-active" : ""}`}
        >
          The Yard
        </Link>
        <a href={sellHref} className="nav-link">
          Sell
        </a>
      </nav>
      <a href={sellHref} className="list-car">
        List a car
      </a>
    </header>
  );
}
