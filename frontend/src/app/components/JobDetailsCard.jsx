import { Briefcase, Info } from 'lucide-react';
import { useState } from 'react';








export function JobDetailsCard({
  jobTitle,
  setJobTitle,
  jobDescription,
  setJobDescription
}) {
  const [titleFocused, setTitleFocused] = useState(false);
  const [descFocused, setDescFocused] = useState(false);

  return (
    <div className="group p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-[#d4a574]/20 hover:border-[#d4a574]/30 shadow-xl hover:shadow-2xl transition-all duration-300">
      {/* Card Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4a574] to-[#c9a068] flex items-center justify-center shadow-lg shadow-[#d4a574]/20">
          <Briefcase className="w-5 h-5 text-black" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white">Job Details</h3>
          <p className="text-xs text-gray-400">Basic information about the position</p>
        </div>
      </div>

      {/* Job Title Input */}
      <div className="mb-6">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
          Job Title
          <div className="group/tooltip relative">
            <Info className="w-3.5 h-3.5 text-gray-500 cursor-help" />
            <div className="absolute left-0 bottom-full mb-2 w-48 px-3 py-2 bg-gray-900 text-xs text-white rounded-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 shadow-xl border border-white/10">
              Enter the exact job title for the position
            </div>
          </div>
        </label>
        <div className={`relative rounded-xl transition-all duration-300 ${
        titleFocused ? 'shadow-lg shadow-[#d4a574]/20' : ''}`
        }>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            onFocus={() => setTitleFocused(true)}
            onBlur={() => setTitleFocused(false)}
            placeholder="e.g., Senior Software Engineer"
            className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-gray-500 outline-none transition-all duration-300 ${
            titleFocused ?
            'border-[#d4a574]/50 bg-white/8 shadow-[0_0_20px_rgba(212,165,116,0.15)]' :
            'border-white/10 hover:border-[#d4a574]/20 hover:bg-white/8'}`
            } />
          
          {jobTitle &&
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </div>
          }
        </div>
      </div>

      {/* Job Description Textarea */}
      <div>
        <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
          Job Description
          <div className="group/tooltip relative">
            <Info className="w-3.5 h-3.5 text-gray-500 cursor-help" />
            <div className="absolute left-0 bottom-full mb-2 w-56 px-3 py-2 bg-gray-900 text-xs text-white rounded-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 shadow-xl border border-white/10 z-10">
              Describe key responsibilities, required skills, and qualifications
            </div>
          </div>
        </label>
        <div className={`relative rounded-xl transition-all duration-300 ${
        descFocused ? 'shadow-lg shadow-[#d4a574]/20' : ''}`
        }>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            onFocus={() => setDescFocused(true)}
            onBlur={() => setDescFocused(false)}
            placeholder="Describe the role, responsibilities, required skills, and qualifications..."
            rows={6}
            className={`w-full px-4 py-3 rounded-xl bg-white/5 border text-white placeholder-gray-500 outline-none resize-none transition-all duration-300 ${
            descFocused ?
            'border-[#d4a574]/50 bg-white/8 shadow-[0_0_20px_rgba(212,165,116,0.15)]' :
            'border-white/10 hover:border-[#d4a574]/20 hover:bg-white/8'}`
            } />
          
          {jobDescription &&
          <div className="absolute right-3 top-3">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </div>
          }
        </div>
        <p className="text-xs text-gray-500 mt-2">{jobDescription.length} characters</p>
      </div>
    </div>);

}