import type { Metadata } from "next";

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
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
