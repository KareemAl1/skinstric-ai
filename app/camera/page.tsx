"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";

export default function Camera() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [shotTaken, setShotTaken] = useState(false);
  const router = useRouter();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      if (videoRef.current) videoRef.current.srcObject = stream;
    }).catch(console.error);

    return () => {
      if (videoRef.current?.srcObject) {
        (videoRef.current.srcObject as MediaStream).getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  const handleTakePicture = () => setShotTaken(true);

  return (
    <main className="fixed inset-0 overflow-hidden" style={{ backgroundColor: "#D8D5D0" }}>

      {/* Full screen camera feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 w-full h-full object-cover"
        style={{ transform: "scaleX(-1)" }}
      />

      {/* GREAT SHOT overlay */}
      {shotTaken && (
        <div className="absolute inset-0 flex items-start justify-center z-10" style={{ paddingTop: "28%" }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", color: "white" }} className="uppercase">
            Great shot!
          </p>
        </div>
      )}

      {/* Take picture button — right side */}
      {!shotTaken && (
        <div className="absolute right-12 top-1/2 z-10 flex flex-col items-center gap-3"
          style={{ transform: "translateY(-50%)" }}>
          <p style={{ fontSize: 9, letterSpacing: "0.1em", color: "white", opacity: 0.8 }} className="uppercase">
            Take picture
          </p>
          <button
            onClick={handleTakePicture}
            className="flex items-center justify-center rounded-full cursor-pointer"
            style={{ width: 56, height: 56, border: "2px solid white", background: "none" }}>
            <svg width="28" height="28" viewBox="127 127 230 230" fill="none">
              <circle cx="242" cy="242" r="115.571" stroke="white" strokeWidth="2"/>
              <circle cx="242" cy="242" r="102" fill="white"/>
              <path d="M274.668 209.412C266.315 201.038 254.763 195.857 242 195.857C239.047 195.857 236.158 196.134 233.359 196.665C238.134 204.563 255.58 232.255 258.941 237.18C259.593 238.137 260.753 236.236 267.778 222.693L274.668 209.412Z" fill="#1A1B1C"/>
              <path d="M199.088 225.004C204.582 211.146 216.594 200.582 231.341 197.094C233.087 199.713 236.422 204.887 240.067 210.649L249.327 225.291H222.886C210.126 225.291 202.669 225.208 199.088 225.004Z" fill="#1A1B1C"/>
              <path d="M205.869 270.703C199.602 262.825 195.857 252.85 195.857 242C195.857 236.801 196.717 231.803 198.302 227.14H213.167C230.552 227.14 230.948 227.167 230.327 228.329C229.095 230.634 210.824 262.262 205.869 270.703Z" fill="#1A1B1C"/>
              <path d="M250.964 287.273C248.065 287.843 245.067 288.143 242 288.143C228.192 288.143 215.8 282.077 207.344 272.465C209.171 268.405 213.929 259.932 222.172 246.011C222.947 244.701 223.732 243.781 223.917 243.966C224.102 244.15 230.604 254.52 238.367 267.008L250.964 287.273Z" fill="#1A1B1C"/>
              <path d="M285.529 257.348C280.372 271.973 268.053 283.22 252.784 286.876C248.578 280.389 234.612 257.956 234.612 257.609C234.612 257.466 246.681 257.348 261.433 257.348H285.529Z" fill="#1A1B1C"/>
              <path d="M275.902 210.697C283.5 218.922 288.143 229.919 288.143 242C288.143 246.923 287.372 251.666 285.944 256.115H270.596C260.624 256.115 252.465 255.965 252.465 255.78C252.465 255.4 272.437 217.016 275.902 210.697Z" fill="#1A1B1C"/>
            </svg>
          </button>
        </div>
      )}

      {/* Tips bottom center */}
      <div className="absolute bottom-12 left-1/2 text-center z-10" style={{ transform: "translateX(-50%)" }}>
        <p style={{ fontSize: 10, letterSpacing: "0.08em", color: "white", opacity: 0.8, marginBottom: 8 }} className="uppercase">
          To get better results make sure to have
        </p>
        <div className="flex items-center gap-8">
          {["Neutral Expression", "Frontal Pose", "Adequate Lighting"].map((tip) => (
            <div key={tip} className="flex items-center gap-2">
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                <path d="M4 0L8 4L4 8L0 4Z" fill="white" opacity="0.7"/>
              </svg>
              <span style={{ fontSize: 10, letterSpacing: "0.08em", color: "white", opacity: 0.8 }} className="uppercase">{tip}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Back */}
      <Link href="/camera-permission" className="absolute flex items-center gap-4 no-underline z-10"
        style={{ left: 32, bottom: 80, color: "white" }}>
        <div className="rotate-45 flex items-center justify-center" style={{ width: 44, height: 44, border: "1px solid white" }}>
          <FaAngleLeft className="-rotate-45" style={{ fontSize: 14 }} />
        </div>
        <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.02em", opacity: 0.7 }} className="uppercase">BACK</span>
      </Link>

      {/* Proceed — only after shot taken */}
      {shotTaken && (
        <button onClick={() => router.push("/analysis-loading")}
          className="absolute flex items-center gap-4 cursor-pointer z-10"
          style={{ right: 32, bottom: 80, color: "white", background: "none", border: "none" }}>
          <span style={{ fontSize: 14, fontWeight: 600, letterSpacing: "-0.02em", opacity: 0.7 }} className="uppercase">PROCEED</span>
          <div className="rotate-45 flex items-center justify-center" style={{ width: 44, height: 44, border: "1px solid white" }}>
            <FaAngleRight className="-rotate-45" style={{ fontSize: 14 }} />
          </div>
        </button>
      )}

    </main>
  );
}