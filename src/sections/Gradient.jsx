import { useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDownRight,
  ArrowDown,
  ArrowDownLeft,
  ArrowLeft,
  ArrowUpLeft,
  ArrowUp,
  Check,
  Copy,
} from "lucide-react";

const DIRECTIONS = [
  { id: "top-right", angle: "45deg", icon: ArrowUpRight },
  { id: "right", angle: "90deg", icon: ArrowRight },
  { id: "bottom-right", angle: "135deg", icon: ArrowDownRight },
  { id: "bottom", angle: "180deg", icon: ArrowDown }, // Default selected in Figma
  { id: "bottom-left", angle: "225deg", icon: ArrowDownLeft },
  { id: "left", angle: "270deg", icon: ArrowLeft },
  { id: "top-left", angle: "315deg", icon: ArrowUpLeft },
  { id: "top", angle: "0deg", icon: ArrowUp },
];

const PRESET_GRADIENTS = [
  { c1: "#051937", c2: "#A8EB12" }, // Figma reference
  { c1: "#4A00E0", c2: "#8E2DE2" },
  { c1: "#FF416C", c2: "#FF4B2B" },
  { c1: "#00B4DB", c2: "#0083B0" },
  { c1: "#F953C6", c2: "#B91D73" },
  { c1: "#11998E", c2: "#38EF7D" },
  { c1: "#2C3E50", c2: "#FD746C" },
];

