import Link from "next/link";
import { yardCities } from "@/lib/cars";
import Odometer from "@/components/Odometer";

export default function Footer() {
  return (
    <footer className="overflow-hidden bg-ink text-cream">
      <div className="border-t border-cream/15 px-5 py-16 md:px-8 md:py-24">
        <p className="font-display text-[16vw] font-black leading-[0.78] tracking-[-0.04em] whitespace-nowrap uppercase md:text-[11vw]">
          See you in the yard
        </p>
        <div className="mt-8">
          <p className="font-spec text-[10px] tracking-[0.32em] text-chrome uppercase">
            Odometer
          </p>
          <Odometer />
        </div>
        <div className="mt-16 grid gap-12 md:grid-cols-3">
          <div>
            <p className="font-spec text-[10px] tracking-[0.32em] text-yellow uppercase">
              Visit
            </p>
            <p className="mt-4 max-w-xs font-display text-2xl leading-snug">
              Bay 07, Khyber Pass sheds
              <br />
              behind the old transport nagar
              <br />
              Delhi 110006
            </p>
          </div>
          <div>
            <p className="font-spec text-[10px] tracking-[0.32em] text-yellow uppercase">
              Hours
            </p>
            <ul className="mt-4 space-y-2 font-display text-2xl leading-snug">
              <li>Sunday bazaar · 07:00–14:00</li>
              <li>Tue–Sat · shutter up on call</li>
              <li>Monday · dark</li>
            </ul>
          </div>
          <div>
            <p className="font-spec text-[10px] tracking-[0.32em] text-yellow uppercase">
              Cities
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 font-display text-2xl">
              {yardCities.map((city) => (
                <li key={city}>
                  <Link href={`/cars?city=${encodeURIComponent(city)}`} className="hover:text-yellow">
                    {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
