"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AnalysisLoading() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push("/analysis"), 3000);
    return () => clearTimeout(timer);
  }, [router]);

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

      <div className="fade-in absolute inset-0 flex items-center justify-center">
        <div className="relative" style={{ width: 380, height: 380 }}>
          <div className="d1" style={{ width: 360, height: 360, border: "1.5px dashed #A0A4AB", opacity: 0.3 }} />
          <div className="d2" style={{ width: 320, height: 320, border: "1.5px dashed #A0A4AB", opacity: 0.6 }} />
          <div className="d3" style={{ width: 280, height: 280, border: "1.5px dashed #A0A4AB" }} />
          <div className="absolute top-1/2 left-1/2 text-center" style={{ transform: "translate(-50%, -50%)", whiteSpace: "nowrap" }}>
            <p style={{ fontSize: 14, fontWeight: 400, letterSpacing: "0.04em", color: "#1A1B1C" }} className="uppercase">
              Preparing your analysis ...
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}