export default function Gradient() {
  const [color1, setColor1] = useState("#051937");
  const [color2, setColor2] = useState("#A8EB12");
  const [selectedDirection, setSelectedDirection] = useState("bottom"); // Down arrow selected by default
  const [presetIndex, setPresetIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeAngle =
    DIRECTIONS.find((d) => d.id === selectedDirection)?.angle || "180deg";
  const gradientCSS = `linear-gradient(${activeAngle}, ${color1} 0%, ${color2} 100%)`;

  const handleGenerate = () => {
    const nextIndex = (presetIndex + 1) % PRESET_GRADIENTS.length;
    setPresetIndex(nextIndex);
    setColor1(PRESET_GRADIENTS[nextIndex].c1);
    setColor2(PRESET_GRADIENTS[nextIndex].c2);
  };

  const handleCopyCSS = () => {
    navigator.clipboard.writeText(`background: ${gradientCSS};`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <section
      id="gradient"
      className="relative w-full font-sans select-none scroll-mt-[130px]"
    >
      {/* 1. Header Row: Title & "Get Started" Pill */}
      <div className="pt-[43px] flex items-center gap-[16px]">
        {/* Title: 64px, 700 weight, 95px line-height */}
        <h2 className="relative z-10 font-serif font-bold text-4xl sm:text-5xl lg:text-[64px] lg:leading-[95px] text-black tracking-normal">
          Gradient
        </h2>

        {/* "Get Started" Pill: 16px away from title */}
        <span className="px-4 py-1.5 rounded-full bg-[rgba(147,0,184,0.10)] text-[#9300B8] font-sans text-sm sm:text-base font-medium">
          Get Started
        </span>

        {/* Broken line directly under the header along its baseline */}
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

      {/* 2. Subtext: 16px below title, 24px font */}
      <div className="mt-[16px] max-w-[620px]">
        <p className="text-black font-sans text-lg sm:text-[24px] font-normal leading-normal">
          Craft stunning gradients and seamlessly integrate them into your
          designs.
        </p>
      </div>

      {/* 3. Cards Section: 89px below subtext, fluid across 80px margins, gap: 24px */}
      <div className="mt-[89px] w-full flex flex-col lg:flex-row items-stretch gap-[24px]">
        {/* LEFT CARD: Gradient Picker Container (width: 704px, padding: 32px 40px, rounded: 16px, bg: #FFF) */}
        <div className="w-full lg:w-[704px] shrink-0 rounded-[16px] bg-white border border-neutral-200/70 p-6 sm:p-8 lg:px-[40px] lg:py-[32px] flex flex-col justify-between shadow-xs">
          <div>
            {/* Color Inputs Row: Same dimension as Contrast Checker, gap: 24px */}
            <div className="w-full flex flex-col sm:flex-row items-center gap-[24px]">
              {/* First Colour Input */}
              <div className="w-full flex-1 flex flex-col items-start gap-[11px]">
                <span className="self-stretch text-black font-sans text-[16px] font-medium leading-normal">
                  First Colour
                </span>
                <div className="flex items-center justify-between w-full border border-neutral-200 bg-white rounded-[12px] px-4 py-2 focus-within:border-[#C0F] transition shadow-2xs">
                  <input
                    type="text"
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                    className="font-sans text-[24px] font-medium text-black outline-none w-28 uppercase"
                  />
                  <label className="relative cursor-pointer">
                    <input
                      type="color"
                      value={color1}
                      onChange={(e) => setColor1(e.target.value)}
                      className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                    />
                    <div
                      style={{ backgroundColor: color1 }}
                      className="w-[42px] h-[42px] rounded-[8px] border border-black/10 shadow-2xs"
                    />
                  </label>
                </div>
              </div>

              {/* Second Colour Input */}
              <div className="w-full flex-1 flex flex-col items-start gap-[11px]">
                <span className="self-stretch text-black font-sans text-[16px] font-medium leading-normal">
                  Second Colour
                </span>
                <div className="flex items-center justify-between w-full border border-neutral-200 bg-white rounded-[12px] px-4 py-2 focus-within:border-[#C0F] transition shadow-2xs">
                  <input
                    type="text"
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                    className="font-sans text-[24px] font-medium text-black outline-none w-28 uppercase"
                  />
                  <label className="relative cursor-pointer">
                    <input
                      type="color"
                      value={color2}
                      onChange={(e) => setColor2(e.target.value)}
                      className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                    />
                    <div
                      style={{ backgroundColor: color2 }}
                      className="w-[42px] h-[42px] rounded-[8px] border border-black/10 shadow-2xs"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Choose Orientation: 36px below inputs */}
            <div className="mt-[36px]">
              <span className="self-stretch text-black font-sans text-[16px] font-medium leading-normal block">
                Choose Orientation
              </span>

              {/* Arrow Buttons Container: 16px below label, gap: 23.43px */}
              <div className="mt-[16px] flex items-center gap-[12px] sm:gap-[23.43px] flex-wrap">
                {DIRECTIONS.map((dir) => {
                  const Icon = dir.icon;
                  const isSelected = selectedDirection === dir.id;

                  return (
                    <button
                      key={dir.id}
                      type="button"
                      onClick={() => setSelectedDirection(dir.id)}
                      className={`flex items-center justify-center p-[13.179px] rounded-[11.714px] cursor-pointer transition-all ${
                        isSelected
                          ? "border-[1.464px] border-[#C0F] bg-white shadow-2xs"
                          : "border-[1.464px] border-[#EBEBEB] bg-white hover:border-neutral-300"
                      }`}
                    >
                      <Icon
                        style={{
                          width: isSelected ? "13.667px" : "14.643px",
                          height: isSelected ? "13.667px" : "14.643px",
                          strokeWidth: "1.952px",
                          stroke: isSelected ? "#C0F" : "#000",
                        }}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action Buttons Row: 141px below arrows */}
          <div className="mt-10 lg:mt-[141px] flex items-center gap-3.5 flex-wrap">
            {/* Generate Gradient Button */}
            <button
              type="button"
              onClick={handleGenerate}
              className="flex items-center justify-center px-[24px] py-[19px] gap-[10px] rounded-[22px] bg-[#C0F] hover:bg-[#a800e0] text-white font-sans text-[20px] sm:text-[24px] font-semibold leading-normal tracking-[-0.096px] transition-all shadow-sm hover:shadow hover:-translate-y-0.5 active:scale-95 cursor-pointer"
            >
              Generate Gradient
            </button>

            {/* Copy CSS Button */}
            <button
              type="button"
              onClick={handleCopyCSS}
              className="flex items-center justify-center px-[22px] py-[19px] gap-2 rounded-[22px] border border-[#D9D9D9] bg-white hover:border-black text-black font-sans text-[18px] sm:text-[20px] font-medium leading-normal transition-all shadow-2xs hover:-translate-y-0.5 active:scale-95 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check size={20} className="text-emerald-600 stroke-[2.5]" />
                  <span className="text-emerald-700 font-semibold">
                    Copied CSS!
                  </span>
                </>
              ) : (
                <>
                  <Copy size={20} className="text-neutral-700" />
                  <span>Copy CSS</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* RIGHT CARD: Live Gradient Preview (flex: 1 0 0, rounded: 16px) */}
        <div
          style={{ background: gradientCSS }}
          className="flex-1 w-full min-h-[380px] lg:min-h-[482px] rounded-[16px] shadow-sm transition-all duration-300"
        />
      </div>

      {/* 4. Bottom Broken Line: 105px below cards */}
      <div className="mt-[105px] w-full pointer-events-none">
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
