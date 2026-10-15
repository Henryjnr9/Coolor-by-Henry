export default function SimplifyCTA() {
  return (
    <section className="relative w-full pt-[152px] pb-24 font-sans select-none text-center">
      {/* Scoped Animations for Logo Floating & Arrow Dash Flow */}
      <style>{`
        @keyframes subtleFloatA {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes subtleFloatB {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes flowDashes {
          to { stroke-dashoffset: -24; }
        }
        .animate-float-Huewises {
          animation: subtleFloatA 4s ease-in-out infinite;
        }
        .animate-float-figma {
          animation: subtleFloatB 4s ease-in-out infinite 0.8s;
        }
        .animate-arrow-flow {
          animation: flowDashes 1.2s linear infinite;
        }
      `}</style>

      {/* 1. Header: 64px, 700 weight, 95px leading, Roslindale */}
      <h2 className="font-serif font-bold text-4xl sm:text-5xl lg:text-[64px] lg:leading-[95px] text-black tracking-normal">
        Simplify your Design process
      </h2>

      {/* 2. Subtext: 24px, 400 weight, SF Pro Rounded */}
      <p className="mt-2 text-black font-sans text-lg sm:text-[24px] font-normal leading-normal text-center">
        Solve design challenges with perfect colours
      </p>

      {/* 3. Logo to Figma Container: exactly 88px below subtext, width: 470px */}
      <div className="mt-[88px] w-full max-w-[470px] mx-auto flex items-center justify-between">
        {/* Huewises App Icon: width 127px, height 127px, gentle float */}
        <div className="animate-float-Huewises shrink-0 w-[127px] h-[127px] rounded-[38px] overflow-hidden flex shadow-sm border border-black/5 hover:scale-105 transition-transform duration-300">
          <div className="w-1/3 h-full bg-[#C0F]"></div>
          <div className="w-1/3 h-full bg-[#00F5D4]"></div>
          <div className="w-1/3 h-full bg-[#FF2A00]"></div>
        </div>

        {/* Dashed Connecting Arrow: width 126px, animated flowing dashes */}
        <div className="w-[126px] flex items-center justify-center shrink-0">
          <svg
            width="126"
            height="12"
            viewBox="0 0 126 12"
            fill="none"
            className="w-[126px]"
          >
            <line
              x1="0"
              y1="6"
              x2="118"
              y2="6"
              stroke="#D9D9D9"
              strokeWidth="2"
              strokeDasharray="6 6"
              className="animate-arrow-flow"
            />
            <path
              d="M116 1L122 6L116 11"
              stroke="#D9D9D9"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Figma Official App Box: width 127px, height 127px, exact SVG markup */}
        <div className="animate-float-figma shrink-0 w-[127px] h-[127px] hover:scale-105 transition-transform duration-300 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="127"
            height="127"
            viewBox="0 0 127 127"
            fill="none"
            className="w-[127px] h-[127px] aspect-square"
          >
            <g clipPath="url(#clip0_figma_box)">
              <path
                d="M97.2344 0H29.7656C13.3265 0 0 13.3265 0 29.7656V97.2344C0 113.673 13.3265 127 29.7656 127H97.2344C113.673 127 127 113.673 127 97.2344V29.7656C127 13.3265 113.673 0 97.2344 0Z"
                fill="#F4F2ED"
              />
              <mask
                id="mask0_figma_box"
                style={{ maskType: "luminance" }}
                maskUnits="userSpaceOnUse"
                x="30"
                y="13"
                width="67"
                height="101"
              >
                <path
                  d="M30.2617 13.8906H96.4208V113.109H30.2617V13.8906Z"
                  fill="white"
                />
              </mask>
              <g mask="url(#mask0_figma_box)">
                <path
                  d="M46.8049 113.111C55.933 113.111 63.3412 105.703 63.3412 96.5744V80.0376H46.8049C37.6768 80.0376 30.2681 87.4463 30.2681 96.5744C30.2681 105.703 37.6768 113.111 46.8049 113.111Z"
                  fill="#0ACF83"
                />
                <path
                  d="M30.2681 63.4987C30.2681 54.3706 37.6768 46.9624 46.8049 46.9624H63.3412V80.035H46.8049C37.6768 80.035 30.2681 72.6268 30.2681 63.4987Z"
                  fill="#A259FF"
                />
                <path
                  d="M30.2681 30.4269C30.2681 21.2988 37.6768 13.8906 46.8049 13.8906H63.3412V46.9637H46.8049C37.6768 46.9637 30.2681 39.555 30.2681 30.4269Z"
                  fill="#F24E1E"
                />
                <path
                  d="M63.3412 13.8906H79.8775C89.0056 13.8906 96.4143 21.2988 96.4143 30.4269C96.4143 39.555 89.0056 46.9637 79.8775 46.9637H63.3412V13.8906Z"
                  fill="#FF7262"
                />
                <path
                  d="M96.4143 63.4987C96.4143 72.6268 89.0056 80.035 79.8775 80.035C70.7494 80.035 63.3412 72.6268 63.3412 63.4987C63.3412 54.3706 70.7494 46.9624 79.8775 46.9624C89.0056 46.9624 96.4143 54.3706 96.4143 63.4987Z"
                  fill="#1ABCFE"
                />
              </g>
            </g>
            <defs>
              <clipPath id="clip0_figma_box">
                <rect width="127" height="127" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>

      {/* 4. Install for Figma Button: padding 14px 28px, gap: 10px, radius: 36px, bg: #C0F */}
      <div className="mt-14 flex justify-center">
        <a
          href="https://figma.com"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center justify-center px-[28px] py-[14px] gap-[10px] rounded-[36px] bg-[#C0F] hover:bg-[#a800e0] text-white font-sans text-[20px] font-semibold leading-normal tracking-[-0.08px] transition-all shadow-sm hover:shadow hover:-translate-y-0.5 active:scale-95 cursor-pointer"
        >
          {/* Exact Figma Icon: 24px x 24px, aspect-ratio 1/1 */}
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
      </div>
    </section>
  );
}
