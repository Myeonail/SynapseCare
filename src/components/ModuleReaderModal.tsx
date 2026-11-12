import React, { useState } from 'react';
import { EducationModule } from '../types';
import { 
  Award, 
  BookOpen, 
  Check, 
  CheckCircle2, 
  Clock, 
  FileCheck, 
  Heart, 
  Play, 
  ShieldCheck, 
  Sparkles, 
  Users, 
  X 
} from 'lucide-react';

interface ModuleReaderModalProps {
  module: EducationModule | null;
  onClose: () => void;
  onToggleComplete: (moduleId: string) => void;
}

export const ModuleReaderModal: React.FC<ModuleReaderModalProps> = ({
  module,
  onClose,
  onToggleComplete
}) => {
  if (!module) return null;

  const [activeTab, setActiveTab] = useState<'konten' | 'protokol' | 'martabat'>('konten');
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const toggleCheck = (idx: number) => {
    setCheckedItems(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm p-3 sm:p-6 flex items-start sm:items-center justify-center">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-3xl w-full shadow-2xl border border-rose-100 flex flex-col max-h-[90vh] my-auto animate-scaleUp">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-rose-100 gap-4 shrink-0">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                {module.category} · {module.targetAudience}
              </span>
              <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{module.durationMinutes} menit waktu belajar</span>
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
              {module.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher inside Modal */}
        <div className="flex items-center gap-2 border-b border-rose-50 pb-2 text-xs font-semibold shrink-0">
          <button
            onClick={() => setActiveTab('konten')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'konten'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-rose-50'
            }`}
          >
            Materi & Ringkasan
          </button>
          <button
            onClick={() => setActiveTab('protokol')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'protokol'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-rose-50'
            }`}
          >
            Protokol Asuhan Klinis
          </button>
          <button
            onClick={() => setActiveTab('martabat')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'martabat'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-rose-50'
            }`}
          >
            Checklist Perlindungan Martabat
          </button>
        </div>

        {/* Scrollable Modal Body Container */}
        <div className="flex-1 overflow-y-auto pr-1 py-2 space-y-4">
          {/* Tab 1: Konten Utama & Media */}
          {activeTab === 'konten' && (
            <div className="space-y-5 text-xs sm:text-sm text-slate-700">
            {/* Simulated Video or Infographic Media Frame */}
            <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-rose-950 text-white p-6 sm:p-8 flex flex-col items-center justify-center text-center relative overflow-hidden min-h-[180px]">
              <div className="absolute inset-0 bg-rose-500/10 blur-xl pointer-events-none" />
              
              {!isVideoPlaying ? (
                <div className="relative z-10 space-y-3">
                  <button
                    onClick={() => setIsVideoPlaying(true)}
                    className="w-14 h-14 rounded-full bg-rose-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-rose-500/50 hover:scale-110 transition-transform"
                  >
                    <Play className="w-6 h-6 fill-white ml-1" />
                  </button>
                  <p className="font-bold text-white text-sm sm:text-base">
                    Simulasi Audio-Visual: {module.title}
                  </p>
                  <span className="text-[11px] text-rose-200">
                    Standar WHO-UNICEF MHM & Pedoman Keperawatan Jiwa Indonesia
                  </span>
                </div>
              ) : (
                <div className="relative z-10 space-y-2 py-4">
                  <div className="flex items-center justify-center gap-2 text-rose-300 animate-pulse text-xs">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                    <span>Media Interaktif Sedang Berjalan (Simulasi Pemutaran)</span>
                  </div>
                  <p className="text-white font-medium text-xs sm:text-sm max-w-lg">
                    "{module.summary}"
                  </p>
                  <button
                    onClick={() => setIsVideoPlaying(false)}
                    className="text-xs bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-full mt-2"
                  >
                    Jeda Simulasi
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-slate-900 text-sm">Poin Pembelajaran Kunci:</h4>
              <ul className="space-y-2">
                {module.learningPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-600 font-bold flex items-center justify-center shrink-0 mt-0.5 text-xs">
                      {idx + 1}
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Tab 2: Protokol Asuhan Klinis */}
        {activeTab === 'protokol' && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-700">
            <p className="text-xs text-slate-500 italic">
              Langkah operasional bagi perawat di bangsal rawat inap, rawat jalan, maupun caregiver keluarga di rumah:
            </p>
            <div className="space-y-3">
              {module.protocolSteps.map((step, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-rose-50/50 border border-rose-100 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-rose-500 text-white font-bold flex items-center justify-center shrink-0 text-xs shadow-sm">
                    {idx + 1}
                  </div>
                  <p className="text-slate-800 leading-relaxed font-medium">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Checklist Perlindungan Martabat */}
        {activeTab === 'martabat' && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-700">
            <div className="p-3.5 rounded-2xl bg-gradient-to-r from-rose-50 to-pink-50 border border-rose-200/60 flex items-center gap-3">
              <Heart className="w-5 h-5 text-rose-600 shrink-0" />
              <p className="text-xs text-slate-700 leading-relaxed">
                <strong className="text-slate-900">Prinsip Humanis Trauma-Informed Care:</strong> Menjaga martabat dan privasi pasien dengan keterbatasan kognitif adalah hak asasi yang dilindungi undang-undang.
              </p>
            </div>

            <div className="space-y-2.5">
              {module.dignityChecklist.map((item, idx) => (
                <label
                  key={idx}
                  onClick={() => toggleCheck(idx)}
                  className={`p-3.5 rounded-xl border flex items-center gap-3 cursor-pointer transition-all ${
                    checkedItems[idx] 
                      ? 'bg-emerald-50/60 border-emerald-200' 
                      : 'bg-white border-slate-200 hover:border-rose-200'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={!!checkedItems[idx]}
                    onChange={() => {}}
                    className="w-4 h-4 accent-emerald-600 rounded"
                  />
                  <span className={`text-xs sm:text-sm leading-snug ${checkedItems[idx] ? 'text-emerald-900 font-semibold line-through' : 'text-slate-800'}`}>
                    {item}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}
        </div>

        {/* Modal Footer */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-rose-100 shrink-0">
          <span className="text-xs text-slate-400">
            Status: {module.completed ? 'Sudah diselesaikan oleh perawat' : 'Belum selesai'}
          </span>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="w-1/2 sm:w-auto px-5 py-2.5 rounded-full border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors text-xs"
            >
              Tutup
            </button>
            <button
              onClick={() => {
                onToggleComplete(module.id);
                onClose();
              }}
              className={`w-1/2 sm:w-auto px-6 py-2.5 rounded-full font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 ${
                module.completed
                  ? 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
                  : 'bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white shadow-rose-300/40'
              }`}
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{module.completed ? 'Batal Selesai' : 'Tandai Selesai & Perbarui Progres'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
