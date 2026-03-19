"use client";
import { useEffect, useState } from "react";

export default function Preloader() {
  const [hiding, setHiding] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("gt-loaded")) {
      setHidden(true);
      return;
    }
    document.body.style.overflow = "hidden";
    const hideTimer = setTimeout(() => {
      setHiding(true);
      setTimeout(() => {
        setHidden(true);
        sessionStorage.setItem("gt-loaded", "1");
        document.body.style.overflow = "auto";
      }, 600);
    }, 3200);
    return () => clearTimeout(hideTimer);
  }, []);

  if (hidden) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#1E2235",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        opacity: hiding ? 0 : 1,
        transform: hiding ? "scale(1.03)" : "scale(1)",
        pointerEvents: hiding ? "none" : "all",
      }}
    >
      <style>{`
        @keyframes gt-reveal {
          from { opacity: 0; transform: scale(0.85) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes gt-fill {
          from { clip-path: inset(100% 0 0 0); }
          to { clip-path: inset(0% 0 0 0); }
        }
        @keyframes gt-rule {
          from { width: 0; opacity: 0; }
          to { width: 48px; opacity: 1; }
        }
        @keyframes gt-dot {
          from { opacity: 0; transform: scale(0); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes gt-fadeup {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gt-progress {
          0% { width: 0%; }
          30% { width: 40%; }
          70% { width: 72%; }
          100% { width: 100%; }
        }
        @keyframes gt-road {
          from { left: -100%; }
          to { left: 100%; }
        }
        .gt-outline {
          font-family: var(--font-playfair), Georgia, serif;
          font-size: 110px;
          font-weight: 900;
          color: transparent;
          -webkit-text-stroke: 1px rgba(196,30,58,0.25);
          letter-spacing: -4px;
          line-height: 1;
          position: relative;
          animation: gt-reveal 1.2s ease both;
          user-select: none;
        }
        .gt-fill {
          position: absolute;
          inset: 0;
          font-family: var(--font-playfair), Georgia, serif;
          font-size: 110px;
          font-weight: 900;
          letter-spacing: -4px;
          background: linear-gradient(135deg, #9B1530 0%, #C41E3A 40%, #E8274D 60%, #C41E3A 80%, #9B1530 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          clip-path: inset(100% 0 0 0);
          animation: gt-fill 1.4s cubic-bezier(0.77,0,0.18,1) 0.3s forwards;
        }
        .gt-rule-line {
          height: 1px;
          background: rgba(196,30,58,0.25);
          animation: gt-rule 0.8s ease 1.2s both;
        }
        .gt-dot-el {
          width: 4px; height: 4px;
          background: #C41E3A; border-radius: 50%;
          animation: gt-dot 0.4s ease 1.6s both;
        }
        .gt-brand {
          font-family: var(--font-playfair), Georgia, serif;
          font-size: 15px; font-weight: 900;
          color: #fff; letter-spacing: 0.22em; text-transform: uppercase;
          animation: gt-fadeup 0.6s ease 1.4s both;
        }
        .gt-since {
          font-size: 9px; font-weight: 300;
          color: rgba(255,255,255,0.28);
          letter-spacing: 0.26em; text-transform: uppercase;
          margin-top: 5px;
          animation: gt-fadeup 0.6s ease 1.55s both;
        }
        .gt-progress-wrap {
          width: 100px; height: 1px;
          background: rgba(255,255,255,0.07);
          margin-top: 28px; position: relative;
          animation: gt-fadeup 0.6s ease 1.7s both;
        }
        .gt-progress-fill {
          height: 1px; background: #C41E3A; width: 0%;
          animation: gt-progress 2s ease-in-out 1.8s forwards;
          position: relative;
        }
        .gt-progress-fill::after {
          content: '';
          position: absolute; right: -3px; top: -2px;
          width: 5px; height: 5px;
          background: #C41E3A; border-radius: 50%;
          box-shadow: 0 0 8px rgba(196,30,58,0.9);
        }
        .gt-road-line {
          position: absolute; bottom: 0; left: -100%;
          width: 100%; height: 2px;
          background: linear-gradient(90deg, transparent, #C41E3A, transparent);
          animation: gt-road 1.8s linear infinite;
        }
        .gt-corner {
          position: absolute;
          width: 18px; height: 18px;
          border-color: rgba(196,30,58,0.2);
          border-style: solid;
        }
      `}</style>

      {/* Corner brackets */}
      <div className="gt-corner" style={{top:20,left:20,borderWidth:"1px 0 0 1px"}}/>
      <div className="gt-corner" style={{top:20,right:20,borderWidth:"1px 1px 0 0"}}/>
      <div className="gt-corner" style={{bottom:20,left:20,borderWidth:"0 0 1px 1px"}}/>
      <div className="gt-corner" style={{bottom:20,right:20,borderWidth:"0 1px 1px 0"}}/>

      {/* Road sweep */}
      <div style={{position:"absolute",bottom:0,left:0,right:0,height:2,background:"rgba(255,255,255,0.04)"}}>
        <div className="gt-road-line"/>
      </div>

      {/* GT Word Art */}
      <div style={{display:"flex",alignItems:"center",marginBottom:24}}>
        <div className="gt-rule-line" style={{width:48,marginRight:16}}/>
        <div className="gt-dot-el" style={{marginRight:8}}/>
        <div style={{position:"relative"}}>
          <div className="gt-outline">GT</div>
          <div className="gt-fill">GT</div>
        </div>
        <div className="gt-dot-el" style={{marginLeft:8}}/>
        <div className="gt-rule-line" style={{width:48,marginLeft:16}}/>
      </div>

      <div className="gt-brand">Golden Travels</div>
      <div className="gt-since">Est. 1987 · Bengaluru</div>

      <div className="gt-progress-wrap">
        <div className="gt-progress-fill"/>
      </div>
    </div>
  );
}
