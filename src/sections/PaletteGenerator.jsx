import { useState, useEffect, useCallback } from "react";
import { ArrowRight, Check } from "lucide-react";

const PALETTE_COLLECTIONS = {
  Retro: [
    [
      { hex: "#434E78", name: "Navy" },
      { hex: "#5B7385", name: "Slate Blue" },
      { hex: "#F6DF95", name: "Warm Sand" },
      { hex: "#E47746", name: "Terracotta" },
      { hex: "#DDE5BF", name: "Celery" },
    ],
    [
      { hex: "#D97724", name: "Vintage Rust" },
      { hex: "#F3C969", name: "Mustard Gold" },
      { hex: "#EDFFEC", name: "Pale Mint" },
      { hex: "#006E51", name: "Emerald Pine" },
      { hex: "#23395B", name: "Deep Indigo" },
    ],
    [
      { hex: "#780000", name: "Dark Burgundy" },
      { hex: "#C1121F", name: "Retro Crimson" },
      { hex: "#FDF0D5", name: "Parchment" },
      { hex: "#003049", name: "Prussian Blue" },
      { hex: "#669BBC", name: "Cerulean Mist" },
    ],
    [
      { hex: "#2B2D42", name: "Space Cadet" },
      { hex: "#8D99AE", name: "Cool Slate" },
      { hex: "#EDF2F4", name: "Anti-Flash White" },
      { hex: "#EF233C", name: "Imperial Red" },
      { hex: "#D9D9D9", name: "Silver Mist" },
    ],
  ],
  Neon: [
    [
      { hex: "#8A2BE2", name: "Blue Violet" },
      { hex: "#FF1493", name: "Deep Pink" },
      { hex: "#00FFFF", name: "Cyan" },
      { hex: "#39FF14", name: "Neon Green" },
      { hex: "#FFE600", name: "Electric Yellow" },
    ],
    [
      { hex: "#05D9E8", name: "Cyber Blue" },
      { hex: "#005679", name: "Deep Teal" },
      { hex: "#01012B", name: "Vapor Void" },
      { hex: "#FF2A6D", name: "Neon Magenta" },
      { hex: "#D1F7FF", name: "Glacier Cyan" },
    ],
    [
      { hex: "#F72585", name: "Neon Pink" },
      { hex: "#7209B7", name: "Electric Purple" },
      { hex: "#3A0CA3", name: "Deep Violet" },
      { hex: "#4361EE", name: "Ultramarine" },
      { hex: "#4CC9F0", name: "Laser Blue" },
    ],
  ],
  Vintage: [
    [
      { hex: "#705847", name: "Sepia" },
      { hex: "#C48285", name: "Dusty Rose" },
      { hex: "#F4EBD9", name: "Parchment" },
      { hex: "#879780", name: "Muted Sage" },
      { hex: "#CFA158", name: "Antique Gold" },
    ],
    [
      { hex: "#582F0E", name: "Dark Oak" },
      { hex: "#7F4F24", name: "Caramel" },
      { hex: "#936639", name: "Warm Taupe" },
      { hex: "#A68A56", name: "Golden Olive" },
      { hex: "#B6AD90", name: "Driftwood" },
    ],
    [
      { hex: "#606C38", name: "Dark Olive" },
      { hex: "#283618", name: "Kombu Green" },
      { hex: "#FEFAE0", name: "Cornsilk" },
      { hex: "#DDA15E", name: "Earth Ochre" },
      { hex: "#BC6C25", name: "Burnt Terracotta" },
    ],
  ],
  Pastel: [
    [
      { hex: "#5E729E", name: "Dusk Blue" },
      { hex: "#C1E7E3", name: "Mint Cream" },
      { hex: "#FFDFD3", name: "Peach" },
      { hex: "#FFF1C5", name: "Buttercup" },
      { hex: "#E2D4F0", name: "Lavender" },
    ],
    [
      { hex: "#FBF8CC", name: "Lemon Chiffon" },
      { hex: "#FDE4CF", name: "Champagne" },
      { hex: "#FFCFD2", name: "Soft Rose" },
      { hex: "#F1C0E8", name: "Lilac" },
      { hex: "#CFBAF0", name: "Mauve Cream" },
    ],
    [
      { hex: "#A3E4D7", name: "Seafoam" },
      { hex: "#A9DFBF", name: "Celadon" },
      { hex: "#F9E79F", name: "Pastel Gold" },
      { hex: "#F5CBA7", name: "Apricot" },
      { hex: "#D7BDE2", name: "Thistle" },
    ],
  ],
};

