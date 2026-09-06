import { Scale, Info, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Slider } from './ui/slider';











const categories = [
{ key: 'skill', label: 'Skills Match',  color: 'from-[#d4a574] to-[#c9a068]' },
{ key: 'experience', label: 'Years of Experience',  color: 'from-[#c9a068] to-[#b8945c]' },
{ key: 'project', label: 'Project Quality', color: 'from-[#b8945c] to-[#a68350]' },
{ key: 'education', label: 'Educational Background',  color: 'from-[#a68350] to-[#957244]' }];


export function WeightDistributionCard({ weights, setWeights }) {
  const totalWeight = Object.values(weights).reduce((acc, val) => acc + val, 0);
  const isValid = totalWeight === 100;
  const progressPercentage = Math.min(totalWeight, 100);

  const handleWeightChange = (key, value) => {
    setWeights({
      ...weights,
      [key]: value[0]
    });
  };

  return (
    <div className="group p-6 rounded-2xl bg-white/[0.03] backdrop-blur-xl border border-[#d4a574]/20 hover:border-[#d4a574]/30 shadow-xl hover:shadow-2xl transition-all duration-300">
      {/* Card Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4a574] to-[#c9a068] flex items-center justify-center shadow-lg shadow-[#d4a574]/20">
          <Scale className="w-5 h-5 text-black" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">Weight Distribution</h3>
          <p className="text-xs text-gray-400">Adjust scoring criteria importance (must total 100%)</p>
        </div>
        <div className="group/tooltip relative">
          <Info className="w-4 h-4 text-gray-500 cursor-help" />
          <div className="absolute right-0 bottom-full mb-2 w-64 px-3 py-2 bg-gray-900 text-xs text-white rounded-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 shadow-xl border border-white/10 z-10">
            Distribute 100% across all categories. Higher percentages give more importance to that criterion.
          </div>
        </div>
      </div>

      {/* Weight Sliders */}
      <div className="space-y-6 mb-6">
        {categories.map((category) =>
        <div key={category.key} className="group/slider">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">{category.icon}</span>
                <span className="text-sm font-medium text-gray-300">{category.label}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-white tabular-nums">
                  {weights[category.key]}%
                </span>
              </div>
            </div>
            <Slider
            value={[weights[category.key]]}
            onValueChange={(value) => handleWeightChange(category.key, value)}
            max={100}
            step={5}
            className="weight-slider" />
          
            {/* Visual indicator bar */}
            <div className="mt-2 h-1 bg-white/5 rounded-full overflow-hidden">
              <div
              className={`h-full bg-gradient-to-r ${category.color} transition-all duration-300 rounded-full`}
              style={{ width: `${weights[category.key]}%` }} />
            
            </div>
          </div>
        )}
      </div>

      {/* Total Progress Bar */}
      <div className="pt-6 border-t border-white/10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-gray-300">Total Weight</span>
          <div className="flex items-center gap-2">
            <span className={`text-lg font-bold tabular-nums transition-colors duration-300 ${
            isValid ? 'text-green-400' : totalWeight > 100 ? 'text-red-400' : 'text-yellow-400'}`
            }>
              {totalWeight}%
            </span>
            {isValid ?
            <CheckCircle2 className="w-5 h-5 text-green-400 animate-[pulse_1s_ease-in-out]" /> :

            <AlertCircle className="w-5 h-5 text-yellow-400 animate-pulse" />
            }
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="relative h-3 bg-white/5 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ease-out rounded-full ${
            isValid ?
            'bg-gradient-to-r from-green-500 to-emerald-500 shadow-[0_0_15px_rgba(34,197,94,0.5)]' :
            totalWeight > 100 ?
            'bg-gradient-to-r from-red-500 to-orange-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]' :
            'bg-gradient-to-r from-yellow-500 to-orange-500 shadow-[0_0_15px_rgba(234,179,8,0.5)]'}`
            }
            style={{ width: `${progressPercentage}%` }} />
          
          {/* Target line at 100% */}
          <div className="absolute right-0 top-0 bottom-0 w-0.5 bg-white/30" />
        </div>

        {/* Status Message */}
        <div className="mt-3 text-xs text-center">
          {isValid ?
          <span className="text-green-400 flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Perfect! Weights are balanced
            </span> :
          totalWeight > 100 ?
          <span className="text-red-400 flex items-center justify-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              Total exceeds 100% - reduce weights by {totalWeight - 100}%
            </span> :

          <span className="text-yellow-400 flex items-center justify-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" />
              Add {100 - totalWeight}% more to reach 100%
            </span>
          }
        </div>
      </div>
    </div>);

}