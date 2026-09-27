import type { Metadata } from "next";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import HistoriaPage from "../../../components/historia/HistoriaPage";

export const metadata: Metadata = {
  title: "Our Story | Grupo Almeida",
  description:
    "Discover Grupo Almeida's journey, from a family operation started in São José in 1985 to the expansion of its units and environmental solutions across Santa Catarina.",
  alternates: {
    languages: { "pt-BR": "/historia", en: "/en/history" },
  },
};

export default function Page() {
  return (
    <main>
      <Header />
      <HistoriaPage locale="en" />
      <Footer locale="en" />
    </main>
  );
}
