"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Card from "@/components/Card";
import RevealGrid from "@/components/RevealGrid";
import { gsap } from "@/components/gsapClient";
import { padCount } from "@/lib/format";
import { reducedMotion } from "@/lib/motion";

const SPANS = [
  "md:col-span-7",
  "md:col-span-5",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-6",
  "md:col-span-6",
  "md:col-span-5",
  "md:col-span-7",
  "md:col-span-4",
  "md:col-span-5",
  "md:col-span-3",
];

const ASPECTS = ["aspect-[16/10]", "aspect-[4/5]", "aspect-[5/4]", "aspect-[3/4]", "aspect-[1/1]"];

export default function CarsBrowser({ cars, cities, tags, city, tag, q }) {
  const router = useRouter();
  const titleRef = useRef(null);
  const [draft, setDraft] = useState(q);
  const [syncedQ, setSyncedQ] = useState(q);

  if (q !== syncedQ) {
    setSyncedQ(q);
    setDraft(q);
  }

  const writeUrl = useCallback((next) => {
    const params = new URLSearchParams();
    if (next.city) params.set("city", next.city);
    if (next.tag) params.set("tag", next.tag);
    if (next.q) params.set("q", next.q);
    const search = params.toString();
    router.replace(search ? `/cars?${search}` : "/cars", { scroll: false });
  }, [router]);

  useEffect(() => {
    const next = draft.trim();
    if (next === q) return undefined;
    const id = window.setTimeout(() => {
      writeUrl({ city, tag, q: next });
    }, 180);
    return () => window.clearTimeout(id);
  }, [draft, q, city, tag, writeUrl]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return cars.filter((car) => {
      if (city && car.city.toLowerCase() !== city.toLowerCase()) return false;
      if (tag && !car.tags.includes(tag)) return false;
      if (!query) return true;
      const hay = `${car.name} ${car.make} ${car.model} ${car.city} ${car.year} ${car.tags.join(" ")}`.toLowerCase();
      return hay.includes(query);
    });
  }, [cars, city, tag, q]);

  useEffect(() => {
    const title = titleRef.current;
    if (!title || reducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        title,
        { letterSpacing: "-0.06em" },
        {
          letterSpacing: "0.06em",
          ease: "none",
          scrollTrigger: {
            trigger: title,
            start: "top 80%",
            end: "bottom top",
            scrub: 1,
          },
        },
      );
    }, title);
    return () => ctx.revert();
  }, []);

  const cityValue = cities.find((item) => item.toLowerCase() === city.toLowerCase()) || "";

  return (
    <div className="px-5 pt-24 pb-24 md:px-8">
      <p className="font-spec text-[10px] tracking-[0.28em] uppercase">
        {padCount(filtered.length)} / {padCount(cars.length)} in this bay
      </p>
      <h1
        ref={titleRef}
        className="yard-title mt-3 font-display text-[20vw] leading-[0.78] font-black uppercase md:text-[14vw]"
      >
        The Yard
      </h1>

      <div className="sticky top-16 z-40 -mx-5 mt-8 border-y border-ink/15 bg-cream/90 px-5 py-4 backdrop-blur-md md:-mx-8 md:px-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <label className="block md:w-72">
            <span className="font-spec text-[10px] tracking-[0.24em] uppercase">Search</span>
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              type="search"
              placeholder="Model, city, year"
              className="mt-1 w-full border-0 border-b border-ink/30 bg-transparent py-2 font-display text-xl outline-none focus:border-rust"
            />
          </label>
          <label className="block">
            <span className="font-spec text-[10px] tracking-[0.24em] uppercase">City</span>
            <select
              value={cityValue}
              onChange={(event) => writeUrl({ city: event.target.value, tag, q: draft.trim() })}
              className="mt-1 block w-full border-0 border-b border-ink/30 bg-transparent py-2 font-spec text-sm uppercase outline-none focus:border-rust md:w-52"
            >
              <option value="">All cities</option>
              {cities.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((item) => {
            const active = tag === item;
            return (
              <button
                key={item}
                type="button"
                aria-pressed={active}
                onClick={() => writeUrl({ city: cityValue, tag: active ? "" : item, q: draft.trim() })}
                className={`border px-2 py-1 font-spec text-[10px] tracking-[0.16em] uppercase ${
                  active ? "border-ink bg-ink text-cream" : "border-ink/30 text-ink"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="py-24">
          <p className="font-display text-5xl leading-none md:text-7xl">Nothing in this bay.</p>
          <button
            type="button"
            onClick={() => {
              setDraft("");
              writeUrl({ city: "", tag: "", q: "" });
            }}
            className="mt-8 font-condensed text-xl tracking-[0.16em] uppercase text-rust"
          >
            Clear the bay
          </button>
        </div>
      ) : (
        <RevealGrid
          className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-12"
          watch={filtered.map((car) => car.slug).join("|")}
        >
          {filtered.map((car, index) => (
            <div key={car.slug} className={`reveal-card ${SPANS[index % SPANS.length]}`}>
              <Card car={car} large={index % SPANS.length === 0} aspect={ASPECTS[index % ASPECTS.length]} />
            </div>
          ))}
        </RevealGrid>
      )}
    </div>
  );
}
