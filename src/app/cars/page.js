import { Suspense } from "react";
import { allTags, cars, yardCities } from "@/lib/cars";
import CarsBrowser from "@/components/cars/CarsBrowser";

export const metadata = {
  title: "The Yard",
};

function readParam(value) {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value[0] || "";
  return "";
}

async function CarsGate({ searchParams }) {
  const params = await searchParams;
  return (
    <CarsBrowser
      cars={cars}
      cities={yardCities}
      tags={allTags()}
      city={readParam(params.city)}
      tag={readParam(params.tag)}
      q={readParam(params.q)}
    />
  );
}

export default function CarsPage({ searchParams }) {
  return (
    <main className="min-h-screen bg-cream text-ink">
      <Suspense
        fallback={
          <p className="px-5 py-32 font-spec text-xs tracking-[0.28em] uppercase">Opening the bay…</p>
        }
      >
        <CarsGate searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
