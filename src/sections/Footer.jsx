export default function Footer() {
  const footerColors = [
    { hex: "#000000", name: "Black", textDark: false },
    { hex: "#FFFFFF", name: "White", textDark: true },
    { hex: "#B7B09C", name: "Warm Taupe", textDark: false },
    { hex: "#FF7A00", name: "Amber Orange", textDark: false },
    { hex: "#F0131E", name: "Crimson Red", textDark: false },
  ];

  return (
    <footer className="w-full relative font-sans overflow-hidden">
      {/* 1. Large "Chromastine" Watermark: 225.34px, 900 weight, #EDEDED */}
      <div className="w-full overflow-hidden flex justify-center pt-8 pb-4 select-none pointer-events-none">
        <span className="text-[#EDEDED] font-sans font-black text-[80px] sm:text-[140px] lg:text-[225.34px] leading-none whitespace-nowrap">
          Chromastine
        </span>
      </div>

      {/* 2. 5-Color Full Width Palette Strips */}
      <div className="w-full h-64 sm:h-80 grid grid-cols-2 sm:grid-cols-5 relative overflow-hidden">
        {footerColors.map((col, index) => (
          <div
            key={index}
            style={{ backgroundColor: col.hex }}
            className="relative h-full flex flex-col justify-end p-6 select-none"
          >
            {/* Column 1: Hex 000000 & Black label */}
            {index === 0 && (
              <div className="text-white">
                <h4 className="font-mono text-2xl sm:text-3xl font-black tracking-wider mb-1">
                  000000
                </h4>
                <p className="text-xs sm:text-sm font-medium text-neutral-400">
                  Black
                </p>
              </div>
            )}

            {/* Column 5: Copyright mark */}
            {index === 4 && (
              <div className="absolute bottom-6 right-6 text-white text-xs sm:text-sm font-medium whitespace-nowrap opacity-90">
                Chromastine 2026
              </div>
            )}
          </div>
        ))}
      </div>
    </footer>
  );
}
