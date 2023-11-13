import { Slot } from "expo-router";
import Footer from "../../components/Footer";

export default function HomeLayout() {
  return (
    <>
      <Slot />
      <Footer />
    </>
  );
}
