import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import HistoriaPage from "../../components/historia/HistoriaPage";

export const metadata: Metadata = {
  title: "Nossa História | Grupo Almeida",
  description:
    "Conheça a trajetória do Grupo Almeida, de uma operação familiar iniciada em São José em 1985 à expansão de suas unidades e soluções ambientais em Santa Catarina.",
};

export default function Page() {
  return (
    <main>
      <Header />
      <HistoriaPage />
      <Footer />
    </main>
  );
}
