// --- KONFIGURASI DAN DATA KUIS (AWAL) ---
const VIEWS = {
    HOME: 'home',
    MATERIAL: 'material', // Tampilan Materi BARU
    LEVEL_SELECT: 'level-select',
    QUIZ: 'quiz',
    RESULT: 'result'
};

const QUIZ_SETTINGS = {
    POINTS_CORRECT: 20,
    POINTS_WRONG: -10,
    PASS_SCORE: 60,
    TOTAL_QUESTIONS: 5
};

// --- Audio Setup (Tone.js) ---
const synth = new Tone.PolySynth(Tone.Synth).toDestination();
const bgMusic = document.getElementById('background-music');
let isMuted = false;

document.getElementById('mute-btn').addEventListener('click', () => {
    isMuted = !isMuted;
    const icon = document.getElementById('audio-icon');

    if (isMuted) {
        bgMusic.pause();
        // Mute icon (pastikan path ikon mute benar)
        icon.innerHTML = `<path d="M16.5 12c0-1.77-1-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm-2.5 4.05v-2.06l2.45 2.45a7.35 7.35 0 0 0 0-.64zM3 10v4h3l5 5V5L6 10zm7-5.26v2.06l1.24 1.24L10 8.74zm0 10.52v-2.06l1.79 1.79L10 15.26zM19 12c0 .9-.22 1.76-.6 2.5l1.6 1.6A9 9 0 0 0 21 12c0-3.86-3.14-7-7-7v2.02c2.78.72 5 3.39 5 6.98zM2.81 2.81L1.39 4.22 5.8 8.63 5.8 5l5 5v4l1.24 1.24 2.89 2.89C13.5 17.72 12 18 10 18H3zm12.98 4.22L14.5 8.63v2.06l1.24 1.24 2.89 2.89C17.78 15.6 19 13.72 19 12a7.33 7.33 0 0 0-1.74-4.81z"/>`;
    } else {
        bgMusic.play().catch(e => console.error("Auto-play blocked, please interact with the page.", e));
        // Unmute icon (menggunakan ikon dari HTML Anda)
        icon.innerHTML = `<path d="M14.5 13.5l2-2 1-1-2-2-1 1-2 2-1-1-2-2 1-1-2-2-1 1-2 2 1 1-2 2 1 1 2-2 1-1-2-2 1-1-2 2-1 1zm-4-4l-1 1 2 2-1 1-2 2 1 1 2-2 1-1-2-2 1-1 2-2-1-1-2 2z"/>`;
    }
});

const playSound = (type) => {
    if (isMuted) return;
    switch (type) {
        case 'click':
            synth.triggerAttackRelease("C4", "8n");
            break;
        case 'correct':
            synth.triggerAttackRelease(["E5", "G5", "C6"], "4n");
            break;
        case 'wrong':
            synth.triggerAttackRelease(["C3", "C#3"], "8n");
            break;
    }
};

