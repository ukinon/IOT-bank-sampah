import FactSection from "./sections/FactSection";
import HeroSection from "./sections/HeroSection";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full font-bold">
      <HeroSection />
      <FactSection />
    </div>
  );
}
