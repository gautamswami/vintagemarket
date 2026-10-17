import { Suspense } from "react";
import { notFound } from "next/navigation";
import { cars, getCar, relatedCars } from "@/lib/cars";
import CarDetail from "@/components/cars/CarDetail";
import Card from "@/components/Card";
import RevealGrid from "@/components/RevealGrid";

export function generateStaticParams() {
  return cars.map((car) => ({ slug: car.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const car = getCar(slug);
  if (!car) return { title: "Empty bay" };
  return { title: `${car.year} ${car.name}` };
}

async function CarBody({ params }) {
  const { slug } = await params;
  const car = getCar(slug);
  if (!car) notFound();
  const others = relatedCars(slug);

  return (
    <>
      <CarDetail car={car} />
      <section className="bg-cream px-5 py-20 text-ink md:px-8 md:py-28">
        <h2 className="font-condensed text-5xl tracking-wide uppercase md:text-6xl">Other cities</h2>
        <RevealGrid className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3" watch={slug}>
          {others.map((item) => (
            <div key={item.slug} className="reveal-card">
              <Card car={item} aspect="aspect-[4/5]" />
            </div>
          ))}
        </RevealGrid>
      </section>
    </>
  );
}

export default function CarPage({ params }) {
  return (
    <main>
      <Suspense
        fallback={
          <p className="bg-ink px-5 py-40 font-spec text-xs tracking-[0.28em] text-cream uppercase">
            Opening the bay…
          </p>
        }
      >
        <CarBody params={params} />
      </Suspense>
    </main>
  );
}
