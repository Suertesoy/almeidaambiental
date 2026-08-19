import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import EquipamentosPage from "../../components/equipamentos/EquipamentosPage";

export const metadata: Metadata = {
  title: "Almeida Equipamentos | Tecnologias para Gestão de Resíduos",
  description:
    "Compactadores, prensas, contêineres e tecnologias para tornar operações de resíduos mais eficientes, com soluções Pöttinger, Austropressen, Heger e produção Almeida.",
};

export default function Page() {
  return (
    <main>
      <Header />
      <EquipamentosPage />
      <Footer />
    </main>
  );
}
