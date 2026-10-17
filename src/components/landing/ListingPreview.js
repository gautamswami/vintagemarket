import Link from "next/link";
import Card from "@/components/Card";
import RevealGrid from "@/components/RevealGrid";

const SPANS = [
  "md:col-span-7",
  "md:col-span-5",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-4",
];

const ASPECTS = ["aspect-[16/10]", "aspect-[4/5]", "aspect-[5/4]", "aspect-[3/4]", "aspect-[1/1]"];

export default function ListingPreview({ cars }) {
  return (
    <section className="bg-cream text-ink">
      <div className="flex flex-col gap-6 px-5 pt-24 md:flex-row md:items-end md:justify-between md:px-8 md:pt-32">
        <h2 className="font-display text-[16vw] leading-[0.8] font-black tracking-[-0.05em] uppercase md:text-[8vw]">
          Inside
          <br />
          the yard
        </h2>
        <Link href="/cars" className="font-condensed text-xl tracking-[0.16em] uppercase hover:text-rust">
          View all bays →
        </Link>
      </div>
      <RevealGrid className="grid grid-cols-1 gap-5 px-5 py-12 md:grid-cols-12 md:px-8 md:pb-28" watch="landing">
        {cars.map((car, index) => (
          <div key={car.slug} className={`reveal-card ${SPANS[index] || "md:col-span-4"}`}>
            <Card car={car} large={index === 0} aspect={ASPECTS[index] || "aspect-[5/4]"} />
          </div>
        ))}
      </RevealGrid>
    </section>
  );
}
