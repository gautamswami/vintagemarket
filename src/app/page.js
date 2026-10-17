import { cars, getFeatured, heroShot, yardCities } from "@/lib/cars";
import Preloader from "@/components/landing/Preloader";
import Hero from "@/components/landing/Hero";
import Marquee from "@/components/landing/Marquee";
import HorizontalYard from "@/components/landing/HorizontalYard";
import Manifesto from "@/components/landing/Manifesto";
import SaleSteps from "@/components/landing/SaleSteps";
import ListingPreview from "@/components/landing/ListingPreview";
import SellStrip from "@/components/landing/SellStrip";
import Cities from "@/components/landing/Cities";

const previewSlugs = [
  "fiat-1100-1968",
  "standard-herald-1972",
  "hm-contessa-diesel-1999",
  "opel-astra-2002",
  "mitsubishi-lancer-2004",
];

export default function Home() {
  const preview = previewSlugs
    .map((slug) => cars.find((car) => car.slug === slug))
    .filter(Boolean);

  return (
    <main>
      <Preloader count={cars.length} />
      <Hero image={heroShot} />
      <Marquee />
      <HorizontalYard cars={getFeatured()} />
      <Manifesto count={cars.length} />
      <SaleSteps />
      <ListingPreview cars={preview} />
      <SellStrip />
      <Cities cities={yardCities} />
    </main>
  );
}
