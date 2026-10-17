import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col justify-end bg-ink px-5 pt-32 pb-16 text-cream md:px-8">
      <p className="font-spec text-[10px] tracking-[0.32em] uppercase text-yellow">Empty bay</p>
      <h1 className="mt-4 max-w-5xl font-display text-6xl leading-[0.85] font-black md:text-8xl">
        This bay is empty.
      </h1>
      <Link href="/cars" className="mt-8 font-condensed text-xl tracking-[0.16em] uppercase hover:text-yellow">
        Back to the yard →
      </Link>
    </main>
  );
}
