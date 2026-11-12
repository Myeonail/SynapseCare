import React, { useState } from 'react';
import { CareType, DisabilityType, IndependenceLevel, InfectionSign, MoodBehaviorStatus, Patient } from '../types';
import { Calendar, Heart, Shield, User, X } from 'lucide-react';

interface AddPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddPatient: (patient: Patient) => void;
}

export const AddPatientModal: React.FC<AddPatientModalProps> = ({
  isOpen,
  onClose,
  onAddPatient
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [medicalRecordNo, setMedicalRecordNo] = useState(`RM-2026-${Math.floor(1000 + Math.random() * 9000)}`);
  const [age, setAge] = useState(26);
  const [careType, setCareType] = useState<CareType>('rawat_inap');
  const [disabilityType, setDisabilityType] = useState<DisabilityType>('skizofrenia');
  const [medicationRegimen, setMedicationRegimen] = useState('Risperidone 2mg 2x1, Trihexyphenidyl 2mg 1x1');
  const [lastPeriodStart, setLastPeriodStart] = useState('2026-11-10');
  const [cycleLengthDays, setCycleLengthDays] = useState(28);
  const [periodDurationDays, setPeriodDurationDays] = useState(5);
  const [isCurrentlyMenstruating, setIsCurrentlyMenstruating] = useState(true);
  const [cycleDelayDays, setCycleDelayDays] = useState(0);
  const [dailyPadRequirement, setDailyPadRequirement] = useState(5);
  const [hygieneIndependence, setHygieneIndependence] = useState<IndependenceLevel>('didampingi_sebagian');
  const [moodBehavior, setMoodBehavior] = useState<MoodBehaviorStatus>('agitasi_pramenstruasi');
  const [infectionSigns, setInfectionSigns] = useState<InfectionSign>('none');
  const [notes, setNotes] = useState('Pasien butuh pendampingan lembut saat mengganti pembalut; respon positif terhadap instruksi visual.');
  
  // Family / Caregiver Contact fields
  const [familyName, setFamilyName] = useState('');
  const [familyRelationship, setFamilyRelationship] = useState('Ibu Kandung');
  const [familyPhone, setFamilyPhone] = useState('+62 812-3456-7890');
  const [familyAddress, setFamilyAddress] = useState('Jl. Dahlia No. 12, Jawa Barat');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newPatient: Patient = {
      id: `pat-${Date.now()}`,
      name: name.trim(),
      medicalRecordNo,
      age: Number(age),
      careType,
      disabilityType,
      medicationRegimen,
      lastPeriodStart,
      cycleLengthDays: Number(cycleLengthDays),
      periodDurationDays: Number(periodDurationDays),
      isCurrentlyMenstruating,
      cycleDelayDays: Number(cycleDelayDays),
      dailyPadRequirement: Number(dailyPadRequirement),
      hygieneIndependence,
      lastHygieneChangeTime: isCurrentlyMenstruating ? 'Baru saja dicatat' : 'N/A',
      moodBehavior,
      infectionSigns,
      notes,
      familyContact: {
        name: familyName.trim() || `Keluarga ${name.trim()}`,
        relationship: familyRelationship,
        phoneNumber: familyPhone.trim() || '+62 812-0000-0000',
        address: familyAddress.trim() || 'Jawa Barat',
        isPrimaryCaregiver: true,
        preferredContactHours: '08:00 - 17:00 WIB'
      },
      messages: [
        {
          id: `msg-${Date.now()}`,
          sender: 'nurse',
          text: `Halo ${familyName.trim() || 'Keluarga'}, pasien ${name.trim()} telah terdaftar dalam sistem pemantauan MHM terpadu SynapseCare RSJ.`,
          timestamp: 'Baru saja',
          status: 'read'
        }
      ]
    };

    onAddPatient(newPatient);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm p-3 sm:p-6 flex items-start sm:items-center justify-center">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-rose-100 flex flex-col max-h-[90vh] my-auto animate-scaleUp relative">
        
        {/* Header (Fixed at top of modal) */}
        <div className="flex items-center justify-between pb-4 border-b border-rose-100 shrink-0">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500">
              Registrasi Pasien Baru
            </span>
            <h3 className="text-xl font-bold text-slate-900">
              Tambah Pasien Pemantauan MHM
            </h3>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto pr-1 sm:pr-2 space-y-5 text-xs py-2 scrollbar-thin">
          
          {/* Section A: Identitas & Layanan */}
          <div className="space-y-3 pt-1">
            <h4 className="font-bold text-slate-700 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-rose-500" />
              <span>Identitas & Fase Layanan</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nama Pasien / Inisial</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Ny. Ratna K."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nomor Rekam Medis (No. RM)</label>
                <input
                  type="text"
                  required
                  value={medicalRecordNo}
                  onChange={(e) => setMedicalRecordNo(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400 font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Usia (Tahun)</label>
                <input
                  type="number"
                  min="12"
                  max="70"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Fase Penanganan Pasien</label>
                <select
                  value={careType}
                  onChange={(e) => setCareType(e.target.value as CareType)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400"
                >
                  <option value="rawat_inap">Rawat Inap (Akut / Krisis Intensif RSJ)</option>
                  <option value="rawat_jalan">Rawat Jalan (Kontrol Berkala & Obat di Rumah)</option>
                  <option value="rehabilitasi">Rehabilitasi (Pemulihan Keterampilan Vokasional)</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">
                  Kategori Disabilitas Mental (UU No. 8/2016)
                </label>
                <select
                  value={disabilityType}
                  onChange={(e) => setDisabilityType(e.target.value as DisabilityType)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400"
                >
                  <option value="skizofrenia">Skizofrenia (Disabilitas Psikososial)</option>
                  <option value="bipolar">Gangguan Afektif Bipolar</option>
                  <option value="depresi">Depresi Mayor dengan Gejala Psikotik</option>
                  <option value="kecemasan">Gangguan Kecemasan Berat</option>
                  <option value="autisme_perkembangan">Disabilitas Perkembangan / Autisme Dewasa</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">
                Regimen Obat Psikiatri yang Sedang Dikonsumsi
              </label>
              <input
                type="text"
                placeholder="Misal: Risperidone 2mg 2x1, Trihexyphenidyl 2mg"
                value={medicationRegimen}
                onChange={(e) => setMedicationRegimen(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                *Catat obat antipsikotik untuk mengantisipasi potensi hiperprolaktinemia dan amenore sekunder.
              </span>
            </div>
          </div>

          {/* Section B: Siklus Menstruasi & Higiene */}
          <div className="space-y-3 pt-3 border-t border-rose-50">
            <h4 className="font-bold text-slate-700 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-rose-500" />
              <span>Siklus Menstruasi & Parameter Higienitas</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Mulai Siklus Terakhir</label>
                <input
                  type="date"
                  value={lastPeriodStart}
                  onChange={(e) => setLastPeriodStart(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400 font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Rata-rata Panjang Siklus (Hari)</label>
                <input
                  type="number"
                  min="21"
                  max="45"
                  value={cycleLengthDays}
                  onChange={(e) => setCycleLengthDays(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400 font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Kebutuhan Pembalut/Hari</label>
                <input
                  type="number"
                  min="2"
                  max="10"
                  value={dailyPadRequirement}
                  onChange={(e) => setDailyPadRequirement(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400 font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Status Hari Ini</label>
                <div className="flex items-center gap-4 mt-2">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="menstruating"
                      checked={isCurrentlyMenstruating}
                      onChange={() => setIsCurrentlyMenstruating(true)}
                      className="accent-rose-500"
                    />
                    <span className="font-medium text-slate-800">Sedang Haid</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="menstruating"
                      checked={!isCurrentlyMenstruating}
                      onChange={() => setIsCurrentlyMenstruating(false)}
                      className="accent-rose-500"
                    />
                    <span className="font-medium text-slate-800">Fase Folikuler / Luteal</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Tingkat Kemandirian Kebersihan</label>
                <select
                  value={hygieneIndependence}
                  onChange={(e) => setHygieneIndependence(e.target.value as IndependenceLevel)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400"
                >
                  <option value="mandiri">Mandiri (Dapat mengganti pembalut sendiri)</option>
                  <option value="didampingi_sebagian">Didampingi Sebagian (Butuh pengingat/bantuan)</option>
                  <option value="dibantu_penuh">Dibantu Penuh (Ketergantungan perawat/keluarga)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Observasi Suasana Hati / Perilaku</label>
                <select
                  value={moodBehavior}
                  onChange={(e) => setMoodBehavior(e.target.value as MoodBehaviorStatus)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400"
                >
                  <option value="tenang">Kooperatif & Tenang</option>
                  <option value="agitasi_pramenstruasi">Agitasi Pra-Menstruasi (PME / Kram)</option>
                  <option value="menolak_pembalut">Menolak Memakai Pembalut (Sensitivitas)</option>
                  <option value="gelisah_bingung">Gelisah & Bingung Melihat Darah</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Tanda Infeksi Saluran Reproduksi</label>
                <select
                  value={infectionSigns}
                  onChange={(e) => setInfectionSigns(e.target.value as InfectionSign)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400"
                >
                  <option value="none">Tidak Ada Tanda Infeksi (Bersih)</option>
                  <option value="keputihan_abnormal">Keputihan Berbau / Berwarna Kuning/Hijau</option>
                  <option value="ruam_gatal">Ruam Kemerahan / Gatal di Vulva</option>
                  <option value="nyeri_panggul">Nyeri Panggul Akut / Menolak Duduk</option>
                </select>
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Catatan Tambahan untuk Tim Perawat</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400"
              />
            </div>
          </div>

          {/* Section C: Data Keluarga / Caregiver Pendamping (Prompt Requirement) */}
          <div className="space-y-3 pt-3 border-t border-rose-50">
            <h4 className="font-bold text-slate-700 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-rose-500" />
              <span>Data Keluarga / Caregiver Pendamping Pasien</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nama Keluarga / Wali</label>
                <input
                  type="text"
                  placeholder="Contoh: Ibu Aminah"
                  value={familyName}
                  onChange={(e) => setFamilyName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Hubungan Keluarga</label>
                <select
                  value={familyRelationship}
                  onChange={(e) => setFamilyRelationship(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400"
                >
                  <option value="Ibu Kandung">Ibu Kandung</option>
                  <option value="Ayah Kandung">Ayah Kandung</option>
                  <option value="Suami">Suami</option>
                  <option value="Kakak Kandung">Kakak Kandung</option>
                  <option value="Adik Kandung">Adik Kandung</option>
                  <option value="Wali / Pengasuh">Wali / Pengasuh</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Nomor HP (+62)</label>
                <input
                  type="text"
                  placeholder="+62 812-xxxx-xxxx"
                  value={familyPhone}
                  onChange={(e) => setFamilyPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Alamat Domisili Keluarga</label>
              <input
                type="text"
                placeholder="Contoh: Jl. Pajajaran No. 42, Bogor Selatan"
                value={familyAddress}
                onChange={(e) => setFamilyAddress(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-rose-400"
              />
            </div>
          </div>

          {/* Buttons (Fixed at bottom of modal body) */}
          <div className="pt-4 pb-1 flex items-center justify-end gap-3 border-t border-rose-100 shrink-0 bg-white">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-semibold shadow-md shadow-rose-300/40 hover:shadow-lg transition-all"
            >
              Simpan Pasien & Mulai Pemantauan
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