// --- DATA MATERI KEDIRI BARU ---
const materialData = [
    {
        title: "Pengantar Kediri Raya",
        content: "Kediri dikenal sebagai 'Kota Tahu' dan merupakan salah satu kota tertua di Jawa Timur, yang eksistensinya tercatat sejak abad ke-9 Masehi. Kota ini terbelah oleh **Sungai Brantas** dan diapit oleh Gunung Wilis di barat dan **Gunung Kelud** di timur, menjadikannya wilayah yang subur. Ikon utama adalah **Simpang Lima Gumul (SLG)**, yang meniru Arc de Triomphe."
    },
    {
        title: "Sejarah Kerajaan & Tokoh",
        content: "Kediri adalah pusat **Kerajaan Kediri** (abad ke-11 hingga ke-13 M), pecahan dari Kerajaan Mataram Kuno yang didirikan oleh Sri Jayawarśa. Puncak kejayaannya ada di masa **Prabu Jayabaya**, yang terkenal dengan ramalan **Jangka Jayabaya**. Karya sastra epik seperti **Kitab Bharatayuddha** (oleh Mpu Sedah dan Mpu Panuluh) juga lahir di era ini. Peninggalan penting termasuk **Situs Tondowongso** dan **Candi Surowono**."
    },
    {
        title: "Geografi dan Pariwisata",
        content: "Secara administratif, Kediri terbagi menjadi Kota dan Kabupaten. Ibukota Kabupaten Kediri berada di **Kecamatan Ngasem**. Batas utara Kabupaten adalah **Nganjuk**. Destinasi wisata alam yang terkenal adalah **Gunung Kelud** dengan kawahnya, serta air terjun **Dolo** di lereng Gunung Wilis. Wisata sejarah mencakup **Petirtaan Jolotundo** dan jembatan legendaris **Jembatan Brawijaya**."
    },
    {
        title: "Kuliner dan Kesenian Khas",
        content: "Kuliner Kediri didominasi olahan kedelai seperti **Tahu Kuning** dan **Stik Tahu** (dari ampas tahu). Makanan wajib coba adalah **Nasi Pecel Tumpang**, yaitu nasi pecel yang menggunakan sambal tumpang (dari tempe bosok/tempe busuk). Kesenian khas meliputi **Tari Topeng Panji** yang sering dibawakan untuk penyambutan, dan seni pertunjukan rakyat **Wayang Krucil**."
    }
];
// --- Data Kuis (Dibuat sesuai tema Kediri) --- (Data ini tetap utuh)
const quizData = [
    {
        level: 1, theme: "Pengenalan Kediri",
        questions: [
            { q: "Apa nama ikon terkenal Kota Kediri yang menyerupai Arc de Triomphe di Paris?", ans: "Simpang Lima Gumul (SLG)", opts: ["Tugu Pahlawan", "Simpang Lima Gumul (SLG)", "Monumen Kapal Selam", "Patung Semar"]},
            { q: "Kediri dikenal sebagai 'Kota ...'", ans: "Tahu", opts: ["Gudeg", "Tahu", "Bakpia", "Batik"]},
            { q: "Slogan Kabupaten Kediri adalah ...", ans: "Kediri Lagi", opts: ["Kediri The Future", "Kediri Lagi", "Kediri Harmoni", "Kediri Beriman"]},
            { q: "Sungai besar yang membelah Kota Kediri adalah ...", ans: "Sungai Brantas", opts: ["Sungai Bengawan Solo", "Sungai Brantas", "Sungai Ciliwung", "Sungai Musi"]},
            { q: "Di mana letak Geografis Kediri di Jawa Timur?", ans: "Tenggara", opts: ["Barat Laut", "Timur Laut", "Tenggara", "Barat Daya"]},
        ]
    },
    {
        level: 2, theme: "Geografi Kediri",
        questions: [
            { q: "Gunung tertinggi yang berada di sebelah timur Kediri adalah ...", ans: "Gunung Kelud", opts: ["Gunung Bromo", "Gunung Wilis", "Gunung Kelud", "Gunung Semeru"]},
            { q: "Batas utara wilayah Kabupaten Kediri adalah dengan Kabupaten ...", ans: "Nganjuk", opts: ["Malang", "Jombang", "Nganjuk", "Blitar"]},
            { q: "Kediri terbagi menjadi dua wilayah administrasi yaitu ...", ans: "Kota dan Kabupaten", opts: ["Kota dan Provinsi", "Kota dan Kabupaten", "Kota Madya dan Kotip", "Kota Kecil dan Kota Besar"]},
            { q: "Ibukota Kabupaten Kediri secara administratif berada di ...", ans: "Kecamatan Ngasem", opts: ["Kecamatan Ngasem", "Kota Kediri", "Kecamatan Pare", "Kecamatan Wates"]},
            { q: "Nama bandar udara yang terletak di Kabupaten Kediri adalah ...", ans: "Dhoho International Airport", opts: ["Abdul Rachman Saleh", "Juanda International Airport", "Dhoho International Airport", "Adi Sucipto"]},
        ]
    },
    // ... (Level 3 sampai 10 lainnya) ...
    {
        level: 3, theme: "Kuliner Khas Kediri",
        questions: [
            { q: "Makanan ringan khas Kediri yang terbuat dari ampas tahu adalah ...", ans: "Stik Tahu", opts: ["Krupuk Udang", "Stik Tahu", "Kripik Singkong", "Lumpia"]},
            { q: "Nasi yang dimasak dengan bumbu dan dibungkus daun pisang khas Kediri disebut ...", ans: "Nasi Pecel Tumpang", opts: ["Nasi Liwet", "Nasi Pecel Tumpang", "Nasi Kucing", "Nasi Rawon"]},
            { q: "Minuman fermentasi dari nira kelapa yang terkenal di Kediri adalah ...", ans: "Es Dawet", opts: ["Wedang Jahe", "Es Dawet", "Cendol Durian", "Es Krim"]},
            { q: "Soto Kediri terkenal dengan kuah santan berwarna ...", ans: "Kuning (Kunyit)", opts: ["Hijau (Daun Suji)", "Merah (Cabai)", "Cokelat (Kecap)", "Kuning (Kunyit)"]},
            { q: "Pusat oleh-oleh tahu Kediri terkenal berada di daerah ...", ans: "Jl. Pattimura", opts: ["Jl. Brawijaya", "Jl. Pattimura", "Jl. Dhoho", "Jl. Pemuda"]},
        ]
    },
    {
        level: 4, theme: "Kesenian Kediri",
        questions: [
            { q: "Tari tradisional yang berasal dari Kediri dan sering dibawakan dalam acara penyambutan adalah ...", ans: "Tari Topeng Panji", opts: ["Tari Remo", "Tari Reog Ponorogo", "Tari Topeng Panji", "Tari Saman"]},
            { q: "Alat musik yang menjadi ciri khas kesenian Gamelan Jawa di Kediri adalah ...", ans: "Gong", opts: ["Gitar", "Gong", "Drum", "Suling"]},
            { q: "Seni pertunjukan rakyat berupa wayang kulit di Kediri dikenal sebagai ...", ans: "Wayang Krucil", opts: ["Wayang Golek", "Wayang Beber", "Wayang Krucil", "Wayang Orang"]},
            { q: "Tokoh legendaris dalam cerita rakyat Kediri yang sering diangkat dalam kesenian adalah ...", ans: "Panji dan Sekartaji", opts: ["Ken Arok dan Ken Dedes", "Panji dan Sekartaji", "Brama Kumbara", "Sultan Agung"]},
            { q: "Festival kebudayaan tahunan yang menampilkan berbagai seni Kediri disebut ...", ans: "Pekan Budaya dan Pariwisata", opts: ["Jember Fashion Carnaval", "Pekan Budaya dan Pariwisata", "Festival Kesenian Jogja", "Parade Seni Jawa"]},
        ]
    },
    {
        level: 5, theme: "Ciri Khas dan Keunikan Kediri",
        questions: [
            { q: "Kediri dijuluki sebagai Kota Tahu karena ...", ans: "Mayoritas industri rumah tangga memproduksi tahu", opts: ["Tahu Kediri hanya ada satu jenis", "Walikota Kediri suka tahu", "Mayoritas industri rumah tangga memproduksi tahu", "Kediri adalah tempat penemuan tahu"]},
            { q: "Mitos terkenal yang diyakini masyarakat Kediri berkaitan dengan Gunung Kelud adalah ...", ans: "Jalanan menanjak yang terasa menurun", opts: ["Jalanan menanjak yang terasa menurun", "Makam raja-raja kuno", "Adanya kerajaan gaib", "Danau yang tidak pernah kering"]},
            { q: "Salah satu tradisi unik yang masih dilakukan di lereng Gunung Kelud adalah ritual ...", ans: "Larung Sesaji", opts: ["Sedekah Bumi", "Larung Sesaji", "Petik Laut", "Upacara Kasada"]},
            { q: "Angka yang sering dihubungkan dengan hari jadi Kota Kediri adalah ...", ans: "879 Masehi", opts: ["1945 Masehi", "879 Masehi", "1293 Masehi", "1500 Masehi"]},
            { q: "Di mana lokasi penemuan Prasasti Harinjing?", ans: "Dekat Sungai Brantas", opts: ["Lereng Gunung Wilis", "Puncak Gunung Kelud", "Dekat Sungai Brantas", "Tepi Pantai"]},
        ]
    },
    {
        level: 6, theme: "Tempat Wisata Kediri",
        questions: [
            { q: "Air Terjun Dolo terletak di lereng gunung ...", ans: "Gunung Wilis", opts: ["Gunung Bromo", "Gunung Kelud", "Gunung Wilis", "Gunung Semeru"]},
            { q: "Objek wisata alam yang terkenal dengan pemandangan pegunungan dan kawahnya yang indah adalah ...", ans: "Gunung Kelud", opts: ["Taman Nasional Baluran", "Gunung Kelud", "Pantai Popoh", "Goa Gong"]},
            { q: "Destinasi wisata religi di Kediri yang merupakan makam tokoh besar adalah ...", ans: "Makam Syekh Subakir", opts: ["Makam Bung Karno", "Makam Syekh Subakir", "Makam Sunan Gunung Jati", "Makam Gus Dur"]},
            { q: "Tempat wisata bersejarah berupa petirtaan yang diduga tempat mandi para selir raja adalah ...", ans: "Petirtaan Jolotundo", opts: ["Candi Prambanan", "Petirtaan Jolotundo", "Umbul Sidomukti", "Pemandian Air Panas Cangar"]},
            { q: "Jembatan legendaris yang menghubungkan Kota Kediri bagian timur dan barat adalah ...", ans: "Jembatan Brawijaya", opts: ["Jembatan Suramadu", "Jembatan Merah", "Jembatan Brawijaya", "Jembatan Ampera"]},
        ]
    },
    {
        level: 7, theme: "Sejarah Kerajaan Kediri",
        questions: [
            { q: "Pendiri dan raja pertama Kerajaan Kediri adalah ...", ans: "Sri Jayawarśa Digjaya Śastraprabhu", opts: ["Mpu Sindok", "Airlangga", "Sri Jayawarśa Digjaya Śastraprabhu", "Ken Arok"]},
            { q: "Kerajaan Kediri merupakan pecahan dari Kerajaan ...", ans: "Mataram Kuno", opts: ["Singasari", "Majapahit", "Mataram Kuno", "Pajajaran"]},
            { q: "Kitab sastra terkenal pada masa Kerajaan Kediri yang ditulis oleh Mpu Sedah dan Mpu Panuluh adalah ...", ans: "Kitab Bharatayuddha", opts: ["Kitab Nagarakertagama", "Kitab Bharatayuddha", "Kitab Sutasoma", "Kitab Pararaton"]},
            { q: "Raja terakhir Kerajaan Kediri adalah ...", ans: "Kertajaya", opts: ["Jayanegara", "Raden Wijaya", "Kertajaya", "Hayam Wuruk"]},
            { q: "Tahun keruntuhan Kerajaan Kediri setelah dikalahkan Ken Arok adalah ...", ans: "1222 Masehi", opts: ["1042 Masehi", "1222 Masehi", "1389 Masehi", "1478 Masehi"]},
        ]
    },
    {
        level: 8, theme: "Tokoh-Tokoh Kediri",
        questions: [
            { q: "Siapakah raja Kediri yang terkenal dengan ramalannya 'Jangka Jayabaya'?", ans: "Prabu Jayabaya", opts: ["Prabu Siliwangi", "Prabu Jayabaya", "Prabu Brawijaya", "Sultan Ageng Tirtayasa"]},
            { q: "Tokoh pendiri Pondok Pesantren Lirboyo Kediri yang sangat dihormati adalah ...", ans: "K.H. Abdul Karim", opts: ["K.H. Hasyim Asy'ari", "K.H. Ahmad Dahlan", "K.H. Abdul Karim", "Gus Dur"]},
            { q: "Penulis naskah kuno 'Kakawin Smaradahana' pada masa Kediri adalah ...", ans: "Mpu Darmajaya", opts: ["Mpu Sedah", "Mpu Darmajaya", "Mpu Panuluh", "Mpu Tantular"]},
            { q: "Ulama dan penulis kitab fikih terkenal asal Kediri yang dijuluki 'Syekh Indonesia' adalah ...", ans: "Syaikhona Kholil", opts: ["Imam Syafi'i", "Syekh Nawawi Al-Bantani", "Syaikhona Kholil", "Imam Ghazali"]},
            { q: "Seniman legendaris Kediri yang terkenal dengan lagu-lagu campursarinya adalah ...", ans: "Didi Kempot", opts: ["Gombloh", "Didi Kempot", "Iwan Fals", "Chrisye"]},
        ]
    },
    {
        level: 9, theme: "Peninggalan Sejarah Kediri",
        questions: [
            { q: "Situs bersejarah yang diyakini sebagai pusat ibukota Kerajaan Kediri adalah ...", ans: "Situs Tondowongso", opts: ["Situs Trowulan", "Situs Tondowongso", "Situs Gunung Padang", "Situs Ratna Bima"]},
            { q: "Candi yang terletak di lereng Gunung Kelud dan merupakan peninggalan Kerajaan Kediri adalah ...", ans: "Candi Penataran", opts: ["Candi Borobudur", "Candi Penataran", "Candi Jawi", "Candi Prambanan"]},
            { q: "Prasasti peninggalan masa Kerajaan Kediri yang menyebut tentang pembagian kerajaan adalah ...", ans: "Prasasti Pamwatan", opts: ["Prasasti Ciaruteun", "Prasasti Kedukan Bukit", "Prasasti Pamwatan", "Prasasti Talang Tuwo"]},
            { q: "Pintu air peninggalan Belanda yang menjadi landmark di Kediri adalah ...", ans: "Bendungan Waru Turi", opts: ["Bendungan Sutami", "Bendungan Karangkates", "Bendungan Waru Turi", "Bendungan Wlingi"]},
            { q: "Nama candi di Kediri yang memiliki relief kisah Ramayana adalah ...", ans: "Candi Surowono", opts: ["Candi Surowono", "Candi Tikus", "Candi Brahu", "Candi Singosari"]},
        ]
    },
    {
        level: 10, theme: "Kuis Campuran Tingkat Lanjut",
        questions: [
            { q: "Bunga nasional Kediri yang memiliki arti keindahan dan kemakmuran adalah ...", ans: "Bunga Teratai", opts: ["Bunga Melati", "Bunga Teratai", "Bunga Mawar", "Bunga Anggrek"]},
            { q: "Kediri pernah menjadi lokasi syuting film legendaris Indonesia berjudul ...", ans: "Laskar Pelangi", opts: ["Daun di Atas Bantal", "Laskar Pelangi", "Gie", "Sang Penari"]},
            { q: "Komoditas pertanian unggulan dari Kediri, terutama dari lereng Gunung Wilis adalah ...", ans: "Kopi Arabika", opts: ["Teh Hijau", "Kopi Arabika", "Cokelat", "Tembakau"]},
            { q: "Kerajinan tangan khas Kediri yang terkenal hingga mancanegara adalah ...", ans: "Tenun Ikat", opts: ["Batik Tulis", "Tenun Ikat", "Ukiran Kayu", "Keramik"]},
            { q: "Organisasi olahraga yang menjadi kebanggaan Kota Kediri di Liga Indonesia adalah ...", ans: "Persik Kediri", opts: ["Persebaya", "Arema FC", "Persik Kediri", "Persema"]},
        ]
    }
];
let currentLevel = 1;
let currentQuestionIndex = 0;
let currentScore = 0;
let player = {};