const CATEGORIES = ["Neon", "Retro", "Vintage", "Pastel"];

function isLightColor(hex) {
  let clean = hex.replace("#", "");
  if (clean.length === 3)
    clean = clean
      .split("")
      .map((c) => c + c)
      .join("");
  const num = parseInt(clean, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return (r * 299 + g * 587 + b * 114) / 1000 > 155;
}

export default function PaletteGenerator() {
  const [activeCategory, setActiveCategory] = useState("Retro");
  const [paletteIndex, setPaletteIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [copiedHex, setCopiedHex] = useState(null);

  const categoryPalettes =
    PALETTE_COLLECTIONS[activeCategory] || PALETTE_COLLECTIONS.Retro;
  const currentPalette =
    categoryPalettes[paletteIndex % categoryPalettes.length];

  const generateNewPalette = useCallback(() => {
    setPaletteIndex((prev) => prev + 1);
    setHoveredIndex(0);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA")
        return;
      if (e.code === "Space") {
        e.preventDefault();
        generateNewPalette();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [generateNewPalette]);

  const handleCopy = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  return (
    <section
      id="palette-generator"
      className="relative w-full py-12 font-sans select-none scroll-mt-[130px]"
    >
      {/* 1. Header: Clean Palette Generator Header with Broken Baseline Guide */}
      <div className="pt-8 sm:pt-[60px]">
        <div className="relative pt-4 sm:pt-[33px] inline-block">
          <h2 className="relative z-10 font-serif font-bold text-4xl sm:text-5xl lg:text-[64px] leading-tight lg:leading-[95px] text-black tracking-normal">
            Palette Generator
          </h2>

          <div className="absolute bottom-2 lg:bottom-[20px] left-0 right-0 w-full pointer-events-none z-0">
            <svg
              width="100%"
              height="1"
              viewBox="0 0 800 1"
              preserveAspectRatio="none"
              fill="none"
              className="w-full h-[1px] block"
            >
              <line
                x1="0"
                y1="0.5"
                x2="800"
                y2="0.5"
                stroke="#D9D9D9"
                strokeWidth="1"
                strokeDasharray="6 6"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* 2. Subtext: 40px below header */}
      <div className="mt-6 sm:mt-[40px] max-w-[580px]">
        <p className="text-black font-sans text-lg sm:text-[24px] font-normal leading-normal">
          Generate striking color schemes instantly with our globally recognized
          palette tool. Simply click the generate button!
        </p>
      </div>

      {/* 3. Action Row: "Start the generator" + Category Pills on the same line */}
      <div className="mt-6 sm:mt-[30px] flex flex-wrap items-center justify-between gap-6">
        {/* Left: Start the generator button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={generateNewPalette}
            className="inline-flex items-center gap-2 text-[#9300B8] hover:text-[#780096] font-sans text-xl sm:text-[24px] font-medium leading-normal transition-all group cursor-pointer active:scale-95 select-none"
          >
            <span>Start the generator</span>
            <ArrowRight
              size={22}
              className="group-hover:translate-x-1.5 transition-transform"
            />
          </button>
          <span className="hidden sm:inline-block text-xs font-sans text-neutral-400 font-medium">
            (or press Spacebar)
          </span>
        </div>

        {/* Right: Category Buttons aligned on the exact same row */}
        <div className="flex items-center gap-2 sm:gap-[14px] flex-wrap">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setActiveCategory(cat);
                  setPaletteIndex(0);
                  setHoveredIndex(0);
                }}
                className={`flex items-center justify-center px-4 sm:px-[24px] py-2 sm:py-[10px] gap-[10px] rounded-[18px] border border-[#D9D9D9] font-sans text-xs sm:text-[14px] font-medium leading-normal transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#111] text-white border-[#111] shadow-xs"
                    : "bg-white text-black hover:border-black"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Fully Responsive Palette Sample Card */}
      <div
        style={{ height: "550px" }}
        className="mt-6 sm:mt-[30px] w-full rounded-[20px] overflow-hidden shadow-sm flex flex-col sm:flex-row items-stretch relative"
      >
        {currentPalette.map((color, index) => {
          const isExpanded = hoveredIndex === index;
          const light = isLightColor(color.hex);
          const textColor = light ? "#000000" : "#FFFFFF";

          return (
            <div
              key={index}
              style={{
                backgroundColor: color.hex,
                flex: isExpanded ? "2.4 0 0%" : "1 0 0%",
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onClick={() => {
                setHoveredIndex(index);
                handleCopy(color.hex);
              }}
              className="self-stretch w-full sm:w-auto min-w-0 min-h-0 transition-all duration-500 ease-out flex flex-col justify-center sm:justify-end p-4 sm:p-6 relative cursor-pointer select-none overflow-hidden"
            >
              {copiedHex === color.hex && (
                <div className="absolute inset-0 bg-black/25 backdrop-blur-xs flex items-center justify-center z-30">
                  <div className="bg-white text-black px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-md">
                    <Check size={14} className="text-emerald-600" />
                    <span>Copied {color.hex}!</span>
                  </div>
                </div>
              )}

              {index === currentPalette.length - 1 && (
                <div className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20 flex items-center gap-1.5 text-[10px] sm:text-[11px] font-medium text-black/90 pointer-events-none">
                  <span>Designed by Henry Osuji</span>
                  <span className="text-xs">🧑🏾</span>
                </div>
              )}

              {isExpanded && (
                <div className="w-full flex flex-col items-center justify-center sm:mb-4 transition-all duration-500 min-w-0">
                  <div
                    style={{ color: textColor }}
                    className="flex items-center justify-center px-3 sm:px-4 py-1.5 sm:py-2 gap-2 rounded-xl bg-black/20 backdrop-blur-xs shadow-xs"
                  >
                    <span className="font-sans text-xl sm:text-2xl lg:text-[36px] font-medium leading-normal tracking-wide uppercase truncate">
                      {color.hex.replace("#", "")}
                    </span>
                  </div>

                  <span
                    style={{ color: textColor }}
                    className="font-sans text-[11px] sm:text-[12px] font-medium leading-normal mt-1 opacity-90 truncate"
                  >
                    {color.name}
                  </span>
                </div>
              )}

              {!isExpanded && (
                <div
                  style={{ color: textColor }}
                  className="w-full text-center text-[10px] sm:text-xs font-mono font-medium opacity-60 sm:mb-2 transition-opacity truncate"
                >
                  {color.hex.replace("#", "")}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 5. Bottom Broken Line */}
      <div className="mt-16 sm:mt-[112px] w-full pointer-events-none">
        <svg
          width="100%"
          height="1"
          viewBox="0 0 1000 1"
          preserveAspectRatio="none"
          fill="none"
          className="w-full h-[1px] block"
        >
          <line
            x1="0"
            y1="0.5"
            x2="1000"
            y2="0.5"
            stroke="#D9D9D9"
            strokeWidth="1"
            strokeDasharray="6 6"
          />
        </svg>
      </div>
    </section>
  );
}
