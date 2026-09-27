import type { Metadata } from "next";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import SaturnoPage from "../../../components/saturno/SaturnoPage";

export const metadata: Metadata = {
  title: "Saturno Ambiental | Waste Management in the Vale do Itajaí Region",
  description:
    "Discover Saturno Ambiental's work in collection, sorting, shredding, cartonage and environmental management services in the Vale do Itajaí region, Brazil.",
  alternates: {
    languages: { "pt-BR": "/saturno-ambiental", en: "/en/saturno-ambiental" },
  },
};

export default function Page() {
  return (
    <main>
      <Header />
      <SaturnoPage locale="en" />
      <Footer locale="en" />
    </main>
  );
}
