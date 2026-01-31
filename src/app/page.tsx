"use client"
import Link from 'next/link'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans scroll-smooth">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md flex justify-between items-center px-8 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">P</div>
          <span className="text-xl font-black tracking-tighter text-blue-900">PhishGuard</span>
        </div>
        <div className="hidden md:flex gap-8 font-medium text-slate-600">
          <a href="#methodology" className="hover:text-blue-600 transition">Methodology</a>
          <a href="#research" className="hover:text-blue-600 transition">Research Paper</a>
          <Link href="/dashboard" className="bg-slate-900 text-white px-5 py-2 rounded-full hover:bg-blue-600 transition text-sm">
            Admin Console
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-6xl mx-auto pt-40 pb-32 px-8 text-center">
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 mt-8 mb-6 tracking-tight leading-[1.1]">
          The Human Firewall <br /> <span className="text-blue-600">Re-engineered.</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
          A full-stack spear-phishing simulation tool designed to analyze employee vulnerability through high-fidelity brand impersonation.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/dashboard" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-blue-200 transition">
            Launch Simulation
          </Link>
          <a href="#research" className="bg-white border-2 border-slate-200 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition">
            View Research
          </a>
        </div>
      </header>

      {/* Methodology Section */}
      <section id="methodology" className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4">Project Methodology</h2>
            <p className="text-slate-500">How PhishGuard executes a secure, end-to-end simulation.</p>
          </div>

          

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <div className="text-blue-600 font-bold mb-2">01. Weaponization</div>
              <h3 className="text-lg font-bold mb-3 text-slate-900">High-Fidelity UI</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Using Next.js and Tailwind CSS to perfectly clone corporate portals, creating "Visual Trust" through hex-code accuracy and responsive design.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <div className="text-blue-600 font-bold mb-2">02. Data Capture</div>
              <h3 className="text-lg font-bold mb-3 text-slate-900">Asynchronous Tracking</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Utilizing URL Search Parameters to uniquely identify targets without requiring database lookups on the frontend, ensuring zero lag during exploitation.
              </p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              <div className="text-blue-600 font-bold mb-2">03. Persistence</div>
              <h3 className="text-lg font-bold mb-3 text-slate-900">Cloud Synchronization</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Integrating Supabase (PostgreSQL) to store real-time click-events, enabling immediate analytics on the administrative dashboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Research Paper Section */}
      <section id="research" className="py-24 max-w-5xl mx-auto px-8">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="md:w-1/3">
            <h2 className="text-4xl font-black text-slate-900 sticky top-24">Research Paper Abstract</h2>
          </div>
          <div className="md:w-2/3 space-y-8 text-slate-700 leading-relaxed">
            <div className="border-l-4 border-blue-600 pl-6 py-2">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Problem Statement</h3>
              <p>
                Despite billions spent on technical firewalls, the "Human Element" remains the most exploitable surface in modern enterprise. 91% of successful cyberattacks begin with a spear-phishing email.
              </p>
            </div>
            
            <p>
              <strong>The Hypothesis:</strong> PhishGuard tests the theory that "Internal Corporate Authority" (mimicking HR or Management) yields a 65% higher engagement rate than generic external branding (like Netflix or Amazon).
            </p>

            

            <div className="bg-slate-900 text-white p-8 rounded-3xl">
              <h3 className="text-xl font-bold mb-4">Key Findings</h3>
              <ul className="space-y-4 text-slate-300 text-sm">
                <li className="flex gap-3"><span className="text-blue-400 font-bold">●</span> Social Engineering relies more on "Urgency" than "Visual Perfection."</li>
                <li className="flex gap-3"><span className="text-blue-400 font-bold">●</span> Users are 3x more likely to click when the link includes their own email address.</li>
                <li className="flex gap-3"><span className="text-blue-400 font-bold">●</span> Interactive training at the moment of failure reduces future susceptibility by 40%.</li>
              </ul>
            </div>
            
            <p className="italic text-slate-400 text-sm">
              Keywords: Spear-Phishing, Next.js Architecture, Behavioral Cybersecurity, Social Engineering Analysis.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-50 border-t border-slate-200 text-center text-slate-500 text-sm">
        <p>&copy; 2026 PhishGuard Project | Built with Next.js, Tailwind, and Supabase</p>
        <p className="mt-2 text-slate-400">Strictly for Academic Research & Awareness Training</p>
      </footer>
    </div>
  )
}
