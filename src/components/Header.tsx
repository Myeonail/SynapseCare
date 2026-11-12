import React from 'react';
import { ActiveTab } from '../types';
import { 
  Activity, 
  BookOpen, 
  Calendar, 
  Heart, 
  Layers, 
  Package, 
  RotateCcw, 
  Sparkles, 
  Users 
} from 'lucide-react';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isSimulationLoaded: boolean;
  onToggleSimulation: () => void;
  patientCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isSimulationLoaded,
  onToggleSimulation,
  patientCount
}) => {
  const navTabs: { id: ActiveTab; label: string; icon: React.ReactNode }[] = [
    { id: 'ringkasan', label: 'Ringkasan', icon: <Layers className="w-4 h-4" /> },
    { id: 'pemantauan_klinis', label: 'Modul Pemantauan Klinis', icon: <Calendar className="w-4 h-4" /> },
    { id: 'edukasi', label: 'Modul Edukasi', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'logistik_jit', label: 'Modul Logistik (JIT)', icon: <Package className="w-4 h-4" /> },
    { id: 'lintas_sektor', label: 'Modul Koordinasi Lintas Sektor', icon: <Users className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-rose-100 shadow-sm shadow-rose-100/50">
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 text-white text-xs px-4 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <Sparkles className="w-3.5 h-3.5 shrink-0 animate-pulse text-rose-100" />
          <span className="font-medium tracking-wide">
            SynapseCare: Ekosistem Tata Kelola Digital Menstrual Hygiene Management (MHM) ODGJ Perempuan
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-rose-100 text-[11px]">
          <span>UU No. 8/2016 Disabilitas Mental</span>
          <span>·</span>
          <span>WHO-UNICEF MHM Standard</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 gap-4">
          
          {/* Brand Wordmark (Reference style: clean floating aesthetic with soft pink mark) */}
          <div 
            onClick={() => setActiveTab('ringkasan')}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center text-white shadow-md shadow-rose-300/50 group-hover:scale-105 transition-transform duration-200">
              <Heart className="w-5 h-5 fill-white/30" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-rose-600 transition-colors">
                  SynapseCare
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 border border-rose-200 rounded-md px-1.5 py-0.5">
                  MHM ODGJ
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden md:block">
                Ekosistem Tata Kelola Digital Menstrual Hygiene Management
              </p>
            </div>
          </div>

          {/* Quick Simulation Mode & Status Switcher */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onToggleSimulation}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all ${
                isSimulationLoaded 
                  ? 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
              }`}
              title="Ganti antara data awal kosong (0 pasien) dan simulasi percontohan RSJ"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {isSimulationLoaded ? 'Data Pilot RSJ Aktif (4 Pasien)' : 'Data Awal (0 Pasien)'}
              </span>
              <span className="sm:hidden">
                {isSimulationLoaded ? '4 Pasien' : '0 Pasien'}
              </span>
            </button>
          </div>

        </div>

        {/* Tab Navigation (Styled like the clean segmented nav in the reference screenshot) */}
        <nav className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto py-1 scrollbar-none border-t border-rose-100/60 text-xs sm:text-sm font-medium">
          {navTabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-3 sm:px-4 py-2.5 rounded-xl whitespace-nowrap shrink-0 transition-all flex items-center gap-2 ${
                  isActive
                    ? 'text-rose-600 font-semibold bg-rose-50/80'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-rose-50/30'
                }`}
              >
                <span className={isActive ? 'text-rose-500' : 'text-slate-400'}>
                  {tab.icon}
                </span>
                <span>{tab.label}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
