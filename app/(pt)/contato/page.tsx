import type { Metadata } from "next";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import ContatoPage from "../../../components/contato/ContatoPage";

export const metadata: Metadata = {
  title: "Contato | Grupo Almeida",
  description:
    "Entre em contato com Almeida Ambiental, Almeida Equipamentos ou Saturno Ambiental e encontre o canal adequado para sua necessidade.",
  alternates: {
    canonical: "/contato",
    languages: { "pt-BR": "/contato", en: "/en/contact", "x-default": "/contato" },
  },
};

export default function Page() {
  return (
    <main>
      <Header />
      <ContatoPage locale="pt" />
      <Footer locale="pt" />
    </main>
  );
}
