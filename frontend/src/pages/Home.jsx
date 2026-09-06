import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, ShieldCheck, Zap, BarChart3 } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden font-['Inter',sans-serif]">
      {/* Decorative gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#d4a574]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#c9a068]/10 rounded-full blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#d4a574] to-[#c9a068] flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-black" />
          </div>
          <span className="text-xl font-bold tracking-tight">ResumeScreener AI</span>
        </div>
        <Link to="/login" className="px-5 py-2 rounded-full border border-white/10 hover:bg-white/5 transition-all font-medium">
          Login
        </Link>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center pt-32 pb-20 px-4 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 px-4 py-1.5 rounded-full bg-[#d4a574]/10 border border-[#d4a574]/20 text-[#d4a574] text-sm font-medium flex items-center gap-2"
        >
          <Zap className="w-4 h-4 fill-current" />
          <span>New: AI-Powered Interview Questions</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-6xl md:text-8xl font-extrabold tracking-tight mb-8"
        >
          Hiring as <span className="bg-gradient-to-r from-[#d4a574] via-[#c9a068] to-[#b8945c] bg-clip-text text-transparent">Fast as Light.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl"
        >
          The intelligent platform that ranks candidates using customizable criteria, analyzes skills, and generates expert interview questions instantly.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link
            to="/login"
            className="px-10 py-4 rounded-2xl bg-gradient-to-r from-[#d4a574] to-[#c9a068] text-black font-bold text-lg shadow-2xl shadow-[#d4a574]/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
          >
            Start Now for Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-40 w-full">
          {[
            { icon: <ShieldCheck className="w-6 h-6" />, title: "Precision Ranking", desc: "Our AI evaluates candidates based on your specific scoring weights." },
            { icon: <Zap className="w-6 h-6" />, title: "Instant Analysis", desc: "Upload hundreds of resumes and get results in seconds, not hours." },
            { icon: <BarChart3 className="w-6 h-6" />, title: "Deep Insights", desc: "Automatically identify missing skills and candidate potential." }
          ].map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + (i * 0.1) }}
              className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-[#d4a574]/30 transition-all text-left group"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-[#d4a574] group-hover:text-black transition-colors">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{f.title}</h3>
              <p className="text-gray-400">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </main>

      <footer className="relative z-10 border-t border-white/5 py-12 px-8 text-center text-gray-500 text-sm">
        &copy; 2024 ResumeScreener AI. All rights reserved.
      </footer>
    </div>
  );
}
