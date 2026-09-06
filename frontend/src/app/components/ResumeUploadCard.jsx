import { Upload, File, X, Info, CheckCircle2 } from 'lucide-react';
import { useState, useRef } from 'react';

export function ResumeUploadCard({ files, setFiles }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    setFiles((prev) => [...prev, ...droppedFiles]);
  };

  return (
    <div className="group p-8 rounded-3xl bg-white/[0.03] backdrop-blur-2xl border border-[#d4a574]/20 hover:border-[#d4a574]/40 shadow-2xl transition-all duration-500 overflow-hidden relative">
      {/* Visual noise background */}
      <div className="absolute inset-0 opacity-[0.01] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#d4a574] to-[#c9a068] flex items-center justify-center shadow-2xl shadow-[#d4a574]/30">
          <Upload className="w-6 h-6 text-black" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight">Resume Source</h3>
          <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest">Upload Multiple PDF Files</p>
        </div>
      </div>

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-[2rem] p-12 text-center transition-all duration-500 cursor-pointer group/uploader overflow-hidden ${
          isDragging 
            ? 'border-[#d4a574] bg-[#d4a574]/10 shadow-[0_0_40px_rgba(212,165,116,0.1)] scale-[0.99]' 
            : 'border-white/10 hover:border-[#d4a574]/50 hover:bg-white/[0.02]'
        }`}
      >
        {/* Animated gradient ring */}
        {isDragging && (
          <div className="absolute inset-0 bg-gradient-to-r from-[#d4a574]/10 via-transparent to-[#c9a068]/10 animate-[pulse_2s_infinite]" />
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          accept=".pdf"
          className="hidden"
        />

        <div className="relative z-10">
          <div className={`w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-6 group-hover/uploader:scale-110 group-hover/uploader:bg-[#d4a574]/10 transition-all duration-500 ${isDragging ? 'rotate-12 scale-110' : ''}`}>
            <Upload className={`w-8 h-8 text-gray-600 transition-colors duration-500 group-hover/uploader:text-[#d4a574] ${isDragging ? 'text-[#d4a574]' : ''}`} />
          </div>
          <h4 className="text-lg font-bold text-gray-300 mb-2">Drop resumes here</h4>
          <p className="text-sm text-gray-500 mb-0 font-medium">or click to browse your files</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
             <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] text-gray-500 font-bold uppercase tracking-widest border border-white/5">PDF format only</span>
             <span className="px-3 py-1 rounded-full bg-white/5 text-[10px] text-gray-500 font-bold uppercase tracking-widest border border-white/5">Max 100 Files</span>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-10 space-y-3">
          <div className="flex items-center justify-between mb-4 px-2">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
              <CheckCircle2 className="w-3 h-3 text-green-500" />
              Selected Resumes ({files.length})
            </span>
            <button 
              onClick={(e) => { e.stopPropagation(); setFiles([]); }}
              className="text-[10px] font-bold text-red-500/80 hover:text-red-400 uppercase tracking-widest"
            >
              Clear All
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.04] border border-white/5 group/file hover:border-[#d4a574]/30 hover:bg-white/[0.06] transition-all duration-300"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 group-hover/file:bg-[#d4a574]/10 transition-colors">
                    <File className="w-5 h-5 text-gray-600 group-hover/file:text-[#d4a574]" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-gray-300 truncate tracking-tight">{file.name}</p>
                    <p className="text-[10px] text-gray-600 font-bold uppercase">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); removeFile(index); }}
                  className="p-2 rounded-lg hover:bg-red-500/10 text-gray-700 hover:text-red-500 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
