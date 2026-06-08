import React from "react";

interface LogoProps {
  variant?: "full" | "header" | "footer" | "mobile";
  className?: string;
  size?: number; // adjusts height/width scale
}

export const Logo: React.FC<LogoProps> = ({ variant = "header", className = "", size }) => {
  // Classic logo colors:
  // Cream: #FFFDF2
  // Black: #000000

  if (variant === "full") {
    // Elegant international agency identity: deep black container with cream text
    const boxSize = size || 180;
    return (
      <div
        style={{
          width: `${boxSize}px`,
          height: `${boxSize}px`,
          backgroundColor: "#000000",
        }}
        className={`flex items-center justify-center rounded-2xl p-6 shadow-xl select-none ${className}`}
      >
        <svg
          viewBox="0 0 200 200"
          className="w-full h-full"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* aura in lowercase - thin, circular geometric styling */}
          <text
            x="12"
            y="95"
            fill="#FFFDF2"
            style={{
              fontFamily: "'Comfortaa', 'Outfit', 'Inter', sans-serif",
              fontSize: "64px",
              fontWeight: 300,
              letterSpacing: "-0.04em",
            }}
          >
            aura
          </text>
          
          {/* Web - matching the offset on bottom row of the uploaded picture */}
          <text
            x="94"
            y="145"
            fill="#FFFDF2"
            style={{
              fontFamily: "'Comfortaa', 'Outfit', 'Inter', sans-serif",
              fontSize: "64px",
              fontWeight: 300,
              letterSpacing: "-0.04em",
            }}
          >
            Web
          </text>
        </svg>
      </div>
    );
  }

  if (variant === "header") {
    // Transparent / responsive inline brand logo for navbar headers using black badge and cream logomark
    return (
      <div className={`flex items-center gap-2 select-none ${className}`}>
        <div 
          className="w-9 h-9 rounded-xl flex items-center justify-center shadow-lg shadow-black/10 flex-shrink-0"
          style={{ backgroundColor: "#000000" }}
        >
          <span 
            className="text-lg font-bold" 
            style={{ 
              fontFamily: "'Comfortaa', 'Outfit', sans-serif", 
              color: "#FFFDF2",
              marginTop: "-1px"
            }}
          >
            a
          </span>
        </div>
        <div className="flex flex-col items-start leading-none">
          <span 
            className="font-display font-black text-lg tracking-wider text-black block leading-none"
            style={{ 
              fontFamily: "'Outfit', 'Inter', sans-serif",
            }}
          >
            AURA
          </span>
          <span 
            className="text-[9px] tracking-widest uppercase font-bold font-mono text-slate-800 block"
            style={{
              letterSpacing: "0.2em"
            }}
          >
            WEB
          </span>
        </div>
      </div>
    );
  }

  if (variant === "footer") {
    // High-contrast clean black and cream version for dark footers (or light elements on dark background)
    return (
      <div className={`flex items-center gap-2 select-none ${className}`}>
        <div 
          className="w-9 h-9 rounded-xl flex items-center justify-center border border-white/10"
          style={{ backgroundColor: "#000000" }}
        >
          <span 
            className="text-lg font-bold" 
            style={{ 
              fontFamily: "'Comfortaa', 'Outfit', sans-serif", 
              color: "#FFFDF2",
              marginTop: "-1px"
            }}
          >
            a
          </span>
        </div>
        <div className="flex flex-col items-start leading-none">
          <span className="font-display font-bold text-lg tracking-tight text-white">AURA WEB</span>
          <span className="text-[8px] font-mono tracking-widest text-[#FFFDF2] font-bold">DIGITAL PLATFORM</span>
        </div>
      </div>
    );
  }

  // Mobile version
  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      <div 
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: "#000000" }}
      >
        <span 
          className="text-sm font-bold" 
          style={{ 
            fontFamily: "'Comfortaa', 'Outfit', sans-serif", 
            color: "#FFFDF2",
            marginTop: "-1px"
          }}
        >
          a
        </span>
      </div>
      <span className="font-display font-bold text-base text-black block leading-none">AURA WEB</span>
    </div>
  );
};
