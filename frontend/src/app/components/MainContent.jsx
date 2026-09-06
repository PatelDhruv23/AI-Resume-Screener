import { JobDetailsCard } from './JobDetailsCard';
import { WeightDistributionCard } from './WeightDistributionCard';
import { ShortlistSettingsCard } from './ShortlistSettingsCard';
import { ResumeUploadCard } from './ResumeUploadCard';
import { ResultCard } from './ResultCard';
import { Sparkles, BarChart2, ArrowLeft, Loader2, Trophy } from 'lucide-react';
import { useState, useEffect } from 'react';
import { uploadResumes } from '../../services/resumeService';
import { useHistoryStore } from '../../store/historyStore';
import { motion, AnimatePresence } from 'framer-motion';

export function MainContent({
  weights,
  setWeights,
  jobTitle,
  setJobTitle,
  jobDescription,
  setJobDescription,
  maxShortlist,
  setMaxShortlist
}) {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [view, setView] = useState('form'); // 'form' or 'results'

  const addScreening = useHistoryStore((state) => state.addScreening);
  const selectedScreening = useHistoryStore((state) => state.selectedScreening);
  const resetScreening = useHistoryStore((state) => state.resetScreening);

  // Sync with selected screening from history
  useEffect(() => {
    if (selectedScreening) {
      setResults(selectedScreening.results);
      setJobTitle(selectedScreening.title);
      setJobDescription(selectedScreening.job_description || "");
      setView('results');
    } else {
      setResults([]);
      setView('form');
    }
  }, [selectedScreening, setJobTitle, setJobDescription]);

  const totalWeight = Object.values(weights).reduce((acc, val) => acc + val, 0);
  const isValid = totalWeight === 100 && jobTitle.trim() && jobDescription.trim() && files.length > 0;

  const handleStartScreening = async () => {
    if (!isValid) return;

    setLoading(true);
    try {
      const data = await uploadResumes({
        files,
        jd: jobDescription,
        weights,
        maxCount: maxShortlist,
        jdTitle: jobTitle,
      });

      const candidates = data?.shortlisted_candidates || [];
      setResults(candidates);
      
      const newScreening = {
        id: Date.now(),
        title: jobTitle,
        job_description: jobDescription,
        results: candidates,
      };

      addScreening(newScreening);
      setView('results');
    } catch (err) {
      console.error("Screening Error:", err);
      alert("An error occurred during the screening process. Please check the backend connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex-1 h-screen overflow-auto relative custom-scrollbar">
      <AnimatePresence mode="wait">
        {view === 'form' ? (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="max-w-4xl mx-auto p-12 pb-40"
          >
            {/* Header */}
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <span className="px-5 py-1.5 rounded-full bg-[#d4a574]/10 border border-[#d4a574]/20 text-[#d4a574] text-[10px] font-black uppercase tracking-[0.25em]">New Screening</span>
              </div>
              <h1 className="text-6xl font-black text-white mb-6 tracking-tight leading-tight uppercase">
                Configure <br /> <span className="bg-gradient-to-r from-[#d4a574] via-[#c9a068] to-[#b8945c] bg-clip-text text-transparent">Criteria.</span>
              </h1>
              <p className="text-gray-500 font-semibold max-w-xl text-lg leading-relaxed">
                Define your ideal candidate profile and scoring logic. Our AI will rank candidates based on these exact parameters.
              </p>
            </div>

            {/* Form Cards */}
            <div className="space-y-12">
              <JobDetailsCard
                jobTitle={jobTitle}
                setJobTitle={setJobTitle}
                jobDescription={jobDescription}
                setJobDescription={setJobDescription} 
              />

              <ResumeUploadCard 
                files={files}
                setFiles={setFiles}
              />

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <WeightDistributionCard
                  weights={weights}
                  setWeights={setWeights} 
                />
                <ShortlistSettingsCard
                  maxShortlist={maxShortlist}
                  setMaxShortlist={setMaxShortlist} 
                />
              </div>
            </div>

            {/* CTA Button */}
            <div className="mt-20 flex justify-center sticky bottom-12 z-40">
              <div className="relative w-full max-w-sm">
                <button
                  onClick={handleStartScreening}
                  disabled={!isValid || loading}
                  className={`relative w-full px-12 py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.3em] shadow-2xl transition-all duration-500 flex items-center justify-center gap-4 group ${
                    isValid && !loading
                      ? 'bg-gradient-to-r from-[#d4a574] via-[#c9a068] to-[#b8945c] text-black hover:shadow-[#d4a574]/50 hover:scale-105 active:scale-95 cursor-pointer ring-4 ring-white/5'
                      : 'bg-white/5 text-gray-700 cursor-not-allowed border border-white/5 opacity-50'
                  }`}
                >
                  {loading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    <Sparkles className={`w-6 h-6 ${isValid ? 'group-hover:rotate-12 transition-transform duration-300' : ''}`} />
                  )}
                  {loading ? 'Analyzing Resumes...' : 'Launch AI Screener'}
                </button>
                {isValid && !loading && (
                  <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-[#d4a574] to-[#c9a068] blur-2xl opacity-30 group-hover:opacity-50 transition-opacity -z-10" />
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="results"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-6xl mx-auto p-12 pb-40"
          >
             {/* Results Header */}
             <div className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
               <div>
                 <button 
                  onClick={resetScreening}
                  className="flex items-center gap-2 text-gray-500 hover:text-[#d4a574] transition-colors font-bold text-[10px] uppercase tracking-widest mb-8 group"
                 >
                   <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                   Back to screening
                 </button>
                 <div className="flex items-center gap-4 mb-4">
                   <div className="w-12 h-12 rounded-2xl bg-[#d4a574]/10 flex items-center justify-center">
                     <BarChart2 className="w-6 h-6 text-[#d4a574]" />
                   </div>
                   <h2 className="text-4xl font-black text-white tracking-tight uppercase">Screening <br /> <span className="bg-gradient-to-r from-[#d4a574] via-[#c9a068] to-[#b8945c] bg-clip-text text-transparent">Analysis.</span></h2>
                 </div>
                 <p className="text-gray-500 font-semibold text-lg">{jobTitle} • {results.length} Candidates Identified</p>
               </div>

               <div className="flex gap-4">
                  <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 text-center px-10 min-w-[160px]">
                    <div className="text-[10px] font-black text-gray-600 uppercase tracking-widest mb-1">Qualified</div>
                    <div className="text-3xl font-black text-white leading-none">{results.length}</div>
                  </div>
                  <div className="p-6 rounded-3xl bg-[#d4a574]/10 border border-[#d4a574]/20 text-center px-10 min-w-[160px]">
                    <div className="text-[10px] font-black text-[#d4a574] uppercase tracking-widest mb-1">Top Pick</div>
                    <div className="text-3xl font-black text-[#d4a574] leading-none">100%</div>
                  </div>
               </div>
             </div>

             <div className="space-y-8">
               {results.map((candidate, i) => (
                 <ResultCard 
                  key={i} 
                  candidate={candidate} 
                  index={i} 
                  jobTitle={jobTitle}
                 />
               ))}
               
               {results.length === 0 && (
                 <div className="p-20 text-center bg-white/[0.02] border border-dashed border-white/10 rounded-[3rem]">
                   <Trophy className="w-16 h-16 text-gray-800 mx-auto mb-6" />
                   <h3 className="text-2xl font-bold text-gray-400 mb-2">No qualified candidates found</h3>
                   <p className="text-gray-600 max-w-sm mx-auto">Try adjusting your scoring weights or relaxing the criteria to see more results.</p>
                   <button 
                    onClick={resetScreening}
                    className="mt-10 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-all"
                   >
                     Adjust Criteria
                   </button>
                 </div>
               )}
             </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent global loading barrier */}
      {loading && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center cursor-wait">
           <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-10 rounded-[3rem] bg-black border border-white/10 shadow-[0_0_100px_rgba(212,165,116,0.15)] flex flex-col items-center gap-6"
           >
              <div className="relative">
                <Loader2 className="w-16 h-16 text-[#d4a574] animate-spin" />
                <Sparkles className="w-6 h-6 text-[#c9a068] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
              </div>
              <div className="text-center">
                <h4 className="text-xl font-bold text-white mb-2 tracking-tight">AI Analysis in Progress</h4>
                <p className="text-gray-600 text-xs font-bold uppercase tracking-widest">Parsing Resumes & Ranking Skills</p>
              </div>
           </motion.div>
        </div>
      )}
    </main>
  );
}