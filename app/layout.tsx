import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Grupo Almeida",
  description: "Site institucional do Grupo Almeida.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${playfairDisplay.variable} ${inter.variable}`}>
      <body>
        {/* Seções 17/18 da tarefa: desliga a restauração automática de
            scroll do navegador o mais cedo possível (antes da hidratação) e
            zera a posição na Home — sem isso, um F5 pode reabrir numa dobra
            posterior. `ScrollVideoExperience` reforça o reset (mount +
            `pageshow`, cobrindo BFCache) e o mantém desligado depois que a
            navegação já começou. */}
        <Script id="scroll-restoration-manual" strategy="beforeInteractive">
          {`try{if('scrollRestoration' in history){history.scrollRestoration='manual';}if(location.pathname==='/'){window.scrollTo(0,0);}}catch(e){}`}
        </Script>
        {children}
      </body>
    </html>
  );
}