// --- Utility Functions (DIUBAH UNTUK MATERIAL) ---

const showView = (viewName) => {
    playSound('click');
    const allViews = document.querySelectorAll('.view-container');
    
    // 1. NONAKTIFKAN SEMUA VIEW SECARA INSTAN
    allViews.forEach(view => {
        view.classList.remove('active');
        view.style.display = 'none'; 
    });

    const targetView = document.getElementById(`${viewName}-view`);
    if (targetView) {
        // 2. Tampilkan target view
        targetView.style.display = 'flex'; 
        
        // 3. Jeda singkat (untuk memastikan DOM ready) sebelum fade-in
        setTimeout(() => {
            targetView.classList.add('active');
        }, 10); 
    }

    // 4. Panggil fungsi render spesifik
    if (viewName === VIEWS.LEVEL_SELECT) {
        renderLevelSelection();
    } else if (viewName === VIEWS.MATERIAL) {
        renderMaterial(); // Panggil renderMaterial di sini
    }
};
window.showView = showView; 

const loadPlayerData = () => { /* ... (Fungsi ini tetap sama) ... */ };
const saveScores = (scores) => { /* ... (Fungsi ini tetap sama) ... */ };

// --- 1. Halaman Utama Logic (DIUBAH KE MATERIAL) ---

