import type { Metadata } from "next";
import Script from "next/script";
import "../globals.css";
import { playfairDisplay, inter } from "../../lib/fonts";

export const metadata: Metadata = {
  metadataBase: new URL("https://almeidaambiental.vercel.app"),
  title: "Grupo Almeida",
  description: "Site institucional do Grupo Almeida.",
  alternates: {
    canonical: "/",
    languages: { "pt-BR": "/", en: "/en", "x-default": "/" },
  },
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
