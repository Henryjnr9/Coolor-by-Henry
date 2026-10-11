import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Explore", href: "#explore" },
    { label: "Palette Generator", href: "#palette-generator" },
    { label: "Contrast Checker", href: "#contrast-checker" },
    { label: "Image Picker", href: "#image-picker" },
    { label: "Gradient", href: "#gradient" },
  ];

  const scrollToCenteredSection = (e, href) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);

    if (!element) return;

    // 1. Get exact position and dimensions
    const elementRect = element.getBoundingClientRect();
    const elementTop = window.scrollY + elementRect.top;
    const elementHeight = element.offsetHeight;
    const windowHeight = window.innerHeight;

    // 2. Pure vertical midpoint-to-midpoint centering math
    const targetScrollY = Math.max(
      0,
      elementTop - (windowHeight - elementHeight) / 2,
    );

    // 3. Smooth scroll with Lenis or native smooth scroll
    if (window.lenis) {
      window.lenis.scrollTo(targetScrollY, { duration: 1.2 });
    } else {
      window.scrollTo({
        top: targetScrollY,
        behavior: "smooth",
      });
    }

    setMobileMenuOpen(false);
  };

  return (
    <header className="relative w-full pt-[40px] lg:pt-[50px] mb-12 lg:mb-[140px]">
      {/* Coolors by Henry Watermark */}
      <div
        aria-hidden="true"
        className="absolute top-2 lg:top-4 left-1/2 -translate-x-1/2 pointer-events-none select-none whitespace-nowrap text-[#EDEDED] font-sans font-black text-[90px] sm:text-[150px] lg:text-[225.34px] leading-none z-0"
      >
        Coolors by Henry
      </div>

      {/* Top Nav Container */}
      <nav className="relative z-10 w-full flex items-center justify-between font-sans">
        {/* Brand Logo Icon */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full overflow-hidden flex shadow-xs border border-black/5 transition-transform duration-300 group-hover:scale-105">
            <div className="w-1/2 h-full bg-[#00E5FF]"></div>
            <div className="w-1/2 h-full bg-[#FF2A6D]"></div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => scrollToCenteredSection(e, link.href)}
              className="text-[#000000] font-sans text-[20px] font-normal leading-normal hover:opacity-60 transition-opacity duration-200 cursor-pointer"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-black hover:bg-neutral-100 transition-colors cursor-pointer"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="relative z-20 md:hidden bg-white/95 backdrop-blur-md border border-neutral-200 px-6 py-6 mt-4 shadow-lg rounded-2xl">
          <div className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => scrollToCenteredSection(e, link.href)}
                className="text-black font-sans text-[20px] font-normal leading-normal py-1 cursor-pointer"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
