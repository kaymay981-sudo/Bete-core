"use client";
import { useState } from "react";

export default function BETEArchitecture() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { title: "Transaction Starts", desc: "Initiating continuous evidence gathering." },
    { title: "BETE-GUARD Layer", desc: "Covert duress & environmental telemetry capture." },
    { title: "ALEF Layer", desc: "15-15-10 Matrix testing & information gain routing." },
    { title: "Evidence Integrity Score", desc: "Calculating deterministic trust metric." },
    { title: "Deterministic Decision", desc: "Action: Proceed / Pause / Reject." }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-cyan-400 p-8 font-mono flex flex-col items-center justify-center">
      <h1 className="text-3xl md:text-5xl font-bold mb-4 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] text-center">
        BETE Protocol
      </h1>
      <p className="text-slate-400 mb-12">Architect: Ken | Interactive Flow</p>

      <div className="flex flex-col items-center space-y-2 w-full max-w-md">
        {steps.map((step, index) => {
          const isActive = index <= activeStep;
          const isCurrent = index === activeStep;
          
          return (
            <div key={index} className="w-full flex flex-col items-center">
              <div 
                onClick={() => setActiveStep(index)}
                className={`w-full p-6 border rounded-lg cursor-pointer transition-all duration-500 ease-in-out
                  ${isActive ? 'border-cyan-400 bg-cyan-950/30' : 'border-slate-800 bg-slate-900/50'}
                  ${isCurrent ? 'shadow-[0_0_20px_rgba(34,211,238,0.4)] scale-105' : 'hover:border-cyan-700 hover:scale-105'}
                `}
              >
                <h2 className={`text-xl font-bold ${isActive ? 'text-cyan-300' : 'text-slate-500'}`}>
                  {step.title}
                </h2>
                <p className={`text-sm mt-2 ${isActive ? 'text-cyan-100/70' : 'text-slate-600'}`}>
                  {step.desc}
                </p>
              </div>
              
              {/* Down Arrow */}
              {index < steps.length - 1 && (
                <div className={`h-8 w-1 my-2 transition-colors duration-500 ${isActive ? 'bg-cyan-500 animate-pulse' : 'bg-slate-800'}`}></div>
              )}
            </div>
          );
        })}
      </div>
      
      <button 
        onClick={() => setActiveStep(0)} 
        className="mt-12 px-6 py-2 border border-cyan-800 text-cyan-500 rounded hover:bg-cyan-900/50 transition-colors"
      >
        Reset Transaction Flow
      </button>
    </div>
  );
}
