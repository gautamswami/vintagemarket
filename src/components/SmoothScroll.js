"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/components/gsapClient";
import { reducedMotion } from "@/lib/motion";
import "lenis/dist/lenis.css";

export default function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef(null);

  useEffect(() => {
    if (reducedMotion()) return undefined;

    let alive = true;
    let lenis;
    let removeRefresh = () => {};
    let removeTicker = () => {};
    let removeOpen = () => {};

    const setup = async () => {
      const { default: Lenis } = await import("lenis");
      if (!alive) return;

      lenis = new Lenis({
        lerp: 0.085,
        smoothWheel: true,
        autoRaf: false,
        anchors: true,
        syncTouch: false,
      });
      lenisRef.current = lenis;

      lenis.on("scroll", ScrollTrigger.update);

      const tick = (time) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      removeTicker = () => gsap.ticker.remove(tick);

      ScrollTrigger.scrollerProxy(document.documentElement, {
        scrollTop(value) {
          if (arguments.length) {
            lenis.scrollTo(value, { immediate: true });
          }
          return lenis.scroll;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: "fixed",
      });

      const onRefresh = () => lenis.resize();
      ScrollTrigger.addEventListener("refresh", onRefresh);
      removeRefresh = () => ScrollTrigger.removeEventListener("refresh", onRefresh);

      const holdShutter =
        window.location.pathname === "/" &&
        !document.documentElement.classList.contains("shutter-done");
      if (holdShutter) lenis.stop();

      const onOpen = () => {
        lenis.start();
        const hash = window.location.hash;
        const target = hash ? document.querySelector(hash) : null;
        if (target) lenis.scrollTo(target, { offset: -8 });
      };
      window.addEventListener("yard:open", onOpen);
      removeOpen = () => window.removeEventListener("yard:open", onOpen);

      requestAnimationFrame(() => {
        if (!alive) return;
        ScrollTrigger.refresh();
      });
    };

    setup();

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    document.fonts?.ready?.then(() => {
      if (alive) ScrollTrigger.refresh();
    });

    return () => {
      alive = false;
      window.removeEventListener("load", onLoad);
      removeRefresh();
      removeTicker();
      removeOpen();
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;
    const jump = () => {
      const current = lenisRef.current;
      if (!current || reducedMotion()) {
        ScrollTrigger.refresh();
        return;
      }
      const shutterHolding =
        window.location.pathname === "/" &&
        !document.documentElement.classList.contains("shutter-done");
      if (shutterHolding) {
        ScrollTrigger.refresh();
        return;
      }
      const hash = window.location.hash;
      const target = hash ? document.querySelector(hash) : null;
      if (target) current.scrollTo(target, { offset: -8 });
      else current.scrollTo(0, { immediate: true });
      ScrollTrigger.refresh();
    };

    if (!lenis) {
      const id = window.setTimeout(jump, 80);
      return () => window.clearTimeout(id);
    }

    const id = window.requestAnimationFrame(jump);
    return () => window.cancelAnimationFrame(id);
  }, [pathname]);

  return null;
}
