import React, { useState, useEffect, useRef } from 'react';
import { Patient, PatientMessage } from '../types';
import { 
  Check, 
  CheckCheck, 
  Copy, 
  Heart, 
  Info, 
  MapPin, 
  MessageCircle, 
  Phone, 
  Send, 
  Share2, 
  Sparkles, 
  User, 
  X 
} from 'lucide-react';

interface FamilyChatModalProps {
  patient: Patient | null;
  isOpen: boolean;
  onClose: () => void;
  onSendMessage: (patientId: string, messageText: string) => void;
}

export const FamilyChatModal: React.FC<FamilyChatModalProps> = ({
  patient,
  isOpen,
  onClose,
  onSendMessage
}) => {
  if (!isOpen || !patient) return null;

  const [inputMessage, setInputMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const family = patient.familyContact;
  const messages = patient.messages || [];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    onSendMessage(patient.id, inputMessage.trim());
    setInputMessage('');
  };

  // Quick message template insertion
  const applyTemplate = (templateType: 'higiene' | 'mood' | 'kontrol' | 'logistik') => {
    let text = '';
    const nameOnly = patient.name;

    switch (templateType) {
      case 'higiene':
        text = `Selamat siang ${family.name}, kami dari Tim Keperawatan RSJ menginfokan bahwa ${nameOnly} hari ini telah dibantu penggantian pembalut secara higienis. Kondisi area kewanitaan bersih dan tidak ada tanda iritasi/infeksi. Pasien merasa nyaman.`;
        break;
      case 'mood':
        text = `Selamat siang ${family.name}, kami mengabarkan perkembangan suasana hati ${nameOnly} hari ini. Pasien terpantau tenang, nafsu makan baik, dan dapat beristirahat dengan tertib. Terapi obat rutin telah diminum sesuai jadwal.`;
        break;
      case 'kontrol':
        text = `Halo ${family.name}, ini pengingat dari poliklinik jiwa RSJ mengenai jadwal kontrol rawat jalan dan konsultasi psikiatri ${nameOnly} minggu ini. Mohon membawa kartu identitas dan rekam medis yang diperlukan.`;
        break;
      case 'logistik':
        text = `Selamat siang ${family.name}, menginfokan persediaan pakaian ganti dan kebutuhan sanitasi khusus ${nameOnly} di ruang rawat. Pasien saat ini tercukupi berkat pasokan pembalut berkala, mohon siapkan pakaian dalam ekstra untuk kunjungan berikutnya.`;
        break;
    }
    setInputMessage(text);
  };

  const handleCopyChat = () => {
    const chatText = messages
      .map(m => `[${m.timestamp}] ${m.sender === 'nurse' ? 'Perawat RSJ' : family.name}: ${m.text}`)
      .join('\n\n');
    navigator.clipboard.writeText(chatText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-rose-100 flex flex-col h-[650px] max-h-[92vh] overflow-hidden animate-scaleUp">
        
        {/* Chat Header (Simulated WhatsApp/Medical Messenger Bar) */}
        <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white p-4 sm:p-5 flex items-center justify-between shadow-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center text-white font-bold text-base shadow-inner">
                {family.name.charAt(0)}
              </div>
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-rose-500" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-white leading-tight">
                  {family.name}
                </h3>
                <span className="text-[10px] bg-white/20 text-white font-semibold px-2 py-0.5 rounded-full border border-white/20">
                  {family.relationship}
                </span>
              </div>
              <p className="text-xs text-rose-100 mt-0.5 flex items-center gap-2 font-mono">
                <span>{family.phoneNumber}</span>
                <span>·</span>
                <span className="text-emerald-200 font-sans font-medium">Online (Caregiver Pasien: {patient.name})</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyChat}
              className="p-2 rounded-full hover:bg-white/10 text-white text-xs transition-colors"
              title="Salin percakapan"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Patient Identity & Caregiver Info Strip */}
        <div className="bg-rose-50/70 border-b border-rose-100 px-4 py-2.5 flex flex-wrap items-center justify-between text-xs text-slate-700 gap-2 shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-rose-800">Pasien: {patient.name}</span>
            <span className="text-slate-400 font-mono">({patient.medicalRecordNo})</span>
            <span className="text-slate-500 capitalize">· {patient.careType.replace('_', ' ')}</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
            <MapPin className="w-3 h-3 text-rose-500" />
            <span>{family.address}</span>
          </div>
        </div>

        {/* Quick Template Suggestion Chips */}
        <div className="p-2.5 bg-slate-50/80 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto text-[11px] font-medium scrollbar-none shrink-0">
          <span className="text-slate-400 uppercase tracking-wider text-[10px] font-bold px-1 shrink-0">
            Pola Cepat:
          </span>
          <button
            onClick={() => applyTemplate('higiene')}
            className="px-2.5 py-1 rounded-full bg-white border border-rose-200 text-rose-700 hover:bg-rose-50 whitespace-nowrap shadow-2xs transition-colors"
          >
            🩸 Update Higiene & Pembalut
          </button>
          <button
            onClick={() => applyTemplate('mood')}
            className="px-2.5 py-1 rounded-full bg-white border border-pink-200 text-pink-700 hover:bg-pink-50 whitespace-nowrap shadow-2xs transition-colors"
          >
            🌸 Update Mood & Terapi
          </button>
          <button
            onClick={() => applyTemplate('kontrol')}
            className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 whitespace-nowrap shadow-2xs transition-colors"
          >
            📅 Pengingat Kontrol
          </button>
          <button
            onClick={() => applyTemplate('logistik')}
            className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 whitespace-nowrap shadow-2xs transition-colors"
          >
            📦 Logistik Sanitasi
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 bg-[#FCF8F9]/60">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-xs text-slate-400 p-6 space-y-2">
              <MessageCircle className="w-8 h-8 text-rose-300" />
              <p className="font-semibold text-slate-600">Belum ada riwayat pesan langsung</p>
              <p className="max-w-xs text-[11px]">
                Kirim pesan pertama atau pilih templat di atas untuk mengabarkan kondisi kesehatan & MHM pasien ke keluarga pendamping.
              </p>
            </div>
          ) : (
            messages.map((msg) => {
              const isNurse = msg.sender === 'nurse';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isNurse ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] sm:max-w-[78%] rounded-2xl px-4 py-2.5 text-xs shadow-sm leading-relaxed ${
                      isNurse
                        ? 'bg-gradient-to-br from-rose-500 to-pink-500 text-white rounded-br-xs'
                        : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 text-[10px] mb-1 opacity-80">
                      <span className="font-bold">
                        {isNurse ? 'Tim Keperawatan RSJ' : `${family.name} (${family.relationship})`}
                      </span>
                      <span className="font-mono">{msg.timestamp}</span>
                    </div>

                    <p className="whitespace-pre-wrap">{msg.text}</p>

                    {isNurse && (
                      <div className="flex justify-end mt-1">
                        <CheckCheck className="w-3.5 h-3.5 text-rose-200" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}

          {isTyping && (
            <div className="flex items-center gap-1.5 text-xs text-slate-400 p-2 italic">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-bounce" />
              <span>{family.name} sedang mengetik...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 sm:p-4 bg-white border-t border-rose-100 flex items-center gap-2 shrink-0">
          <input
            type="text"
            placeholder={`Tulis pesan atau update berkala untuk ${family.name}...`}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-full border border-slate-200 text-xs sm:text-sm focus:outline-none focus:border-rose-400 focus:ring-1 focus:ring-rose-400 text-slate-800"
          />
          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 disabled:opacity-40 text-white flex items-center justify-center shadow-md shadow-rose-300/40 transition-all shrink-0"
          >
            <Send className="w-4 h-4 ml-0.5" />
          </button>
        </form>

      </div>
    </div>
  );
};
