import React, { useState } from 'react';
import { HospitalPartner, SectorPartner } from '../types';
import { 
  Building2, 
  CheckCircle, 
  ChevronRight, 
  Download, 
  ExternalLink, 
  FileCheck2, 
  Globe2, 
  Handshake, 
  HeartHandshake, 
  Info, 
  MapPin, 
  Plus, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  Users 
} from 'lucide-react';

interface CrossSectorTabProps {
  hospitals: HospitalPartner[];
  partners: SectorPartner[];
  onAddPartner: (newPartner: SectorPartner) => void;
  onAddHospital: (newHospital: HospitalPartner) => void;
}

export const CrossSectorTab: React.FC<CrossSectorTabProps> = ({
  hospitals,
  partners,
  onAddPartner,
  onAddHospital
}) => {
  const [partnerModalOpen, setPartnerModalOpen] = useState(false);
  const [policyBriefDownloaded, setPolicyBriefDownloaded] = useState(false);

  // New partner state
  const [partnerName, setPartnerName] = useState('');
  const [partnerContribution, setPartnerContribution] = useState('');
  const [partnerStatus, setPartnerStatus] = useState<'Aktif' | 'Negosiasi' | 'Dalam Penjajakan'>('Aktif');
  const [partnerCategory, setPartnerCategory] = useState<'CSR Korporasi' | 'Pemerintah / Dinas' | 'Yayasan / NGO'>('CSR Korporasi');

  const handleCreatePartner = (e: React.FormEvent) => {
    e.preventDefault();
    if (partnerName && partnerContribution) {
      onAddPartner({
        id: `part-${Date.now()}`,
        name: partnerName,
        contributionType: partnerContribution,
        status: partnerStatus,
        category: partnerCategory,
        description: `Kemitraan strategis baru untuk penguatan tata kelola MHM ODGJ perempuan.`,
        impactMetric: 'Dalam Evaluasi Awal'
      });
      setPartnerName('');
      setPartnerContribution('');
      setPartnerModalOpen(false);
    }
  };

  const handleExportPolicyBrief = () => {
    setPolicyBriefDownloaded(true);
    setTimeout(() => setPolicyBriefDownloaded(false), 4000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Aktif':
      case 'Pilot':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Onboarding':
      case 'Negosiasi':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      
      {/* Header section matching exact prompt wording */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-rose-100">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-500">
            Modul 04
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Modul Koordinasi & Kemitraan Lintas Sektor
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Data agregat kepatuhan MHM antar-RSJ dan jalur kemitraan berbasis data dengan pemerintah & korporasi.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportPolicyBrief}
            className="bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 font-medium text-xs sm:text-sm px-4 py-2.5 rounded-full shadow-sm transition-all flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>{policyBriefDownloaded ? 'Policy Brief Berhasil Diunduh!' : 'Unduh Policy Brief Kemenkes'}</span>
          </button>
        </div>
      </div>

      {/* Disparitas Nasional Callout: Provinsi Tanpa RSJ di Indonesia */}
      <div className="rounded-3xl bg-gradient-to-br from-rose-900 to-slate-900 text-white p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-60 h-60 bg-rose-500/20 rounded-full blur-2xl pointer-events-none" />
        
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider bg-rose-500/40 text-rose-200 px-3 py-1 rounded-full border border-rose-400/30">
              Analisis Spasial Nasional
            </span>
            <span className="text-xs text-rose-200">Kesenjangan Infrastruktur Jiwa</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            Tantangan Ketiadaan RSJ di Sedikitnya 6 Provinsi Indonesia
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Data Kementerian Kesehatan menunjukkan disparitas ekstrem: setidaknya 6 provinsi (termasuk Kepulauan Riau, Gorontalo, Maluku Utara, Papua Barat, Sulawesi Barat, dan Kalimantan Utara) belum memiliki Rumah Sakit Jiwa mandiri. Pasien perempuan ODGJ di wilayah kepulauan dan pelosok sepenuhnya bergantung pada keluarga atau puskesmas umum tanpa fasilitas MHM memadai.
          </p>

          <div className="pt-2 flex flex-wrap gap-4 text-xs font-mono">
            <div className="bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10">
              <span className="text-slate-400 block text-[10px]">Rasio Psikiater Nasional</span>
              <strong className="text-white text-sm">0.3 per 100.000 Penduduk</strong>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10">
              <span className="text-slate-400 block text-[10px]">Standar WHO Minimal</span>
              <strong className="text-white text-sm">1.0 per 100.000 Penduduk</strong>
            </div>
            <div className="bg-white/10 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10">
              <span className="text-slate-400 block text-[10px]">Solusi SynapseCare</span>
              <strong className="text-rose-300 text-sm">Digital Caregiving Remote Toolkit</strong>
            </div>
          </div>
        </div>
      </div>

      {/* JEJARING RUMAH SAKIT JIWA MITRA (Exact prompt values) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">
              Jejaring Rumah Sakit Jiwa Mitra
            </h2>
            <p className="text-xs text-slate-500">
              Implementasi indikator audit mutu asuhan keperawatan MHM terstandar.
            </p>
          </div>
          <span className="text-xs text-slate-400">Total {hospitals.length} Rumah Sakit Percontohan</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {hospitals.map((hosp) => {
            const statusClass = getStatusBadge(hosp.status);

            return (
              <div
                key={hosp.id}
                className="bg-white rounded-3xl p-6 border border-rose-100 shadow-lg shadow-rose-100/40 hover:border-rose-300 transition-all space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusClass}`}>
                      {hosp.status}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base mt-3 leading-snug">
                    {hosp.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{hosp.province}</span>
                  </div>

                  <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                    {hosp.notes}
                  </p>
                </div>

                <div className="pt-4 border-t border-rose-50 space-y-2">
                  <div className="flex justify-between items-baseline text-xs">
                    <span className="text-slate-600">Tingkat Kepatuhan MHM</span>
                    <span className="font-mono text-base font-extrabold text-slate-900">
                      {hosp.complianceRate}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        hosp.complianceRate > 70 
                          ? 'bg-emerald-500' 
                          : hosp.complianceRate > 30 
                          ? 'bg-amber-400' 
                          : 'bg-slate-300'
                      }`}
                      style={{ width: `${Math.max(5, hosp.complianceRate)}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 text-right">
                    Kapasitas: {hosp.bedCapacity} TT · Pasien terpantau: {hosp.activePatientsTracked}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* KEMITRAAN TABLE (Exact prompt section & values) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-xl shadow-rose-100/40 space-y-6">
        <div className="flex items-center justify-between border-b border-rose-50 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight uppercase">
              Kemitraan
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Skema tanggung jawab sosial perusahaan (CSR) terukur dan dukungan regulasi berbasis data agregat.
            </p>
          </div>

          <button
            onClick={() => setPartnerModalOpen(true)}
            className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-medium text-xs px-4 py-2 rounded-full shadow-md shadow-rose-300/40 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah</span>
          </button>
        </div>

        {/* Table matching prompt headers: MITRA | BENTUK | STATUS */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-rose-100 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-3 px-4">Mitra</th>
                <th className="py-3 px-4">Bentuk</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Dampak / Rincian</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rose-50">
              {partners.map((partner) => (
                <tr key={partner.id} className="hover:bg-rose-50/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 text-sm">{partner.name}</div>
                    <span className="text-[11px] text-slate-500">{partner.category}</span>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-700">
                    {partner.contributionType}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-[11px] font-semibold border ${getStatusBadge(partner.status)}`}>
                      {partner.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right text-slate-600">
                    <span className="font-semibold text-rose-600 block">{partner.impactMetric}</span>
                    <span className="text-[10px] text-slate-400">{partner.description}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Rationale Quote about non-incidental CSR */}
        <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 text-xs text-slate-700 leading-relaxed">
          <strong className="text-slate-900">Transformasi CSR Berkelanjutan:</strong> Proyeksi kebutuhan logistik yang terukur membuka peluang kemitraan berbasis data dengan korporasi nasional melalui skema CSR yang tepat sasaran, bukan donasi yang bersifat insidental atau tidak terencana.
        </div>
      </div>

      {/* Footer Tagline exact prompt requirement */}
      <div className="text-center pt-4">
        <p className="text-xs text-slate-400 italic">
          Prototipe visual SynapseCare ekosistem tata kelola MHM yang humanis, presisi, dan berkelanjutan
        </p>
      </div>

      {/* Add Partner Modal */}
      {partnerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-rose-100 space-y-5 animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-rose-50">
              <h3 className="font-bold text-slate-900 text-lg">Tambah Mitra Baru</h3>
              <button 
                onClick={() => setPartnerModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePartner} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nama Mitra / Korporasi / Instansi</label>
                <input
                  type="text"
                  required
                  value={partnerName}
                  onChange={(e) => setPartnerName(e.target.value)}
                  placeholder="Contoh: PT Unilever Indonesia Peduli Sanitasi"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-rose-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Bentuk Dukungan / Kontribusi</label>
                <input
                  type="text"
                  required
                  value={partnerContribution}
                  onChange={(e) => setPartnerContribution(e.target.value)}
                  placeholder="Contoh: CSR Paket Sanitasi Ramah Kulit"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-rose-400 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Kategori Mitra</label>
                  <select
                    value={partnerCategory}
                    onChange={(e) => setPartnerCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-rose-400 focus:outline-none"
                  >
                    <option value="CSR Korporasi">CSR Korporasi</option>
                    <option value="Pemerintah / Dinas">Pemerintah / Dinas</option>
                    <option value="Yayasan / NGO">Yayasan / NGO</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Status Kemitraan</label>
                  <select
                    value={partnerStatus}
                    onChange={(e) => setPartnerStatus(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-rose-400 focus:outline-none"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Negosiasi">Negosiasi</option>
                    <option value="Dalam Penjajakan">Dalam Penjajakan</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setPartnerModalOpen(false)}
                  className="w-1/2 py-2.5 rounded-full border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold shadow-md shadow-rose-300/40 transition-all"
                >
                  Simpan Kemitraan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
