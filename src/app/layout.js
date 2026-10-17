import { Fraunces, IBM_Plex_Mono, Oswald } from "next/font/google";
import Grain from "@/components/Grain";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  weight: ["500", "700", "900"],
  variable: "--font-fraunces",
});

const oswald = Oswald({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  variable: "--font-oswald",
});

const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  variable: "--font-plex",
});

const bootScript = `(function(){try{var d=document.documentElement;d.classList.add("js");var reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(reduce||sessionStorage.getItem("yard-shutter")==="1"){d.classList.add("shutter-done")}if(!reduce&&window.matchMedia("(pointer: fine)").matches){d.classList.add("yard-cursor")}}catch(e){}})();`;

export const metadata = {
  title: {
    default: "YARD — modified & inherited cars",
    template: "%s — YARD",
  },
  description:
    "Modified and inherited cars in Indian yards. Ambassadors, Contessas, and the odd Mustang. Prices in lakhs.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${oswald.variable} ${plex.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-cream text-ink antialiased">
        <script dangerouslySetInnerHTML={{ __html: bootScript }} />
        <Grain />
        <SmoothScroll />
        <CustomCursor />
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
