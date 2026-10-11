import { useEffect } from "react";
import Lenis from "lenis";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import Intro from "./sections/Intro";
import PaletteGenerator from "./sections/PaletteGenerator";
import ContrastChecker from "./sections/ContrastChecker";
import ImagePicker from "./sections/ImagePicker";
import Gradient from "./sections/Gradient";
import SimplifyCTA from "./sections/SimplifyCTA";
import Footer from "./sections/Footer";

export default function App() {
  useEffect(() => {
    let lenisInstance;
    try {
      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      window.lenis = lenisInstance;

      function raf(time) {
        lenisInstance.raf(time);
        requestAnimationFrame(raf);
      }

      requestAnimationFrame(raf);
    } catch (err) {
      console.warn("Smooth scroll initialization:", err);
    }

    return () => {
      if (lenisInstance) {
        lenisInstance.destroy();
        window.lenis = null;
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col font-sans selection:bg-[#9333EA] selection:text-white overflow-x-hidden relative">
      {/* 1. Fixed Navbar */}
      <Navbar />

      {/* 2. Main Content Container */}
      <div className="w-full px-6 sm:px-10 lg:px-[80px] flex-1 flex flex-col pt-[110px] sm:pt-[120px] relative z-10">
        <main className="flex-1 flex flex-col gap-6 lg:gap-10">
          <Hero />
          <Intro />
          <PaletteGenerator />
          <ContrastChecker />
          <ImagePicker />
          <Gradient />
          <SimplifyCTA />
        </main>
      </div>

      {/* 3. Footer with Watermark */}
      <Footer />
    </div>
  );
}
