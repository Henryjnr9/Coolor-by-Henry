import { useState, useEffect } from "react";
import { RefreshCw, Heart, Lock, Copy, Eye, Sliders, X } from "lucide-react";

// WCAG Contrast Calculation Function
function calculateContrast(hex, bgHex = "#FAFAFA") {
  const getRGB = (h) => {
    let clean = h.replace("#", "");
    if (clean.length === 3)
      clean = clean
        .split("")
        .map((c) => c + c)
        .join("");
    const num = parseInt(clean, 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
  };

  const getLuminance = ([r, g, b]) => {
    const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const lum1 = getLuminance(getRGB(hex));
  const lum2 = getLuminance(getRGB(bgHex));
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  const ratio = (brightest + 0.05) / (darkest + 0.05);
  return Number(ratio.toFixed(2));
}

// Check if color is light (returns true for light backgrounds where text should be black)
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
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 155;
}

// Color Animation Cycles for Headline
const COLOR_CYCLES = [
  { f: "#CC00FF", p: "#00FFDD", g: "#FF2F00" }, // Figma default (#C0F, #0FD, #FF2F00)
  { f: "#7928CA", p: "#FF0080", g: "#0070F3" },
  { f: "#00B4D8", p: "#FFB703", g: "#FB8500" },
  { f: "#10B981", p: "#F43F5E", g: "#8B5CF6" },
];

const INITIAL_PALETTES = [
  { hex: "#443742", name: "Mauve Shadow" },
  { hex: "#847577", name: "Muted Taupe" },
  { hex: "#CFB997", name: "Sand Dune" },
  { hex: "#E6CCA9", name: "Champagne" },
  { hex: "#D4DE9F", name: "Soft Sage" },
];

const PRESET_PALETTES = [
  INITIAL_PALETTES,
  [
    { hex: "#264653", name: "Deep Teal" },
    { hex: "#2A9D8F", name: "Persian Green" },
    { hex: "#E9C46A", name: "Saffron" },
    { hex: "#F4A261", name: "Sandy Brown" },
    { hex: "#E76F51", name: "Burnt Sienna" },
  ],
  [
    { hex: "#1D3557", name: "Prussian Blue" },
    { hex: "#457B9D", name: "Steel Blue" },
    { hex: "#A8DADC", name: "Powder Blue" },
    { hex: "#F1FAEE", name: "Honeydew" },
    { hex: "#E63946", name: "Crimson" },
  ],
];

export default function Hero() {
  const [paletteIndex, setPaletteIndex] = useState(0);
  const [cycleIndex, setCycleIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState(0); // 0 (Mauve Shadow) is expanded initially

  const currentColors = COLOR_CYCLES[cycleIndex];
  const currentPalette = PRESET_PALETTES[paletteIndex];

  // Auto-animate headline text colors every 3.2 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCycleIndex((prev) => (prev + 1) % COLOR_CYCLES.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  // Loop animation expanding each horizontal color strip in sequence
  useEffect(() => {
    const loopTimer = setInterval(() => {
      setExpandedIndex((prev) => (prev + 1) % currentPalette.length);
    }, 3500);
    return () => clearInterval(loopTimer);
  }, [currentPalette.length]);

  // Compute live contrast ratios
  const ratioF = calculateContrast(currentColors.f);
  const ratioP = calculateContrast(currentColors.p);
  const ratioG = calculateContrast(currentColors.g);

  const isPassF = ratioF >= 3.0;
  const isPassP = ratioP >= 3.0;
  const isPassG = ratioG >= 3.0;

  const handleRegenerate = () => {
    setPaletteIndex((prev) => (prev + 1) % PRESET_PALETTES.length);
  };

  return (
    <section className="relative w-full pb-20 font-sans">
      <div className="w-full flex flex-col items-center text-center">
        {/* Hero Headline Box with exact width 935px and 3 Notebook Guide Lines */}
        <div className="relative w-full max-w-[935px] mx-auto mt-6 mb-6 select-none">
          <h1 className="font-serif font-bold text-5xl sm:text-7xl lg:text-[95px] lg:leading-[95px] text-black tracking-normal">
            {/* ROW 1: "Fast palettes for" */}
            <div className="relative block h-auto lg:h-[95px] mb-4 lg:mb-2">
              {/* LINE 1: 15px above text (width 899px, height 1px, #D9D9D9) */}
              <div className="absolute -top-[15px] left-1/2 -translate-x-1/2 w-[899px] max-w-full pointer-events-none z-0">
                <svg
                  width="100%"
                  height="1"
                  viewBox="0 0 899 1"
                  fill="none"
                  className="w-[899px] max-w-full h-[1px] block"
                >
                  <line
                    x1="0"
                    y1="0.5"
                    x2="899"
                    y2="0.5"
                    stroke="#D9D9D9"
                    strokeWidth="1"
                    strokeDasharray="6 6"
                  />
                </svg>
              </div>

              {/* Text for Row 1 */}
              <span className="relative z-10 block whitespace-nowrap">
                {/* Letter F with contrast badge resting along top dashed line */}
                <span
                  className="relative inline-block"
                  style={{ color: currentColors.f }}
                >
                  F
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center gap-1.5 whitespace-nowrap text-black font-sans text-[12px] font-semibold select-none pointer-events-none transition-all duration-500">
                    <span>{ratioF}:1</span>
                    {isPassF ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-black"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-black"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                      </svg>
                    )}
                    <span>AA</span>
                  </span>
                </span>
                <span>ast palettes for</span>
              </span>

              {/* LINE 2: Middle notebook baseline for Row 1 (width 899px, height 1px, #D9D9D9) */}
              <div className="absolute bottom-[14px] left-1/2 -translate-x-1/2 w-[899px] max-w-full pointer-events-none z-0">
                <svg
                  width="100%"
                  height="1"
                  viewBox="0 0 899 1"
                  fill="none"
                  className="w-[899px] max-w-full h-[1px] block"
                >
                  <line
                    x1="0"
                    y1="0.5"
                    x2="899"
                    y2="0.5"
                    stroke="#D9D9D9"
                    strokeWidth="1"
                    strokeDasharray="6 6"
                  />
                </svg>
              </div>
            </div>

            {/* ROW 2: "impatient designers" */}
            <div className="relative block h-auto lg:h-[95px]">
              {/* Text for Row 2 */}
              <span className="relative z-10 block whitespace-nowrap">
                <span>im</span>

                {/* Letter p with contrast badge nested between Line 2 and Row 2 */}
                <span
                  className="relative inline-block"
                  style={{ color: currentColors.p }}
                >
                  p
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center gap-1.5 whitespace-nowrap text-black font-sans text-[12px] font-semibold select-none pointer-events-none transition-all duration-500">
                    <span>{ratioP}:1</span>
                    {isPassP ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-black"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-black"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                      </svg>
                    )}
                    <span>AA</span>
                  </span>
                </span>
                <span>atient desi</span>

                {/* Letter g with contrast badge nested between Line 2 and Row 2 */}
                <span
                  className="relative inline-block"
                  style={{ color: currentColors.g }}
                >
                  g
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 flex items-center gap-1.5 whitespace-nowrap text-black font-sans text-[12px] font-semibold select-none pointer-events-none transition-all duration-500">
                    <span>{ratioG}:1</span>
                    {isPassG ? (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-black"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-black"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                      </svg>
                    )}
                    <span>AA</span>
                  </span>
                </span>
                <span>ners</span>
              </span>

              {/* LINE 3: Bottom notebook baseline for Row 2 (width 899px, height 1px, #D9D9D9) */}
              <div className="absolute bottom-[14px] left-1/2 -translate-x-1/2 w-[899px] max-w-full pointer-events-none z-0">
                <svg
                  width="100%"
                  height="1"
                  viewBox="0 0 899 1"
                  fill="none"
                  className="w-[899px] max-w-full h-[1px] block"
                >
                  <line
                    x1="0"
                    y1="0.5"
                    x2="899"
                    y2="0.5"
                    stroke="#D9D9D9"
                    strokeWidth="1"
                    strokeDasharray="6 6"
                  />
                </svg>
              </div>
            </div>
          </h1>
        </div>

        {/* Subtext: 508px width, 24px font size, 500 weight, SF Pro Rounded */}
        <p className="w-full max-w-[508px] text-black font-sans text-[20px] sm:text-[24px] font-medium leading-normal text-center mt-3 mb-10">
          Build the perfect color palette or get inspired by thousands of
          curated schemes
        </p>

        {/* Buttons Container: inline-flex, gap: 13px */}
        <div className="inline-flex items-center justify-center gap-[13px] flex-wrap">
          {/* Install for Figma */}
          <a
            href="https://figma.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center px-[28px] py-[14px] gap-[10px] rounded-full bg-[#C0F] hover:bg-[#a800e0] text-white font-sans text-[20px] font-semibold leading-normal tracking-[-0.08px] transition-all duration-200 shadow-sm hover:shadow hover:-translate-y-0.5"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 38 57"
              fill="none"
              className="shrink-0 aspect-square"
            >
              <path
                d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z"
                fill="white"
              />
              <path
                d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z"
                fill="white"
              />
              <path
                d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z"
                fill="white"
              />
              <path
                d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z"
                fill="white"
              />
              <path
                d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z"
                fill="white"
              />
            </svg>
            <span>Install for figma</span>
          </a>

          {/* Install for Chrome */}
          <a
            href="/chrome-extension.zip"
            download="Chromastines-chrome-extension.zip"
            className="flex items-center justify-center px-[28px] py-[14px] gap-[10px] rounded-full bg-[#C0F] hover:bg-[#a800e0] text-white font-sans text-[20px] font-semibold leading-normal tracking-[-0.08px] transition-all duration-200 shadow-sm hover:shadow hover:-translate-y-0.5 cursor-pointer"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0 aspect-square"
            >
              <circle cx="12" cy="12" r="10" />
              <circle cx="12" cy="12" r="4" />
              <line x1="21.17" y1="8" x2="12" y2="8" />
              <line x1="3.95" y1="6.06" x2="8.54" y2="14" />
              <line x1="10.88" y1="21.94" x2="15.46" y2="14" />
            </svg>
            <span>Install for Chrome</span>
          </a>
        </div>

        {/* Hero Interactive App Window Mockup:
            - exactly 122px from the buttons (mt-[122px])
            - width: 1102.604px, height: 640.123px, aspect-ratio: 360/209
            - NO border to the frame (border-0)
        */}
        <div className="w-full max-w-[1102.604px] mt-[122px] shrink-0 aspect-[360/209] min-h-[520px] lg:h-[640.123px] bg-neutral-900 rounded-3xl shadow-2xl overflow-hidden relative text-left flex flex-col border-0">
          {/* Mac Window Titlebar */}
          <div className="bg-[#2D2A2E] px-5 py-3.5 flex items-center justify-between border-b border-neutral-700/50 shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56]" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E]" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F]" />
            </div>
            <span className="text-neutral-400 text-xs font-medium">
              Chromastine
            </span>
            <div className="w-12" />
          </div>

          {/* Palette Canvas Area: Horizontal color strips */}
          <div className="relative flex-1 w-full h-full flex flex-col justify-between overflow-hidden">
            {/* Horizontal Color Strips Container */}
            <div className="absolute inset-0 flex flex-col w-full h-full">
              {currentPalette.map((col, idx) => {
                const isExpanded = expandedIndex === idx;
                const light = isLightColor(col.hex);
                const textColor = light ? "#000000" : "#FFFFFF";

                return (
                  <div
                    key={idx}
                    style={{
                      backgroundColor: col.hex,
                      flex: isExpanded ? "2.8 0 0%" : "1 0 0%",
                    }}
                    onClick={() => setExpandedIndex(idx)}
                    className="self-stretch w-full transition-all duration-700 ease-out flex items-center justify-between px-6 sm:px-12 relative cursor-pointer select-none overflow-hidden"
                  >
                    {/* When Expanded: Show property icons, hex, and color name */}
                    {isExpanded ? (
                      <div className="w-full flex items-center justify-between">
                        {/* Left Property Icons (width: 24px, height: 24px, aspect-ratio: 1/1) */}
                        <div
                          style={{ color: textColor }}
                          className="flex items-center gap-3.5 opacity-90 transition-opacity"
                        >
                          <X className="w-6 h-6 aspect-square cursor-pointer hover:scale-110 transition" />
                          <Sliders className="w-6 h-6 aspect-square cursor-pointer hover:scale-110 transition" />
                          <Heart className="w-6 h-6 aspect-square cursor-pointer hover:scale-110 transition" />
                          <Copy className="w-6 h-6 aspect-square cursor-pointer hover:scale-110 transition" />
                          <Eye className="w-6 h-6 aspect-square cursor-pointer hover:scale-110 transition" />
                          <Lock className="w-6 h-6 aspect-square cursor-pointer hover:scale-110 transition" />
                        </div>

                        {/* Center/Main Info: Hex Container + Color Name */}
                        <div className="flex flex-col items-center justify-center">
                          {/* Hex Container: padding 10px, gap 10px, font 36px 500 SF Pro Rounded */}
                          <div
                            style={{ color: textColor }}
                            className="flex items-center justify-center p-[10px] gap-[10px]"
                          >
                            <span className="font-sans text-2xl sm:text-[36px] font-medium leading-normal tracking-wide uppercase">
                              {col.hex.replace("#", "")}
                            </span>
                          </div>

                          {/* Color Name: font 12px 500 SF Pro Rounded (contrasts background) */}
                          <span
                            style={{ color: textColor }}
                            className="font-sans text-[12px] font-medium leading-normal opacity-90 transition-colors"
                          >
                            {col.name}
                          </span>
                        </div>

                        {/* Right Spacer for balance */}
                        <div className="w-24 hidden sm:block" />
                      </div>
                    ) : (
                      /* When Collapsed: Minimal clean horizontal strip */
                      <div
                        style={{ color: textColor }}
                        className="w-full flex items-center justify-between opacity-70 hover:opacity-100 transition-opacity text-xs"
                      >
                        <span className="font-sans font-medium">
                          {col.name}
                        </span>
                        <span className="font-mono font-bold uppercase">
                          {col.hex.replace("#", "")}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Floating Color Picker Widget over active canvas */}
            <div className="absolute top-8 left-6 sm:left-12 z-20 w-60 sm:w-64 bg-white rounded-2xl shadow-2xl p-4 border border-neutral-200/80 pointer-events-none">
              <div className="w-full h-28 rounded-xl bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 relative cursor-crosshair">
                <div className="absolute top-5 right-6 w-4 h-4 rounded-full border-2 border-white shadow-sm" />
              </div>

              <div className="mt-3 flex flex-col gap-2">
                <div className="w-full h-2.5 rounded-full bg-gradient-to-r from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500" />
                <div className="w-full h-2.5 rounded-full bg-gradient-to-r from-transparent to-black border border-neutral-200" />
              </div>

              <div className="mt-3 pt-2.5 border-t border-neutral-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-mono text-neutral-800 font-semibold bg-neutral-100 px-2.5 py-1 rounded-md">
                  <span>#443742</span>
                  <div className="w-3.5 h-3.5 rounded-full bg-[#443742]" />
                </div>
                <span className="text-[11px] text-neutral-400 font-medium">
                  Picker
                </span>
              </div>
            </div>

            {/* Bottom Controls Bar with Regenerate Button */}
            <div className="relative z-10 mt-auto p-5 sm:p-6 flex items-center justify-center">
              <button
                onClick={handleRegenerate}
                className="px-7 py-3.5 rounded-xl bg-[#C0F] hover:bg-[#a800e0] text-white font-medium text-sm shadow-xl flex items-center gap-2.5 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <RefreshCw size={16} />
                <span>Regenerate Palette</span>
              </button>
            </div>

            {/* Credit */}
            <div className="absolute bottom-4 right-5 z-20 flex items-center gap-1.5 text-[11px] font-medium text-white/90 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full pointer-events-none">
              <span>Designed by Henry Okuji</span>
              <span className="text-xs">🇳🇬</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
