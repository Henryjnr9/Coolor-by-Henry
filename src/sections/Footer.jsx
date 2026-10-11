export default function Footer() {
  const footerColors = [
    { hex: "#000000", name: "Black", textDark: false },
    { hex: "#FFFFFF", name: "White", textDark: true },
    { hex: "#B7B09C", name: "Warm Taupe", textDark: false },
    { hex: "#FF7A00", name: "Amber Orange", textDark: false },
    { hex: "#F0131E", name: "Crimson Red", textDark: false },
  ];

  return (
    <footer className="w-full h-64 sm:h-80 grid grid-cols-2 sm:grid-cols-5 font-sans relative overflow-hidden">
      {/* 5 Color Columns */}
      {footerColors.map((col, index) => (
        <div
          key={index}
          style={{ backgroundColor: col.hex }}
          className="relative h-full flex flex-col justify-end p-6 select-none"
        >
          {/* First column shows Hex + Black name label */}
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

          {/* Last column has the copyright */}
          {index === 4 && (
            <div className="absolute bottom-6 right-6 text-white text-xs sm:text-sm font-medium whitespace-nowrap opacity-90">
              Coolors by Henry 2026
            </div>
          )}
        </div>
      ))}
    </footer>
  );
}
