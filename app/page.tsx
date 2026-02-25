"use client";
import { useState } from "react";
import Link from "next/link";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

export default function Home() {
  const [hovered, setHovered] = useState<"left" | "right" | null>(null);

  return (
    <main style={{ position: "fixed", inset: 0, backgroundColor: "#f5f5f5", overflow: "hidden", fontFamily: "sans-serif" }}>

      {/* Navbar */}
      <nav style={{ position: "absolute", top: 0, left: 0, right: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.15em" }}>SKINSTRIC</span>
          <span style={{ fontSize: 11, letterSpacing: "0.15em", color: "#aaa" }}>[ INTRO ]</span>
        </div>
        <button style={{ backgroundColor: "black", color: "white", fontSize: 10, letterSpacing: "0.15em", padding: "8px 16px", border: "none", cursor: "pointer" }}>
          ENTER CODE
        </button>
      </nav>

      {/* Left side lines - hide when hovering right */}
      {hovered !== "right" && (
        <>
          <svg style={{ position: "absolute", top: 0, left: 0, width: "45vw", height: "45vh", pointerEvents: "none" }}>
            <line x1="0" y1="0" x2="100%" y2="100%" stroke="#ccc" strokeWidth="1" strokeDasharray="4,4" />
          </svg>
          <svg style={{ position: "absolute", bottom: 0, left: 0, width: "45vw", height: "45vh", pointerEvents: "none" }}>
            <line x1="0" y1="100%" x2="100%" y2="0" stroke="#ccc" strokeWidth="1" strokeDasharray="4,4" />
          </svg>
        </>
      )}

      {/* Right side lines - hide when hovering left */}
      {hovered !== "left" && (
        <>
          <svg style={{ position: "absolute", top: 0, right: 0, width: "45vw", height: "45vh", pointerEvents: "none" }}>
            <line x1="100%" y1="0" x2="0" y2="100%" stroke="#ccc" strokeWidth="1" strokeDasharray="4,4" />
          </svg>
          <svg style={{ position: "absolute", bottom: 0, right: 0, width: "45vw", height: "45vh", pointerEvents: "none" }}>
            <line x1="0" y1="0" x2="100%" y2="100%" stroke="#ccc" strokeWidth="1" strokeDasharray="4,4" />
          </svg>
        </>
      )}

      {/* Hero Text */}
      <div style={{
        position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center",
        transform: hovered === "right" ? "translateX(-180px)" : hovered === "left" ? "translateX(180px)" : "translateX(0)",
        transition: "transform 0.5s ease"
      }}>
        <h1 style={{
          fontSize: hovered ? "7rem" : "6rem",
          fontWeight: 100,
          lineHeight: 1.1,
          textAlign: "center",
          letterSpacing: "-0.02em",
          transition: "font-size 0.5s ease"
        }}>
          Sophisticated<br />skincare
        </h1>
      </div>

      {/* Bottom left description */}
      <div style={{ position: "absolute", bottom: 24, left: 24, fontSize: 9, letterSpacing: "0.1em", color: "#999", maxWidth: 200, lineHeight: 2 }}>
        SKINSTRIC DEVELOPED AN A.I. THAT CREATES A HIGHLY-PERSONALISED ROUTINE TAILORED TO WHAT YOUR SKIN NEEDS.
      </div>

      {/* Discover A.I. - left - hide when hovering right */}
      {hovered !== "right" && (
        <div
          style={{ position: "absolute", left: 24, top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}
          onMouseEnter={() => setHovered("left")}
          onMouseLeave={() => setHovered(null)}
        >
          <div style={{ width: 28, height: 28, border: "1px solid black", transform: "rotate(45deg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <FaAngleLeft style={{ transform: "rotate(-45deg)", fontSize: 12 }} />
          </div>
          <span style={{ fontSize: 10, letterSpacing: "0.15em" }}>DISCOVER A.I.</span>
        </div>
      )}

      {/* Take Test - right - hide when hovering left */}
      {hovered !== "left" && (
        <Link
          href="/introduction"
          style={{ position: "absolute", right: 24, top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", textDecoration: "none", color: "black" }}
          onMouseEnter={() => setHovered("right")}
          onMouseLeave={() => setHovered(null)}
        >
          <span style={{ fontSize: 10, letterSpacing: "0.15em" }}>TAKE TEST</span>
          <div style={{ width: 28, height: 28, border: "1px solid black", transform: "rotate(45deg)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <FaAngleRight style={{ transform: "rotate(-45deg)", fontSize: 12 }} />
          </div>
        </Link>
      )}

    </main>
  );
}