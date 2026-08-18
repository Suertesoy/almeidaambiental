import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Home4Page from "../../components/home4/Home4Page";

export const metadata: Metadata = {
  title: "Grupo Almeida — Home 4",
  description: "Proposta alternativa de Home: editorial industrial.",
};

export default function Page() {
  return (
    <main>
      <Header />
      <Home4Page />
      <Footer />
    </main>
  );
}
