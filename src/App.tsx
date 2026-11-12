/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  HISTORICAL_CONSUMPTION, 
  INITIAL_EDUCATION_MODULES, 
  INITIAL_HOSPITALS, 
  INITIAL_LOGISTICS_ITEMS, 
  INITIAL_PARTNERS, 
  SIMULATION_PATIENTS 
} from './data/mockData';
import { ActiveTab, EducationModule, HospitalPartner, LogisticsItem, Patient, PatientMessage, SectorPartner } from './types';

import { AddPatientModal } from './components/AddPatientModal';
import { ClinicalMonitoringTab } from './components/ClinicalMonitoringTab';
import { CrossSectorTab } from './components/CrossSectorTab';
import { EducationTab } from './components/EducationTab';
import { FamilyChatModal } from './components/FamilyChatModal';
import { Header } from './components/Header';
import { LogisticsTab } from './components/LogisticsTab';
import { ModuleReaderModal } from './components/ModuleReaderModal';
import { OverviewTab } from './components/OverviewTab';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('ringkasan');
  const [isSimulationLoaded, setIsSimulationLoaded] = useState<boolean>(false);
  
  // State for patients: starts empty (0 patients) to match prompt verbatim, can be populated via simulation toggle or + Tambah Pasien
  const [patients, setPatients] = useState<Patient[]>([]);
  const [educationModules, setEducationModules] = useState<EducationModule[]>(INITIAL_EDUCATION_MODULES);
  const [logistics, setLogistics] = useState<LogisticsItem[]>(INITIAL_LOGISTICS_ITEMS);
  const [hospitals, setHospitals] = useState<HospitalPartner[]>(INITIAL_HOSPITALS);
  const [partners, setPartners] = useState<SectorPartner[]>(INITIAL_PARTNERS);

  // Modals state
  const [isAddPatientOpen, setIsAddPatientOpen] = useState<boolean>(false);
  const [selectedModuleForReader, setSelectedModuleForReader] = useState<EducationModule | null>(null);
  const [selectedPatientForChat, setSelectedPatientForChat] = useState<Patient | null>(null);
  const [isFamilyChatOpen, setIsFamilyChatOpen] = useState<boolean>(false);

  // Toggle between clean baseline (0 patients) and pilot simulation (4 patients)
  const handleToggleSimulation = () => {
    if (isSimulationLoaded) {
      setPatients([]);
      setIsSimulationLoaded(false);
    } else {
      setPatients(SIMULATION_PATIENTS);
      setIsSimulationLoaded(true);
    }
  };

  const handleLoadPilotData = () => {
    setPatients(SIMULATION_PATIENTS);
    setIsSimulationLoaded(true);
  };

  const handleAddPatient = (newPatient: Patient) => {
    setPatients(prev => [newPatient, ...prev]);
    setIsSimulationLoaded(true);
  };

  const handleDeletePatient = (patientId: string) => {
    setPatients(prev => prev.filter(p => p.id !== patientId));
  };

  const handleLogHygieneChange = (patientId: string) => {
    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} WIB (Baru saja)`;

    setPatients(prev => prev.map(p => {
      if (p.id === patientId) {
        return {
          ...p,
          lastHygieneChangeTime: timeString,
          moodBehavior: 'tenang'
        };
      }
      return p;
    }));
  };

  const handleUpdatePatientMood = (patientId: string, mood: any) => {
    setPatients(prev => prev.map(p => {
      if (p.id === patientId) {
        const updated = { ...p, moodBehavior: mood };
        if (selectedPatientForChat?.id === patientId) {
          setSelectedPatientForChat(updated);
        }
        return updated;
      }
      return p;
    }));
  };

  const handleOpenFamilyChat = (patient: Patient) => {
    setSelectedPatientForChat(patient);
    setIsFamilyChatOpen(true);
  };

  const handleSendMessage = (patientId: string, messageText: string) => {
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} WIB`;
    const newNurseMsg: PatientMessage = {
      id: `msg-${Date.now()}`,
      sender: 'nurse',
      text: messageText,
      timestamp: timeStr,
      status: 'read'
    };

    setPatients(prev => prev.map(p => {
      if (p.id === patientId) {
        const updatedPatient = { ...p, messages: [...(p.messages || []), newNurseMsg] };
        setSelectedPatientForChat(updatedPatient);
        return updatedPatient;
      }
      return p;
    }));

    // Simulated authentic caregiver family reply after 1000ms
    setTimeout(() => {
      const replies = [
        'Terima kasih banyak atas update rutinnya ya Ners/Suster. Sangat menenangkan mengetahui kondisinya terpantau dengan baik. 🙏',
        'Baik suster, terima kasih laporannya. Nanti saat jadwal kunjungan keluarga kami siapkan pakaian ganti tambahan ya.',
        'Alhamdulillah, terima kasih banyak tim keperawatan RSJ. Titip salam dan doa terbaik untuk beliau ya suster.',
        'Terima kasih banyak suster, kami sekeluarga sangat bersyukur beliau kooperatif dan nyaman saat menstruasi.'
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      const replyTime = `${new Date().getHours().toString().padStart(2, '0')}:${new Date().getMinutes().toString().padStart(2, '0')} WIB`;
      
      const familyMsg: PatientMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'family',
        text: randomReply,
        timestamp: replyTime,
        status: 'read'
      };

      setPatients(prev => prev.map(p => {
        if (p.id === patientId) {
          const updatedWithReply = { ...p, messages: [...(p.messages || []), familyMsg] };
          setSelectedPatientForChat(updatedWithReply);
          return updatedWithReply;
        }
        return p;
      }));
    }, 1000);
  };

  const handleToggleModuleCompletion = (moduleId: string) => {
    setEducationModules(prev => prev.map(m => {
      if (m.id === moduleId) {
        return { ...m, completed: !m.completed };
      }
      return m;
    }));
  };

  const handleRestockItem = (itemId: string, addedStock: number) => {
    setLogistics(prev => prev.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          currentStock: item.currentStock + addedStock
        };
      }
      return item;
    }));
  };

  const handleAddPartner = (newPartner: SectorPartner) => {
    setPartners(prev => [newPartner, ...prev]);
  };

  const handleAddHospital = (newHospital: HospitalPartner) => {
    setHospitals(prev => [newHospital, ...prev]);
  };

  return (
    <div className="min-h-screen bg-[#FFF5F6] text-slate-800 flex flex-col font-sans selection:bg-rose-200 selection:text-rose-900">
      
      {/* Top Header Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isSimulationLoaded={isSimulationLoaded}
        onToggleSimulation={handleToggleSimulation}
        patientCount={patients.length}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {activeTab === 'ringkasan' && (
          <OverviewTab
            patients={patients}
            educationModules={educationModules}
            logistics={logistics}
            partners={partners}
            setActiveTab={setActiveTab}
            onOpenAddPatient={() => setIsAddPatientOpen(true)}
          />
        )}

        {activeTab === 'pemantauan_klinis' && (
          <ClinicalMonitoringTab
            patients={patients}
            onOpenAddPatient={() => setIsAddPatientOpen(true)}
            onDeletePatient={handleDeletePatient}
            onLogHygieneChange={handleLogHygieneChange}
            onUpdatePatientMood={handleUpdatePatientMood}
            onLoadPilotData={handleLoadPilotData}
            onOpenFamilyChat={handleOpenFamilyChat}
          />
        )}

        {activeTab === 'edukasi' && (
          <EducationTab
            modules={educationModules}
            onToggleModuleCompletion={handleToggleModuleCompletion}
            onSelectModuleForDetail={(module) => setSelectedModuleForReader(module)}
          />
        )}

        {activeTab === 'logistik_jit' && (
          <LogisticsTab
            logistics={logistics}
            patients={patients}
            onRestockItem={handleRestockItem}
          />
        )}

        {activeTab === 'lintas_sektor' && (
          <CrossSectorTab
            hospitals={hospitals}
            partners={partners}
            onAddPartner={handleAddPartner}
            onAddHospital={handleAddHospital}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-rose-100 bg-white/70 backdrop-blur-sm py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">SynapseCare</span>
            <span>·</span>
            <span>Ekosistem Tata Kelola Digital Menstrual Hygiene Management (MHM) ODGJ Perempuan</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>UU No. 8/2016</span>
            <span>·</span>
            <span>Standar WHO/UNICEF JMP</span>
            <span>·</span>
            <span>SDGs 3, 5, 6, 8, 10, 17</span>
          </div>
        </div>
      </footer>

      {/* Add Patient Modal */}
      <AddPatientModal
        isOpen={isAddPatientOpen}
        onClose={() => setIsAddPatientOpen(false)}
        onAddPatient={handleAddPatient}
      />

      {/* Module Reader Modal */}
      <ModuleReaderModal
        module={selectedModuleForReader}
        onClose={() => setSelectedModuleForReader(null)}
        onToggleComplete={handleToggleModuleCompletion}
      />

      {/* Family Chat & Update Modal (Prompt Requirement) */}
      <FamilyChatModal
        patient={selectedPatientForChat}
        isOpen={isFamilyChatOpen}
        onClose={() => setIsFamilyChatOpen(false)}
        onSendMessage={handleSendMessage}
      />

    </div>
  );
}
