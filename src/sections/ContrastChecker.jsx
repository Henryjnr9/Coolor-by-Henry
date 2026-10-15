import { useState, useMemo } from "react";
import { ArrowRight, Check, X } from "lucide-react";

// Helper function to calculate WCAG luminance and contrast ratio
function getContrastRatio(hex1, hex2) {
  const getRGB = (hex) => {
    let clean = hex.replace("#", "");
    if (clean.length === 3)
      clean = clean
        .split("")
        .map((c) => c + c)
        .join("");
    if (clean.length !== 6) return [0, 0, 0];
    const num = parseInt(clean, 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
  };

  const getLuminance = (rgb) => {
    const a = rgb.map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const lum1 = getLuminance(getRGB(hex1));
  const lum2 = getLuminance(getRGB(hex2));
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  const ratio = (brightest + 0.05) / (darkest + 0.05);
  return Number(ratio.toFixed(1));
}

// Helper to determine dynamic WCAG compliance text
function getWcagDetails(ratio) {
  if (ratio >= 7.0) {
    return {
      level: "AAA",
      isPassSmall: true,
      isPassLarge: true,
      wcagMessage: "Aligns with WCAG AAA standard for colour accessibility",
      summaryMessage: "Great contrast for all text sizes.",
    };
  } else if (ratio >= 4.5) {
    return {
      level: "AA",
      isPassSmall: true,
      isPassLarge: true,
      wcagMessage: "Aligns with WCAG standard for colour accessibility",
      summaryMessage: "Great contrast for all text sizes.",
    };
  } else if (ratio >= 3.0) {
    return {
      level: "AA",
      isPassSmall: false,
      isPassLarge: true,
      wcagMessage: "Aligns with WCAG standard for large text only (18pt+)",
      summaryMessage: "Acceptable for large text, poor for small text.",
    };
  } else {
    return {
      level: "Fail",
      isPassSmall: false,
      isPassLarge: false,
      wcagMessage: "Fails WCAG standard for colour accessibility",
      summaryMessage: "Poor contrast: does not meet accessibility guidelines.",
    };
  }
}

export default function ContrastChecker() {
  const [textColor, setTextColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#FFFFFF");

  const ratio = useMemo(
    () => getContrastRatio(textColor, bgColor),
    [textColor, bgColor],
  );
  const wcag = useMemo(() => getWcagDetails(ratio), [ratio]);

  return (
    <section
      id="contrast-checker"
      className="relative w-full py-12 font-sans select-none scroll-mt-[130px]"
    >
      {/* 1. Header & Chrome Button Row Container */}
      <div className="pt-[43px] flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
        {/* Left: Title + Floating Accessibility Badge */}
        <div className="relative">
          {/* Badge: 37.5px from top guide, 16px text, 24px icon */}
          <div className="flex items-center gap-2 mb-1">
            <span className="font-sans text-[16px] font-semibold text-black">
              1.49:1
            </span>
            <div className="w-6 h-6 aspect-square flex items-center justify-center text-black">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
              </svg>
            </div>
            <span className="font-sans text-[16px] font-semibold text-black">
              AA
            </span>
          </div>

          {/* Two-tone Title: "Cont" (#000) + "rast Checker" (#CCC), 64px, 700 weight, 95px leading */}
          <div className="relative">
            <h2 className="relative z-10 font-serif font-bold text-4xl sm:text-5xl lg:text-[64px] lg:leading-[95px] tracking-normal">
              <span className="text-[#000000]">Cont</span>
              <span className="text-[#CCCCCC]">rast Checker</span>
            </h2>

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
        </div>

        {/* Right: Get Chrome Extension Button */}
        <div className="mb-4 lg:mb-0">
          <a
            href="/chrome-extension.zip"
            download="Huewises-chrome-extension.zip"
            className="inline-flex items-center justify-center px-[28px] py-[20px] gap-[10px] rounded-[36px] bg-[#1A73E8] hover:bg-[#1557b0] text-white font-sans text-[20px] sm:text-[24px] font-normal leading-normal transition-all shadow-sm hover:shadow hover:-translate-y-0.5 cursor-pointer shrink-0"
          >
            {/* Official Chrome Logo SVG */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
              className="shrink-0 aspect-square"
            >
              <g clipPath="url(#clip0_chrome_btn)">
                <path
                  d="M14.0003 21.7893C18.3026 21.7893 21.7901 18.3015 21.7901 13.9992C21.7901 9.69698 18.3026 6.20923 14.0003 6.20923C9.69808 6.20923 6.21033 9.69698 6.21033 13.9992C6.21033 18.3015 9.69797 21.7893 14.0002 21.7893"
                  fill="white"
                />
                <path
                  d="M3.92542 10.1716C3.34427 9.16494 2.66119 8.10849 1.87617 7.0022C0.647197 9.13035 0.000163816 11.5445 0.000122072 14.0021C8.03284e-05 16.4596 0.647031 18.8738 1.87593 21.002C3.10483 23.1302 4.87236 24.8974 7.00082 26.1258C9.12927 27.3542 11.5436 28.0007 14.0012 28.0001C15.2897 26.1929 16.1645 24.8899 16.6257 24.0911C17.5115 22.5567 18.6571 20.3601 20.0626 17.5011V17.4995C19.4486 18.564 18.5651 19.4482 17.501 20.063C16.4368 20.6777 15.2296 21.0015 14.0007 21.0017C12.7717 21.0019 11.5644 20.6785 10.5 20.064C9.43573 19.4496 8.55196 18.5657 7.93762 17.5013C6.02881 13.9414 4.69141 11.4981 3.92542 10.1716Z"
                  fill="#229342"
                />
                <path
                  d="M14.0009 27.9996C15.8395 27.9999 17.6601 27.638 19.3587 26.9345C21.0574 26.2311 22.6008 25.1999 23.9008 23.8998C25.2008 22.5997 26.2319 21.0562 26.9353 19.3575C27.6387 17.6589 28.0005 15.8382 28.0001 13.9997C27.9995 11.5421 27.3521 9.12804 26.1229 7.00002C23.4707 6.73861 21.5134 6.60791 20.2509 6.60791C18.8194 6.60791 16.7358 6.73861 13.9999 7.00002L13.9984 7.00111C15.2274 7.00051 16.4349 7.32352 17.4994 7.93767C18.5639 8.55182 19.448 9.43545 20.0626 10.4997C20.6773 11.5639 21.0009 12.7713 21.0009 14.0003C21.0008 15.2292 20.6772 16.4366 20.0625 17.5008L14.0009 27.9996Z"
                  fill="#FBC116"
                />
                <path
                  d="M14.0003 19.5428C17.061 19.5428 19.5422 17.0616 19.5422 14.0008C19.5422 10.9399 17.061 8.45874 14.0002 8.45874C10.9395 8.45874 8.45825 10.94 8.45825 14.0008C8.45825 17.0615 10.9395 19.5428 14.0003 19.5428Z"
                  fill="#1A73E8"
                />
                <path
                  d="M14.0003 7.00048H26.1231C24.8947 4.87199 23.1275 3.10444 20.9993 1.87558C18.8711 0.646707 16.4568 -0.000166254 13.9993 3.20511e-08C11.5417 0.000166318 9.12755 0.647367 6.99948 1.87652C4.87142 3.10568 3.10448 4.87346 1.87634 7.00212L7.9378 17.501L7.93944 17.5019C7.32448 16.4378 7.00053 15.2306 7.00017 14.0017C6.99981 12.7727 7.32305 11.5653 7.93738 10.5009C8.55171 9.43646 9.43547 8.55256 10.4998 7.93808C11.5641 7.3236 12.7715 7.00018 14.0005 7.00037L14.0003 7.00048Z"
                  fill="#E33B2E"
                />
              </g>
              <defs>
                <clipPath id="clip0_chrome_btn">
                  <rect width="28" height="28" fill="white" />
                </clipPath>
              </defs>
            </svg>
            <span>Get Chrome Extension</span>
          </a>
        </div>
      </div>

      {/* 2. Subtext: 16px below title, 24px font, 400 weight */}
      <div className="mt-[16px] max-w-[620px]">
        <p className="text-black font-sans text-lg sm:text-[24px] font-normal leading-normal">
          Calculate the contrast ratio of text and background colors to make
          your content more accessible.
        </p>
      </div>

      {/* 3. "Get Started" link: 30px below subtext */}
      <div className="mt-[30px]">
        <a
          href="#contrast-checker"
          className="inline-flex items-center gap-2 text-[#9300B8] hover:text-[#780096] font-sans text-xl sm:text-[24px] font-medium leading-normal transition-colors group"
        >
          <span>Get Started</span>
          <ArrowRight
            size={22}
            className="group-hover:translate-x-1 transition-transform"
          />
        </a>
      </div>

      {/* 4. Interactive 2-Card Layout: 30px below link, gap: 24px */}
      <div className="mt-[30px] grid grid-cols-1 lg:grid-cols-2 gap-[24px] items-stretch">
        {/* Left Column: Entering Text & Background Card (height: 482px, padding: 32px 40px, rounded: 16px, bg: #FFF) */}
        <div className="w-full h-auto min-h-[482px] lg:h-[482px] p-6 sm:p-8 lg:px-[40px] lg:py-[32px] rounded-[16px] bg-white border border-neutral-200/60 shadow-xs flex flex-col justify-between items-start">
          {/* Inputs Row */}
          <div className="w-full flex flex-col sm:flex-row items-center gap-[24px]">
            {/* Text Colour Input */}
            <div className="w-full flex-1 flex flex-col items-start gap-[11px]">
              <span className="self-stretch text-black font-sans text-[16px] font-medium leading-normal">
                Text Colour
              </span>
              <div className="flex items-center justify-between w-full border border-neutral-200 bg-white rounded-[12px] px-4 py-2 focus-within:border-purple-600 transition shadow-2xs">
                <input
                  type="text"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="font-sans text-[24px] font-medium text-black outline-none w-28 uppercase"
                />
                <label className="relative cursor-pointer">
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                  />
                  <div
                    style={{ backgroundColor: textColor }}
                    className="w-[42px] h-[42px] rounded-[8px] border border-black/10 shadow-2xs"
                  />
                </label>
              </div>
            </div>

            {/* Background Colour Input */}
            <div className="w-full flex-1 flex flex-col items-start gap-[11px]">
              <span className="self-stretch text-black font-sans text-[16px] font-medium leading-normal">
                Background Colour
              </span>
              <div className="flex items-center justify-between w-full border border-neutral-200 bg-white rounded-[12px] px-4 py-2 focus-within:border-purple-600 transition shadow-2xs">
                <input
                  type="text"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="font-sans text-[24px] font-medium text-black outline-none w-28 uppercase"
                />
                <label className="relative cursor-pointer">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                  />
                  <div
                    style={{ backgroundColor: bgColor }}
                    className="w-[42px] h-[42px] rounded-[8px] border border-neutral-300 shadow-2xs"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Contrast Ratio Message Box: padding 24px, gap 36px, rounded 16px, bg: rgba(147, 0, 184, 0.10) */}
          <div className="w-full p-[24px] rounded-[16px] bg-[rgba(147,0,184,0.10)] flex flex-col items-start gap-4 lg:gap-[36px] my-4">
            {/* Header */}
            <span className="self-stretch text-[#9300B8] font-sans text-[16px] font-medium leading-normal">
              Contrast Ratio
            </span>

            {/* Ratio + Level + Check Icon */}
            <div className="flex items-center gap-[16px] flex-wrap">
              <span className="text-[#9300B8] font-sans text-4xl sm:text-[48px] font-semibold leading-normal">
                {ratio}:1
              </span>
              <span className="text-[#9300B8] font-sans text-4xl sm:text-[48px] font-semibold leading-normal">
                {wcag.level}
              </span>
              <div className="w-[36px] h-[36px] aspect-square flex items-center justify-center text-[#9300B8]">
                {wcag.isPassLarge ? (
                  <Check size={36} strokeWidth={2.5} />
                ) : (
                  <X size={36} strokeWidth={2.5} className="text-rose-600" />
                )}
              </div>
            </div>

            {/* Message */}
            <p className="text-[#9300B8] font-sans text-[16px] font-normal leading-normal">
              {wcag.wcagMessage}
            </p>
          </div>

          {/* Great contrast text */}
          <p className="text-black font-sans text-[16px] font-normal leading-normal">
            {wcag.summaryMessage}
          </p>
        </div>

        {/* Right Column: Preview Card (height: 482px, padding: 32px 40px, rounded: 16px) */}
        <div
          style={{ backgroundColor: bgColor, color: textColor }}
          className="w-full h-auto min-h-[482px] lg:h-[482px] p-6 sm:p-8 lg:px-[40px] lg:py-[32px] rounded-[16px] border border-neutral-200/80 shadow-xs flex items-center justify-center transition-colors duration-200"
        >
          {/* Inner container housing all of the preview elements: gap 36px */}
          <div className="flex flex-col justify-center items-center gap-[24px] lg:gap-[36px] text-center">
            {/* Small Text Group */}
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-2">
                <span className="font-sans text-[16px] font-medium leading-normal">
                  Small Text
                </span>
                <div className="w-[28px] h-[28px] aspect-square flex items-center justify-center">
                  {wcag.isPassSmall ? (
                    <Check size={28} strokeWidth={2.2} />
                  ) : (
                    <X size={28} strokeWidth={2.2} />
                  )}
                </div>
              </div>
              <span className="font-sans text-[16px] font-normal leading-normal opacity-75">
                For 17pt and below
              </span>
            </div>

            {/* Large Text Group */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-start gap-[16px]">
                <h3 className="font-serif text-5xl sm:text-7xl lg:text-[96px] font-medium leading-none tracking-tight">
                  Large Text
                </h3>
                <div className="w-[28px] h-[28px] aspect-square flex items-center justify-center mt-2">
                  {wcag.isPassLarge ? (
                    <Check size={28} strokeWidth={2.2} />
                  ) : (
                    <X size={28} strokeWidth={2.2} />
                  )}
                </div>
              </div>
              <span className="font-sans text-[16px] font-normal leading-normal opacity-75">
                For 18pt and above
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Bottom Broken Line: exactly 100px below the cards */}
      <div className="mt-[100px] w-full pointer-events-none">
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
