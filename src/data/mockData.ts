import { EducationModule, HospitalPartner, LogisticsItem, Patient, SectorPartner } from '../types';

export const INITIAL_EDUCATION_MODULES: EducationModule[] = [
  {
    id: 'edu-1',
    title: 'Dasar-Dasar Menstrual Hygiene Management',
    category: 'Modul Dasar',
    targetAudience: 'Perawat & Pengasuh',
    durationMinutes: 15,
    completed: false,
    summary: 'Protokol higienitas sanitasi menstruasi standar WHO & UNICEF yang disesuaikan untuk setting bangsal psikiatri dan hunian rehabilitasi.',
    learningPoints: [
      'Frekuensi penggantian pembalut minimal 3-4 kali sehari atau setiap 4-6 jam guna mencegah kolonisasi bakteri anaerob.',
      'Teknik pembersihan area genitalia dari arah depan ke belakang dengan air bersih mengalir tanpa sabun berkandungan parfum keras.',
      'Manajemen limbah pembalut yang aman bagi pasien dengan kecenderungan disorientasi atau pica.',
      'Pentingnya mencatat volume perdarahan dan durasi siklus sebagai parameter kesehatan sistemik.'
    ],
    protocolSteps: [
      'Siapkan paket sanitasi higienis tertutup sebelum memasuki ruang rawat.',
      'Ajak pasien berkomunikasi tenang dengan kalimat pendek dan instruksi satu langkah.',
      'Bantu pelepasan pembalut lama, bungkus rapat dengan kertas limbah sebelum dibuang ke tempat sampah tertutup.',
      'Lakukan pembersihan higienis, keringkan lembut dengan handuk bersih atau kasa steril.',
      'Pasangkan pembalut baru yang sesuai daya serapnya dengan perekat kuat.'
    ],
    dignityChecklist: [
      'Menutup tirai pembatas dan menjaga privasi tubuh pasien sepenuhnya.',
      'Meminta izin sebelum menyentuh area privat pasien secara verbal dan gestural.',
      'Tidak menunjukkan ekspresi jijik atau enggan di hadapan pasien.',
      'Memberikan pujian suportif atas kerjasama pasien.'
    ]
  },
  {
    id: 'edu-2',
    title: 'Mengenali Tanda Infeksi Saluran Reproduksi',
    category: 'Video',
    targetAudience: 'Perawat',
    durationMinutes: 8,
    completed: false,
    summary: 'Identifikasi dini gejala infeksi saluran reproduksi (ISR) dan infeksi menular seksual pada pasien yang tidak mampu mengartikulasikan rasa sakitnya.',
    learningPoints: [
      'Mengenali tanda keputihan patologis (berbau menyengat, berwarna kehijauan/kuning kental, konsistensi seperti dadih susu).',
      'Mendeteksi eritema, edema, atau lesi ekskoriasi di area vulva akibat gesekan pembalut lembap yang terlambat diganti.',
      'Membaca bahasa tubuh pasien yang menggaruk area genital berulang kali atau menolak duduk tegak.',
      'Penapisan demam subfebris dan nyeri palpasi suprapubik.'
    ],
    protocolSteps: [
      'Lakukan inspeksi visual berkala saat pendampingan mandi pagi dan sore.',
      'Dokumentasikan temuan klinis pada rekam medis digital SynapseCare.',
      'Konsultasikan segera ke dokter spesialis obstetri & ginekologi (Sp.OG) mitra RSJ.',
      'Hindari penggunaan antiseptik keras tanpa indikasi dokter yang dapat merusak flora normal Doderlein.'
    ],
    dignityChecklist: [
      'Menjelaskan pemeriksaan dengan bahasa yang tidak mengintimidasi.',
      'Ditemani oleh sesama perawat perempuan selama pemeriksaan fisik.',
      'Segera menutupi kembali bagian tubuh pasien begitu inspeksi selesai.'
    ]
  },
  {
    id: 'edu-3',
    title: 'Pendampingan Pasien dengan Keterbatasan Kognitif saat Menstruasi',
    category: 'Panduan',
    targetAudience: 'Perawat & Keluarga',
    durationMinutes: 12,
    completed: false,
    summary: 'Strategi adaptif untuk pasien disabilitas mental dan intelektual yang mengalami kebingungan, ketakutan saat melihat darah, atau disorientasi sensorik.',
    learningPoints: [
      'Memahami reaksi sensorik pasien terhadap sensasi basah dan lengket pada pembalut.',
      'Penggunaan alat bantu visual (kartu visual bergambar / social stories) untuk langkah-langkah pembersihan.',
      'Memilih tipe pembalut yang nyaman (pembalut celana/pant-type untuk pasien yang sering melepas pembalut konvensional).',
      'Manajemen kecemasan akut ketika pasien mengira darah menstruasi adalah luka berat.'
    ],
    protocolSteps: [
      'Gunakan kartu visual bertahap: "Buka Celana" -> "Lepas Pembalut" -> "Basuh Air" -> "Pasang Baru".',
      'Gunakan pembalut berperekat ganda atau pembalut celana elastis ramah kulit.',
      'Bimbing tangan pasien secara gentle (hand-over-hand) untuk melatih memori motorik jika berada di fase rehabilitasi.',
      'Lakukan validasi emosi: "Mbak tidak luka, ini hal alami yang terjadi pada tubuh tiap bulan".'
    ],
    dignityChecklist: [
      'Tidak memarahi pasien ketika terjadi kebocoran (staining) pada kasur atau baju.',
      'Melibatkan pasien semaksimal mungkin sesuai kapasitas kognitif fungsionalnya.',
      'Menghormati preferensi aroma dan tekstur kain yang dipilih pasien.'
    ]
  },
  {
    id: 'edu-4',
    title: 'Mengaitkan Perubahan Perilaku dengan Siklus Menstruasi',
    category: 'Infografis',
    targetAudience: 'Perawat',
    durationMinutes: 5,
    completed: false,
    summary: 'Korelasi fluktuasi hormon estrogen-progesteron terhadap penurunan ambang batas eksitasi saraf dan exacerbation gejala psikotik / afektif.',
    learningPoints: [
      'Premenstrual Exacerbation (PME) pada skizofrenia dan gangguan bipolar: agitasi meningkat 3-7 hari sebelum menstruasi.',
      'Penurunan estrogen di fase luteal akhir berkaitan dengan penurunan neurotransmisi dopaminergik dan serotonergik.',
      'Efek samping obat antipsikotika (risperidone, haloperidol) terhadap hiperprolaktinemia yang memicu amenore sekunder atau oligomenore.',
      'Pentingnya sinkronisasi jadwal titrasi obat psikiatri dengan kalender ovulasi dan menstruasi.'
    ],
    protocolSteps: [
      'Catat skor agitasi harian di kalender klinis SynapseCare.',
      'Bandingkan kurva perilaku dengan tanggal fase luteal pasien.',
      'Sajikan temuan korelasi saat rapat multidisciplinary team (MDT) bersama psikiater penanggung jawab.',
      'Siapkan intervensi relaksasi sensorik non-farmakologis menjelang tanggal siklus haid.'
    ],
    dignityChecklist: [
      'Tidak melabeli ledakan emosi sebagai "pasien kumat nakal", melainkan respons neuro-hormonal nyata.',
      'Menyediakan ruang de-eskalasi yang tenang dengan air hangat untuk kompres perut.'
    ]
  },
  {
    id: 'edu-5',
    title: 'Komunikasi Suportif dan Menjaga Martabat Pasien',
    category: 'Modul Dasar',
    targetAudience: 'Semua Pengguna',
    durationMinutes: 10,
    completed: false,
    summary: 'Prinsip trauma-informed care dan pendekatan humanis dalam merawat kesehatan intim perempuan penyandang disabilitas psikososial.',
    learningPoints: [
      'Penyandang disabilitas mental adalah subjek pemegang hak asasi sesuai UU No. 8 Tahun 2016, bukan sekadar objek perawatan.',
      'Menghilangkan stigma ganda (intersectionality): perempuan + gangguan jiwa + menstruasi tabu.',
      'Nada bicara tenang, asertif, tanpa intonasi memerintah atau mencemooh.',
      'Mencegah segala bentuk kekerasan verbal dan pengabaian kebutuhan dasar sanitasi.'
    ],
    protocolSteps: [
      'Sapalah pasien dengan nama panggilan yang mereka sukai.',
      'Tatap mata setinggi level pasien dan beri senyuman hangat.',
      'Dengarkan keluhan rasa nyeri tanpa meremehkan ("Ah masa sakit segitunya").',
      'Bantu pasien menjaga kebersihan pakaian dalam agar tetap percaya diri.'
    ],
    dignityChecklist: [
      'Menghormati otonomi tubuh pasien seluas mungkin.',
      'Memastikan pintu toilet tertutup saat pasien berganti pakaian.',
      'Mengutamakan privasi dan tidak mendiskusikan kondisi menstruasi pasien secara terbuka di lorong.'
    ]
  },
  {
    id: 'edu-6',
    title: 'Edukasi bagi Keluarga: Mendukung Pasien Pasca Rawat',
    category: 'Video',
    targetAudience: 'Keluarga',
    durationMinutes: 10,
    completed: false,
    summary: 'Panduan transisi bagi caregiver keluarga saat pasien beralih dari rawat inap ke rawat jalan dan rehabilitasi di rumah.',
    learningPoints: [
      'Menyiapkan logistik sanitasi mandiri di rumah tanpa membebani keuangan keluarga secara berlebih.',
      'Mengenali perubahan mood pra-haid sebagai siklus alami bukan tanda kekambuhan akut yang harus dipasung.',
      'Menciptakan jadwal rutin di rumah: alarm ganti pembalut teratur setiap habis shalat/makan.',
      'Akses ke puskesmas atau kader jiwa terdekat jika ada tanda infeksi atau menstruasi tidak kunjung datang.'
    ],
    protocolSteps: [
      'Simpan persediaan pembalut di tempat yang mudah dijangkau pasien namun aman.',
      'Gunakan kalender dinding sederhana atau aplikasi pendamping keluarga SynapseCare.',
      'Dukung nutrisi tinggi zat besi (bayam, telur, hati ayam) untuk mencegah anemia defisiensi besi.',
      'Konsultasikan ke dokter jika siklus haid berhenti lebih dari 3 bulan berturut-turut.'
    ],
    dignityChecklist: [
      'Keluarga tidak mengisolasi pasien saat menstruasi.',
      'Menjaga komunikasi penuh kasih sayang tanpa cemas berlebihan.',
      'Mendampingi pasien kontrol rawat jalan secara teratur.'
    ]
  }
];

