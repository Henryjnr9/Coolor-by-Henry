import { useState } from "react";

// Educational 7-Day Color Psychology Database
const COLOR_PSYCHOLOGY_DAYS = [
  {
    day: "Sunday",
    name: "Solar Flare",
    hex: "#FFB800",
    psychology:
      "Radiating optimism, vitality, and creative clarity. Yellow stimulates mental energy, awakening a cheerful and forward-looking mindset.",
  },
  {
    day: "Monday",
    name: "Deep Serenity",
    hex: "#1D4ED8",
    psychology:
      "Associated with trust, depth, and focused calm. Blue lowers cognitive stress and fosters mental discipline to kickstart the week.",
  },
  {
    day: "Tuesday",
    name: "Dragonfruit",
    hex: "#F9429E",
    psychology:
      "Juicy and fresh, this bright tropical splash brings zest, joy, and a burst of inspiration wherever it goes.",
  },
  {
    day: "Wednesday",
    name: "Botanical Sage",
    hex: "#10B981",
    psychology:
      "Evoking renewal, balance, and organic growth. Green restores mental equilibrium and invites harmonious creative decision-making.",
  },
  {
    day: "Thursday",
    name: "Mystic Amethyst",
    hex: "#8B5CF6",
    psychology:
      "Connected to vision, ingenuity, and high-level strategy. Purple stimulates imaginative intuition and unconventional solutions.",
  },
  {
    day: "Friday",
    name: "Tangerine Dream",
    hex: "#F97316",
    psychology:
      "Exuding warmth, social cohesion, and dynamic drive. Orange sparks expressive enthusiasm and celebrates creative breakthroughs.",
  },
  {
    day: "Saturday",
    name: "Midnight Velvet",
    hex: "#0F172A",
    psychology:
      "Embodying poise, introspective peace, and grounded luxury. Deep tones facilitate calm rest and deliberate contemplation.",
  },
];

