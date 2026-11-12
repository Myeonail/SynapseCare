import React from 'react';
import { ActiveTab, EducationModule, LogisticsItem, Patient, SectorPartner } from '../types';
import { 
  ArrowRight, 
  BookOpen, 
  Calendar, 
  CheckCircle2, 
  ChevronRight, 
  Clock, 
  HeartHandshake, 
  Package, 
  Quote, 
  Sparkles, 
  TrendingUp, 
  Users 
} from 'lucide-react';

interface OverviewTabProps {
  patients: Patient[];
  educationModules: EducationModule[];
  logistics: LogisticsItem[];
  partners: SectorPartner[];
  setActiveTab: (tab: ActiveTab) => void;
  onOpenAddPatient: () => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  patients,
  educationModules,
  logistics,
  partners,
  setActiveTab,
  onOpenAddPatient
}) => {
  const patientCount = patients.length;
  const menstruatingCount = patients.filter(p => p.isCurrentlyMenstruating).length;
  const completedEduCount = educationModules.filter(m => m.completed).length;
  const activePartnershipsCount = partners.filter(p => p.status === 'Aktif').length;

  const padItem = logistics.find(i => i.id === 'log-1');
  const currentStockPads = padItem ? padItem.currentStock : 420;
  
  // Calculate projected pad requirement based on active and upcoming menstrual patients
  // Average menstrual cycle duration = 5 days, pads needed = daily requirement
  const projectedPadsNeed = patients.reduce((acc, curr) => {
    return acc + (curr.dailyPadRequirement * (curr.periodDurationDays || 5));
  }, 0);

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      
      {/* Hero Welcome Banner (Reference visual: soft pink curve card with prominent greeting) */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white via-rose-50/50 to-pink-50/60 p-6 sm:p-10 border border-rose-100 shadow-xl shadow-rose-200/30">
        
        {/* Soft background ambient gradient circles */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-gradient-to-br from-rose-200/40 to-pink-300/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-gradient-to-tr from-pink-200/30 to-rose-100/40 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-500 bg-rose-100/80 px-2.5 py-1 rounded-full">
              Selamat Siang
            </span>
            <span className="text-xs text-slate-500 font-medium">
              Sistem Terpadu Pelayanan Jiwa & MHM
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Merawat dengan Data, <span className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">Mendampingi dengan Hati</span>
          </h1>

          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Beranda ini merangkum empat modul yang saling terhubung membantu tenaga keperawatan memberi perhatian penuh pada pasien, tanpa kehilangan ketelitian data.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('pemantauan_klinis')}
              className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-medium text-sm px-5 py-2.5 rounded-full shadow-md shadow-rose-300/40 hover:shadow-lg transition-all flex items-center gap-2"
            >
              <span>Buka Kalender Pemantauan</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenAddPatient}
              className="bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 font-medium text-sm px-5 py-2.5 rounded-full shadow-sm transition-all"
            >
              + Tambah Pasien Baru
            </button>
          </div>
        </div>

      </div>

      {/* 4 Metric Counter Cards (Inspired by clean credit-card floating design from reference screenshot) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Card 1: Pasien Dipantau */}
        <div 
          onClick={() => setActiveTab('pemantauan_klinis')}
          className="cursor-pointer group relative overflow-hidden rounded-2xl bg-white p-5 sm:p-6 border border-rose-100/80 shadow-lg shadow-rose-100/50 hover:shadow-xl hover:shadow-rose-200/50 hover:-translate-y-1 transition-all duration-200"
        >
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Pasien Dipantau</span>
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center group-hover:bg-rose-500 group-hover:text-white transition-colors">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono tabular-nums">
              {patientCount}
            </span>
            <span className="text-xs text-slate-500">jiwa aktif</span>
          </div>
          <div className="mt-3 flex items-center gap-1 text-[11px] text-rose-600 font-medium">
            <span>Rawat inap, jalan & rehab</span>
            <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 2: Sedang Menstruasi */}
        <div 
          onClick={() => setActiveTab('pemantauan_klinis')}
          className="cursor-pointer group relative overflow-hidden rounded-2xl bg-white p-5 sm:p-6 border border-rose-100/80 shadow-lg shadow-rose-100/50 hover:shadow-xl hover:shadow-rose-200/50 hover:-translate-y-1 transition-all duration-200"
        >
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Sedang Menstruasi</span>
            <div className="w-9 h-9 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center group-hover:bg-pink-500 group-hover:text-white transition-colors">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-pink-600 font-mono tabular-nums">
              {menstruatingCount}
            </span>
            <span className="text-xs text-slate-500">fase perdarahan aktif</span>
          </div>
          <div className="mt-3 flex items-center gap-1 text-[11px] text-pink-600 font-medium">
            <span>Butuh penggantian 4-6 jam</span>
            <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 3: Modul Edukasi Selesai */}
        <div 
          onClick={() => setActiveTab('edukasi')}
          className="cursor-pointer group relative overflow-hidden rounded-2xl bg-white p-5 sm:p-6 border border-rose-100/80 shadow-lg shadow-rose-100/50 hover:shadow-xl hover:shadow-rose-200/50 hover:-translate-y-1 transition-all duration-200"
        >
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Modul Edukasi</span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-mono tabular-nums">
              {completedEduCount}
            </span>
            <span className="text-xl font-bold text-slate-400">/6</span>
            <span className="text-xs text-slate-500 ml-1">Selesai</span>
          </div>
          <div className="mt-3 flex items-center gap-1 text-[11px] text-purple-600 font-medium">
            <span>Standar MHM & Trauma-informed</span>
            <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card 4: Kemitraan Aktif */}
        <div 
          onClick={() => setActiveTab('lintas_sektor')}
          className="cursor-pointer group relative overflow-hidden rounded-2xl bg-white p-5 sm:p-6 border border-rose-100/80 shadow-lg shadow-rose-100/50 hover:shadow-xl hover:shadow-rose-200/50 hover:-translate-y-1 transition-all duration-200"
        >
          <div className="flex items-center justify-between text-slate-500 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">Kemitraan Aktif</span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <HeartHandshake className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-extrabold text-emerald-600 font-mono tabular-nums">
              {activePartnershipsCount}
            </span>
            <span className="text-xs text-slate-500">entitas kolaboratif</span>
          </div>
          <div className="mt-3 flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
            <span>CSR Korporasi & Dinkes</span>
            <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

      </div>

      {/* Quote Card (Exact prompt requirement) */}
      <div className="rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-rose-400 p-6 sm:p-8 text-white shadow-lg shadow-rose-300/40 relative overflow-hidden">
        <Quote className="absolute -bottom-4 -right-4 w-32 h-32 text-white/10 pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <p className="text-base sm:text-lg lg:text-xl font-medium italic leading-relaxed">
            "Setiap siklus yang tercatat dengan baik adalah bentuk penghormatan terhadap martabat dan kenyamanan pasien."
          </p>
          <div className="mt-4 flex items-center gap-2">
            <span className="w-6 h-0.5 bg-rose-200 rounded-full" />
            <p className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-rose-100">
              Prinsip Layanan SynapseCare
            </p>
          </div>
        </div>
      </div>

      {/* Arsitektur Ekosistem & Proyeksi Kebutuhan Bulan Ini */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Arsitektur Ekosistem (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-rose-100/90 shadow-xl shadow-rose-100/40">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-rose-100">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-rose-500">
                Arsitektur Ekosistem
              </span>
              <h2 className="text-xl font-bold text-slate-900">
                4 Pilar Tata Kelola MHM Terpadu
              </h2>
            </div>
            <span className="text-xs bg-rose-50 text-rose-700 px-3 py-1 rounded-full font-medium">
              Siklus Terintegrasi
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Pilar 1: Pemantauan Klinis */}
            <div 
              onClick={() => setActiveTab('pemantauan_klinis')}
              className="p-4 rounded-2xl border border-rose-100 bg-rose-50/40 hover:bg-rose-50/80 cursor-pointer transition-all hover:scale-[1.02] group"
            >
              <div className="w-8 h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center mb-3 shadow-sm shadow-rose-400/40">
                <Calendar className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                1. Pemantauan Klinis
              </h3>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                Kalender digital mendeteksi keterlambatan siklus (indikator dini gangguan reproduksi) serta mencatat perubahan perilaku dan mood tanpa beban administrasi perawat.
              </p>
            </div>

            {/* Pilar 2: Edukasi Kesehatan */}
            <div 
              onClick={() => setActiveTab('edukasi')}
              className="p-4 rounded-2xl border border-pink-100 bg-pink-50/40 hover:bg-pink-50/80 cursor-pointer transition-all hover:scale-[1.02] group"
            >
              <div className="w-8 h-8 rounded-xl bg-pink-500 text-white flex items-center justify-center mb-3 shadow-sm shadow-pink-400/40">
                <BookOpen className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-pink-600 transition-colors">
                2. Edukasi Kesehatan
              </h3>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                Materi pendampingan bagi perawat, pengasuh, dan keluarga mengenai praktik MHM serta deteksi infeksi saluran reproduksi pada keterbatasan kognitif.
              </p>
            </div>

            {/* Pilar 3: Logistik Just-in-Time */}
            <div 
              onClick={() => setActiveTab('logistik_jit')}
              className="p-4 rounded-2xl border border-rose-100 bg-rose-50/40 hover:bg-rose-50/80 cursor-pointer transition-all hover:scale-[1.02] group"
            >
              <div className="w-8 h-8 rounded-xl bg-rose-600 text-white flex items-center justify-center mb-3 shadow-sm shadow-rose-500/40">
                <Package className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                3. Logistik Just-in-Time
              </h3>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                Mengonversi data real-time kalender menjadi proyeksi kebutuhan paket sanitasi bulanan secara otomatis berdasarkan jumlah pasien aktif.
              </p>
            </div>

            {/* Pilar 4: Koordinasi Lintas Sektor */}
            <div 
              onClick={() => setActiveTab('lintas_sektor')}
              className="p-4 rounded-2xl border border-pink-100 bg-pink-50/40 hover:bg-pink-50/80 cursor-pointer transition-all hover:scale-[1.02] group"
            >
              <div className="w-8 h-8 rounded-xl bg-pink-600 text-white flex items-center justify-center mb-3 shadow-sm shadow-pink-500/40">
                <Users className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-pink-600 transition-colors">
                4. Koordinasi Lintas Sektor
              </h3>
              <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                Data agregat kepatuhan MHM anonim bagi Kemenkes/Dinkes, serta jalur kemitraan CSR korporasi FMCG nasional yang tepat sasaran.
              </p>
            </div>

          </div>

          {/* Central Hub Connect Banner */}
          <div className="mt-6 p-4 rounded-2xl bg-gradient-to-r from-rose-100/60 to-pink-100/60 border border-rose-200/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-rose-600 shrink-0" />
              <p className="text-xs text-slate-700 font-medium">
                Pusat Integrasi: <strong className="text-rose-700">SynapseCare Core</strong> menghubungkan klinis, logistik, dan advokasi kebijakan publik.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('edukasi')}
              className="text-xs font-semibold text-rose-600 hover:text-rose-800 whitespace-nowrap"
            >
              Buka Modul Edukasi →
            </button>
          </div>
        </div>

        {/* Right Column: Proyeksi Kebutuhan Bulan Ini (5 Cols) (Exact prompt requirement) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-rose-100/90 shadow-xl shadow-rose-100/40 space-y-6">
          <div className="border-b border-rose-100 pb-4">
            <span className="text-[11px] font-bold uppercase tracking-widest text-rose-500">
              Proyeksi Kebutuhan Bulan Ini
            </span>
            <p className="mt-1 text-xs text-slate-500 leading-normal">
              Dihitung otomatis dari jumlah pasien yang sedang/akan memasuki periode menstruasi.
            </p>
          </div>

          {/* Big Number Display (Matches prompt: "0 pcs pembalut, Stok saat ini: 420 pcs lihat detail di modul Logistik") */}
          <div className="rounded-2xl bg-gradient-to-br from-[#FFF5F6] to-[#FFEBEF] p-6 border border-rose-200/60 text-center relative overflow-hidden">
            <div className="text-4xl sm:text-5xl font-extrabold text-slate-900 font-mono tabular-nums">
              {projectedPadsNeed}
            </div>
            <div className="text-sm font-semibold uppercase tracking-wider text-rose-600 mt-1">
              pcs pembalut dibutuhkan
            </div>
            <div className="mt-4 pt-3 border-t border-rose-200/50 flex items-center justify-between text-xs text-slate-600">
              <span>Stok saat ini: <strong className="text-slate-900 font-mono">{currentStockPads} pcs</strong></span>
              <span className={`font-semibold px-2 py-0.5 rounded-full ${
                currentStockPads >= projectedPadsNeed 
                  ? 'bg-emerald-100 text-emerald-800' 
                  : 'bg-rose-100 text-rose-800'
              }`}>
                {currentStockPads >= projectedPadsNeed ? 'Stok Aman' : 'Perlu Tambahan'}
              </span>
            </div>
          </div>

          {/* Secondary Sanitation Items breakdown */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-600">Sabun Antiseptik pH Seimbang</span>
              <span className="font-mono font-bold text-slate-900">
                {patientCount > 0 ? `${Math.ceil(patientCount * 1.5)} botol` : '0 botol'}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs p-3 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-slate-600">Celana Dalam Sekali Pakai</span>
              <span className="font-mono font-bold text-slate-900">
                {patientCount > 0 ? `${patientCount * 3} pcs` : '0 pcs'}
              </span>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => setActiveTab('logistik_jit')}
              className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold text-xs sm:text-sm py-3 px-4 rounded-full shadow-md shadow-rose-300/40 transition-all flex items-center justify-center gap-2"
            >
              <span>Lihat Detail di Modul Logistik</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <p className="text-[11px] text-slate-400 text-center italic">
            Prototipe visual SynapseCare ekosistem tata kelola MHM yang humanis, presisi, dan berkelanjutan.
          </p>
        </div>

      </div>

    </div>
  );
};
