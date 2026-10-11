import { useState, useRef } from "react";
import { Check, ImagePlus, RefreshCw, Upload } from "lucide-react";

const VARIATION_MODES = ["Deep", "Muted", "Bright", "Colourful"];

function isLightColor(hex) {
  let c = hex.replace("#", "");
  if (c.length === 3)
    c = c
      .split("")
      .map((x) => x + x)
      .join("");
  const num = parseInt(c, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return (r * 299 + g * 587 + b * 114) / 1000 > 155;
}

function hexToHsl(hex) {
  let c = hex.replace("#", "");
  if (c.length === 3)
    c = c
      .split("")
      .map((x) => x + x)
      .join("");
  const num = parseInt(c, 16);
  let r = ((num >> 16) & 255) / 255;
  let g = ((num >> 8) & 255) / 255;
  let b = (num & 255) / 255;

  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s = 0,
    l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return [h * 360, s * 100, l * 100];
}

function hslToHex(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = (x) =>
    Math.round(x * 255)
      .toString(16)
      .padStart(2, "0")
      .toUpperCase();
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function applyVariation(colors, mode) {
  return colors.map((col) => {
    const [h, s, l] = hexToHsl(col.rawHex || col.hex);
    let newHex = col.rawHex || col.hex;

    if (mode === "Bright") {
      newHex = hslToHex(
        h,
        Math.min(100, s * 1.35 + 15),
        Math.min(65, Math.max(50, l)),
      );
    } else if (mode === "Muted") {
      newHex = hslToHex(
        h,
        Math.max(15, s * 0.4),
        Math.min(75, Math.max(40, l)),
      );
    } else if (mode === "Deep") {
      newHex = hslToHex(h, Math.min(90, s * 1.1), Math.max(16, l * 0.45));
    }
    return { ...col, hex: newHex };
  });
}

export default function ImagePicker() {
  const [imageUploaded, setImageUploaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [baseColors, setBaseColors] = useState([]);
  const [activeVariation, setActiveVariation] = useState("Colourful");
  const [hoveredIndex, setHoveredIndex] = useState(0);
  const [copiedHex, setCopiedHex] = useState(null);
  const fileInputRef = useRef(null);

  const displayedPalette = applyVariation(baseColors, activeVariation);

  const extractColors = (src, randomize = false) => {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = src;

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      const width = (canvas.width = 100);
      const height = (canvas.height = 100);
      ctx.drawImage(img, 0, 0, width, height);

      const imageData = ctx.getImageData(0, 0, width, height).data;
      const sampled = [];

      const baseCoords = [
        [15, 20],
        [35, 45],
        [50, 50],
        [65, 75],
        [85, 80],
      ];

      const coords = randomize
        ? Array.from({ length: 5 }, () => [
            Math.floor(Math.random() * 90) + 5,
            Math.floor(Math.random() * 90) + 5,
          ])
        : baseCoords;

      coords.forEach(([x, y]) => {
        const idx = (y * width + x) * 4;
        const r = imageData[idx];
        const g = imageData[idx + 1];
        const b = imageData[idx + 2];
        const toHex = (c) => c.toString(16).padStart(2, "0").toUpperCase();
        const hex = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
        sampled.push({
          rawHex: hex,
          hex: hex,
          name: `Color ${sampled.length + 1}`,
        });
      });

      setBaseColors(sampled);
      setHoveredIndex(0);
      setImageUploaded(true);
    };
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageSrc(url);
      extractColors(url);
    }
  };

  const handleCopyHex = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1500);
  };

  const handleRegenerate = () => {
    if (imageSrc) {
      extractColors(imageSrc, true);
    }
  };

  return (
    <section
      id="image-picker"
      className="relative w-full font-sans select-none scroll-mt-[130px]"
    >
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* 1. Header Row */}
      <div className="pt-[43px] flex items-center gap-[16px]">
        <div className="relative">
          <div className="flex items-center gap-[16px]">
            <h2 className="relative z-10 font-serif font-bold text-4xl sm:text-5xl lg:text-[64px] lg:leading-[95px] text-black tracking-normal">
              Image Picker
            </h2>
            <span className="px-4 py-1.5 rounded-full bg-[rgba(147,0,184,0.10)] text-[#9300B8] font-sans text-sm sm:text-base font-medium">
              Get Started
            </span>
          </div>

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

      {/* 2. Subtext */}
      <div className="mt-[16px] max-w-[620px]">
        <p className="text-black font-sans text-lg sm:text-[24px] font-normal leading-normal">
          Generate color schemes from your images and use them in your designs.
        </p>
      </div>

      {/* 3. Cards Section: Right Card takes LARGER share (flex-1), Left Card is smaller (420px) */}
      <div className="mt-[89px] w-full flex flex-col lg:flex-row items-stretch gap-[24px]">
        {/* LEFT CARD (Smaller share: width 420px on desktop) */}
        <div className="w-full lg:w-[420px] shrink-0 min-h-[500px] lg:h-[560px] rounded-[16px] bg-white border border-neutral-200/70 p-6 sm:p-8 lg:p-[32px] flex items-center justify-center shadow-xs">
          {imageUploaded && imageSrc ? (
            <div className="w-full h-full flex flex-col items-center justify-center relative group">
              <div className="w-full h-full min-h-[420px] rounded-[16px] overflow-hidden relative">
                <img
                  src={imageSrc}
                  alt="Uploaded source"
                  className="w-full h-full object-cover object-center absolute inset-0"
                />
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-5 px-5 py-2.5 rounded-full bg-white/95 backdrop-blur-xs text-[#9300B8] font-sans text-sm font-semibold shadow-md hover:bg-white transition-all cursor-pointer opacity-90 group-hover:opacity-100"
              >
                Change Image
              </button>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-full min-h-[420px] rounded-[16px] border border-dashed border-[#9300B8] bg-[rgba(147,0,184,0.10)] p-[24px] flex flex-col justify-center items-center gap-[28px] cursor-pointer hover:bg-[rgba(147,0,184,0.15)] transition-colors group"
            >
              <span className="text-center text-[#9300B8] font-sans text-[16px] font-medium leading-normal">
                Upload Image
              </span>

              <div className="w-[54px] h-[54px] aspect-square flex items-center justify-center text-[#9300B8] group-hover:scale-110 transition-transform">
                <ImagePlus size={54} strokeWidth={1.8} />
              </div>
            </div>
          )}
        </div>

        {/* RIGHT CARD: PALETTE (LARGER share: flex-1 takes all remaining space) */}
        <div className="flex-1 w-full min-h-[500px] lg:h-[560px] rounded-[16px] bg-white border border-neutral-200/70 p-6 sm:p-8 lg:px-[40px] lg:py-[32px] flex flex-col justify-between shadow-xs">
          {imageUploaded ? (
            <div className="w-full h-full flex flex-col justify-between">
              {/* Top: "Palette" label */}
              <div className="mb-[14px]">
                <span className="text-black font-sans text-[16px] font-medium leading-normal">
                  Palette
                </span>
              </div>

              {/* Swatches Block: Wide, spacious 268px height */}
              <div className="w-full h-[268px] rounded-[16px] overflow-hidden flex items-stretch shadow-2xs relative">
                {displayedPalette.map((color, idx) => {
                  const isExpanded = hoveredIndex === idx;
                  const light = isLightColor(color.hex);
                  const textColor = light ? "#000000" : "#FFFFFF";

                  return (
                    <div
                      key={idx}
                      style={{
                        backgroundColor: color.hex,
                        flex: isExpanded ? "2.4 0 0%" : "1 0 0%",
                      }}
                      onMouseEnter={() => setHoveredIndex(idx)}
                      onClick={() => handleCopyHex(color.hex)}
                      className="self-stretch h-full transition-all duration-500 ease-out flex flex-col justify-end p-3 sm:p-4 relative cursor-pointer select-none overflow-hidden min-w-0"
                    >
                      {copiedHex === color.hex && (
                        <div className="absolute inset-0 bg-black/30 backdrop-blur-xs flex items-center justify-center z-30">
                          <div className="bg-white text-black px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
                            <Check size={12} className="text-emerald-600" />
                            <span>Copied!</span>
                          </div>
                        </div>
                      )}

                      {isExpanded && (
                        <div className="w-full flex flex-col items-center justify-center mb-3 transition-all duration-500 min-w-0">
                          <div
                            style={{ color: textColor }}
                            className="flex items-center justify-center px-3 py-1.5 gap-1.5 rounded-xl bg-black/20 backdrop-blur-xs"
                          >
                            <span className="font-sans text-lg sm:text-xl font-medium leading-normal tracking-wide uppercase truncate">
                              {color.hex.replace("#", "")}
                            </span>
                          </div>

                          <span
                            style={{ color: textColor }}
                            className="font-sans text-[11px] font-medium leading-normal mt-1 opacity-90 truncate"
                          >
                            {color.name}
                          </span>
                        </div>
                      )}

                      {!isExpanded && (
                        <div
                          style={{ color: textColor }}
                          className="w-full text-center text-[10px] font-mono font-medium opacity-60 mb-1 transition-opacity truncate"
                        >
                          {color.hex.replace("#", "")}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Bottom: Regenerate Palette + Variation Pills aligned on the wider stage */}
              <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <button
                    type="button"
                    onClick={handleRegenerate}
                    className="inline-flex items-center justify-center px-[18px] py-[6px] gap-[10px] rounded-full bg-[rgba(147,0,184,0.10)] hover:bg-[rgba(147,0,184,0.18)] text-[#9300B8] font-sans text-[15px] font-medium leading-normal transition-colors cursor-pointer"
                  >
                    <RefreshCw size={14} />
                    <span>Regenerate Palette</span>
                  </button>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {VARIATION_MODES.map((mode) => {
                    const isActive = activeVariation === mode;
                    return (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setActiveVariation(mode)}
                        className={`flex items-center justify-center px-3.5 py-1.5 rounded-[14px] border border-[#D9D9D9] font-sans text-[13px] font-medium leading-normal transition-all duration-200 cursor-pointer ${
                          isActive
                            ? "bg-[#111] text-white border-[#111] shadow-xs"
                            : "bg-white text-black hover:border-black"
                        }`}
                      >
                        {mode}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex flex-col justify-center items-center text-center p-6 gap-3">
              <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                <Upload size={22} />
              </div>
              <p className="text-neutral-500 font-sans text-[16px] font-medium max-w-xs">
                Upload an image on the left to extract the active colours.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 4. Bottom Broken Line */}
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
