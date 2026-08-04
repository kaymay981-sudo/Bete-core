"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Terminal, Activity, Cpu, ShieldCheck, Key, Hash, RefreshCcw, Layers, Network } from "lucide-react";
import { startRegistration } from '@simplewebauthn/browser';

interface TelemetryData { throughput: number; latency: number; activeNodes: number; blockHeight: number; }
const STEP_DEFINITIONS = [
 { id: "init", label: "Initialize Trust Anchor", icon: Terminal },
 { id: "verify", label: "Verify ALEF Constraints", icon: Cpu },
 { id: "auth", label: "Awaiting User Signature", icon: Key },
 { id: "commit", label: "Commit to Base44", icon: ShieldCheck },
];
export default function Dashboard() {
 const [activeStep, setActiveStep] = useState(0);
 const [isAuthenticating, setIsAuthenticating] = useState(false);
 const [txHash, setTxHash] = useState<string | null>(null);
 const [activeMatrixNodes, setActiveMatrixNodes] = useState<number[]>([]);
 const [telemetry, setTelemetry] = useState<TelemetryData>({ throughput: 1240, latency: 42, activeNodes: 142, blockHeight: 884920 });
 
 const matrixNodes = useMemo(() => [
 ...Array(15).fill("bg-cyan-900/40 border-cyan-500/50 text-cyan-400"),
 ...Array(15).fill("bg-blue-900/40 border-blue-500/50 text-blue-400"),
 ...Array(10).fill("bg-slate-800 border-slate-700/50 text-slate-500"),
 ].sort(() => Math.random() - 0.5), []);

 // Multi-node fast processing animation
 useEffect(() => { const t = setInterval(() => { setActiveMatrixNodes([Math.floor(Math.random() * 40), Math.floor(Math.random() * 40), Math.floor(Math.random() * 40)]); }, 300); return () => clearInterval(t); }, []);
 // Advanced telemetry fluctuation
 useEffect(() => { const t = setInterval(() => setTelemetry(p => ({ throughput: Math.max(800, p.throughput + Math.floor(Math.random() * 60 - 30)), latency: Math.max(10, p.latency + Math.floor(Math.random() * 10 - 5)), activeNodes: Math.max(100, p.activeNodes + Math.floor(Math.random() * 6 - 3)), blockHeight: p.blockHeight + 1 })), 2000); return () => clearInterval(t); }, []);
 useEffect(() => { if (activeStep < 2) { const t = setTimeout(() => setActiveStep(p => p + 1), 1500); return () => clearTimeout(t); } }, [activeStep]);
 const handleSignTransaction = async () => {
 setIsAuthenticating(true);
 try {
 const options = {
 challenge: "bW9jay1jaGFsbGVuZ2U=", rp: { name: "Base44 Prototype", id: window.location.hostname },
 user: { id: "bW9jay11c2Vy", name: "operator@base44", displayName: "Node Operator" },
 pubKeyCredParams: [{ alg: -7, type: "public-key" }, { alg: -257, type: "public-key" }],
 timeout: 60000, authenticatorSelection: { userVerification: "required" }
 };
 const assertion = await startRegistration(options as any);
 const verificationResp = await fetch('/api/verify-signature', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ assertion, challenge: "mock" }) });
 if ((await verificationResp.json()).success) {
 const mockHash = "0x" + Array.from(crypto.getRandomValues(new Uint8Array(20))).map(b => b.toString(16).padStart(2, "0")).join("");
 setTxHash(mockHash); setActiveStep(3); setTimeout(() => setActiveStep(4), 1500);
 }
 } catch (error: any) { alert("Signature error: " + error.message); } finally { setIsAuthenticating(false); }
 };
 const resetFlow = () => { setActiveStep(0); setTxHash(null); };

 return (
 <div className="min-h-screen bg-[#0a0f1a] text-slate-300 font-mono p-6 selection:bg-cyan-500/30">
 <header className="mb-8 border-b border-slate-800 pb-4 flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-end">
 <div><h1 className="text-2xl font-bold text-white flex items-center gap-2"><Terminal className="text-cyan-400" /> Base44 Command Center</h1><p className="text-slate-500 text-sm mt-1">Trust Protocol Visualizer v1.3.0</p></div>
 <div className="flex w-max items-center gap-2 text-sm text-cyan-400 bg-cyan-950/30 px-3 py-1 rounded-full border border-cyan-900/50"><span className="relative flex h-2 w-2"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span><span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span></span> Network Live</div>
 </header>
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
 <div className="bg-[#0f1623] border border-slate-800 rounded-lg p-5 shadow-lg flex flex-col"><h2 className="text-lg text-white mb-6 font-semibold flex items-center gap-2"><Activity size={18} className="text-cyan-400" /> Sequence Flow</h2>
 <div className="space-y-6 flex-1">
 {STEP_DEFINITIONS.map((step, idx) => {
 const isActive = activeStep === idx; const isPast = activeStep > idx; const Icon = step.icon;
 return (
 <div key={step.id} className="flex items-start gap-4 relative">
 {idx !== STEP_DEFINITIONS.length - 1 && (<div className={`absolute top-8 left-4 w-px h-10 ${isPast ? 'bg-cyan-500/50' : 'bg-slate-800'}`} />)}
 <div className={`w-8 h-8 rounded flex items-center justify-center shrink-0 border z-10 transition-colors ${isActive ? 'bg-cyan-900/50 border-cyan-400 text-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.3)]' : isPast ? 'bg-slate-800 border-cyan-600/50 text-cyan-600' : 'bg-slate-900 border-slate-800 text-slate-600'}`}><Icon size={16} /></div>
 <div className="pt-1"><p className={`text-sm ${isActive ? 'text-cyan-300 font-bold' : isPast ? 'text-slate-400' : 'text-slate-600'}`}>{step.label}</p>
 {isActive && idx === 2 && (<button onClick={handleSignTransaction} disabled={isAuthenticating} className="mt-3 text-xs bg-cyan-950 hover:bg-cyan-900 border border-cyan-800 text-cyan-300 px-4 py-2 rounded transition-all active:scale-95 disabled:opacity-50">{isAuthenticating ? "Awaiting Biometrics..." : "Sign Transaction"}</button>)}
 {isPast && idx === 2 && txHash && (<div className="mt-2 text-xs bg-black/30 border border-slate-800 p-2 rounded flex items-center gap-2 text-emerald-400 w-fit"><Hash size={12} className="shrink-0" /><span className="truncate w-36">{txHash}</span></div>)}
 </div></div>);})}
 </div>
 {activeStep >= STEP_DEFINITIONS.length && (<button onClick={resetFlow} className="mt-6 flex items-center justify-center gap-2 w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition-colors text-sm"><RefreshCcw size={14} /> Restart Sequence</button>)}
 </div>
 <div className="bg-[#0f1623] border border-slate-800 rounded-lg p-5 shadow-lg"><h2 className="text-lg text-white mb-6 font-semibold flex items-center gap-2"><Cpu size={18} className="text-blue-400" /> Live Telemetry</h2>
 <div className="grid grid-cols-2 gap-4">
 <div className="bg-black/40 border border-slate-800 p-4 rounded flex flex-col justify-between"><div className="flex items-center gap-2 mb-2"><Network size={14} className="text-slate-500"/><p className="text-slate-500 text-[10px] uppercase tracking-wider">Throughput</p></div><p className="text-xl text-slate-200">{telemetry.throughput} <span className="text-xs text-slate-500">TPS</span></p></div>
 <div className="bg-black/40 border border-slate-800 p-4 rounded flex flex-col justify-between"><div className="flex items-center gap-2 mb-2"><Activity size={14} className="text-slate-500"/><p className="text-slate-500 text-[10px] uppercase tracking-wider">Latency</p></div><p className="text-xl text-slate-200">{telemetry.latency} <span className="text-xs text-slate-500">ms</span></p></div>
 <div className="bg-black/40 border border-slate-800 p-4 rounded flex flex-col justify-between"><div className="flex items-center gap-2 mb-2"><Cpu size={14} className="text-slate-500"/><p className="text-slate-500 text-[10px] uppercase tracking-wider">Nodes</p></div><p className="text-xl text-slate-200">{telemetry.activeNodes}</p></div>
 <div className="bg-black/40 border border-slate-800 p-4 rounded flex flex-col justify-between"><div className="flex items-center gap-2 mb-2"><Layers size={14} className="text-slate-500"/><p className="text-slate-500 text-[10px] uppercase tracking-wider">Height</p></div><p className="text-xl text-slate-200">#{telemetry.blockHeight}</p></div>
 </div></div>
 <div className="bg-[#0f1623] border border-slate-800 rounded-lg p-5 shadow-lg"><h2 className="text-lg text-white mb-6 font-semibold flex items-center gap-2"><ShieldCheck size={18} className="text-indigo-400" /> ALEF Matrix</h2>
 <div className="grid grid-cols-5 gap-2">{matrixNodes.map((colorClasses, idx) => (<div key={idx} className={`aspect-square rounded border flex items-center justify-center text-[10px] transition-all duration-200 ${colorClasses} ${activeMatrixNodes.includes(idx) ? 'ring-2 ring-cyan-400/50 scale-110 brightness-150 shadow-[0_0_15px_rgba(34,211,238,0.4)] bg-cyan-600/30' : ''}`}>{idx.toString(16).padStart(2, '0').toUpperCase()}</div>))}</div>
 </div></div></div>);
}
