import React, { useState } from 'react';
import { HISTORICAL_CONSUMPTION } from '../data/mockData';
import { LogisticsItem, Patient } from '../types';
import { 
  AlertTriangle, 
  ArrowUpRight, 
  CheckCircle, 
  Coins, 
  DollarSign, 
  Download, 
  Layers, 
  Package, 
  Plus, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  Truck 
} from 'lucide-react';

interface LogisticsTabProps {
  logistics: LogisticsItem[];
  patients: Patient[];
  onRestockItem: (itemId: string, addedStock: number) => void;
}

export const LogisticsTab: React.FC<LogisticsTabProps> = ({
  logistics,
  patients,
  onRestockItem
}) => {
  const [restockModalOpen, setRestockModalOpen] = useState(false);
  const [selectedRestockItem, setSelectedRestockItem] = useState(logistics[0]?.id || 'log-1');
  const [restockAmount, setRestockAmount] = useState(100);
  const [restockSource, setRestockSource] = useState('Donasi CSR Korporasi FMCG');

  // Interactive JIT simulation controls
  const [bufferDays, setBufferDays] = useState(7); // Buffer days for safety stock

  // Calculate dynamic projected needs based on active patients
  const totalMenstruatingPatients = patients.filter(p => p.isCurrentlyMenstruating).length;
  
  // Calculate projected requirements
  // 1. Pembalut: sum of (dailyPadRequirement * periodDuration) for all patients
  const calculatedPadsNeed = patients.reduce((sum, p) => sum + (p.dailyPadRequirement * p.periodDurationDays), 0);
  
  // 2. Sabun antiseptik: 1 botol per 2 pasien per bulan
  const calculatedSoapNeed = patients.length > 0 ? Math.ceil(patients.length * 0.75) : 0;
  
  // 3. Celana dalam sekali pakai: 3 pcs per pasien dalam siklus haid
  const calculatedUnderwearNeed = patients.length > 0 ? patients.length * 3 : 0;

  const handleApplyRestock = (e: React.FormEvent) => {
    e.preventDefault();
    if (restockAmount > 0) {
      onRestockItem(selectedRestockItem, restockAmount);
      setRestockModalOpen(false);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      
      {/* Header section matching exact prompt wording */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-rose-100">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-500">
            Modul 03
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Modul Manajemen Logistik (Just-in-Time)
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Proyeksi kebutuhan sanitasi dikonversi otomatis dari data pemantauan klinis.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setRestockModalOpen(true)}
            className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-medium text-xs sm:text-sm px-5 py-2.5 rounded-full shadow-md shadow-rose-300/40 hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>+ Catat Pasokan / Donasi CSR</span>
          </button>
        </div>
      </div>

      {/* STATUS STOK & PROYEKSI KEBUTUHAN BULAN INI (exact prompt cards) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Status Stok & Proyeksi Kebutuhan Bulan Ini
          </h2>
          <span className="text-xs text-rose-600 font-medium">
            Tersinkronisasi Real-Time dengan {patients.length} Pasien
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Item 1: Pembalut */}
          <div className="bg-white rounded-3xl p-6 border border-rose-100/90 shadow-xl shadow-rose-100/40 space-y-4 hover:border-rose-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-base">Pembalut</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                Aman
              </span>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between items-baseline text-xs text-slate-600">
                <span>Stok saat ini:</span>
                <span className="font-mono text-xl font-extrabold text-slate-900">
                  {logistics[0]?.currentStock || 420} pcs
                </span>
              </div>
              <div className="flex justify-between items-baseline text-xs text-slate-600">
                <span>Kebutuhan proyeksi:</span>
                <span className="font-mono text-lg font-bold text-rose-600">
                  {calculatedPadsNeed} pcs
                </span>
              </div>
            </div>

            {/* Visual ratio bar */}
            <div className="space-y-1">
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full"
                  style={{ width: `${Math.min(100, Math.max(15, (calculatedPadsNeed / (logistics[0]?.currentStock || 420)) * 100))}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 text-right">
                Ketahanan stok: ~{Math.round((logistics[0]?.currentStock || 420) / (calculatedPadsNeed || 20))} siklus
              </p>
            </div>
          </div>

          {/* Item 2: Sabun Antiseptik */}
          <div className="bg-white rounded-3xl p-6 border border-rose-100/90 shadow-xl shadow-rose-100/40 space-y-4 hover:border-rose-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-base">Sabun Antiseptik</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                Aman
              </span>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between items-baseline text-xs text-slate-600">
                <span>Stok saat ini:</span>
                <span className="font-mono text-xl font-extrabold text-slate-900">
                  {logistics[1]?.currentStock || 38} botol
                </span>
              </div>
              <div className="flex justify-between items-baseline text-xs text-slate-600">
                <span>Kebutuhan proyeksi:</span>
                <span className="font-mono text-lg font-bold text-rose-600">
                  {calculatedSoapNeed} botol
                </span>
              </div>
            </div>

            {/* Visual ratio bar */}
            <div className="space-y-1">
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full"
                  style={{ width: `${Math.min(100, Math.max(15, (calculatedSoapNeed / (logistics[1]?.currentStock || 38)) * 100))}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 text-right">
                pH seimbang khusus flora normal genitalia
              </p>
            </div>
          </div>

          {/* Item 3: Celana Dalam Sekali Pakai */}
          <div className="bg-white rounded-3xl p-6 border border-rose-100/90 shadow-xl shadow-rose-100/40 space-y-4 hover:border-rose-300 transition-all">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900 text-base">Celana Dalam Sekali Pakai</span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                Aman
              </span>
            </div>
            
            <div className="space-y-1">
              <div className="flex justify-between items-baseline text-xs text-slate-600">
                <span>Stok saat ini:</span>
                <span className="font-mono text-xl font-extrabold text-slate-900">
                  {logistics[2]?.currentStock || 60} pcs
                </span>
              </div>
              <div className="flex justify-between items-baseline text-xs text-slate-600">
                <span>Kebutuhan proyeksi:</span>
                <span className="font-mono text-lg font-bold text-rose-600">
                  {calculatedUnderwearNeed} pcs
                </span>
              </div>
            </div>

            {/* Visual ratio bar */}
            <div className="space-y-1">
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-emerald-500 h-full rounded-full"
                  style={{ width: `${Math.min(100, Math.max(15, (calculatedUnderwearNeed / (logistics[2]?.currentStock || 60)) * 100))}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 text-right">
                Elastis & antialergi untuk rawat inap akut
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* TREN KONSUMSI PEMBALUT (6 BULAN) (Exact prompt section) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-xl shadow-rose-100/40 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-rose-50 pb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
              TREN KONSUMSI PEMBALUT (6 BULAN)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Data historis bersifat ilustratif; nilai bulan berjalan dihitung dari pasien aktif.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 font-medium text-slate-600">
              <span className="w-3 h-3 rounded-sm bg-rose-500" />
              Konsumsi Aktual (pcs)
            </span>
            <span className="flex items-center gap-1.5 font-medium text-slate-600">
              <span className="w-3 h-3 rounded-sm bg-pink-300" />
              Proyeksi Kebutuhan JIT
            </span>
          </div>
        </div>

        {/* 6-Month Visual Bar Chart */}
        <div className="grid grid-cols-6 gap-3 sm:gap-6 items-end pt-8 pb-4 min-h-[220px]">
          {HISTORICAL_CONSUMPTION.map((item) => {
            const maxVal = 500;
            const actualHeight = `${(item.pembalut / maxVal) * 100}%`;
            const projectedHeight = `${(item.kebutuhan / maxVal) * 100}%`;

            return (
              <div key={item.month} className="flex flex-col items-center gap-2 h-full justify-end group">
                <div className="flex items-end gap-1 sm:gap-2 h-44 w-full justify-center">
                  {/* Actual bar */}
                  <div 
                    className="w-4 sm:w-8 bg-gradient-to-t from-rose-600 to-rose-400 rounded-t-lg transition-all duration-300 group-hover:brightness-110 relative"
                    style={{ height: actualHeight }}
                  >
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono font-bold text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {item.pembalut}
                    </span>
                  </div>

                  {/* Projected bar */}
                  <div 
                    className="w-4 sm:w-8 bg-pink-200 rounded-t-lg transition-all duration-300 group-hover:brightness-95 relative"
                    style={{ height: projectedHeight }}
                  >
                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {item.kebutuhan}
                    </span>
                  </div>
                </div>

                <span className="text-xs font-bold text-slate-700 font-mono">
                  {item.month}
                </span>
              </div>
            );
          })}
        </div>

        {/* JIT Precision Rationale Banner */}
        <div className="rounded-2xl bg-gradient-to-r from-rose-50 via-pink-50/40 to-white p-4 border border-rose-200/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-rose-600 shrink-0" />
            <p className="text-slate-700 leading-relaxed">
              <strong className="text-slate-900">Model Supply Chain Sirkular:</strong> Data kalender klinis mencegah <em>stock-out</em> di bangsal akut serta memangkas pemborosan logistik hingga <strong>28.4%</strong> dibandingkan pembelian insidental.
            </p>
          </div>
          <span className="text-[11px] font-bold text-rose-700 bg-rose-100/80 px-2.5 py-1 rounded-full whitespace-nowrap">
            Just-in-Time Active
          </span>
        </div>
      </div>

      {/* Interactive Just-in-Time Budget & Allocation Simulator */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-rose-100 shadow-xl shadow-rose-100/40 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              Kalkulator Proyeksi Anggaran & Logistik Rumah Sakit
            </h3>
            <p className="text-xs text-slate-500">
              Simulasi alokasi anggaran belanja MHM berdasarkan fluktuasi tarif PPN produk sanitasi dan kapasitas pasien.
            </p>
          </div>
          <Coins className="w-5 h-5 text-rose-500" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Slider 1: Buffer Safety Stock Days */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
            <div className="flex justify-between text-xs font-semibold text-slate-700">
              <span>Batas Cadangan Pengaman (Buffer Days)</span>
              <span className="font-mono text-rose-600">{bufferDays} Hari</span>
            </div>
            <input
              type="range"
              min="3"
              max="21"
              value={bufferDays}
              onChange={(e) => setBufferDays(Number(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer"
            />
            <p className="text-[10px] text-slate-400">
              Rekomendasi RSJ rujukan terpencil: 7-14 hari untuk antisipasi hambatan logistik kepulauan.
            </p>
          </div>

          {/* Metric 2: Estimasi Kebutuhan Pembalut Total */}
          <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Total Pasokan Bulanan + Buffer
            </span>
            <div className="text-2xl font-extrabold text-slate-900 font-mono">
              {calculatedPadsNeed + (patients.length * 4 * Math.round(bufferDays / 7))} pcs
            </div>
            <p className="text-[11px] text-slate-500">
              Dihitung untuk {patients.length} pasien terdaftar
            </p>
          </div>

          {/* Metric 3: Estimasi Biaya & Efisiensi Subsidi CSR */}
          <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Estimasi Nilai Anggaran (Rp)
            </span>
            <div className="text-2xl font-extrabold text-emerald-800 font-mono">
              Rp {((calculatedPadsNeed || 100) * 1800).toLocaleString('id-ID')}
            </div>
            <p className="text-[11px] text-emerald-700 font-medium">
              *Tersubsidi 40% lewat kemitraan CSR FMCG
            </p>
          </div>
        </div>
      </div>

      {/* Tagline footer required by prompt */}
      <div className="text-center pt-4">
        <p className="text-xs text-slate-400 italic max-w-2xl mx-auto leading-relaxed">
          Prototipe visual SynapseCare ekosistem tata kelola MHM yang humanis, presisi, dan berkelanjutan. Mengintegrasikan analitik prediktif untuk manajemen rantai pasok medis yang lebih efisien.
        </p>
      </div>

      {/* Restock Modal */}
      {restockModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-rose-100 space-y-5 animate-scaleUp">
            <div className="flex items-center justify-between pb-3 border-b border-rose-50">
              <h3 className="font-bold text-slate-900 text-lg">Catat Penerimaan Pasokan / Donasi</h3>
              <button 
                onClick={() => setRestockModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleApplyRestock} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Item Logistik</label>
                <select
                  value={selectedRestockItem}
                  onChange={(e) => setSelectedRestockItem(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-rose-400 focus:outline-none"
                >
                  {logistics.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.name} (Stok Saat Ini: {item.currentStock} {item.unit})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Jumlah Masuk</label>
                <input
                  type="number"
                  min="1"
                  value={restockAmount}
                  onChange={(e) => setRestockAmount(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-rose-400 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Sumber Pasokan</label>
                <input
                  type="text"
                  value={restockSource}
                  onChange={(e) => setRestockSource(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-1 focus:ring-rose-400 focus:outline-none"
                  placeholder="Contoh: Donasi CSR Korporasi FMCG / APBD RSJ"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setRestockModalOpen(false)}
                  className="w-1/2 py-2.5 rounded-full border border-slate-200 font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold shadow-md shadow-rose-300/40 transition-all"
                >
                  Simpan Stok Masuk
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