export default function Intro() {
  const todayIndex = new Date().getDay();
  const [activeDayIndex, setActiveDayIndex] = useState(todayIndex);

  const activeColor = COLOR_PSYCHOLOGY_DAYS[activeDayIndex];

  const handleNextDay = () => {
    setActiveDayIndex((prev) => (prev + 1) % COLOR_PSYCHOLOGY_DAYS.length);
  };

  // The 10 Brand Logos
  const renderLogosList = () => (
    <>
      {/* 1. Airbnb */}
      <div className="flex items-center gap-2 hover:opacity-75 transition-opacity cursor-default shrink-0">
        <svg height="30" viewBox="0 0 32 32" fill="currentColor">
          <path d="M16 1c-2.4 0-4.4 1.7-5.8 4.2C8.7 8 7 12.2 5.5 16.5c-1.8 5-2.2 8.7-1.1 11.2 1.1 2.4 3.4 3.7 6.4 3.7 3.3 0 6.2-1.8 8.2-4.8 2 3 4.9 4.8 8.2 4.8 3 0 5.3-1.3 6.4-3.7 1.1-2.5.7-6.2-1.1-11.2-1.5-4.3-3.2-8.5-4.7-11.3C20.4 2.7 18.4 1 16 1zm0 3.3c1.3 0 2.6 1.1 3.8 3.2 1.4 2.6 3.1 6.7 4.6 10.9 1.7 4.8 2 8.1 1.2 9.8-.7 1.5-2.1 2.3-4.2 2.3-2.6 0-5.1-1.6-6.6-4.2-.6-1.1-1-2.4-1-3.7 0-3.3 2.1-5.9 4.7-5.9 1.8 0 3.3 1.2 3.8 2.8.2.7.1 1.3-.3 1.7-.4.4-1 .4-1.5.1-.2-.1-.5-.4-.7-.9-.2-.6-.7-1-1.3-1-1.3 0-2.3 1.5-2.3 3.3 0 .8.2 1.6.6 2.3 1.5 2.5 3.7 3.9 6 3.9 1.4 0 2.4-.5 2.8-1.5.6-1.3.3-4.2-1.2-8.7-1.5-4.3-3.1-8.3-4.5-10.9-1.1-2-2.1-3-3.2-3s-2.1 1-3.2 3c-1.4 2.6-3 6.6-4.5 10.9-1.5 4.5-1.8 7.4-1.2 8.7.4 1 1.4 1.5 2.8 1.5 2.3 0 4.5-1.4 6-3.9.4-.7.6-1.5.6-2.3 0-1.8-1-3.3-2.3-3.3-.6 0-1.1.4-1.3 1-.2.5-.5.8-.7.9-.5.3-1.1.3-1.5-.1-.4-.4-.5-1-.3-1.7.5-1.6 2-2.8 3.8-2.8 2.6 0 4.7 2.6 4.7 5.9 0 1.3-.4 2.6-1 3.7-1.5 2.6-4 4.2-6.6 4.2-2.1 0-3.5-.8-4.2-2.3-.8-1.7-.5-5 1.2-9.8 1.5-4.2 3.2-8.3 4.6-10.9 1.2-2.1 2.5-3.2 3.8-3.2z" />
        </svg>
        <span className="font-bold tracking-tight text-2xl lowercase">
          airbnb
        </span>
      </div>

      {/* 2. Dropbox */}
      <div className="flex items-center gap-2 hover:opacity-75 transition-opacity cursor-default shrink-0">
        <svg height="26" viewBox="0 0 32 32" fill="currentColor">
          <path d="M8 5.3L16 10.4 8 15.6 0 10.4 8 5.3zm16 0L32 10.4 24 15.6 16 10.4 24 5.3zM0 20.8l8-5.2 8 5.2-8 5.2-8-5.2zm24-5.2l8 5.2-8 5.2-8-5.2 8-5.2zM16 22l8-5.2 8 5.2-8 5.2-8-5.2zm-8 6.5l8-5.2 8 5.2-8 5.2-8-5.2z" />
        </svg>
        <span className="font-bold tracking-tight text-2xl">Dropbox</span>
      </div>

      {/* 3. Microsoft */}
      <div className="flex items-center gap-2.5 hover:opacity-75 transition-opacity cursor-default shrink-0">
        <div className="grid grid-cols-2 gap-0.5 w-5 h-5">
          <div className="w-2 h-2 bg-current"></div>
          <div className="w-2 h-2 bg-current"></div>
          <div className="w-2 h-2 bg-current"></div>
          <div className="w-2 h-2 bg-current"></div>
        </div>
        <span className="font-semibold tracking-tight text-[22px]">
          Microsoft
        </span>
      </div>

      {/* 4. NETFLIX */}
      <div className="hover:opacity-75 transition-opacity cursor-default shrink-0">
        <span className="font-black tracking-[0.2em] text-[26px] font-sans">
          NETFLIX
        </span>
      </div>

      {/* 5. The New York Times */}
      <div className="hover:opacity-75 transition-opacity cursor-default shrink-0">
        <span className="font-serif italic font-bold text-[22px] tracking-tight">
          The New York Times
        </span>
      </div>

      {/* 6. GitHub */}
      <div className="flex items-center gap-2 hover:opacity-75 transition-opacity cursor-default shrink-0">
        <svg height="28" viewBox="0 0 24 24" fill="currentColor">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          />
        </svg>
        <span className="font-bold text-[22px]">GitHub</span>
      </div>

      {/* 7. Slack */}
      <div className="flex items-center gap-2 hover:opacity-75 transition-opacity cursor-default shrink-0">
        <svg height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" />
        </svg>
        <span className="font-bold tracking-tight text-2xl lowercase">
          slack
        </span>
      </div>

      {/* 8. WB */}
      <div className="hover:opacity-75 transition-opacity cursor-default shrink-0">
        <svg height="30" viewBox="0 0 28 32" fill="currentColor">
          <path d="M14 0C6.3 0 0 6.3 0 14c0 7.7 6.3 14 14 14 7.7 0 14-6.3 14-14 0-7.7-6.3-14-14-14zm0 2.2c5.9 0 10.9 4.3 11.7 10H17.2l-.7-5.5h-2.1l-.8 5.5H8.7l-.8-5.5H5.8l-.7 5.5H2.3C3.1 6.5 8.1 2.2 14 2.2zM2.2 14c0-.6.1-1.3.2-1.9h3l1.1 7.8h2.1l.8-5.5h2.1l.8 5.5h2.1l1.1-7.8h3c.1.6.2 1.3.2 1.9 0 6.5-5.3 11.8-11.8 11.8S2.2 20.5 2.2 14z" />
        </svg>
      </div>

      {/* 9. EA */}
      <div className="hover:opacity-75 transition-opacity cursor-default shrink-0">
        <svg height="26" viewBox="0 0 42 24" fill="currentColor">
          <path d="M4 18L10 6h4l6 12h-3.8l-1.3-2.8H9.1L7.8 18H4zm6.4-5.5h3.2L12 8.7l-1.6 3.8zm14.6 5.5V6h13v2.8h-9.3v3.1h7.8v2.6h-7.8v3.5H35V18H25z" />
        </svg>
      </div>

      {/* 10. DreamWorks */}
      <div className="hover:opacity-75 transition-opacity cursor-default shrink-0">
        <span className="font-serif font-light tracking-[0.25em] text-[18px] uppercase">
          DREAMWORKS
        </span>
      </div>
    </>
  );

  return (
    <section
      id="explore"
      className="w-full pt-8 pb-24 font-sans select-none overflow-hidden"
    >
      {/* Scoped CSS animation for continuous infinite horizontal scroll */}
      <style>{`
        @keyframes continuousMarquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-continuous-marquee {
          display: flex;
          width: max-content;
          animation: continuousMarquee 32s linear infinite;
        }
        .animate-continuous-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* 1. Logos & Social Proof Area */}
      <div className="w-full flex flex-col items-center text-center">
        {/* Headline: 508px width, 24px font size, 500 weight */}
        <p className="w-full max-w-[508px] text-black font-sans text-[24px] font-medium leading-normal text-center">
          Trusted by creative minds and top companies who use colours
        </p>

        {/* Continuous Horizontal Scrolling Track: 58px distance */}
        <div className="mt-[58px] pb-[4.09px] w-full relative overflow-hidden">
          {/* Subtle edge fade masks */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#FAFAFA] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#FAFAFA] to-transparent z-10 pointer-events-none" />

          {/* Marquee Continuous Slider (2 duplicated sets for seamless loop) */}
          <div className="animate-continuous-marquee text-black">
            {/* Set 1 */}
            <div className="flex items-center gap-[60px] shrink-0 pr-[60px]">
              {renderLogosList()}
            </div>

            {/* Set 2 (exact duplicate for zero-gap loop) */}
            <div className="flex items-center gap-[60px] shrink-0 pr-[60px]">
              {renderLogosList()}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Lower Area: 110.09px below logos, contains 3 Broken Lines & Content */}
      <div className="relative mt-[110.09px]">
        {/* BROKEN LINE 1: exactly 110.09px below logos, exactly 58px above the card */}
        <div className="absolute top-0 left-0 right-0 w-full pointer-events-none z-0">
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

        {/* BROKEN LINE 2: 72.44px below the bottom of the card (58 + 197.56 + 72.44 = 328px) */}
        <div className="absolute top-[328px] left-0 right-0 w-full pointer-events-none z-0">
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

        {/* BROKEN LINE 3: exactly 55px below Line 2 (328 + 55 = 383px) */}
        <div className="absolute top-[383px] left-0 right-0 w-full pointer-events-none z-0">
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

        {/* Content Row: exactly 58px below Broken Line 1 */}
        <div className="relative z-10 pt-[58px] flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          {/* Left: Value Proposition Text (28px font size, 33.6px line height) */}
          <div className="flex-1 max-w-[680px]">
            <p className="font-sans text-[28px] font-medium leading-[33.6px] tracking-normal text-[#0A0A0A]">
              <span className="text-[#F9429E] font-semibold">
                Coolors by Henry
              </span>{" "}
              is the premier color palette generator for creatives of all kinds.
              Generate stunning palettes on the fly, explore trending options,
              and extract colors from your favorite images. Ensure
              accessibility, preview on designs, and organize/export
              effortlessly. Now enhanced with cutting-edge AI!
            </p>
          </div>

          {/* Right: Color of the Day Card (532.41px width x 197.56px height, rounded 14px, #F2F2F2) */}
          <div className="w-full max-w-[532.41px] lg:w-[532.41px] h-[197.56px] rounded-[14px] bg-[#F2F2F2] flex items-center justify-center p-[13px] shrink-0">
            {/* Inner Dashed Card: 506px x 171px, rounded 14px, 1px dashed #D9D9D9 */}
            <div className="w-full h-full max-w-[506px] max-h-[171px] rounded-[14px] border border-dashed border-[#D9D9D9] p-4 sm:p-5 flex flex-col justify-between">
              {/* Card Header: Label + Educational Day Indicator */}
              <div className="flex items-center justify-between">
                <span className="w-[160.97px] h-[16px] flex flex-col justify-center text-[#0A0A0A] font-sans text-[16px] font-medium leading-[16px] tracking-[0.48px] uppercase">
                  Color of the day
                </span>
                <span className="text-[11px] font-sans font-semibold text-neutral-400 uppercase tracking-wider">
                  {activeColor.day}
                </span>
              </div>

              {/* Card Body: Swatch & Psychology Info */}
              <div className="flex items-center gap-4">
                {/* Colour Swatch + Hex */}
                <div
                  onClick={handleNextDay}
                  title="Click to discover tomorrow's color psychology!"
                  className="flex flex-col items-center gap-1 shrink-0 cursor-pointer group"
                >
                  <div
                    style={{ backgroundColor: activeColor.hex }}
                    className="w-[70px] h-[70px] rounded-[8px] shadow-[inset_0_0_0_1px_rgba(0,0,0,0.07)] transition-all duration-300 group-hover:scale-105 group-hover:shadow-md"
                  />
                  <span className="w-[65.15px] h-[15px] flex flex-col justify-center text-center text-[#0A0A0A] font-sans text-[14.9px] font-medium leading-[15px] uppercase">
                    {activeColor.hex}
                  </span>
                </div>

                {/* Colour Name & Psychological Description */}
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="font-serif text-[23.1px] font-extrabold text-[#0A0A0A] leading-[24px]">
                    {activeColor.name}
                  </h3>

                  <p className="w-full max-w-[366.59px] text-[#525252] font-sans text-[15.6px] font-medium leading-[19.2px] mt-1.5 transition-opacity duration-300">
                    {activeColor.psychology}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