document.getElementById('player-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('player-name');
    const classInput = document.getElementById('player-class');
    const schoolInput = document.getElementById('player-school');
    let isValid = true;

    // Validation (tetap sama)
    if (!nameInput.value.trim()) { isValid = false; document.getElementById('name-error').classList.remove('hidden'); } else { document.getElementById('name-error').classList.add('hidden'); }
    if (!classInput.value.trim()) { isValid = false; document.getElementById('class-error').classList.remove('hidden'); } else { document.getElementById('class-error').classList.add('hidden'); }
    if (!schoolInput.value.trim()) { isValid = false; document.getElementById('school-error').classList.remove('hidden'); } else { document.getElementById('school-error').classList.add('hidden'); }

    if (isValid) {
        player = {
            name: nameInput.value.trim(),
            class: classInput.value.trim(),
            school: schoolInput.value.trim()
        };
        localStorage.setItem('kediriQuizPlayer', JSON.stringify(player));
        bgMusic.play().catch(e => console.error("Auto-play blocked, please interact with the page.", e));
        
        // NAVIGASI BARU: Pindah ke halaman MATERI
        showView(VIEWS.MATERIAL); 
    }
});

// --- 2. FUNGSI RENDER MATERI BARU ---

const renderMaterial = () => {
    const materialContainer = document.getElementById('material-content');
    if (!materialContainer) {
        console.error("Error: Element material-content not found.");
        return;
    }
    
    materialContainer.innerHTML = ''; // Bersihkan konten lama
    
    // Tampilkan nama pemain di halaman materi
    document.getElementById('material-player-name').textContent = player.name;
    
    // Buat HTML dari data materi
    const materialHTML = materialData.map(item => `
        <div class="material-section p-6 mb-6 bg-white rounded-xl shadow-xl border-l-4 border-yellow-500 hover:shadow-2xl transition duration-300">
            <h3 class="text-2xl font-bold text-yellow-700 mb-3 border-b pb-2">${item.title}</h3>
            <p class="text-gray-700 leading-relaxed">${item.content}</p>
        </div>
    `).join('');
    
    materialContainer.insertAdjacentHTML('beforeend', materialHTML);
};

