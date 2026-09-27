import Header from "../../components/Header";
import HomePage from "../../components/home/HomePage";
import Footer from "../../components/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <HomePage locale="pt" />
      <Footer locale="pt" />
    </main>
  );
}
