import type { Metadata } from "next";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import ContatoPage from "../../../components/contato/ContatoPage";

export const metadata: Metadata = {
  title: "Contact | Grupo Almeida",
  description:
    "Get in touch with Almeida Ambiental, Almeida Equipamentos or Saturno Ambiental and find the right channel for your needs.",
  alternates: {
    languages: { "pt-BR": "/contato", en: "/en/contact" },
  },
};

export default function Page() {
  return (
    <main>
      <Header />
      <ContatoPage locale="en" />
      <Footer locale="en" />
    </main>
  );
}
