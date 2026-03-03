"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa6";

export default function Testing() {
  const [ready, setReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleCameraClick = () => {
    router.push("/camera-permission");
  };

  const handleGalleryClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = () => router.push("/analysis-loading");
    input.click();
  };

  return (
    <main className="fixed inset-0 overflow-hidden" style={{ backgroundColor: "#FCFCFC" }}>
      <style>{`
        @keyframes spin { from { transform: translate(-50%,-50%) rotate(45deg); } to { transform: translate(-50%,-50%) rotate(405deg); } }
        @keyframes spinReverse { from { transform: translate(-50%,-50%) rotate(45deg); } to { transform: translate(-50%,-50%) rotate(-315deg); } }
        .d1 { position:absolute; top:50%; left:50%; animation: spin 60s linear infinite; }
        .d2 { position:absolute; top:50%; left:50%; animation: spinReverse 45s linear infinite; }
        .d3 { position:absolute; top:50%; left:50%; animation: spin 30s linear infinite; }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        .fade-in { animation: fadeIn 0.6s ease forwards; }
      `}</style>

      {/* Navbar */}
      <nav className="absolute top-0 left-0 p-8 z-10">
        <div className="flex items-center gap-3">
          <span style={{ fontWeight: 600, fontSize: 14, letterSpacing: "-0.02em" }} className="uppercase">SKINSTRIC</span>
          <span style={{ fontSize: 14, letterSpacing: "-0.02em", opacity: 0.6 }} className="uppercase">[ INTRO ]</span>
        </div>
        <p style={{ fontWeight: 600, fontSize: 16, letterSpacing: "-0.02em", color: "#1A1B1C" }} className="uppercase mt-2">
          TO START ANALYSIS
        </p>
      </nav>

      {!ready ? (

        /* LOADING */
        <div className="fade-in absolute inset-0 flex items-center justify-center">
          <div className="relative" style={{ width: 300, height: 300 }}>
            <div className="d1" style={{ width: 284, height: 284, border: "2px dashed #A0A4AB", opacity: 0.3 }} />
            <div className="d2" style={{ width: 262, height: 262, border: "2px dashed #A0A4AB", opacity: 0.6 }} />
            <div className="d3" style={{ width: 238, height: 238, border: "2px dashed #A0A4AB" }} />
            <div className="absolute top-1/2 left-1/2 text-center" style={{ transform: "translate(-50%,-50%)", whiteSpace: "nowrap" }}>
              <p style={{ fontSize: 20, fontWeight: 400, letterSpacing: "-0.03em" }}>Thank you!</p>
              <p style={{ fontSize: 13, opacity: 0.5, letterSpacing: "-0.02em", marginTop: 6 }}>Proceed for the next step</p>
            </div>
          </div>
        </div>

      ) : (

        /* SELECTION */
        <div className="fade-in absolute inset-0">

          {/* LEFT — Camera */}
          <div className="absolute cursor-pointer" style={{ left: "25%", top: "48%", transform: "translate(-50%,-50%)" }}
            onClick={handleCameraClick}>
            <div className="relative" style={{ width: 300, height: 300 }}>
              <div className="d1" style={{ width: 284, height: 284, border: "2px dashed #A0A4AB", opacity: 0.3 }} />
              <div className="d2" style={{ width: 262, height: 262, border: "2px dashed #A0A4AB", opacity: 0.6 }} />
              <div className="d3" style={{ width: 238, height: 238, border: "2px dashed #A0A4AB" }} />
              <div className="absolute top-1/2 left-1/2" style={{ transform: "translate(-50%,-50%)" }}>
                <svg width="120" height="120" viewBox="127 127 230 230" fill="none">
                  <circle cx="242" cy="242" r="115.571" stroke="#1A1B1C" strokeWidth="2"/>
                  <circle cx="242" cy="242" r="102" fill="#1A1B1C"/>
                  <path d="M274.668 209.412C266.315 201.038 254.763 195.857 242 195.857C239.047 195.857 236.158 196.134 233.359 196.665C238.134 204.563 255.58 232.255 258.941 237.18C259.593 238.137 260.753 236.236 267.778 222.693L274.668 209.412Z" fill="#FCFCFC"/>
                  <path d="M199.088 225.004C204.582 211.146 216.594 200.582 231.341 197.094C233.087 199.713 236.422 204.887 240.067 210.649L249.327 225.291H222.886C210.126 225.291 202.669 225.208 199.088 225.004Z" fill="#FCFCFC"/>
                  <path d="M205.869 270.703C199.602 262.825 195.857 252.85 195.857 242C195.857 236.801 196.717 231.803 198.302 227.14H213.167C230.552 227.14 230.948 227.167 230.327 228.329C229.095 230.634 210.824 262.262 205.869 270.703Z" fill="#FCFCFC"/>
                  <path d="M250.964 287.273C248.065 287.843 245.067 288.143 242 288.143C228.192 288.143 215.8 282.077 207.344 272.465C209.171 268.405 213.929 259.932 222.172 246.011C222.947 244.701 223.732 243.781 223.917 243.966C224.102 244.15 230.604 254.52 238.367 267.008L250.964 287.273Z" fill="#FCFCFC"/>
                  <path d="M285.529 257.348C280.372 271.973 268.053 283.22 252.784 286.876C248.578 280.389 234.612 257.956 234.612 257.609C234.612 257.466 246.681 257.348 261.433 257.348H285.529Z" fill="#FCFCFC"/>
                  <path d="M275.902 210.697C283.5 218.922 288.143 229.919 288.143 242C288.143 246.923 287.372 251.666 285.944 256.115H270.596C260.624 256.115 252.465 255.965 252.465 255.78C252.465 255.4 272.437 217.016 275.902 210.697Z" fill="#FCFCFC"/>
                </svg>
              </div>
              <div className="absolute" style={{ top: "22%", left: "58%" }}>
                <svg width="90" height="45" viewBox="0 0 90 45" fill="none">
                  <line x1="0" y1="45" x2="90" y2="0" stroke="#1A1B1C" strokeWidth="0.75"/>
                  <circle cx="0" cy="45" r="2" fill="#1A1B1C"/>
                </svg>
                <p style={{ position: "absolute", top: -4, left: 94, fontSize: 10, letterSpacing: "0.04em", whiteSpace: "nowrap", lineHeight: 1.6 }} className="uppercase">
                  Allow A.I.<br/>to scan your face
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT — Gallery */}
          <div className="absolute cursor-pointer" style={{ left: "75%", top: "48%", transform: "translate(-50%,-50%)" }}
            onClick={handleGalleryClick}>
            <div className="relative" style={{ width: 300, height: 300 }}>
              <div className="d1" style={{ width: 284, height: 284, border: "2px dashed #A0A4AB", opacity: 0.3 }} />
              <div className="d2" style={{ width: 262, height: 262, border: "2px dashed #A0A4AB", opacity: 0.6 }} />
              <div className="d3" style={{ width: 238, height: 238, border: "2px dashed #A0A4AB" }} />
              <div className="absolute top-1/2 left-1/2" style={{ transform: "translate(-50%,-50%)" }}>
                <svg width="120" height="120" viewBox="132 127 230 230" fill="none">
                  <circle cx="247" cy="242" r="115.571" stroke="#1A1B1C" strokeWidth="2"/>
                  <circle cx="247" cy="242" r="100" fill="#FCFCFC" stroke="#1A1B1C" strokeWidth="4"/>
                  <circle cx="257.321" cy="229.25" r="12.75" fill="#1A1B1C"/>
                  <path fillRule="evenodd" clipRule="evenodd" d="M196 242C196 245.96 196.451 249.815 197.306 253.516C202.527 276.136 222.794 293 247 293C273.867 293 295.882 272.224 297.856 245.862C297.951 244.587 298 243.299 298 242C298 213.833 275.167 191 247 191C218.833 191 196 213.833 196 242ZM214.336 241.726L198.382 252.771C197.618 249.302 197.214 245.698 197.214 242C197.214 214.504 219.504 192.214 247 192.214C274.496 192.214 296.786 214.504 296.786 242C296.786 243.541 296.716 245.066 296.579 246.572L261.945 265.813C259.432 267.208 256.334 266.997 254.035 265.272L222.855 241.887C220.346 240.006 216.915 239.941 214.336 241.726Z" fill="#1A1B1C"/>
                </svg>
              </div>
              <div className="absolute" style={{ bottom: "22%", right: "58%" }}>
                <p style={{ position: "absolute", bottom: 47, right: 94, fontSize: 10, letterSpacing: "0.04em", whiteSpace: "nowrap", lineHeight: 1.6, textAlign: "right" }} className="uppercase">
                  Allow A.I.<br/>access gallery
                </p>
                <svg width="90" height="45" viewBox="0 0 90 45" fill="none">
                  <line x1="90" y1="0" x2="0" y2="45" stroke="#1A1B1C" strokeWidth="0.75"/>
                  <circle cx="90" cy="0" r="2" fill="#1A1B1C"/>
                </svg>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Back */}
      <Link href="/introduction/location" className="absolute flex items-center gap-4 no-underline z-10"
        style={{ left: 32, bottom: 80, color: "#1A1B1C" }}>
        <div className="rotate-45 flex items-center justify-center" style={{ width: 44, height: 44, border: "1px solid #1A1B1C" }}>
          <FaAngleLeft className="-rotate-45" style={{ fontSize: 14 }} />
        </div>
        <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.02em", opacity: 0.7 }} className="uppercase">BACK</span>
      </Link>

    </main>
  );
}