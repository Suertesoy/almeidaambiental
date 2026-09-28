import type { Metadata } from "next";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import AlmeidaAmbientalPage from "../../../components/almeida-ambiental/AlmeidaAmbientalPage";

export const metadata: Metadata = {
  title: "Almeida Ambiental | Waste Management · Grupo Almeida",
  description:
    "Discover Almeida Ambiental's solutions in collection, sorting, classification, shredding and management of different waste materials in Santa Catarina, Brazil.",
  alternates: {
    canonical: "/en/almeida-ambiental",
    languages: { "pt-BR": "/almeida-ambiental", en: "/en/almeida-ambiental", "x-default": "/almeida-ambiental" },
  },
};

export default function Page() {
  return (
    <main>
      <Header />
      <AlmeidaAmbientalPage locale="en" />
      <Footer locale="en" />
    </main>
  );
}
