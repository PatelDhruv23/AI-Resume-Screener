import { Trophy, Mail, Sparkles, AlertCircle, Info, ChevronRight, Copy, Check, ExternalLink, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateQuestions, sendEmail } from '../../services/resumeService';

export function ResultCard({ candidate, index, jobTitle }) {
  const [loadingAI, setLoadingAI] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [questions, setQuestions] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [emailStatus, setEmailStatus] = useState(null); // 'sending', 'success', 'error'

  const scoreCategories = [
    { label: 'Skills', value: candidate.skill_score, color: 'from-[#d4a574] to-[#c9a068]' },
    { label: 'Experience', value: candidate.experience_score, color: 'from-[#c9a068] to-[#b8945c]' },
    { label: 'Projects', value: candidate.project_score, color: 'from-[#b8945c] to-[#a68350]' },
    { label: 'Education', value: candidate.education_score, color: 'from-[#a68350] to-[#957244]' },
  ];

  const handleGenerateQuestions = async () => {
    try {
      setLoadingAI(true);
      const res = await generateQuestions(candidate, jobTitle);
      setQuestions(res.questions);
      setShowModal(true);
    } catch (err) {
      console.error(err);
      alert('Failed to generate interview questions.');
    } finally {
      setLoadingAI(false);
    }
  };

  const handleSendEmail = async () => {
    try {
      setEmailStatus('sending');
      const res = await sendEmail({
        email: candidate.candidate_email,
        name: candidate.candidate_name,
        job_title: jobTitle,
        questions: questions || ""
      });

      if (res.status === 'success') {
        setEmailStatus('success');
        setTimeout(() => setEmailStatus(null), 3000);
      } else {
        setEmailStatus('error');
        setTimeout(() => setEmailStatus(null), 3000);
      }
    } catch (err) {
      console.error(err);
      setEmailStatus('error');
      setTimeout(() => setEmailStatus(null), 3000);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(questions);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className={`group p-8 rounded-[2.5rem] relative overflow-hidden backdrop-blur-2xl border transition-all duration-500 shadow-2xl ${
          index === 0 
            ? 'bg-[#d4a574]/10 border-[#d4a574]/40 shadow-[#d4a574]/10 scale-[1.02] z-10' 
            : 'bg-white/[0.03] border-white/10 hover:border-[#d4a574]/30'
        }`}
      >
        {/* Particle effect background for top candidate */}
        {index === 0 && (
          <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[radial-gradient(circle_at_50%_50%,#d4a574_0%,transparent_70%)]" />
        )}

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <div className="flex items-center gap-5">
              <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-2xl ${
                index === 0 
                  ? 'bg-gradient-to-br from-[#d4a574] to-[#c9a068] text-black shadow-[#d4a574]/20' 
                  : 'bg-white/5 text-[#d4a574] border border-white/5'
              }`}>
                {index === 0 ? <Trophy className="w-8 h-8" /> : <span className="text-2xl font-black">{index + 1}</span>}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="text-2xl font-bold text-white tracking-tight leading-tight">{candidate.candidate_name}</h3>
                  {index === 0 && (
                    <span className="px-3 py-1 rounded-full bg-[#d4a574]/20 text-[#d4a574] text-[9px] font-black uppercase tracking-[0.2em] border border-[#d4a574]/20">Best Match</span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-gray-500 font-bold text-[10px] uppercase tracking-widest">
                  <Mail className="w-3.5 h-3.5 text-[#d4a574]/60" />
                  {candidate.candidate_email}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end">
              <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#d4a574] to-[#c9a068] mb-1 tabular-nums">
                {candidate.final_score}%
              </div>
              <div className="text-[10px] font-black text-gray-500 uppercase tracking-[0.25em]">Match Score</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {scoreCategories.map((score, i) => (
              <div key={i} className="p-5 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-[#d4a574]/10 transition-all duration-300">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-extrabold text-gray-500 uppercase tracking-widest">{score.label}</span>
                  <span className="text-sm font-black text-white">{score.value}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${score.value}%` }}
                    transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                    className={`h-full bg-gradient-to-r ${score.color} rounded-full shadow-[0_0_10px_rgba(212,165,116,0.3)]`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-8 pt-8 border-t border-white/5">
             <div className="flex-1">
               <div className="flex items-center gap-2 mb-4">
                 <AlertCircle className="w-4 h-4 text-red-400" />
                 <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Missing Requirements</span>
               </div>
               <div className="flex flex-wrap gap-2">
                 {(candidate.missing_skills || []).length > 0 ? (
                   (candidate.missing_skills || []).map((skill, i) => (
                     <span key={i} className="px-3 py-1.5 rounded-xl bg-red-400/5 text-red-400 border border-red-400/10 text-[10px] font-bold tracking-tight">
                       {skill}
                     </span>
                   ))
                 ) : (
                   <span className="text-xs text-green-400 font-bold flex items-center gap-1.5">
                     <CheckCircle2 className="w-4 h-4" /> No Missing Skills
                   </span>
                 )}
               </div>
             </div>

             <div className="flex items-center gap-3 shrink-0">
               <button
                 onClick={handleSendEmail}
                 disabled={emailStatus === 'sending'}
                 className={`px-6 py-4 rounded-2xl flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                   emailStatus === 'success' 
                     ? 'bg-green-500 text-black shadow-[0_0_20px_rgba(34,197,94,0.3)]' 
                     : emailStatus === 'error'
                     ? 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.3)]'
                     : 'bg-white/5 text-[#d4a574] border border-[#d4a574]/30 hover:bg-[#d4a574]/10 hover:shadow-xl hover:shadow-[#d4a574]/10 active:scale-95'
                 }`}
               >
                 {emailStatus === 'sending' ? (
                   <div className="w-4 h-4 border-2 border-[#d4a574]/30 border-t-[#d4a574] rounded-full animate-spin" />
                 ) : emailStatus === 'success' ? (
                   <Check className="w-4 h-4" />
                 ) : (
                   <Mail className="w-4 h-4" />
                 )}
                 {emailStatus === 'success' ? 'Email Sent' : emailStatus === 'error' ? 'Error' : 'Contact Candidate'}
               </button>

               <button
                 onClick={handleGenerateQuestions}
                 disabled={loadingAI}
                 className="px-6 py-4 rounded-2xl bg-gradient-to-r from-[#d4a574] to-[#c9a068] text-black text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:shadow-[0_0_30px_rgba(212,165,116,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 group/btn shadow-xl"
               >
                 {loadingAI ? (
                   <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                 ) : (
                   <Sparkles className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
                 )}
                 {loadingAI ? 'Analyzing...' : 'AI Prep Kit'}
               </button>
             </div>
          </div>
        </div>
      </motion.div>

      {/* AI Questions Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="relative w-full max-w-2xl bg-[#0f0f0f] border border-white/10 rounded-[3rem] shadow-[0_0_60px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#d4a574] via-[#c9a068] to-[#b8945c]" />
              
              <div className="p-8 pb-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#d4a574]/10 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-[#d4a574]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">Interview Prep Kit</h3>
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em]">{candidate.candidate_name}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-500 hover:text-white transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-8 max-h-[60vh] overflow-y-auto custom-scrollbar">
                <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8">
                   <pre className="text-gray-300 text-sm whitespace-pre-wrap font-['Inter',sans-serif] leading-relaxed">
                     {questions}
                   </pre>
                </div>
              </div>

              <div className="p-8 pt-0 flex gap-4">
                <button
                  onClick={copyToClipboard}
                  className="flex-1 px-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/10 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  {copySuccess ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                  {copySuccess ? 'Copied' : 'Copy Prep Kit'}
                </button>
                <button
                  onClick={handleSendEmail}
                  disabled={emailStatus === 'sending'}
                  className="px-6 py-4 rounded-2xl bg-gradient-to-r from-[#d4a574] to-[#c9a068] text-black font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(212,165,116,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                   <Mail className="w-4 h-4" />
                   Send to Candidate
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