// --- 3. Halaman Pemilihan Level Logic (Sisa fungsi tetap sama) ---

const isLevelUnlocked = (level, scores) => { /* ... */ };
const renderLevelSelection = () => { /* ... */ };
const startQuiz = (level) => { /* ... */ };
const showQuestion = (index) => { /* ... */ };
const checkAnswer = (selectedButton, correctAnswer) => { /* ... */ };
const showResult = () => { /* ... */ };


// --- Initialization (DIUBAH) ---
window.onload = () => {
    const scores = loadPlayerData();
    if (player.name) {
        // Jika pemain sudah ada, langsung ke menu materi untuk review
        setTimeout(() => {
            showView(VIEWS.MATERIAL); 
            bgMusic.volume = 0.4;
            bgMusic.play().catch(e => console.log("Music auto-play blocked."));
        }, 500);
    } else {
        // Initial view is HOME
        showView(VIEWS.HOME);
    }
    // Set up reset function globally
    window.resetAllDataConfirmation = () => {
        if (confirm("Apakah Anda yakin ingin menghapus semua data pemain dan skor kuis? Tindakan ini tidak dapat dibatalkan.")) {
            localStorage.removeItem('kediriQuizPlayer');
            localStorage.removeItem('kediriQuizScores');
            alert("Data berhasil direset. Silakan mulai ulang kuis.");
            window.location.reload();
        }
    };
};
