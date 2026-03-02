"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

export default function Location() {
  const [location, setLocation] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    if (!location.trim()) return;
    try {
      await fetch("https://us-central1-frontend-simplified.cloudfunctions.net/skinstricPhaseOne", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ location: location.trim() }),
      });
    } catch (err) {
      console.error(err);
    }
    router.push("/testing");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <main className="fixed inset-0 overflow-hidden" style={{ backgroundColor: "#FCFCFC" }}>

      <style>{`
        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(45deg); }
          to   { transform: translate(-50%, -50%) rotate(405deg); }
        }
        @keyframes spinReverse {
          from { transform: translate(-50%, -50%) rotate(45deg); }
          to   { transform: translate(-50%, -50%) rotate(-315deg); }
        }
        .ds1 {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
          animation: spin 60s linear infinite;
        }
        .ds2 {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
          animation: spinReverse 45s linear infinite;
        }
        .ds3 {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
          animation: spin 30s linear infinite;
        }
      `}</style>

      {/* Navbar */}
      <nav className="absolute top-0 left-0 p-8 z-10">
        <div className="flex items-center gap-3">
          <span style={{ fontWeight: 600, fontSize: 14, letterSpacing: "-0.02em" }} className="uppercase">SKINSTRIC</span>
          <span style={{ fontSize: 14, letterSpacing: "-0.02em", opacity: 0.6 }} className="uppercase">[ INTRO ]</span>
        </div>
        <p style={{ fontWeight: 600, fontSize: 16, letterSpacing: "-0.02em", color: "#1A1B1C" }} className="uppercase mt-2">
          WHERE ARE YOU FROM
        </p>
      </nav>

      {/* Background spinning diamonds */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative" style={{ width: 600, height: 600 }}>
          <div className="ds1" style={{ width: 600, height: 600, border: "1.5px dashed #A0A4AB", opacity: 0.3 }} />
          <div className="ds2" style={{ width: 520, height: 520, border: "1.5px dashed #A0A4AB", opacity: 0.6 }} />
          <div className="ds3" style={{ width: 440, height: 440, border: "1.5px dashed #A0A4AB" }} />
        </div>
      </div>

      {/* Center input */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10">
        <p style={{ fontSize: 11, color: "#1A1B1C", opacity: 0.4, letterSpacing: "0.08em" }} className="uppercase">
          Click to type
        </p>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder="Introduce your location"
          className="bg-transparent outline-none text-center"
          style={{
            fontSize: 40,
            fontWeight: 300,
            letterSpacing: "-0.03em",
            color: location ? "#1A1B1C" : "#A0A4AB",
            borderBottom: `1px solid ${isFocused || location ? "#1A1B1C" : "#A0A4AB"}`,
            paddingBottom: 8,
            width: 500,
            transition: "border-color 0.2s ease",
          }}
        />
      </div>

      {/* Back */}
      <Link href="/introduction" className="absolute flex items-center gap-4 no-underline z-10"
        style={{ left: 32, bottom: 80, color: "#1A1B1C" }}>
        <div className="rotate-45 flex items-center justify-center"
          style={{ width: 44, height: 44, border: "1px solid #1A1B1C" }}>
          <FaAngleLeft className="-rotate-45" style={{ fontSize: 14 }} />
        </div>
        <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.02em", opacity: 0.7 }} className="uppercase">BACK</span>
      </Link>

      {/* Next */}
      {location.trim() && (
        <button onClick={handleSubmit} className="absolute flex items-center gap-4 cursor-pointer z-10"
          style={{ right: 32, bottom: 80, color: "#1A1B1C", background: "none", border: "none" }}>
          <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.02em", opacity: 0.7 }} className="uppercase">NEXT</span>
          <div className="rotate-45 flex items-center justify-center"
            style={{ width: 44, height: 44, border: "1px solid #1A1B1C" }}>
            <FaAngleRight className="-rotate-45" style={{ fontSize: 14 }} />
          </div>
        </button>
      )}

    </main>
  );
}