export const INITIAL_LOGISTICS_ITEMS: LogisticsItem[] = [
  {
    id: 'log-1',
    name: 'Pembalut Higienis Bersayap',
    currentStock: 420,
    unit: 'pcs',
    projectedNeed: 0,
    safetyThreshold: 150,
    status: 'aman',
    costPerUnit: 1800
  },
  {
    id: 'log-2',
    name: 'Sabun Antiseptik pH Seimbang',
    currentStock: 38,
    unit: 'botol',
    projectedNeed: 0,
    safetyThreshold: 15,
    status: 'aman',
    costPerUnit: 24000
  },
  {
    id: 'log-3',
    name: 'Celana Dalam Sekali Pakai Elastis',
    currentStock: 60,
    unit: 'pcs',
    projectedNeed: 0,
    safetyThreshold: 25,
    status: 'aman',
    costPerUnit: 7500
  }
];

export const HISTORICAL_CONSUMPTION = [
  { month: 'Mar', pembalut: 310, kebutuhan: 300, pasokan: 350 },
  { month: 'Apr', pembalut: 380, kebutuhan: 370, pasokan: 400 },
  { month: 'Mei', pembalut: 340, kebutuhan: 350, pasokan: 360 },
  { month: 'Jun', pembalut: 410, kebutuhan: 400, pasokan: 420 },
  { month: 'Jul', pembalut: 390, kebutuhan: 410, pasokan: 450 },
  { month: 'Ags', pembalut: 430, kebutuhan: 420, pasokan: 450 }
];

