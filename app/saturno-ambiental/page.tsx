import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SaturnoPage from "../../components/saturno/SaturnoPage";

export const metadata: Metadata = {
  title: "Saturno Ambiental | Gestão de Resíduos no Vale do Itajaí",
  description:
    "Conheça a atuação da Saturno Ambiental em coleta, triagem, trituração, cartonagem e serviços de gestão ambiental no Vale do Itajaí.",
};

export default function Page() {
  return (
    <main>
      <Header />
      <SaturnoPage />
      <Footer />
    </main>
  );
}
