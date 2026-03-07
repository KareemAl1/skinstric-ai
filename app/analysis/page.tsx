"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

export default function Analysis() {
  const router = useRouter();

  return (
    <main className="fixed inset-0 overflow-hidden" style={{ backgroundColor: "#FCFCFC" }}>

      <style>{`
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        .fade-in { animation: fadeIn 0.5s ease forwards; }
        .diamond-tile {
          position: absolute;
          width: 260px;
          height: 260px;
          background: #EBEBEB;
          transform: rotate(45deg);
          cursor: pointer;
          transition: background 0.2s ease;
        }
        .diamond-tile:hover { background: #D8D8D8; }
        .tile-label {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          pointer-events: none;
          z-index: 2;
        }
      `}</style>

      {/* Navbar */}
      <nav className="absolute top-0 left-0 z-10" style={{ padding: "28px 32px" }}>
        <div className="flex items-center gap-3">
          <span style={{ fontWeight: 600, fontSize: 13, letterSpacing: "0.01em", color: "#1A1B1C" }} className="uppercase">SKINSTRIC</span>
          <span style={{ fontSize: 13, letterSpacing: "0.01em", color: "#1A1B1C", opacity: 0.5 }} className="uppercase">[ ANALYSIS ]</span>
        </div>
        <p style={{ fontWeight: 600, fontSize: 13, letterSpacing: "0.01em", color: "#1A1B1C", marginTop: 20 }} className="uppercase">
          A. I. ANALYSIS
        </p>
        <p style={{ fontSize: 11, color: "#1A1B1C", opacity: 0.5, letterSpacing: "0.04em", marginTop: 4 }} className="uppercase">
          A. I. HAS ESTIMATED THE FOLLOWING.<br />
          FIX ESTIMATED INFORMATION IF NEEDED.
        </p>
      </nav>

      {/* Diamond grid */}
      <div className="fade-in absolute inset-0 flex items-center justify-center">
        <div className="relative" style={{ width: 560, height: 560 }}>

          {/* TOP — Demographics */}
          <div
            className="diamond-tile"
            style={{ top: 0, left: "50%", transform: "translateX(-50%) rotate(45deg)" }}
            onClick={() => router.push("/demographics")}
          />
          <div className="tile-label" style={{ top: 16, left: "50%", transform: "translateX(-50%)", width: 184, height: 184 }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", color: "#1A1B1C" }} className="uppercase">Demographics</span>
          </div>

          {/* LEFT — Skin Type Details */}
          <div className="diamond-tile" style={{ top: "50%", left: 0, transform: "translateY(-50%) rotate(45deg)" }} />
          <div className="tile-label" style={{ top: "50%", left: 16, transform: "translateY(-50%)", width: 184, height: 184 }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", color: "#1A1B1C", textAlign: "center" }} className="uppercase">Skin Type<br />Details</span>
          </div>

          {/* RIGHT — Cosmetic Concerns */}
          <div className="diamond-tile" style={{ top: "50%", right: 0, transform: "translateY(-50%) rotate(45deg)" }} />
          <div className="tile-label" style={{ top: "50%", right: 16, transform: "translateY(-50%)", width: 184, height: 184 }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", color: "#1A1B1C", textAlign: "center" }} className="uppercase">Cosmetic<br />Concerns</span>
          </div>

          {/* BOTTOM — Weather */}
          <div className="diamond-tile" style={{ bottom: 0, left: "50%", transform: "translateX(-50%) rotate(45deg)" }} />
          <div className="tile-label" style={{ bottom: 16, left: "50%", transform: "translateX(-50%)", width: 184, height: 184 }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", color: "#1A1B1C" }} className="uppercase">Weather</span>
          </div>

        </div>
      </div>

      {/* Back */}
      <Link href="/testing" className="absolute flex items-center gap-4 no-underline z-10"
        style={{ left: 32, bottom: 32, color: "#1A1B1C" }}>
        <div className="rotate-45 flex items-center justify-center"
          style={{ width: 40, height: 40, border: "1px solid #1A1B1C" }}>
          <FaAngleLeft className="-rotate-45" style={{ fontSize: 13 }} />
        </div>
        <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: "-0.01em", opacity: 0.7 }} className="uppercase">BACK</span>
      </Link>

      {/* Get Summary */}
      <button className="absolute flex items-center gap-4 cursor-pointer z-10"
        style={{ right: 32, bottom: 32, color: "#1A1B1C", background: "none", border: "none" }}>
        <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: "-0.01em", opacity: 0.7 }} className="uppercase">GET SUMMARY</span>
        <div className="rotate-45 flex items-center justify-center"
          style={{ width: 40, height: 40, border: "1px solid #1A1B1C" }}>
          <FaAngleRight className="-rotate-45" style={{ fontSize: 13 }} />
        </div>
      </button>

    </main>
  );
}