export const INITIAL_HOSPITALS: HospitalPartner[] = [
  {
    id: 'hosp-1',
    name: 'RS dr. H. Marzoeki Mahdi (Pilot)',
    status: 'Pilot',
    complianceRate: 82,
    province: 'Jawa Barat (Bogor)',
    bedCapacity: 450,
    activePatientsTracked: 34,
    notes: 'Pusat rujukan nasional kesehatan jiwa dengan implementasi percontohan modul SynapseCare.'
  },
  {
    id: 'hosp-2',
    name: 'RSJ Provinsi Jawa Barat',
    status: 'Onboarding',
    complianceRate: 41,
    province: 'Jawa Barat (Cisarua)',
    bedCapacity: 280,
    activePatientsTracked: 18,
    notes: 'Tahap integrasi pelatihan perawat dan pencatatan kalender digital bangsal rehabilitasi.'
  },
  {
    id: 'hosp-3',
    name: 'RSJ Provinsi Jawa Timur',
    status: 'Potensial',
    complianceRate: 0,
    province: 'Jawa Timur (Menur)',
    bedCapacity: 350,
    activePatientsTracked: 0,
    notes: 'Dalam proses audiensi formal dengan direksi dan komite keperawatan.'
  }
];

export const INITIAL_PARTNERS: SectorPartner[] = [
  {
    id: 'part-1',
    name: 'Yayasan Peduli Sanitasi Nusantara',
    contributionType: 'CSR Paket Sanitasi',
    status: 'Aktif',
    category: 'Yayasan / NGO',
    description: 'Penyediaan 1.200 unit paket pembalut & perlengkapan higienitas per kuartal untuk pasien prasejahtera.',
    impactMetric: '1.200 Paket / Kuartal'
  },
  {
    id: 'part-2',
    name: 'Korporasi FMCG Nasional (CSR Kesehatan)',
    contributionType: 'Pendanaan & Pasokan Logistik',
    status: 'Negosiasi',
    category: 'CSR Korporasi',
    description: 'Skema Just-in-Time supply chain pasokan pembalut ramah kulit sensitif dan sabun antiseptik bebas pewangi.',
    impactMetric: 'Diskon 40% & Hibah 2.000 pcs'
  },
  {
    id: 'part-3',
    name: 'Dinas Kesehatan Provinsi',
    contributionType: 'Dukungan Regulasi & Akreditasi',
    status: 'Aktif',
    category: 'Pemerintah / Dinas',
    description: 'Pengakuan indikator MHM dalam standar mutu pelayanan asuhan keperawatan jiwa daerah.',
    impactMetric: 'SOP Resmi Tingkat Provinsi'
  }
];

