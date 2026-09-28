import type { Metadata } from "next";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import AlmeidaAmbientalPage from "../../../components/almeida-ambiental/AlmeidaAmbientalPage";

export const metadata: Metadata = {
  title: "Almeida Ambiental | Gestão de Resíduos · Grupo Almeida",
  description:
    "Conheça as soluções da Almeida Ambiental em coleta, triagem, classificação, trituração e gestão de diferentes materiais em Santa Catarina.",
  alternates: {
    canonical: "/almeida-ambiental",
    languages: { "pt-BR": "/almeida-ambiental", en: "/en/almeida-ambiental", "x-default": "/almeida-ambiental" },
  },
};

export default function Page() {
  return (
    <main>
      <Header />
      <AlmeidaAmbientalPage locale="pt" />
      <Footer locale="pt" />
    </main>
  );
}
