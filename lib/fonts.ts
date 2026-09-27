import { Playfair_Display, Inter } from "next/font/google";

/**
 * Fontes compartilhadas pelos dois root layouts (PT em app/(pt)/layout.tsx,
 * EN em app/en/layout.tsx) — next/font só precisa ser chamado uma vez por
 * fonte; os dois layouts importam as mesmas instâncias daqui em vez de
 * cada um chamar Playfair_Display()/Inter() de novo.
 */
export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-playfair",
  display: "swap",
});

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-inter",
  display: "swap",
});