export const SIMULATION_PATIENTS: Patient[] = [
  {
    id: 'pat-1',
    name: 'Ny. Siti R.',
    medicalRecordNo: 'RM-2026-0819',
    age: 29,
    careType: 'rawat_inap',
    disabilityType: 'skizofrenia',
    medicationRegimen: 'Risperidone 2mg 2x1, Trihexyphenidyl 2mg 1x1',
    lastPeriodStart: '2026-11-09',
    cycleLengthDays: 28,
    periodDurationDays: 6,
    isCurrentlyMenstruating: true,
    cycleDelayDays: 0,
    dailyPadRequirement: 5,
    hygieneIndependence: 'didampingi_sebagian',
    lastHygieneChangeTime: '10:30 WIB (2 jam lalu)',
    moodBehavior: 'agitasi_pramenstruasi',
    infectionSigns: 'none',
    notes: 'Cenderung gelisah dan menarik selimut saat kram perut; respon positif bila dikompres air hangat.',
    familyContact: {
      name: 'Ibu Aminah',
      relationship: 'Ibu Kandung',
      phoneNumber: '+62 812-4829-1940',
      address: 'Jl. Pajajaran No. 42, Bogor Selatan',
      isPrimaryCaregiver: true,
      preferredContactHours: '09:00 - 17:00 WIB'
    },
    messages: [
      {
        id: 'msg-1',
        sender: 'nurse',
        text: 'Selamat pagi Ibu Aminah, kami dari Tim Keperawatan RSJ Bangsal Melati mengabarkan kondisi Ny. Siti hari ini. Pagi ini beliau sedang hari ke-3 menstruasi, sudah kami bantu ganti pembalut higienis dan area genital bersih tanpa tanda infeksi.',
        timestamp: '08:45 WIB',
        status: 'read'
      },
      {
        id: 'msg-2',
        sender: 'family',
        text: 'Alhamdulillah, terima kasih banyak Ns. Apakah Siti sempat gelisah atau mengeluh sakit perut bu perawat?',
        timestamp: '09:12 WIB',
        status: 'read'
      },
      {
        id: 'msg-3',
        sender: 'nurse',
        text: 'Sempat ada sedikit agitasi pra-haid bu, namun setelah kami berikan kompres hangat dan relaksasi musik, beliau sudah jauh lebih tenang dan kooperatif. Obat rutin juga sudah diminum dengan baik.',
        timestamp: '09:30 WIB',
        status: 'read'
      }
    ]
  },
  {
    id: 'pat-2',
    name: 'Nn. Dewi A.',
    medicalRecordNo: 'RM-2026-0942',
    age: 23,
    careType: 'rawat_jalan',
    disabilityType: 'bipolar',
    medicationRegimen: 'Lithium Carbonate 300mg 2x1, Olanzapine 5mg malam',
    lastPeriodStart: '2026-11-10',
    cycleLengthDays: 30,
    periodDurationDays: 5,
    isCurrentlyMenstruating: true,
    cycleDelayDays: 0,
    dailyPadRequirement: 4,
    hygieneIndependence: 'mandiri',
    lastHygieneChangeTime: '08:15 WIB',
    moodBehavior: 'tenang',
    infectionSigns: 'none',
    notes: 'Edukasi mandiri berhasil via panduan visual kartu kartu langkah kebersihan.',
    familyContact: {
      name: 'Bpk. Hendra Saputra',
      relationship: 'Ayah Kandung',
      phoneNumber: '+62 857-3194-8211',
      address: 'Komp. Melati Indah Blok C3, Cimahi',
      isPrimaryCaregiver: true,
      preferredContactHours: '08:00 - 20:00 WIB'
    },
    messages: [
      {
        id: 'msg-1',
        sender: 'nurse',
        text: 'Selamat siang Bpk Hendra, mengingatkan untuk jadwal kontrol rawat jalan Nn. Dewi hari Kamis depan. Bagaimana kemandirian higiene menstruasi di rumah pak?',
        timestamp: '11:00 WIB',
        status: 'read'
      },
      {
        id: 'msg-2',
        sender: 'family',
        text: 'Selamat siang Ners. Dewi alhamdulillah lancar ganti pembalut mandiri pakai panduan kartu bergambar yang diberikan kemarin.',
        timestamp: '11:15 WIB',
        status: 'read'
      }
    ]
  },
  {
    id: 'pat-3',
    name: 'Ny. Maria T.',
    medicalRecordNo: 'RM-2026-0311',
    age: 38,
    careType: 'rehabilitasi',
    disabilityType: 'depresi',
    medicationRegimen: 'Sertraline 50mg pagi, Clonazepam 0.5mg malam',
    lastPeriodStart: '2026-10-12',
    cycleLengthDays: 28,
    periodDurationDays: 5,
    isCurrentlyMenstruating: false,
    cycleDelayDays: 2,
    dailyPadRequirement: 4,
    hygieneIndependence: 'didampingi_sebagian',
    lastHygieneChangeTime: 'N/A (Belum Haid)',
    moodBehavior: 'tenang',
    infectionSigns: 'ruam_gatal',
    notes: 'Terdeteksi keterlambatan siklus 2 hari; keluhan gatal lipat paha dalam evaluasi salep antijamur.',
    familyContact: {
      name: 'Bpk. Paulus Tambunan',
      relationship: 'Suami',
      phoneNumber: '+62 821-9041-5523',
      address: 'Jl. Riau No. 108, Bandung Wetan',
      isPrimaryCaregiver: true,
      preferredContactHours: '10:00 - 18:00 WIB'
    },
    messages: [
      {
        id: 'msg-1',
        sender: 'nurse',
        text: 'Selamat sore Pak Paulus. Kami menginfokan bahwa Ny. Maria terlambat haid 2 hari dan ada sedikit ruam gatal di lipat paha, sudah kami konsultasikan ke dokter spesialis untuk salep topikal.',
        timestamp: '14:20 WIB',
        status: 'read'
      }
    ]
  },
  {
    id: 'pat-4',
    name: 'Nn. Fitriani',
    medicalRecordNo: 'RM-2026-1104',
    age: 21,
    careType: 'rawat_inap',
    disabilityType: 'autisme_perkembangan',
    medicationRegimen: 'Aripiprazole 5mg 1x1',
    lastPeriodStart: '2026-11-11',
    cycleLengthDays: 29,
    periodDurationDays: 7,
    isCurrentlyMenstruating: true,
    cycleDelayDays: 0,
    dailyPadRequirement: 6,
    hygieneIndependence: 'dibantu_penuh',
    lastHygieneChangeTime: '11:45 WIB (30 menit lalu)',
    moodBehavior: 'menolak_pembalut',
    infectionSigns: 'none',
    notes: 'Hipersensitivitas sensorik tekstur; menggunakan pembalut celana katun khusus tanpa bau.',
    familyContact: {
      name: 'Ny. Marlina',
      relationship: 'Kakak Kandung',
      phoneNumber: '+62 813-7720-4189',
      address: 'Perumahan Selabintana Asri, Sukabumi',
      isPrimaryCaregiver: true,
      preferredContactHours: '12:00 - 19:00 WIB'
    },
    messages: [
      {
        id: 'msg-1',
        sender: 'nurse',
        text: 'Halo Kak Marlina, menginfokan Fitriani hari ini haid hari ke-2. Karena sempat menolak pembalut perekat biasa, kami pakaikan pembalut celana elastis bantuan CSR dan Fitriani merasa jauh lebih nyaman.',
        timestamp: '12:10 WIB',
        status: 'read'
      }
    ]
  }
];

