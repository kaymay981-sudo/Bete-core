"use client";

import React, { useState, useEffect } from 'react';
import { Activity, Shield, Database, CheckCircle, RefreshCw, Cpu, Server, Fingerprint, XCircle } from 'lucide-react';

// --- 1. UPDATED BETE FLOW (NOW WITH WEBAUTHN) ---
const BeteFlow = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [authStatus, setAuthStatus] = useState<'idle' | 'prompting' | 'success' | 'failed'>('idle');

  const steps = [
    { id: 1, title: 'Transaction Starts', desc: 'Initiating continuous evidence gathering.', icon: <Activity size={20} /> },
    { id: 2, title: 'BETE-GUARD Layer', desc: 'Covert duress & environmental telemetry capture.', icon: <Shield size={20} /> },
    { id: 3, title: 'ALEF Layer', desc: '15-15-10 Matrix testing & information gain routing.', icon: <Database size={20} /> },
    { id: 4, title: 'Evidence Integrity Score', desc: 'Calculating deterministic trust metric.', icon: <CheckCircle size={20} /> },
    { id: 5, title: 'Deterministic Decision', desc: 'Awaiting Cryptographic Signature.', icon: <Server size={20} /> },
  ];

  // Auto-run flow until the final decision step
  useEffect(() => {
    if (activeStep < steps.length - 1) {
      const timer = setTimeout(() => {
        setActiveStep((prev) => prev + 1);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [activeStep, steps.length]);

  // Native WebAuthn Call
  const handleBiometricAuth = async () => {
    if (!window.PublicKeyCredential) {
      alert("WebAuthn is not supported on this browser/device.");
      return;
    }

    try {
      setAuthStatus('prompting');
      
      // Generating dummy challenge for the frontend simulation
      const challenge = new Uint8Array(32);
      crypto.getRandomValues(challenge);
      const userId = new Uint8Array(16);
      crypto.getRandomValues(userId);

      // Triggers native FaceID / Fingerprint
      const credential = await navigator.credentials.create({
        publicKey: {
          challenge: challenge,
          rp: { name: "BETE Protocol", id: window.location.hostname },
          user: { id: userId, name: "architect@bete.local", displayName: "BETE Architect" },
          pubKeyCredParams: [{ type: "public-key", alg: -7 }], // ES256 Cryptography
          authenticatorSelection: { authenticatorAttachment: "platform", userVerification: "required" },
          timeout: 60000,
        }
      });

      if (credential) {
        setAuthStatus('success');
      }
    } catch (err) {
      console.error("Biometric auth failed or was canceled:", err);
      setAuthStatus('failed');
    }
  };

  const resetFlow = () => {
    setActiveStep(0);
    setAuthStatus('idle');
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto">
      {steps.map((step, index) => {
        const isActive = index === activeStep;
        const isPast = index < activeStep;
        const isFinalStep = index === steps.length - 1;

        return (
          <div key={step.id} className="relative flex flex-col items-center w-full">
            <div
              className={`w-full p-4 rounded-md border-2 transition-all duration-500 ease-in-out ${
                isActive && !isFinalStep ? 'border-cyan-400 bg-cyan-900/20 shadow-[0_0_15px_rgba(34,211,238,0.4)]' : 
                isPast ? 'border-slate-700 bg-slate-800/50' : 
                isFinalStep && isActive ? 'border-cyan-400 bg-slate-900/80 shadow-[0_0_20px_rgba(34,211,238,0.2)]' :
                'border-slate-800 bg-slate-900/30'
              }`}
            >
              <h3 className={`text-lg font-mono font-bold flex items-center gap-2 ${isActive || isPast ? 'text-cyan-400' : 'text-slate-600'}`}>
                {step.icon} {step.title}
              </h3>
              
              {!isFinalStep && (
                <p className={`text-sm font-mono mt-2 ${isActive ? 'text-cyan-200' : 'text-slate-500'}`}>
                  {step.desc}
                </p>
              )}

              {/* Dynamic Final Step UI */}
              {isFinalStep && isActive && (
                <div className="mt-4 flex flex-col items-center">
                  {authStatus === 'idle' && (
                    <button 
                      onClick={handleBiometricAuth}
                      className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-2 px-6 rounded-full transition-all animate-pulse"
                    >
                      <Fingerprint size={20} /> SIGN TRANSACTION
                    </button>
                  )}
                  {authStatus === 'prompting' && (
                    <p className="text-cyan-400 animate-pulse font-mono text-sm flex items-center gap-2">
                      <Fingerprint size={16} /> Awaiting hardware verification...
                    </p>
                  )}
                  {authStatus === 'success' && (
                    <div className="text-green-400 font-mono text-sm flex flex-col items-center">
                      <CheckCircle size={24} className="mb-1" />
                      <span>PROCEED: Verified & Signed</span>
                    </div>
                  )}
                  {authStatus === 'failed' && (
                    <div className="text-red-400 font-mono text-sm flex flex-col items-center">
                      <XCircle size={24} className="mb-1" />
                      <span>REJECTED: Verification Failed</span>
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {index < steps.length - 1 && (
              <div className={`w-0.5 h-6 transition-colors duration-500 ${isPast ? 'bg-cyan-700' : 'bg-slate-800'}`}></div>
            )}
          </div>
        );
      })}
      
      <button 
        onClick={resetFlow}
        className="mt-8 flex items-center gap-2 px-4 py-2 border border-slate-700 rounded text-cyan-500 font-mono hover:bg-slate-800 transition-colors"
      >
        <RefreshCw size={16} /> Reset Flow
      </button>
    </div>
  );
};

// --- 2. TELEMETRY PANEL (Unchanged) ---
const TelemetryPanel = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
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
            &gt; EVIDENCE_INTEGRITY: {data.trustScore}%
          </p>
        </div>
      </div>
    </div>
  );
};

// --- 3. ALEF MATRIX (Unchanged) ---
const AlefMatrix = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const nodes = [
    ...Array(15).fill('bg-blue-900/50 border-blue-500/50 text-blue-400'),
    ...Array(15).fill('bg-red-900/50 border-red-500/50 text-red-400'),
    ...Array(10).fill('bg-slate-800 border-slate-500 text-slate-400')
  ].sort(() => Math.random() - 0.5);

  useEffect(() => {
    const interval = setInterval(() => setActiveIndex(Math.floor(Math.random() * 40)), 400);
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
    </div>
  );
};

// --- 4. MAIN DASHBOARD ---
export default function Dashboard() {
  return (
    <main className="min-h-screen bg-[#0a0f1a] text-slate-200 p-4 md:p-8 selection:bg-cyan-900 selection:text-cyan-100">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="text-center space-y-2 mb-10">
          <h1 className="text-3xl md:text-4xl font-mono font-bold tracking-wider text-white">
            BETE Protocol
          </h1>
          <p className="text-slate-400 font-mono text-sm">
            Architect: Ken | Active Command Center
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-slate-950 p-6 rounded-lg border border-slate-800 shadow-2xl">
            <BeteFlow />
          </div>
          <div className="space-y-6 flex flex-col justify-center">
            <TelemetryPanel />
            <AlefMatrix />
          </div>
        </div>
      </div>
    </main>
  );
}
