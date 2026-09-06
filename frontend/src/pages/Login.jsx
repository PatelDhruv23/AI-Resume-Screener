import { motion, AnimatePresence } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Sparkles, Mail, Lock, LogIn, UserPlus, Info } from "lucide-react";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { loginWithGoogle, signInWithEmail, signUpWithEmail, user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (isLogin) {
        await signInWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password);
        alert("Check your email for the confirmation link!");
      }
    } catch (err) {
      setError(err.message || "An authentication error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden font-['Inter',sans-serif]">
      {/* Decorative background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#d4a574]/10 rounded-full blur-[140px]" />
      </div>

      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="relative z-10 bg-white/[0.03] backdrop-blur-3xl p-10 py-12 rounded-[3.5rem] border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.5)] w-full max-w-[480px] mx-4"
      >
        <div className="flex flex-col items-center mb-12">
          <motion.div 
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="w-16 h-16 rounded-[1.25rem] bg-gradient-to-br from-[#d4a574] to-[#c9a068] flex items-center justify-center mb-8 shadow-2xl shadow-[#d4a574]/30"
          >
            <Sparkles className="w-9 h-9 text-black" />
          </motion.div>
          <h2 className="text-4xl font-black text-white mb-3 tracking-tight leading-none uppercase">
            {isLogin ? "Recruiter Login" : "Create Account"}
          </h2>
          <p className="text-gray-500 text-sm font-bold uppercase tracking-[0.2em]">{isLogin ? "Welcome back to Screener AI" : "Enter details to start hiring"}</p>
        </div>

        {/* Auth Toggle */}
        <div className="flex bg-white/5 p-1.5 rounded-2xl mb-10 border border-white/5 relative z-10">
          <button 
            onClick={() => { setIsLogin(true); setError(null); }}
            className={`flex-1 py-3 px-6 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all duration-300 ${isLogin ? 'bg-[#d4a574]/10 text-[#d4a574] border border-[#d4a574]/30' : 'text-gray-500 hover:text-white'}`}
          >
            Login
          </button>
          <button 
            onClick={() => { setIsLogin(false); setError(null); }}
            className={`flex-1 py-3 px-6 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all duration-300 ${!isLogin ? 'bg-[#d4a574]/10 text-[#d4a574] border border-[#d4a574]/30' : 'text-gray-500 hover:text-white'}`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 relative z-10 transition-all">
          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 text-[11px] font-bold tracking-tight flex items-center gap-2 mb-2"
              >
                <Info className="w-4 h-4 shrink-0" />
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="group space-y-2">
             <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Work Email</label>
             <div className="relative group/field focus-within:scale-[1.01] transition-transform duration-300">
               <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 transition-colors group-focus-within/field:text-[#d4a574]" />
               <input
                 type="email"
                 required
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
                 className="w-full bg-white/5 border border-white/10 p-5 pl-14 rounded-2xl text-white outline-none focus:border-[#d4a574]/40 focus:bg-white/[0.08] transition-all duration-300 font-medium placeholder-gray-700"
                 placeholder="recruiter@company.com"
               />
             </div>
          </div>

          <div className="group space-y-2">
             <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Password</label>
                {isLogin && <button type="button" className="text-[10px] text-[#d4a574]/60 hover:text-[#d4a574] font-bold uppercase tracking-widest">Forgot?</button>}
             </div>
             <div className="relative group/field focus-within:scale-[1.01] transition-transform duration-300">
               <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 transition-colors group-focus-within/field:text-[#d4a574]" />
               <input
                 type="password"
                 required
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 className="w-full bg-white/5 border border-white/10 p-5 pl-14 rounded-2xl text-white outline-none focus:border-[#d4a574]/40 focus:bg-white/[0.08] transition-all duration-300 font-medium placeholder-gray-700"
                 placeholder="••••••••"
               />
             </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-[#d4a574] to-[#c9a068] text-black font-black uppercase tracking-[0.2em] py-5 rounded-2xl text-xs hover:shadow-[0_0_40px_rgba(212,165,116,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-500 flex items-center justify-center gap-3 shadow-2xl relative overflow-hidden"
          >
            {loading ? (
              <div className="w-5 h-5 border-3 border-black/20 border-t-black rounded-full animate-spin" />
            ) : (
              <>
                {isLogin ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                {isLogin ? "Sign In" : "Register Now"}
              </>
            )}
          </button>
        </form>

        <div className="relative my-12 flex items-center z-10 px-4">
           <div className="flex-1 h-[1px] bg-white/10" />
           <span className="mx-6 text-[9px] font-black uppercase tracking-[0.4em] text-gray-600">Enterprise SSO</span>
           <div className="flex-1 h-[1px] bg-white/10" />
        </div>

        <button
          onClick={loginWithGoogle}
          className="flex items-center gap-4 bg-white/[0.02] border border-white/10 text-white px-6 py-5 rounded-2xl w-full justify-center font-bold text-xs uppercase tracking-widest hover:bg-white/[0.05] hover:border-white/20 hover:scale-[1.01] active:scale-[0.99] transition-all shadow-xl backdrop-blur-md relative z-10"
        >
          <img
            src="https://img.icons8.com/color/48/google-logo.png"
            className="w-5 h-5"
            alt="Google"
          />
          Continue with Google
        </button>

        <div className="mt-12 text-center text-[10px] text-gray-600 font-bold uppercase tracking-[0.1em] z-10 relative">
          By accessing the platform, you agree to the <br /> <Link to="/" className="text-[#d4a574]/80 hover:text-[#d4a574] hover:underline">Terms of Service</Link> & <Link to="/" className="text-[#d4a574]/80 hover:text-[#d4a574] hover:underline">Privacy Policy</Link>
        </div>
      </motion.div>
    </div>
  );
}
