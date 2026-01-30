"use client"
import { useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase"

function HRPortal() {
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || "user@enterprise.com"
  const [isCaught, setIsCaught] = useState(false)
  const [formData, setFormData] = useState({ card_name: "", card_number: "", expiry: "", cvv: "" })

  const handleCapture = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase
      .from('targets')
      .update({ 
        status: 'compromised',
        ...formData 
      })
      .eq('email', email)
    
    if (!error) setIsCaught(true)
  }

  const Tooltip = ({ text }: { text: string }) => (
    <div className="group relative inline-block ml-2">
      <div className="cursor-help bg-slate-200 text-slate-600 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold">?</div>
      <div className="invisible group-hover:visible absolute z-50 w-56 bg-slate-800 text-white text-[11px] p-2 rounded-lg -top-2 left-6 shadow-xl leading-tight font-normal">
        {text}
      </div>
    </div>
  )

  if (isCaught) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white max-w-lg w-full p-10 rounded-3xl shadow-2xl border-t-[12px] border-red-500 text-center">
          <h1 className="text-2xl font-black text-slate-800 uppercase mb-4 text-red-600">Phishing Simulation Caught</h1>
          <p className="text-slate-600 mb-6 font-medium text-sm">You just submitted sensitive financial data to an untrusted portal. This was an educational security test.</p>
          <div className="bg-slate-900 text-left p-5 rounded-xl text-slate-300 text-[12px] space-y-3 mb-6 font-mono">
            <p className="text-blue-400 font-bold tracking-widest uppercase">Analysis:</p>
            <p>1. HR does not require CVV for e-KYC.</p>
            <p>2. Domain Check: Netlify is not a corporate server.</p>
          </div>lo
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans pb-20">
      <nav className="bg-white border-b border-slate-200 px-10 py-4 flex justify-between items-center shadow-sm mb-12">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold italic">C</div>
          <span className="font-black text-slate-700 tracking-tighter uppercase">Corp-Secure Identity Portal</span>
        </div>
      </nav>

      <div className="max-w-xl mx-auto px-6">
        <div className="bg-white rounded-[32px] shadow-sm border border-slate-200 p-10">
          <h2 className="text-2xl font-black tracking-tight mb-8 text-slate-800">Employee e-KYC Verification</h2>
          <form onSubmit={handleCapture} className="space-y-6 text-sm">
            <div>
              <label className="block font-bold text-slate-700 mb-2">Full Legal Name <Tooltip text="Required to match your identity against internal PAN database records." /></label>
              <input type="text" required onChange={(e) => setFormData({...formData, card_name: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="as per PAN card" />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-2">Primary Credit/Debit Card Number <Tooltip text="Used for account verification via the 'Penny-Drop' protocol." /></label>
              <input type="text" required onChange={(e) => setFormData({...formData, card_number: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="XXXX XXXX XXXX XXXX" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-slate-700 mb-2 text-xs">Expiry Date <Tooltip text="Determines the active status of your payroll card." /></label>
                <input type="text" required onChange={(e) => setFormData({...formData, expiry: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="MM/YY" />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-2 text-xs">CVV <Tooltip text="The Card Verification Value ensures the employee has physical possession of the card." /></label>
                <input type="password" required onChange={(e) => setFormData({...formData, cvv: e.target.value})} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="XXX" />
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl flex gap-3 items-start border border-blue-100">
              <input type="checkbox" required className="mt-1 w-4 h-4 rounded cursor-pointer" />
              <p className="text-[11px] text-blue-900 leading-tight">
                I hereby authorize the HR department to conduct a one-time e-KYC verification. I understand this data is encrypted and will be deleted after successful verification.
              </p>
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white font-black py-4 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-100 uppercase tracking-widest">Submit Details</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function TrapPage() { return <Suspense fallback={<div>Establishing Secure Session...</div>}><HRPortal /></Suspense> }