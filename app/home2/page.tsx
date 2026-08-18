import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Home2Page from "../../components/home2/Home2Page";

export const metadata: Metadata = {
  title: "Grupo Almeida — Home 2",
  description: "Proposta alternativa de Home: full-screen storytelling.",
};

export default function Page() {
  return (
    <main>
      <Header />
      <Home2Page />
      <Footer />
    </main>
  );
}
