import type { Metadata } from "next";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import EquipamentosPage from "../../../components/equipamentos/EquipamentosPage";

export const metadata: Metadata = {
  title: "Almeida Equipamentos | Waste Management Technology",
  description:
    "Compactors, balers, containers and technology to make waste operations more efficient, with Pöttinger, Austropressen and Heger solutions plus in-house Almeida production.",
  alternates: {
    languages: { "pt-BR": "/almeida-equipamentos", en: "/en/almeida-equipamentos" },
  },
};

export default function Page() {
  return (
    <main>
      <Header />
      <EquipamentosPage locale="en" />
      <Footer locale="en" />
    </main>
  );
}
