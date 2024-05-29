import FAQSection from "./sections/FAQSection";
import FactSection from "./sections/FactSection";
import HeroSection from "./sections/HeroSection";
import WhyUsSection from "./sections/WhyUsSection";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full font-bold">
      <HeroSection />
      <FactSection />
      <WhyUsSection />
      <FAQSection />
    </div>
  );
}
