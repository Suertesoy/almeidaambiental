import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Home3Page from "../../components/home3/Home3Page";

export const metadata: Metadata = {
  title: "Grupo Almeida — Home 3",
  description: "Proposta alternativa de Home: corporate hub B2B industrial.",
};

export default function Page() {
  return (
    <main>
      <Header />
      <Home3Page />
      <Footer />
    </main>
  );
}
