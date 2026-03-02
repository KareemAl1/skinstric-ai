"use client";
import { useState } from "react";
import Link from "next/link";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

export default function Home() {
  const [hovered, setHovered] = useState<"left" | "right" | null>(null);

  return (
    <main className="fixed inset-0 overflow-hidden" style={{ backgroundColor: "#FCFCFC" }}>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-in {
          animation: fadeIn 0.9s ease forwards;
        }
        .fade-in-slow {
          animation: fadeIn 1.2s ease forwards;
          animation-delay: 0.2s;
          opacity: 0;
        }
        .fade-in-slower {
          animation: fadeIn 1.4s ease forwards;
          animation-delay: 0.4s;
          opacity: 0;
        }
        .hero-wrapper {
          transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hero-wrapper.hover-right {
          transform: translateX(-20vw);
        }
        .hero-wrapper.hover-left {
          transform: translateX(20vw);
        }
        .hero-wrapper.idle {
          transform: translateX(0);
        }
      `}</style>

      {/* Navbar */}
      <nav className="fade-in absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-5 z-10">
        <div className="flex items-center gap-3">
          <span style={{ fontWeight: 600, fontSize: 14, letterSpacing: "-0.02em" }} className="uppercase">SKINSTRIC</span>
          <span style={{ fontSize: 14, letterSpacing: "-0.02em", opacity: 0.6 }} className="uppercase">[ INTRO ]</span>
        </div>
        <button style={{ backgroundColor: "#1A1B1C", color: "#FCFCFC", fontSize: 10, letterSpacing: "-0.02em", padding: "8px 16px", border: "none", cursor: "pointer" }} className="uppercase">
          ENTER CODE
        </button>
      </nav>

      {/* Left diamond */}
      {hovered !== "right" && (
        <div
          className="fade-in fixed top-1/2 pointer-events-none"
          style={{
            left: "-53vw",
            width: 500,
            height: 500,
            border: "1.5px dashed #A0A4AB",
            transform: "translateY(-50%) rotate(45deg)",
          }}
        />
      )}

      {/* Right diamond */}
      {hovered !== "left" && (
        <div
          className="fade-in fixed top-1/2 pointer-events-none"
          style={{
            right: "-53vw",
            width: 500,
            height: 500,
            border: "1.5px dashed #A0A4AB",
            transform: "translateY(-50%) rotate(45deg)",
          }}
        />
      )}

      {/* Hero Text — exact reference values */}
      <div className="fade-in-slow absolute inset-0 flex items-center justify-center">
        <div
          className={`hero-wrapper ${
            hovered === "right" ? "hover-right" :
            hovered === "left"  ? "hover-left"  :
            "idle"
          }`}
        >
          <h1
            style={{
              fontSize: 100,
              fontWeight: 400,
              letterSpacing: "-0.05em",
              color: "#1A1B1C",
              textAlign: "center",
              lineHeight: 1,
              whiteSpace: "nowrap",
            }}
          >
            Sophisticated<br />skincare
          </h1>
        </div>
      </div>

      {/* Bottom left description */}
      <div className="fade-in-slower absolute uppercase" style={{ bottom: 32, left: 32, fontSize: 11, lineHeight: "20px", color: "#1A1B1C", maxWidth: 200 }}>
        SKINSTRIC DEVELOPED AN A.I. THAT CREATES A HIGHLY-PERSONALISED ROUTINE TAILORED TO WHAT YOUR SKIN NEEDS.
      </div>

      {/* Discover A.I. */}
      {hovered !== "right" && (
        <div
          className="fade-in-slow absolute flex items-center gap-4 cursor-pointer"
          style={{ left: 32, top: "50%", transform: "translateY(-50%)", color: "#1A1B1C" }}
          onMouseEnter={() => setHovered("left")}
          onMouseLeave={() => setHovered(null)}
        >
          <div className="rotate-45 flex items-center justify-center"
            style={{ width: 44, height: 44, border: "1px solid #1A1B1C" }}>
            <FaAngleLeft className="-rotate-45" style={{ fontSize: 14 }} />
          </div>
          <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.02em", opacity: 0.7 }} className="uppercase">DISCOVER A.I.</span>
        </div>
      )}

      {/* Take Test */}
      {hovered !== "left" && (
        <Link
          href="/introduction"
          className="fade-in-slow absolute flex items-center gap-4 no-underline"
          style={{ right: 32, top: "50%", transform: "translateY(-50%)", color: "#1A1B1C" }}
          onMouseEnter={() => setHovered("right")}
          onMouseLeave={() => setHovered(null)}
        >
          <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.02em", opacity: 0.7 }} className="uppercase">TAKE TEST</span>
          <div className="rotate-45 flex items-center justify-center"
            style={{ width: 44, height: 44, border: "1px solid #1A1B1C" }}>
            <FaAngleRight className="-rotate-45" style={{ fontSize: 14 }} />
          </div>
        </Link>
      )}

    </main>
  );
}