import { Plus, Clock, User, ChevronRight, LogOut, LayoutDashboard } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useHistoryStore } from '../../store/historyStore';

export function Sidebar() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  
  const screenings = useHistoryStore((state) => state.screenings);
  const selectedScreening = useHistoryStore((state) => state.selectedScreening);
  const selectScreening = useHistoryStore((state) => state.selectScreening);
  const resetScreening = useHistoryStore((state) => state.resetScreening);

  return (
    <aside className="w-[320px] h-screen border-r border-[#d4a574]/20 backdrop-blur-xl bg-[#d4a574]/[0.03] flex flex-col z-20">
      {/* Logo / Header */}
      <div className="p-6 border-b border-[#d4a574]/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#d4a574] to-[#c9a068] flex items-center justify-center shadow-lg shadow-[#d4a574]/20">
            <LayoutDashboard className="w-5 h-5 text-black" />
          </div>
          <div>
            <h1 className="text-white font-semibold tracking-tight">Screener AI</h1>
            <p className="text-[10px] text-gray-500 font-medium uppercase tracking-[0.2em]">Dashboard</p>
          </div>
        </div>
      </div>

      {/* New Screening Button */}
      <div className="p-6">
        <button
          onClick={resetScreening}
          className="w-full px-6 py-4 rounded-2xl bg-gradient-to-r from-[#d4a574] to-[#c9a068] text-black font-bold shadow-lg shadow-[#d4a574]/20 hover:shadow-[#d4a574]/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 group"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          New Screening
        </button>
      </div>

      {/* Recent Screenings */}
      <div className="flex-1 overflow-auto px-4 pb-4">
        <div className="mb-3 px-2 flex items-center justify-between">
          <h3 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Recent Screenings</h3>
          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-white/5 text-gray-500">{screenings.length}</span>
        </div>
        
        {screenings.length === 0 ? (
          <div className="p-8 text-center bg-white/[0.02] rounded-2xl border border-white/5 mx-2">
            <Clock className="w-8 h-8 text-gray-700 mx-auto mb-3" />
            <p className="text-xs text-gray-600 font-medium leading-relaxed">No screening history yet. Start your first one!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {screenings.map((screening) => (
              <button
                key={screening.id}
                onClick={() => selectScreening(screening)}
                className={`w-full p-4 rounded-2xl text-left transition-all duration-300 group border ${
                  selectedScreening?.id === screening.id
                    ? 'bg-[#d4a574]/15 border-[#d4a574]/40 shadow-xl shadow-[#d4a574]/10'
                    : 'bg-white/[0.03] hover:bg-white/[0.06] border-transparent'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h4 className={`text-sm font-bold truncate ${selectedScreening?.id === screening.id ? 'text-[#d4a574]' : 'text-gray-300'}`}>
                    {screening.title}
                  </h4>
                  <ChevronRight className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${
                    selectedScreening?.id === screening.id ? 'translate-x-1 text-[#d4a574]' : 'group-hover:translate-x-1'
                  }`} />
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
                    <Clock className="w-3 h-3" />
                    {new Date(screening.id).toLocaleDateString()}
                  </div>
                  <div className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-[9px] font-bold uppercase tracking-wider">
                    Completed
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* User Section */}
      <div className="p-4 border-t border-[#d4a574]/20 bg-black/20">
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] transition-all duration-300 group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d4a574] to-[#c9a068] flex items-center justify-center shadow-lg ring-2 ring-white/10 group-hover:ring-[#d4a574]/30 transition-all">
            <User className="w-5 h-5 text-black" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-white truncate">{user?.email || "Recruiter"}</p>
            <button 
              onClick={logout}
              className="text-[10px] text-[#d4a574] hover:text-white flex items-center gap-1 transition-colors font-bold uppercase tracking-widest mt-0.5"
            >
              <LogOut className="w-3 h-3" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}