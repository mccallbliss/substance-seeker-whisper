
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const SubstanceSeeker = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showSecret, setShowSecret] = useState(false);
  const [showFootnote, setShowFootnote] = useState(false);
  const [konami, setKonami] = useState([]);
  const [substanceStyle, setSubstanceStyle] = useState(0);
  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];

  // Track mouse position
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Handle key presses for konami code
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newKonami = [...konami, e.key];
      if (newKonami.length > konamiCode.length) {
        newKonami.shift();
      }
      setKonami(newKonami);

      // Check if konami code is entered
      if (
        newKonami.length === konamiCode.length &&
        newKonami.every((key, index) => key === konamiCode[index])
      ) {
        document.documentElement.style.filter = "invert(1)";
        setTimeout(() => {
          document.documentElement.style.filter = "none";
        }, 1000);
      }

      // Show footnote on 'f' key
      if (e.key === "f") {
        setShowFootnote(true);
        setTimeout(() => setShowFootnote(false), 3000);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [konami]);

  // Create a subtle mouse-following effect
  useEffect(() => {
    const handleMouseMoveSpecial = (e: MouseEvent) => {
      // Show secret when mouse is in top-right corner
      if (e.clientX > window.innerWidth - 50 && e.clientY < 50) {
        setShowSecret(true);
      } else {
        setShowSecret(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMoveSpecial);
    return () => window.removeEventListener("mousemove", handleMouseMoveSpecial);
  }, []);

  // New effect for animating "substance" text
  useEffect(() => {
    const interval = setInterval(() => {
      setSubstanceStyle((prev) => (prev + 1) % 5);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Style variations for "substance"
  const getSubstanceStyle = () => {
    switch (substanceStyle) {
      case 0:
        return "font-mono text-lg font-bold text-black";
      case 1:
        return "font-serif italic text-xl text-purple-600";
      case 2:
        return "font-sans text-lg font-light tracking-widest text-blue-700";
      case 3:
        return "font-mono text-sm uppercase font-extrabold tracking-tight text-red-500";
      case 4:
        return "font-serif text-2xl font-normal text-emerald-600 italic";
      default:
        return "text-black";
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-white px-4 select-none">
      {/* Main content */}
      <div className="relative max-w-lg w-full">
        <h1 className="text-2xl font-normal text-black mb-8 spaced-letters animate-fade-in">
          are you looking for substance?
        </h1>
        
        <a
          href="https://sl.cmdshft.com/substance"
          className="text-black text-lg underline decoration-dashed underline-offset-4 opacity-90 hover:opacity-100 transition-opacity duration-300"
          rel="noopener noreferrer"
          aria-label="Find substance"
        >
          perhaps <span className={`transition-all duration-700 ${getSubstanceStyle()}`}>substance</span>
        </a>
        
        {/* Click and hold easter egg */}
        <div 
          className="absolute left-1/2 -bottom-24 transform -translate-x-1/2 text-xs text-black opacity-0 hover:opacity-5 transition-opacity duration-300"
          onMouseDown={() => console.log("You've found something.")}
          title="Hold me"
        >
          what is substance anyway?
        </div>
      </div>

      {/* Hidden corner secret */}
      {showSecret && (
        <div className="fixed top-2 right-2 text-xs animate-fade-in hidden-text">
          there's more than meets the eye
        </div>
      )}

      {/* Invisible text scattered around */}
      <div className="fixed bottom-2 left-4 text-[0.6rem] invisible-ink">
        void.substance = true;
      </div>
      
      <div className="fixed top-1/4 right-1/4 text-[0.6rem] invisible-ink" onClick={() => console.log("Easter egg found: void")}>
        void.null.undefined
      </div>

      {/* Shows on double click anywhere */}
      <div 
        className="fixed inset-0 z-[-1]" 
        onDoubleClick={(e) => {
          const element = document.createElement("div");
          element.className = "absolute text-[0.7rem] animate-fade-out text-black opacity-20";
          element.style.left = `${e.clientX}px`;
          element.style.top = `${e.clientY}px`;
          element.innerText = "substance leaks";
          document.body.appendChild(element);
          setTimeout(() => document.body.removeChild(element), 2000);
        }}
      />

      {/* Footer note appears on 'f' key */}
      {showFootnote && (
        <div className="fixed bottom-4 text-center w-full text-xs animate-fade-in text-black opacity-30">
          footnote: substance is neither created nor destroyed
        </div>
      )}

      {/* Hidden message that appears in source code only */}
      {/* <!-- 
        looking at source code?
        here's another clue: try typing "void" in the console 
      --> */}
      <script dangerouslySetInnerHTML={{ __html: `
        console.log("%cCurious about substance?", "font-size: 14px; color: black;");
        window.void = function() { 
          console.log("%cSubstance exists in the spaces between things.", "font-style: italic; color: #333;");
        };
      `}} />
    </div>
  );
};

export default SubstanceSeeker;
