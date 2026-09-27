import type { Metadata } from "next";
import Script from "next/script";
import "../globals.css";
import { playfairDisplay, inter } from "../../lib/fonts";

export const metadata: Metadata = {
  metadataBase: new URL("https://almeidaambiental.vercel.app"),
  title: "Grupo Almeida",
  description: "Grupo Almeida's institutional website.",
  alternates: {
    languages: { "pt-BR": "/", en: "/en" },
  },
};

/**
 * Root layout próprio da versão em inglês (grupo de rotas "en", ver
 * app/(pt)/layout.tsx para o par em português). Dois root layouts
 * (multiple root layouts do App Router) porque `<html lang>` precisa vir
 * já correto no HTML — não é resolvido depois da hidratação. Mesma fonte,
 * mesmo script de reset de scroll do lado PT; só o idioma do documento e
 * os metadados padrão mudam.
 */
export default function EnglishRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${inter.variable}`}>
      <body>
        <Script id="scroll-restoration-manual" strategy="beforeInteractive">
          {`try{if('scrollRestoration' in history){history.scrollRestoration='manual';}if(location.pathname==='/en'){window.scrollTo(0,0);}}catch(e){}`}
        </Script>
        {children}
      </body>
    </html>
  );
}
