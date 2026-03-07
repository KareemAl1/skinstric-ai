"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

type Category = "race" | "age" | "gender";

const CATEGORY_LABELS: Record<Category, string> = {
  race: "RACE",
  age: "AGE",
  gender: "SEX",
};

const formatLabel = (key: string): string => {
  if (/^\d+_\d+$/.test(key)) return key.replace("_", "-");
  if (/^\d+\+?$/.test(key)) return key.includes("+") ? key : key + "+";
  return key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
};

const formatPercent = (val: number): string => {
  return Math.round(val * 100) + " %";
};

export default function Demographics() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState<Category>("race");
  const [data, setData] = useState<Record<string, Record<string, number>> | null>(null);
  const [selected, setSelected] = useState<Record<Category, string>>({
    race: "",
    age: "",
    gender: "",
  });

  useEffect(() => {
    const stored = localStorage.getItem("analysisData");
    if (stored) {
      const parsed = JSON.parse(stored);
      setData(parsed);
      const getTop = (obj: Record<string, number>) =>
        Object.entries(obj).sort((a, b) => b[1] - a[1])[0][0];
      setSelected({
        race: getTop(parsed.race),
        age: getTop(parsed.age),
        gender: getTop(parsed.gender),
      });
    }
  }, []);

  const handleReset = () => {
    const stored = localStorage.getItem("analysisData");
    if (stored) {
      const parsed = JSON.parse(stored);
      const getTop = (obj: Record<string, number>) =>
        Object.entries(obj).sort((a, b) => b[1] - a[1])[0][0];
      setSelected({
        race: getTop(parsed.race),
        age: getTop(parsed.age),
        gender: getTop(parsed.gender),
      });
    }
  };

  if (!data)
    return (
      <main className="fixed inset-0 flex items-center justify-center" style={{ backgroundColor: "#FCFCFC" }}>
        <p style={{ fontSize: 13, letterSpacing: "0.04em", opacity: 0.5 }} className="uppercase">Loading...</p>
      </main>
    );

  const currentData = data[activeCategory];
  const sorted = Object.entries(currentData).sort((a, b) => b[1] - a[1]);
  const selectedKey = selected[activeCategory] || sorted[0][0];
  const selectedVal = currentData[selectedKey] ?? sorted[0][1];
  const displayPercent = Math.round(selectedVal * 100);

  const radius = 155;
  const circumference = 2 * Math.PI * radius;
  const strokeDash = (displayPercent / 100) * circumference;

  const categories: Category[] = ["race", "age", "gender"];
  const HEADER_H = 180;

  return (
    <main className="fixed inset-0 overflow-hidden" style={{ backgroundColor: "#FCFCFC" }}>

      {/* Top nav */}
      <nav className="absolute top-0 left-0 right-0 z-10" style={{ padding: "28px 32px 0" }}>
        <div className="flex items-center gap-3">
          <span style={{ fontWeight: 600, fontSize: 13, letterSpacing: "0.01em", color: "#1A1B1C" }} className="uppercase">SKINSTRIC</span>
          <span style={{ fontSize: 13, letterSpacing: "0.01em", color: "#1A1B1C", opacity: 0.5 }} className="uppercase">[ ANALYSIS ]</span>
        </div>

        <p style={{ fontSize: 11, letterSpacing: "0.06em", color: "#1A1B1C", opacity: 0.5, marginTop: 16 }} className="uppercase">
          A.I. ANALYSIS
        </p>

        <h1 style={{ fontSize: 72, fontWeight: 700, letterSpacing: "-0.04em", color: "#1A1B1C", lineHeight: 0.9, marginTop: 0 }}>
          DEMOGRAPHICS
        </h1>

        <p style={{ fontSize: 11, letterSpacing: "0.06em", color: "#1A1B1C", opacity: 0.5, marginTop: 4 }} className="uppercase">
          PREDICTED RACE &amp; AGE
        </p>
      </nav>

      {/* Horizontal divider */}
      <div style={{ position: "absolute", left: 0, right: 0, top: HEADER_H, height: 1, backgroundColor: "#E0E0E0", zIndex: 5 }} />

      {/* Left sidebar */}
      <div className="absolute z-10" style={{ left: 0, top: HEADER_H, bottom: 0, width: 200, borderRight: "1px solid #E0E0E0" }}>
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          const catSelectedKey = selected[cat] || Object.entries(data[cat]).sort((a, b) => b[1] - a[1])[0][0];
          return (
            <div
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="cursor-pointer"
              style={{
                backgroundColor: isActive ? "#1A1B1C" : "transparent",
                borderBottom: "1px solid #E0E0E0",
                padding: "18px 24px",
              }}
            >
              <p style={{ fontSize: 13, fontWeight: 600, letterSpacing: "-0.01em", color: isActive ? "white" : "#1A1B1C", marginBottom: 3, lineHeight: 1 }} className="uppercase">
                {formatLabel(catSelectedKey)}
              </p>
              <p style={{ fontSize: 10, letterSpacing: "0.06em", color: isActive ? "rgba(255,255,255,0.5)" : "rgba(26,27,28,0.4)", lineHeight: 1 }} className="uppercase">
                {CATEGORY_LABELS[cat]}
              </p>
            </div>
          );
        })}
      </div>

      {/* Center */}
      <div className="absolute flex flex-col" style={{ left: 200, right: 360, top: HEADER_H, bottom: 0 }}>
        <div style={{ borderBottom: "1px solid #E0E0E0", padding: "18px 32px" }}>
          <p style={{ fontSize: 22, fontWeight: 300, letterSpacing: "-0.02em", color: "#1A1B1C", lineHeight: 1 }}>
            {formatLabel(selectedKey)}
            {activeCategory === "age" ? " y.o." : ""}
          </p>
        </div>

        <div className="flex-1 flex items-center justify-center">
          <div className="relative flex items-center justify-center">
            <svg width="360" height="360" viewBox="0 0 360 360">
              <circle cx="180" cy="180" r={radius} fill="none" stroke="#E0E0E0" strokeWidth="5" />
              <circle
                cx="180" cy="180" r={radius}
                fill="none" stroke="#1A1B1C" strokeWidth="5"
                strokeDasharray={`${strokeDash} ${circumference}`}
                strokeLinecap="butt"
                transform="rotate(-90 180 180)"
                style={{ transition: "stroke-dasharray 0.5s ease" }}
              />
            </svg>
            <div className="absolute flex items-end justify-center">
              <span style={{ fontSize: 56, fontWeight: 300, letterSpacing: "-0.04em", color: "#1A1B1C", lineHeight: 1 }}>
                {displayPercent}
              </span>
              <sup style={{ fontSize: 22, fontWeight: 300, color: "#1A1B1C", marginBottom: 10, marginLeft: 2 }}>%</sup>
            </div>
          </div>
        </div>
      </div>

      {/* Right sidebar */}
      <div className="absolute z-10" style={{ right: 0, top: HEADER_H, bottom: 0, width: 360, borderLeft: "1px solid #E0E0E0", overflowY: "auto" }}>
        <div className="flex justify-between items-center" style={{ padding: "18px 24px", borderBottom: "1px solid #E0E0E0" }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", color: "#1A1B1C", opacity: 0.5 }} className="uppercase">
            {CATEGORY_LABELS[activeCategory]}
          </span>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", color: "#1A1B1C", opacity: 0.5 }} className="uppercase">
            A. I. CONFIDENCE
          </span>
        </div>

        {sorted.map(([key, val]) => {
          const isSelected = selectedKey === key;
          return (
            <div
              key={key}
              onClick={() => setSelected((prev) => ({ ...prev, [activeCategory]: key }))}
              className="flex justify-between items-center cursor-pointer"
              style={{
                padding: "16px 24px",
                backgroundColor: isSelected ? "#1A1B1C" : "transparent",
                borderBottom: "1px solid #E0E0E0",
                transition: "background 0.15s ease",
              }}
            >
              <div className="flex items-center gap-3">
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M4 0L8 4L4 8L0 4Z" fill={isSelected ? "white" : "#1A1B1C"} opacity={isSelected ? 1 : 0.35} />
                </svg>
                <span style={{ fontSize: 12, color: isSelected ? "white" : "#1A1B1C", letterSpacing: "-0.01em" }}>
                  {formatLabel(key)}
                </span>
              </div>
              <span style={{ fontSize: 12, color: isSelected ? "white" : "#1A1B1C", letterSpacing: "-0.01em" }}>
                {formatPercent(val)}
              </span>
            </div>
          );
        })}
      </div>

      {/* Bottom caption */}
      <div className="absolute z-10" style={{ bottom: 52, left: "50%", transform: "translateX(-50%)", whiteSpace: "nowrap" }}>
        <p style={{ fontSize: 10, color: "#1A1B1C", opacity: 0.35, letterSpacing: "0.02em", textAlign: "center" }}>
          If A.I. estimate is wrong, select the correct one.
        </p>
      </div>

      {/* BACK */}
      <Link href="/analysis" className="absolute flex items-center gap-4 no-underline z-10" style={{ left: 32, bottom: 32, color: "#1A1B1C" }}>
        <div className="rotate-45 flex items-center justify-center" style={{ width: 40, height: 40, border: "1px solid #1A1B1C" }}>
          <FaAngleLeft className="-rotate-45" style={{ fontSize: 13 }} />
        </div>
        <span style={{ fontSize: 13, fontWeight: 600, letterSpacing: "-0.01em", opacity: 0.7 }} className="uppercase">BACK</span>
      </Link>

      {/* RESET */}
      <button
        onClick={handleReset}
        className="absolute z-10"
        style={{ right: 136, bottom: 32, color: "#1A1B1C", background: "none", border: "1px solid #1A1B1C", padding: "10px 22px", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", cursor: "pointer" }}
      >
        RESET
      </button>

      {/* CONFIRM */}
      <button
        onClick={() => router.push("/analysis")}
        className="absolute z-10"
        style={{ right: 32, bottom: 32, color: "white", background: "#1A1B1C", border: "1px solid #1A1B1C", padding: "10px 22px", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", cursor: "pointer" }}
      >
        CONFIRM
      </button>

    </main>
  );
}