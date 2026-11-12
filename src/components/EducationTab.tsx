import React, { useState } from 'react';
import { EducationModule } from '../types';
import { 
  Award, 
  BookOpen, 
  CheckCircle2, 
  ChevronRight, 
  Clock, 
  ExternalLink, 
  FileCheck, 
  FileText, 
  Heart, 
  Play, 
  Share2, 
  Sparkles, 
  Video 
} from 'lucide-react';

interface EducationTabProps {
  modules: EducationModule[];
  onToggleModuleCompletion: (moduleId: string) => void;
  onSelectModuleForDetail: (module: EducationModule) => void;
}

export const EducationTab: React.FC<EducationTabProps> = ({
  modules,
  onToggleModuleCompletion,
  onSelectModuleForDetail
}) => {
  const completedCount = modules.filter(m => m.completed).length;
  const progressPercentage = Math.round((completedCount / modules.length) * 100);

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'Video':
        return { icon: <Video className="w-3.5 h-3.5" />, color: 'bg-purple-50 text-purple-700 border-purple-200' };
      case 'Panduan':
        return { icon: <BookOpen className="w-3.5 h-3.5" />, color: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'Infografis':
        return { icon: <FileText className="w-3.5 h-3.5" />, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
      default:
        return { icon: <Heart className="w-3.5 h-3.5" />, color: 'bg-rose-50 text-rose-700 border-rose-200' };
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      
      {/* Header section matching exact prompt wording */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-rose-100">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-500">
            Modul 02
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Modul Edukasi Kesehatan Reproduksi
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Materi pendampingan bagi perawat, pengasuh, dan keluarga pasien.
          </p>
        </div>

        {/* Team Completion Progress Bar */}
        <div className="bg-white rounded-2xl p-4 border border-rose-100 shadow-sm min-w-[240px]">
          <div className="flex items-center justify-between text-xs font-semibold mb-2">
            <span className="text-slate-600">Progres penyelesaian tim</span>
            <span className="text-rose-600 font-mono text-sm">{progressPercentage}%</span>
          </div>
          <div className="w-full h-2.5 bg-rose-100/60 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="text-[11px] text-slate-400 mt-1.5 text-right">
            {completedCount} dari 6 modul selesai
          </div>
        </div>
      </div>

      {/* Educational Purpose Rationale */}
      <div className="bg-gradient-to-r from-white via-rose-50/40 to-pink-50/50 p-5 rounded-2xl border border-rose-100 text-xs sm:text-sm text-slate-700 leading-relaxed">
        <strong className="text-slate-900">Solusi Kesenjangan Personal Hygiene:</strong> Minimnya jurnal ilmiah dan belum meratanya RSJ di berbagai provinsi Indonesia menuntut adanya media pendampingan mandiri. Modul ini membekali perawat dan keluarga caregiver dengan pemahaman anatomi, higienitas bebas infeksi, serta komunikasi yang menjunjung martabat penyandang disabilitas kognitif saat menstruasi.
      </div>

      {/* 6 Modules Grid (matching prompt list directly) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => {
          const badge = getCategoryBadge(module.category);

          return (
            <div
              key={module.id}
              className={`rounded-3xl p-6 border transition-all duration-200 flex flex-col justify-between bg-white ${
                module.completed 
                  ? 'border-emerald-200 shadow-md shadow-emerald-50' 
                  : 'border-rose-100 shadow-lg shadow-rose-100/30 hover:border-rose-300 hover:-translate-y-1'
              }`}
            >
              <div>
                {/* Top metadata tags */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium border ${badge.color}`}>
                    {badge.icon}
                    <span>{module.category} · {module.targetAudience}</span>
                  </span>
                  
                  <span className="flex items-center gap-1 text-xs text-slate-400 font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{module.durationMinutes} menit</span>
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-rose-600 transition-colors">
                  {module.title}
                </h3>

                {/* Summary */}
                <p className="mt-2 text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  {module.summary}
                </p>

                {/* Preview bullets */}
                <div className="mt-4 pt-3 border-t border-rose-50 space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Fokus Utama:</span>
                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    ✓ {module.learningPoints[0]}
                  </p>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => onSelectModuleForDetail(module)}
                  className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1 group py-1"
                >
                  <span>Buka Materi</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => onToggleModuleCompletion(module.id)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all flex items-center gap-1.5 ${
                    module.completed
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300 font-semibold'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-rose-300 hover:text-rose-600'
                  }`}
                >
                  <CheckCircle2 className={`w-3.5 h-3.5 ${module.completed ? 'text-emerald-600 fill-emerald-100' : 'text-slate-400'}`} />
                  <span>{module.completed ? 'Terselesaikan' : 'Tandai Selesai'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dignity Training Philosophy Card */}
      <div className="rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 p-6 sm:p-8 text-white shadow-lg shadow-rose-300/40 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-rose-200" />
            <h3 className="font-bold text-lg text-white">
              Sertifikasi Mandiri & Modul Pendampingan Komprehensif
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-rose-100 max-w-2xl leading-relaxed">
            Seluruh materi diselaraskan dengan standar WHO/UNICEF JMP, Pedoman Pelayanan Jiwa Komprehensif Kemenkes RI, dan prinsip Trauma-Informed Care tanpa stigma.
          </p>
        </div>

        <button
          onClick={() => onSelectModuleForDetail(modules[0])}
          className="bg-white text-rose-700 hover:bg-rose-50 font-bold text-xs sm:text-sm px-6 py-3 rounded-full shadow-md whitespace-nowrap shrink-0 transition-colors"
        >
          Mulai Pelatihan Modul 1
        </button>
      </div>

      {/* Footer Tagline exact prompt requirement */}
      <div className="text-center pt-4">
        <p className="text-xs text-slate-400 italic">
          Prototipe visual SynapseCare ekosistem tata kelola MHM yang humanis, presisi, dan berkelanjutan
        </p>
      </div>

    </div>
  );
};
