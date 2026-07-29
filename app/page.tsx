"use client";

import React, { useState, useEffect } from 'react';
import { Activity, Shield, Database, CheckCircle, RefreshCw, Cpu, Server } from 'lucide-react';

// --- 1. EXISTING BETE FLOW COMPONENT ---
const BeteFlow = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { id: 1, title: 'Transaction Starts', desc: 'Initiating continuous evidence gathering.', icon: <Activity size={20} /> },
    { id: 2, title: 'BETE-GUARD Layer', desc: 'Covert duress & environmental telemetry capture.', icon: <Shield size={20} /> },
    { id: 3, title: 'ALEF Layer', desc: '15-15-10 Matrix testing & information gain routing.', icon: <Database size={20} /> },
    { id: 4, title: 'Evidence Integrity Score', desc: 'Calculating deterministic trust metric.', icon: <CheckCircle size={20} /> },
    { id: 5, title: 'Deterministic Decision', desc: 'Action: Proceed / Pause / Reject.', icon: <Server size={20} /> },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 2000);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      {steps.map((step, index) => {
        const isActive = index === activeStep;
        const isPast = index < activeStep;
        return (
          <div key={step.id} className="relative flex flex-col items-center w-full">
            <div
              className={`w-full p-4 rounded-md border-2 transition-all duration-500 ease-in-out ${
                isActive ? 'border-cyan-400 bg-cyan-900/20 shadow-[0_0_15px_rgba(34,211,238,0.4)]' : 
                isPast ? 'border-slate-700 bg-slate-800/50' : 'border-slate-800 bg-slate-900/30'
              }`}
            >
              <h3 className={`text-lg font-mono font-bold flex items-center gap-2 ${isActive ? 'text-cyan-400' : isPast ? 'text-slate-300' : 'text-slate-600'}`}>
                {step.title}
              </h3>
              <p className={`text-sm font-mono mt-2 ${isActive ? 'text-cyan-200' : 'text-slate-500'}`}>
                {step.desc}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-0.5 h-6 transition-colors duration-500 ${isPast ? 'bg-cyan-700' : 'bg-slate-800'}`}></div>
            )}
          </div>
        );
      })}
      <button 
        onClick={() => setActiveStep(0)}
        className="mt-8 flex items-center gap-2 px-4 py-2 border border-slate-700 rounded text-cyan-500 font-mono hover:bg-slate-800 transition-colors"
      >
        <RefreshCw size={16} /> Reset Flow
      </button>
    </div>
  );
};

// --- 2. NEW TELEMETRY COMPONENT ---
const TelemetryPanel = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Simulating real-time environmental capture
    setData({
      platform: navigator.platform,
      cores: navigator.hardwareConcurrency || 'Unknown',
      resolution: `${window.screen.width}x${window.screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
      trustScore: (Math.random() * (99.9 - 95.0) + 95.0).toFixed(2)
    });
  }, []);

  if (!data) return <div className="text-cyan-500 font-mono">Initializing sensors...</div>;

  return (
    <div className="w-full border border-slate-700 bg-slate-900/50 p-4 rounded-md font-mono text-sm">
      <h3 className="text-cyan-500 font-bold border-b border-slate-700 pb-2 mb-3 flex items-center gap-2">
        <Cpu size={16} /> LIVE BETE-GUARD TELEMETRY
      </h3>
      <div className="space-y-2 text-slate-300">
        <p><span className="text-slate-500">SYS_PLATFORM:</span> {data.platform}</p>
        <p><span className="text-slate-500">LOGICAL_CORES:</span> {data.cores}</p>
        <p><span className="text-slate-500">VIEWPORT_RES:</span> {data.resolution}</p>
        <p><span className="text-slate-500">TIMEZONE_LOC:</span> {data.timezone}</p>
        <p><span className="text-slate-500">LOCALE_PREF:</span> {data.language}</p>
        <div className="mt-4 pt-3 border-t border-slate-700">
          <p className="text-cyan-400 font-bold">
            > EVIDENCE_INTEGRITY: {data.trustScore}%
          </p>
        </div>
      </div>
    </div>
  );
};

// --- 3. NEW ALEF MATRIX COMPONENT ---
const AlefMatrix = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Generate 40 nodes (15 Blue/Truth, 15 Red/Deception, 10 Gray/Baseline)
  const nodes = [
    ...Array(15).fill('bg-blue-900/50 border-blue-500/50 text-blue-400'),
    ...Array(15).fill('bg-red-900/50 border-red-500/50 text-red-400'),
    ...Array(10).fill('bg-slate-800 border-slate-500 text-slate-400')
  ].sort(() => Math.random() - 0.5); // Shuffle array on load

  useEffect(() => {
    // Simulate active information routing
    const interval = setInterval(() => {
      setActiveIndex(Math.floor(Math.random() * 40));
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full border border-slate-700 bg-slate-900/50 p-4 rounded-md font-mono">
      <h3 className="text-cyan-500 font-bold border-b border-slate-700 pb-2 mb-3 flex items-center gap-2">
        <Database size={16} /> ALEF 15-15-10 ROUTING MATRIX
      </h3>
      <div className="grid grid-cols-8 gap-1.5 mt-4">
        {nodes.map((colorClasses, i) => (
          <div 
            key={i} 
            className={`w-full aspect-square border rounded-sm transition-all duration-200 flex items-center justify-center text-[10px]
              ${i === activeIndex ? 'bg-cyan-400 border-cyan-400 shadow-[0_0_10px_cyan] text-slate-900 scale-110 z-10' : colorClasses}
            `}
          >
            {i === activeIndex ? '1' : '0'}
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-500 mt-4 text-center">
        Actively evaluating multi-variate information gain.
      </p>
    </div>
  );
};

// --- 4. MAIN DASHBOARD LAYOUT ---
export default function Dashboard() {
  return (
    <main className="min-h-screen bg-[#0a0f1a] text-slate-200 p-4 md:p-8 selection:bg-cyan-900 selection:text-cyan-100">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2 mb-10">
          <h1 className="text-3xl md:text-4xl font-mono font-bold tracking-wider text-white">
            BETE Protocol
          </h1>
          <p className="text-slate-400 font-mono text-sm">
            Architect: Ken | Active Command Center
          </p>
        </div>

        {/* Grid Layout: Flow on left, Panels on right (stacks on mobile) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column: The Flow */}
          <div className="bg-slate-950 p-6 rounded-lg border border-slate-800 shadow-2xl">
            <BeteFlow />
          </div>

          {/* Right Column: Live Data & Matrices */}
          <div className="space-y-6 flex flex-col justify-center">
            <TelemetryPanel />
            <AlefMatrix />
          </div>

        </div>
      </div>
    </main>
  );
}
