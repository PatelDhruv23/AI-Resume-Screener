import { Users, Minus, Plus, Info } from 'lucide-react';






export function ShortlistSettingsCard({
  maxShortlist,
  setMaxShortlist
}) {
  const handleIncrement = () => {
    if (maxShortlist < 100) {
      setMaxShortlist(maxShortlist + 1);
    }
  };

  const handleDecrement = () => {
    if (maxShortlist > 1) {
      setMaxShortlist(maxShortlist - 1);
    }
  };

  const handleInputChange = (e) => {
    const value = parseInt(e.target.value) || 1;
    setMaxShortlist(Math.max(1, Math.min(100, value)));
  };

  return (
    <div className="group p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-[#d4a574]/20 hover:border-[#d4a574]/30 shadow-xl hover:shadow-2xl transition-all duration-300">
      {/* Card Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4a574] to-[#c9a068] flex items-center justify-center shadow-lg shadow-[#d4a574]/20">
          <Users className="w-5 h-5 text-black" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">Shortlist Settings</h3>
          <p className="text-xs text-gray-400">Maximum candidates to shortlist</p>
        </div>
        <div className="group/tooltip relative">
          <Info className="w-4 h-4 text-gray-500 cursor-help" />
          <div className="absolute right-0 bottom-full mb-2 w-56 px-3 py-2 bg-gray-900 text-xs text-white rounded-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 shadow-xl border border-white/10 z-10">
            Set the maximum number of top candidates to include in your shortlist
          </div>
        </div>
      </div>

      {/* Stepper Control */}
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={handleDecrement}
          disabled={maxShortlist <= 1}
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
          maxShortlist <= 1 ?
          'bg-white/5 text-gray-600 cursor-not-allowed' :
          'bg-white/10 hover:bg-white/15 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95'}`
          }>
          
          <Minus className="w-5 h-5" />
        </button>

        <div className="relative">
          <input
            type="number"
            value={maxShortlist}
            onChange={handleInputChange}
            min={1}
            max={100}
            className="w-32 h-16 text-center text-3xl font-bold text-white bg-white/10 border border-white/20 rounded-xl outline-none focus:border-[#d4a574]/50 focus:bg-white/15 focus:shadow-[0_0_20px_rgba(212,165,116,0.15)] transition-all duration-300 tabular-nums" />
          
          <div className="absolute -bottom-6 left-0 right-0 text-center text-xs text-gray-500">
            candidates
          </div>
        </div>

        <button
          onClick={handleIncrement}
          disabled={maxShortlist >= 100}
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
          maxShortlist >= 100 ?
          'bg-white/5 text-gray-600 cursor-not-allowed' :
          'bg-white/10 hover:bg-white/15 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95'}`
          }>
          
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Info Cards */}
      <div className="mt-10 grid grid-cols-3 gap-3">
        <div className="p-3 rounded-xl bg-[#d4a574]/10 border border-[#d4a574]/30 text-center">
          <div className="text-xs text-[#d4a574] mb-1">Min</div>
          <div className="text-lg font-bold text-[#d4a574]">1</div>
        </div>
        <div className="p-3 rounded-xl bg-[#c9a068]/10 border border-[#c9a068]/30 text-center">
          <div className="text-xs text-[#c9a068] mb-1">Current</div>
          <div className="text-lg font-bold text-[#c9a068]">{maxShortlist}</div>
        </div>
        <div className="p-3 rounded-xl bg-[#b8945c]/10 border border-[#b8945c]/30 text-center">
          <div className="text-xs text-[#b8945c] mb-1">Max</div>
          <div className="text-lg font-bold text-[#b8945c]">100</div>
        </div>
      </div>
    </div>);

}