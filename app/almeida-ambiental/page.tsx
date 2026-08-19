import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AlmeidaAmbientalPage from "../../components/almeida-ambiental/AlmeidaAmbientalPage";

export const metadata: Metadata = {
  title: "Almeida Ambiental | Gestão de Resíduos · Grupo Almeida",
  description:
    "Conheça as soluções da Almeida Ambiental em coleta, triagem, classificação, trituração e gestão de diferentes materiais em Santa Catarina.",
};

export default function Page() {
  return (
    <main>
      <Header />
      <AlmeidaAmbientalPage />
      <Footer />
    </main>
  );
}
