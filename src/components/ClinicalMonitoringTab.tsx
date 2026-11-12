import React, { useState } from 'react';
import { CareType, MoodBehaviorStatus, Patient } from '../types';
import { 
  AlertCircle, 
  Calendar as CalendarIcon, 
  Check, 
  Clock, 
  Filter, 
  Heart, 
  Info, 
  MapPin, 
  MessageCircle, 
  Moon, 
  Phone, 
  Plus, 
  Search, 
  ShieldAlert, 
  Smile, 
  Sparkles, 
  Trash2, 
  User, 
  UserCheck 
} from 'lucide-react';

interface ClinicalMonitoringTabProps {
  patients: Patient[];
  onOpenAddPatient: () => void;
  onDeletePatient: (id: string) => void;
  onLogHygieneChange: (patientId: string) => void;
  onUpdatePatientMood: (patientId: string, mood: any) => void;
  onLoadPilotData: () => void;
  onOpenFamilyChat: (patient: Patient) => void;
}

export const ClinicalMonitoringTab: React.FC<ClinicalMonitoringTabProps> = ({
  patients,
  onOpenAddPatient,
  onDeletePatient,
  onLogHygieneChange,
  onUpdatePatientMood,
  onLoadPilotData,
  onOpenFamilyChat
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [careFilter, setCareFilter] = useState<'all' | CareType>('all');
  const [selectedView, setSelectedView] = useState<'list' | 'calendar'>('list');
  const [recentlyUpdatedMoodPatientId, setRecentlyUpdatedMoodPatientId] = useState<string | null>(null);

  const handleMoodChange = (patientId: string, newMood: MoodBehaviorStatus) => {
    onUpdatePatientMood(patientId, newMood);
    setRecentlyUpdatedMoodPatientId(patientId);
    setTimeout(() => {
      setRecentlyUpdatedMoodPatientId((curr) => (curr === patientId ? null : curr));
    }, 2800);
  };

  // Filter patients
  const filteredPatients = patients.filter(patient => {
    const matchesSearch = 
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.medicalRecordNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.disabilityType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCare = careFilter === 'all' || patient.careType === careFilter;
    return matchesSearch && matchesCare;
  });

  const getCareBadge = (careType: CareType) => {
    switch (careType) {
      case 'rawat_inap':
        return { label: 'Rawat Inap (Akut/Krisis)', bg: 'bg-rose-50 text-rose-700 border-rose-200' };
      case 'rawat_jalan':
        return { label: 'Rawat Jalan (Kontrol & Obat)', bg: 'bg-blue-50 text-blue-700 border-blue-200' };
      case 'rehabilitasi':
        return { label: 'Rehabilitasi (Pemulihan Vokasional)', bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
    }
  };

  const getMoodBadge = (mood: string) => {
    switch (mood) {
      case 'agitasi_pramenstruasi':
        return { label: 'Agitasi Pra-Menstruasi (PME)', color: 'text-amber-700 bg-amber-50 border-amber-200' };
      case 'menolak_pembalut':
        return { label: 'Menolak Pembalut (Sensorik)', color: 'text-rose-700 bg-rose-50 border-rose-200' };
      case 'tenang':
        return { label: 'Kooperatif / Tenang', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
      default:
        return { label: 'Gelisah / Butuh Pendampingan', color: 'text-slate-700 bg-slate-100 border-slate-200' };
    }
  };

  // Calendar dates for November 2026
  const calendarDays = Array.from({ length: 30 }, (_, i) => i + 1);

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      
      {/* Top Banner / Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-rose-100">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-500">
            Modul 01
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Modul Pemantauan Klinis
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Kalender pencatatan siklus menstruasi & kepatuhan kebersihan untuk tenaga keperawatan.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenAddPatient}
            className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-medium text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-md shadow-rose-300/40 hover:shadow-lg transition-all flex items-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Pasien</span>
          </button>
        </div>
      </div>

      {/* Clinical Context Callout: UU No. 8/2016 & Disparitas Hormonal Obat */}
      <div className="rounded-2xl bg-gradient-to-r from-rose-50 via-pink-50/50 to-white p-5 border border-rose-200/60 shadow-sm text-xs sm:text-sm text-slate-700 space-y-2">
        <div className="flex items-start gap-2.5">
          <Info className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="text-slate-900">Landasan Klinis & Yuridis Pelayanan:</strong> Penanganan perempuan ODGJ diklasifikasikan ke dalam 
            <span className="text-rose-700 font-semibold"> Rawat Inap</span> (fase akut/krisis), 
            <span className="text-blue-700 font-semibold"> Rawat Jalan</span> (kontrol berkala/obat rutin), dan 
            <span className="text-emerald-700 font-semibold"> Rehabilitasi</span> (fase pemulihan). Status disabilitas mental mengacu pada <strong className="text-slate-900">UU No. 8 Tahun 2016</strong>. 
            Sinkronisasi kalender ovulasi-menstruasi dengan dosis obat psikiatrik (terutama antipsikotik hiperprolaktinemia) krusial untuk mencegah keliru interpretasi agitasi pra-menstruasi sebagai kekambuhan psikosis.
          </div>
        </div>
      </div>

      {/* Filter and View Controls */}
      <div className="bg-white rounded-2xl p-4 border border-rose-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Cari pasien, No. RM, atau diagnosis..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 text-slate-800"
          />
        </div>

        {/* Segmented Filter: Care Type */}
        <div className="flex items-center gap-1 p-1 bg-rose-50/60 rounded-xl w-full md:w-auto overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setCareFilter('all')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              careFilter === 'all'
                ? 'bg-white text-rose-700 font-semibold shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Semua Fase ({patients.length})
          </button>
          <button
            onClick={() => setCareFilter('rawat_inap')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              careFilter === 'rawat_inap'
                ? 'bg-white text-rose-700 font-semibold shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Rawat Inap
          </button>
          <button
            onClick={() => setCareFilter('rawat_jalan')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              careFilter === 'rawat_jalan'
                ? 'bg-white text-rose-700 font-semibold shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Rawat Jalan
          </button>
          <button
            onClick={() => setCareFilter('rehabilitasi')}
            className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap ${
              careFilter === 'rehabilitasi'
                ? 'bg-white text-rose-700 font-semibold shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Rehabilitasi
          </button>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1 border border-slate-200 rounded-xl p-1 shrink-0">
          <button
            onClick={() => setSelectedView('list')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              selectedView === 'list' ? 'bg-rose-500 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Daftar Pasien
          </button>
          <button
            onClick={() => setSelectedView('calendar')}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
              selectedView === 'calendar' ? 'bg-rose-500 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Kalender Matriks
          </button>
        </div>

      </div>

      {/* Main Content: Empty State OR Populated Table / Calendar */}
      {patients.length === 0 ? (
        /* Empty State exactly matching the user request text */
        <div className="bg-white rounded-3xl p-10 sm:p-14 text-center border border-rose-100 shadow-xl shadow-rose-100/40 max-w-xl mx-auto space-y-5">
          <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-500 flex items-center justify-center mx-auto shadow-inner">
            <CalendarIcon className="w-8 h-8 text-rose-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Belum ada pasien.
            </h3>
            <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
              Tambahkan pasien pertama untuk memulai pemantauan siklus menstruasi dan kepatuhan higienitas.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={onOpenAddPatient}
              className="w-full sm:w-auto bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-medium text-xs sm:text-sm px-6 py-2.5 rounded-full shadow-md shadow-rose-300/40 transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>+ Tambah Pasien</span>
            </button>
            <button
              onClick={onLoadPilotData}
              className="w-full sm:w-auto bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-medium text-xs sm:text-sm px-5 py-2.5 rounded-full transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Muat Data Simulasi Pilot (4 Pasien)</span>
            </button>
          </div>
        </div>
      ) : selectedView === 'list' ? (
        /* Patient Cards Grid */
        <div className="grid grid-cols-1 gap-4">
          {filteredPatients.map((patient) => {
            const careInfo = getCareBadge(patient.careType);
            const moodInfo = getMoodBadge(patient.moodBehavior);

            return (
              <div
                key={patient.id}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-rose-100 shadow-md shadow-rose-100/30 hover:border-rose-300 transition-all space-y-4"
              >
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-rose-50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-100 to-pink-100 text-rose-700 font-bold flex items-center justify-center text-sm shadow-sm">
                      {patient.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-900 text-base">{patient.name}</h3>
                        <span className="text-xs text-slate-400 font-mono">({patient.medicalRecordNo})</span>
                        <span className="text-xs text-slate-500 font-medium">· Usia {patient.age} thn</span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 mt-0.5 text-xs">
                        <span className={`px-2 py-0.5 rounded-md border font-medium text-[11px] ${careInfo.bg}`}>
                          {careInfo.label}
                        </span>
                        <span className="text-slate-500 capitalize">
                          Diagnosis: <strong>{patient.disabilityType}</strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Cycle Status Badge */}
                  <div className="flex items-center gap-2">
                    {patient.isCurrentlyMenstruating ? (
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-pink-100 text-pink-700 border border-pink-200 animate-pulse flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-pink-500" />
                        Sedang Menstruasi
                      </span>
                    ) : (
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                        Fase Folikuler / Luteal
                      </span>
                    )}

                    {patient.cycleDelayDays > 0 && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        Terlambat {patient.cycleDelayDays} Hari
                      </span>
                    )}

                    <button
                      onClick={() => onDeletePatient(patient.id)}
                      className="p-1.5 text-slate-300 hover:text-rose-500 rounded-lg hover:bg-rose-50 transition-colors"
                      title="Hapus data pasien"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
                  
                  {/* Column 1: Regimen Farmakologis */}
                  <div className="p-3 rounded-xl bg-rose-50/30 border border-rose-100/60">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                      Regimen Obat Psikiatri
                    </span>
                    <p className="font-medium text-slate-800 leading-snug">
                      {patient.medicationRegimen}
                    </p>
                    <span className="text-[10px] text-rose-600 mt-1 block">
                      *Waspadai efek hiperprolaktinemia pada siklus
                    </span>
                  </div>

                  {/* Column 2: Logistik & Kemandirian */}
                  <div className="p-3 rounded-xl bg-rose-50/30 border border-rose-100/60">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                      Kebutuhan Pembalut & Perilaku
                    </span>
                    <p className="text-slate-800">
                      <strong>{patient.dailyPadRequirement} pcs / hari</strong> · Siklus ~{patient.cycleLengthDays} hr
                    </p>
                    <p className="text-slate-500 mt-0.5 capitalize">
                      Kemandirian: <strong className="text-slate-700">{patient.hygieneIndependence.replace('_', ' ')}</strong>
                    </p>
                  </div>

                  {/* Column 3: Status Perilaku & Mood (With subtle pulse/color transition on update) */}
                  <div className="p-3 rounded-xl bg-rose-50/30 border border-rose-100/60 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                          Suasana Hati / Mood
                        </span>
                        {recentlyUpdatedMoodPatientId === patient.id && (
                          <span className="text-[10px] font-bold text-rose-600 bg-rose-100 px-1.5 py-0.5 rounded-full animate-pulse flex items-center gap-0.5">
                            <Sparkles className="w-2.5 h-2.5" /> Diperbarui!
                          </span>
                        )}
                      </div>

                      {/* Animated / pulsed mood indicator */}
                      <div className="relative my-0.5">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border text-[11px] font-medium transition-all duration-500 ${moodInfo.color} ${
                          recentlyUpdatedMoodPatientId === patient.id
                            ? 'ring-4 ring-rose-400 ring-offset-2 scale-105 shadow-md shadow-rose-300/60 animate-pulse font-bold'
                            : 'hover:scale-[1.02]'
                        }`}>
                          <span className={`w-2 h-2 rounded-full ${
                            recentlyUpdatedMoodPatientId === patient.id ? 'bg-rose-500 animate-ping' : 'bg-current opacity-80'
                          }`} />
                          <span>{moodInfo.label}</span>
                        </span>
                      </div>

                      <div className="mt-1 text-[11px] text-slate-500">
                        Ganti terakhir: <strong className="text-slate-700">{patient.lastHygieneChangeTime || 'Belum dicatat'}</strong>
                      </div>
                    </div>

                    {/* Interactive Quick Mood Switcher */}
                    <div className="mt-2 pt-2 border-t border-rose-100/60">
                      <label className="text-[10px] text-slate-400 block mb-0.5 font-medium">Ubah Status Mood:</label>
                      <select
                        value={patient.moodBehavior}
                        onChange={(e) => handleMoodChange(patient.id, e.target.value as MoodBehaviorStatus)}
                        className="w-full bg-white text-[11px] font-medium text-slate-700 border border-slate-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-rose-400 cursor-pointer hover:border-rose-300 transition-colors"
                      >
                        <option value="tenang">Kooperatif & Tenang</option>
                        <option value="agitasi_pramenstruasi">Agitasi Pra-Menstruasi (PME)</option>
                        <option value="menolak_pembalut">Menolak Pembalut (Sensorik)</option>
                        <option value="gelisah_bingung">Gelisah & Bingung</option>
                        <option value="disorientasi">Disorientasi</option>
                      </select>
                    </div>
                  </div>

                  {/* Column 4: Tanda Infeksi Reproduksi & Quick Action */}
                  <div className="p-3 rounded-xl bg-rose-50/30 border border-rose-100/60 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1">
                        Indikator Infeksi (ISR)
                      </span>
                      {patient.infectionSigns === 'none' ? (
                        <span className="text-emerald-700 font-semibold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> Tidak ada tanda infeksi
                        </span>
                      ) : (
                        <span className="text-rose-700 font-bold flex items-center gap-1">
                          <ShieldAlert className="w-3.5 h-3.5" /> {patient.infectionSigns.replace('_', ' ').toUpperCase()}
                        </span>
                      )}
                    </div>

                    <div className="mt-2 flex items-center gap-2">
                      <button
                        onClick={() => onLogHygieneChange(patient.id)}
                        className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-medium py-1.5 px-3 rounded-lg text-xs shadow-sm flex items-center justify-center gap-1 transition-all"
                      >
                        <Clock className="w-3 h-3" />
                        <span>Catat Ganti Pembalut</span>
                      </button>
                    </div>
                  </div>

                </div>

                {/* SECTION DATA KELUARGA / CAREGIVER PENDAMPING (Prompt Requirement) */}
                <div 
                  onClick={() => onOpenFamilyChat(patient)}
                  className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-rose-50/70 via-pink-50/40 to-white border border-rose-200/80 hover:border-rose-400 hover:shadow-md hover:shadow-rose-100/60 transition-all cursor-pointer group"
                  title="Klik untuk membuka obrolan dan memberikan update berkala ke keluarga pasien"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    
                    <div className="flex items-start sm:items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-rose-400 to-pink-500 text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                        <MessageCircle className="w-5 h-5" />
                      </div>

                      <div className="space-y-0.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-100/80 px-2 py-0.5 rounded-full">
                            Data Keluarga / Caregiver Pendamping
                          </span>
                          <span className="text-xs font-bold text-slate-900">
                            {patient.familyContact?.name || `Keluarga ${patient.name}`}
                          </span>
                          <span className="text-slate-500 text-xs font-medium">
                            ({patient.familyContact?.relationship || 'Wali'})
                          </span>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-600 pt-0.5">
                          <span className="flex items-center gap-1 font-mono font-bold text-rose-700 bg-white px-2 py-0.5 rounded-md border border-rose-100">
                            <Phone className="w-3 h-3 text-rose-500" />
                            {patient.familyContact?.phoneNumber || '+62 812-4910-3821'}
                          </span>
                          <span className="text-slate-400">·</span>
                          <span className="flex items-center gap-1 text-slate-500 text-[11px]">
                            <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                            <span>{patient.familyContact?.address || 'Jawa Barat'}</span>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Chat Action Button */}
                    <div className="flex items-center gap-2.5 self-end sm:self-auto shrink-0">
                      <span className="text-[11px] text-slate-400 hidden lg:inline">
                        {patient.messages && patient.messages.length > 0 
                          ? `${patient.messages.length} update terkirim` 
                          : 'Siap kirim update'}
                      </span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenFamilyChat(patient);
                        }}
                        className="bg-white group-hover:bg-gradient-to-r group-hover:from-rose-500 group-hover:to-pink-500 group-hover:text-white text-rose-700 border border-rose-300 font-semibold text-xs px-3.5 py-2 rounded-full shadow-2xs group-hover:shadow-md transition-all flex items-center gap-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Kirim Update ke Keluarga</span>
                      </button>
                    </div>

                  </div>
                </div>

                {/* Patient Observational Note */}
                {patient.notes && (
                  <div className="bg-slate-50 rounded-xl p-3 text-xs text-slate-600 border border-slate-100 flex items-start gap-2">
                    <span className="font-semibold text-slate-800 shrink-0">Catatan Khusus Perawat:</span>
                    <span>{patient.notes}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        /* Calendar Matrix View */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-xl shadow-rose-100/40 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Kalender Siklus & Proyeksi Menstruasi Pasien (November 2026)
              </h3>
              <p className="text-xs text-slate-500">
                Visualisasi fase perdarahan aktif (merah muda) dan estimasi siklus berikutnya guna mitigasi PME (Premenstrual Exacerbation).
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-medium">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-pink-500" />
                <span>Sedang Haid</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-400" />
                <span>Terlambat Siklus</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-200" />
                <span>Proyeksi Haid</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-2 text-center text-xs">
            {['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min'].map((day) => (
              <div key={day} className="font-bold text-slate-400 py-2 border-b border-slate-100 uppercase">
                {day}
              </div>
            ))}

            {calendarDays.map((day) => {
              // Check if any patient is menstruating on this day (approximate demo logic around Nov 9-15)
              const menstruatingOnThisDay = patients.filter(p => {
                if (p.isCurrentlyMenstruating && day >= 9 && day <= 15) return true;
                return false;
              });

              const isCurrentDay = day === 12;

              return (
                <div
                  key={day}
                  className={`min-h-[70px] p-1.5 rounded-xl border transition-all text-left flex flex-col justify-between ${
                    isCurrentDay 
                      ? 'border-rose-500 bg-rose-50/40 font-bold' 
                      : 'border-slate-100 bg-white hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs ${isCurrentDay ? 'text-rose-600 font-extrabold' : 'text-slate-600'}`}>
                      {day} {isCurrentDay && '(Hari Ini)'}
                    </span>
                  </div>

                  <div className="space-y-1 mt-1">
                    {menstruatingOnThisDay.map((p) => (
                      <div
                        key={p.id}
                        className="text-[10px] bg-pink-100 text-pink-800 px-1.5 py-0.5 rounded truncate font-medium"
                        title={`${p.name} - Sedang Haid (${p.careType})`}
                      >
                        🩸 {p.name.split(' ')[0]}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Footer Tagline exact prompt requirement */}
      <div className="text-center pt-4">
        <p className="text-xs text-slate-400 italic">
          Prototipe visual SynapseCare ekosistem tata kelola MHM yang humanis, presisi, dan berkelanjutan
        </p>
      </div>

    </div>
  );
};