export const OPINION_ARTICLE_DATA = {
  theme: 'Choice of Issue: Youth, Education, and the Future of Work / Youth Entrepreneurship: Building Inclusive Business Ecosystems',
  subtheme: 'Menstrual Hygiene Management (MHM) pada ODGJ Perempuan & Ekosistem Digital Berkelanjutan',
  titleOptions: [
    {
      id: 1,
      title: 'Menatap yang Tak Terlihat: Mendobrak Krisis Martabat Menstruasi ODGJ Perempuan Lewat Ekosistem Digital Inklusif',
      angle: 'Fokus pada hak asasi, keadilan gender, dan martabat kemanusiaan yang terpinggirkan.'
    },
    {
      id: 2,
      title: 'Beban Pajak, Ketiadaan RSJ, dan Darah yang Terabaikan: Mengapa Tata Kelola MHM ODGJ Perempuan adalah Isu Keberlanjutan Bangsa',
      angle: 'Kritik struktural kebijakan (kenaikan pajak sanitasi, disparitas faskes) dihubungkan dengan kesehatan jiwa.'
    },
    {
      id: 3,
      title: 'Merawat dengan Data, Memulihkan dengan Martabat: Rekayasa Ekosistem Supply Chain MHM Inklusif Berbasis Pemuda',
      angle: 'Fokus pada peran pemuda, inovasi teknologi sirkular, dan ekosistem bisnis inklusif (Future of Work).'
    },
    {
      id: 4,
      title: 'Dilema Hormonal di Balik Tirai Bangsal Jiwa: Menyelaraskan Siklus Reproduksi, Neuropsikiatri, dan Kebijakan Publik',
      angle: 'Eksplorasi ilmiah sains-klinis yang dipadukan dengan advokasi sosial dan reformasi regulasi.'
    },
    {
      id: 5,
      title: 'Dari Tabu Menjadi Kebajikan Publik: Model Bisnis Inklusif dan Logistik Just-in-Time untuk Sanitasi Perempuan Disabilitas Mental',
      angle: 'Sisi kewirausahaan sosial inklusif (Youth Entrepreneurship) dan kemitraan CSR berbasis data presisi.'
    }
  ],
  keyStats: [
    { label: 'Kenaikan Pajak Sanitasi', value: 'PPN 12%', context: 'Kenaikan PPN menaikkan harga pokok pembalut, memperparah period poverty pada keluarga dengan beban rawat ODGJ.' },
    { label: 'Provinsi Tanpa RSJ', value: '6 Provinsi', context: 'Sedikitnya 6 provinsi di Indonesia (termasuk Kep. Riau, Gorontalo, Maluku Utara, Papua Barat, Sulawesi Barat, Kaltara) belum memiliki RSJ mandiri.' },
    { label: 'Prevalensi Gangguan Jiwa Berat', value: '7 per 1.000 RT', context: 'Data Riskesdas menunjukkan ratusan ribu rumah tangga memiliki anggota keluarga dengan skizofrenia / psikosis.' },
    { label: 'Regulasi Perlindungan Hukum', value: 'UU No. 8/2016', context: 'Pasal 4 menjamin hak kesehatan reproduksi penyandang disabilitas mental setara dengan warga negara lain.' },
    { label: 'Standar Internasional', value: 'WHO-UNICEF JMP', context: 'Akses terhadap materi pembersih, privasi berganti, sarana cuci sabun, dan pembuangan higienis.' }
  ],
  sdgsMapping: [
    {
      goal: 'SDG 3: Kehidupan Sehat dan Sejahtera',
      target: 'Target 3.4 & 3.7',
      description: 'Mempromosikan kesehatan mental dan kesejahteraan serta menjamin akses universal terhadap layanan kesehatan seksual dan reproduksi.'
    },
    {
      goal: 'SDG 5: Kesetaraan Gender',
      target: 'Target 5.1 & 5.6',
      description: 'Mengakhiri segala bentuk diskriminasi terhadap perempuan disabilitas psikososial dan memastikan otonomi kesehatan tubuh.'
    },
    {
      goal: 'SDG 6: Air Bersih dan Sanitasi Layak',
      target: 'Target 6.2',
      description: 'Mencapai akses sanitasi dan higienitas yang memadai bagi semua, memberi perhatian khusus pada kebutuhan perempuan dan mereka yang berada dalam situasi rentan.'
    },
    {
      goal: 'SDG 8: Pekerjaan Layak & Pertumbuhan Ekonomi',
      target: 'Target 8.5',
      description: 'Memperluas ekonomi perawatan (care economy) dan membuka lapangan kerja masa depan (Future of Work) yang bermartabat bagi pemuda di bidang perawat dan logistik kesehatan.'
    },
    {
      goal: 'SDG 10: Berkurangnya Kesenjangan',
      target: 'Target 10.2 & 10.3',
      description: 'Pemberdayaan sosial, ekonomi, dan politik bagi kaum disabilitas mental serta eliminasi regulasi dan pajak diskriminatif.'
    },
    {
      goal: 'SDG 17: Kemitraan untuk Mencapai Tujuan',
      target: 'Target 17.17',
      description: 'Kemitraan multipihak (Pemerintah, Rumah Sakit Jiwa, Sektor Swasta FMCG, dan Organisasi Pemuda) berbasis data transparan.'
    }
  ],
  fullEssayOutline: {
    leadIssue: 'Menstruasi adalah siklus biologis alami yang dialami separuh populasi bumi, namun di banyak belahan dunia, termasuk kawasan ASEAN dan Indonesia, ia masih diselimuti tabu ganda. Ketika menstruasi bertemu dengan disabilitas mental dan kenaikan biaya hidup akibat lonjakan tarif pajak pertambahan nilai (PPN) pada produk pembalut (yang sering disebut "tampon tax"), krisis ini menjelma menjadi jurang ketidakadilan kemanusiaan yang akut.',
    problemContext: 'Perempuan dengan Orang Dengan Gangguan Jiwa (ODGJ)—baik di fase rawat inap, rawat jalan, maupun rehabilitasi—kerap menjadi kelompok paling tidak bersuara. Saat mengalami keterbatasan kognitif, mereka sering kali tidak mampu mengekspresikan rasa nyeri dismenore, kesulitan mengenali infeksi saluran reproduksi, atau bahkan mengalami ketakutan hebat saat melihat darah. Ironisnya, Indonesia menghadapi kesenjangan spasial yang telanjang: setidaknya 6 provinsi masih belum memiliki Rumah Sakit Jiwa (RSJ) terpisah. Di sisi lain, praktik pendampingan oleh perawat maupun keluarga selaku caregiver primer masih berlangsung dengan minimnya panduan operasional terstandar.',
    scientificNexus: 'Penelitian neuropsikiatri mutakhir membuktikan keterikatan erat antara fluktuasi hormon steroid gonadal (estrogen dan progesteron) dengan ambang batas eksitasi saraf otak. Di fase luteal akhir (pra-menstruasi), penurunan estrogen memicu penurunan transmisi dopaminergik dan serotonergik, yang pada pasien skizofrenia atau gangguan afektif bipolar dapat memicu Premenstrual Exacerbation (PME)—lonjakan agitasi, kegelisahan, hingga halusinasi akut. Di sisi lain, penggunaan antipsikotika tipikal maupun atipikal berkadar tinggi sering menginduksi hiperprolaktinemia, yang bermuara pada amenore sekunder atau menstruasi anovulatorik yang tidak teratur. Tanpa pencatatan kalender siklus yang presisi, perawat dan dokter kerap keliru mengartikan agitasi hormonal sebagai eksaserbasi penyakit murni, yang berujung pada kekeliruan dosis obat (over-medication) atau bahkan pengekangan fisik yang melukai martabat.',
    solutionConcept: 'Di sinilah peran kaum muda, kewirausahaan inklusif, dan masa depan dunia kerja (Youth Entrepreneurship & Future of Work) terpanggil untuk menghadirkan terobosan sistemik. Kami merancang "SynapseCare", sebuah ekosistem tata kelola digital terpadu yang memadukan empat pilar harmonis: (1) Modul Pemantauan Klinis Siklus Menstruasi tanpa beban administrasi; (2) Modul Edukasi Kesehatan Reproduksi berbasis kompetensi dan trauma-informed care; (3) Manajemen Logistik Just-in-Time (JIT) yang mengonversi kalender pasien menjadi kebutuhan sanitasi presisi; serta (4) Koordinasi & Kemitraan Lintas Sektor yang menghubungkan RSJ dengan alokasi CSR korporasi nasional dan evaluasi regulasi pemerintah.',
    futureOfWorkConnection: 'Ekosistem ini bukan sekadar aplikasi pencatatan, melainkan instrumen transformatif yang meletakkan fondasi baru bagi sektor Care Economy di era digital. Kaum muda tidak hanya menjadi konsumen teknologi, melainkan arsitek ekosistem bisnis inklusif yang menjembatani disparitas fasilitas kesehatan daerah dengan rantai pasok korporasi modern, memastikan bahwa hak fundamental atas kebersihan dan martabat perempuan ODGJ terwujud nyata.'
  },
  bibliography: [
    {
      authors: 'World Health Organization & UNICEF Joint Monitoring Programme (JMP)',
      year: 2024,
      title: 'Progress on drinking water, sanitation and hygiene in health care facilities 2000-2023: Special focus on menstrual health and dignity',
      publication: 'Geneva: World Health Organization',
      doi: 'ISBN: 978-92-4-009123-1'
    },
    {
      authors: 'Lancet Psychiatry Commission',
      year: 2023,
      title: 'The intersectionality of physical health and severe mental disorders: Addressing reproductive autonomy and unmet somatic needs',
      publication: 'The Lancet Psychiatry, 10(7), 540-558',
      doi: '10.1016/S2215-0366(23)00142-9'
    },
    {
      authors: 'Republik Indonesia',
      year: 2016,
      title: 'Undang-Undang Republik Indonesia Nomor 8 Tahun 2016 tentang Penyandang Disabilitas',
      publication: 'Lembaran Negara Republik Indonesia Tahun 2016 Nomor 69',
      doi: 'Sekretariat Negara RI'
    },
    {
      authors: 'Kementerian Kesehatan Republik Indonesia',
      year: 2023,
      title: 'Laporan Nasional Riset Kesehatan Dasar (Riskesdas) dan Pemetaan Fasilitas Pelayanan Kesehatan Jiwa di 38 Provinsi',
      publication: 'Badan Kebijakan Pembangunan Kesehatan (BKPK) Kemenkes RI',
      doi: 'Kemenkes RI Press'
    },
    {
      authors: 'Sommer, M., Chandraratna, S., Cavill, S., Mahon, T., & Phillips-Howard, P.',
      year: 2021,
      title: 'Managing menstruation in the workplace and institutional care: An essential component of gender-inclusive development',
      publication: 'International Journal of Environmental Research and Public Health, 18(6), 3120',
      doi: '10.3390/ijerph18063120'
    },
    {
      authors: 'Rubinow, D. R., Schmidt, P. J., & Roca, C. A.',
      year: 2022,
      title: 'Estrogen-serotonin interactions: Implications for affective regulation, psychosis, and premenstrual exacerbation in psychiatric disorders',
      publication: 'Neuropsychopharmacology Reviews, 47(1), 188-204',
      doi: '10.1038/s41386-021-01140-5'
    },
    {
      authors: 'ASEAN Secretariat',
      year: 2023,
      title: 'ASEAN Enabling Masterplan 2025: Mainstreaming the Rights of Persons with Disabilities',
      publication: 'Jakarta: ASEAN Secretariat Public Information',
      doi: 'ASEAN Human Rights Declaration Framework'
    }
  ]
};
