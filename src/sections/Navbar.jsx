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

    const elementRect = element.getBoundingClientRect();
    const elementTop = window.scrollY + elementRect.top;
    const elementHeight = element.offsetHeight;
    const windowHeight = window.innerHeight;

    const headerHeight = 105;
    const breathingSpace = 25;
    const availableHeight = windowHeight - headerHeight;

    let targetScrollY;

    if (elementHeight < availableHeight) {
      targetScrollY =
        elementTop - headerHeight - (availableHeight - elementHeight) / 2;
    } else {
      targetScrollY = elementTop - headerHeight - breathingSpace;
    }

    targetScrollY = Math.max(0, targetScrollY);

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAFAFA]/90 backdrop-blur-md border-b border-black/5 transition-all">
      {/* Top 22px Purple Bar */}
      <div className="w-full h-[22px] bg-[#520066] shrink-0" />

      {/* Navigation Links */}
      <nav className="w-full px-6 sm:px-10 lg:px-[80px] h-[72px] sm:h-[80px] flex items-center justify-between font-sans">
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full overflow-hidden flex shadow-xs border border-black/5 transition-transform duration-300 group-hover:scale-105">
            <div className="w-1/2 h-full bg-[#00E5FF]"></div>
            <div className="w-1/2 h-full bg-[#FF2A6D]"></div>
          </div>
        </a>

        {/* Links */}
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

        {/* Mobile Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg text-black hover:bg-neutral-100 transition-colors cursor-pointer"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-b border-neutral-200 px-6 py-6 shadow-lg">
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
