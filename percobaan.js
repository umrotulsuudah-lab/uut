const VIEWS = {
    HOME: 'home',
    MATERIAL: 'material', // Tampilan Materi
    LEVEL_SELECT: 'level-select',
    QUIZ: 'quiz',
    RESULT: 'result',
    SPECIAL_RESULT: 'special-result'
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
        // Mute icon
        icon.innerHTML = `<path d="M14.5 13.5l2-2 1-1-2-2-1 1-2 2-1-1-2-2 1-1-2-2-1 1-2 2 1 1-2 2 1 1 2-2 1-1-2-2 1-1-2 2-1 1zm-4-4l-1 1 2 2-1 1-2 2 1 1 2-2 1-1-2-2 1-1 2-2-1-1-2 2z"/>`;
    } else {
        bgMusic.play().catch(e => console.error("Error playing music:", e));
        // Unmute icon
        icon.innerHTML = `<path d="M3 10v4h3l5 5V5L6 10H3zm13.5 3c0-1.77-1-3.29-2.5-4.03v8.05c1.5-.76 2.5-2.28 2.5-4.02zM14 5v2.02c2.78.72 5 3.39 5 6.98s-2.22 6.26-5 6.98V19c3.86-.71 7-4.14 7-8s-3.14-7.29-7-8z"/>`;
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
        case 'win_special':
            synth.triggerAttackRelease(["C5", "E5", "G5", "C6"], "2n");
            break;
    }
};

// --- DATA MATERI KEDIRI ---
const materialData = [
    {
        title: "Pengantar Kediri Raya",
        content: "Kediri dikenal sebagai 'Kota Tahu' dan merupakan salah satu kota tertua di Jawa Timur, yang eksistensinya tercatat sejak abad ke-9 Masehi. Kota ini terbelah oleh Sungai Brantas dan dikelilingi oleh Gunung Wilis di barat dan Gunung Kelud di timur, menjadikannya wilayah yang subur dan strategis."
    },
    {
        title: "Ikon dan Geografi",
        content: "Ikon terkenal Kediri adalah **Simpang Lima Gumul (SLG)**, sebuah monumen megah yang menyerupai Arc de Triomphe di Paris. Secara administratif, Kediri terbagi menjadi Kota dan Kabupaten. Batas utara Kabupaten Kediri adalah Nganjuk, sedangkan Gunung Kelud yang terkenal dengan letusannya berada di sebelah timur. Ibukota Kabupaten Kediri berada di **Kecamatan Ngasem**."
    },
    {
        title: "Sejarah Singkat Kerajaan",
        content: "Kediri pernah menjadi pusat salah satu kerajaan terbesar di Nusantara, yaitu **Kerajaan Kediri** (abad ke-11 hingga ke-13 M). Kerajaan ini merupakan pecahan dari Kerajaan Mataram Kuno yang didirikan oleh Sri Jayawarśa. Puncak kejayaannya ditandai dengan munculnya karya sastra epik seperti **Kitab Bharatayuddha** oleh Mpu Sedah dan Mpu Panuluh, serta ramalan terkenal **Jangka Jayabaya** yang ditulis oleh Prabu Jayabaya, raja yang paling tersohor."
    },
    {
        title: "Kuliner dan Seni Khas",
        content: "Kediri sangat identik dengan produk olahan kedelai. Selain Tahu Kuning, makanan khas lainnya adalah **Stik Tahu** (dari ampas tahu) dan **Nasi Pecel Tumpang**, yaitu nasi pecel yang disajikan dengan sambal tumpang (sambal dari tempe busuk). Di bidang kesenian, Kediri dikenal dengan tarian tradisional **Tari Topeng Panji** dan seni pertunjukan rakyat **Wayang Krucil**, yang sering menceritakan kisah Panji dan Sekartaji."
    }
];

// --- Data Kuis (Dibuat sesuai tema Kediri) ---
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
            { q: "Gunung tertinggi yang berada di sebelah timur Kediri adalah ...", ans: "Gunung Wilis", opts: ["Gunung Bromo", "Gunung Wilis", "Gunung Kelud", "Gunung Semeru"]},
            { q: "Batas utara wilayah Kabupaten Kediri adalah dengan Kabupaten ...", ans: "Nganjuk", opts: ["Malang", "Jombang", "Nganjuk", "Blitar"]},
            { q: "Kediri terbagi menjadi dua wilayah administrasi yaitu ...", ans: "Kota dan Kabupaten", opts: ["Kota dan Provinsi", "Kota dan Kabupaten", "Kota Madya dan Kotip", "Kota Kecil dan Kota Besar"]},
            { q: "Ibukota Kabupaten Kediri secara administratif berada di ...", ans: "Kecamatan Ngasem", opts: ["Kecamatan Ngasem", "Kota Kediri", "Kecamatan Pare", "Kecamatan Wates"]},
            { q: "Nama bandar udara yang terletak di Kabupaten Kediri adalah ...", ans: "Dhoho International Airport", opts: ["Abdul Rachman Saleh", "Juanda International Airport", "Dhoho International Airport", "Adi Sucipto"]},
        ]
    },
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

// --- STATE KUIS ---
let currentLevel = 1;
let currentQuestionIndex = 0;
let currentScore = 0;
let player = {};

// --- DATA MANAGEMENT & LEADERBOARD ---

const loadLeaderboard = () => {
    const storedLeaderboard = localStorage.getItem('kediriQuizLeaderboard');
    return storedLeaderboard ? JSON.parse(storedLeaderboard) : [];
};

const saveLeaderboard = (leaderboard) => {
    localStorage.setItem('kediriQuizLeaderboard', JSON.stringify(leaderboard));
};

const calculateCumulativeScore = (scores) => {
    // Menghitung total skor dari semua level yang telah disimpan
    return Object.values(scores).reduce((total, score) => total + score, 0);
};

const loadPlayerData = () => {
    const storedPlayer = localStorage.getItem('kediriQuizPlayer');
    const storedScores = localStorage.getItem('kediriQuizScores');
    if (storedPlayer) {
        player = JSON.parse(storedPlayer);
    }
    return storedScores ? JSON.parse(storedScores) : {};
};

const saveScores = (scores) => {
    localStorage.setItem('kediriQuizScores', JSON.stringify(scores));
};

// --- Utility Functions ---

/**
 * Toggles the visibility of the specified view and applies fade animation.
 */
const showView = (viewName) => {
    playSound('click');
    const allViews = document.querySelectorAll('.view-container');
    
    // 1. Fade-out semua view aktif
    allViews.forEach(view => {
        view.classList.remove('active');
        if (view.style.display !== 'none') {
             setTimeout(() => {
                view.style.display = 'none'; 
            }, 500); // Tunggu hingga transisi opacity (0.5s) selesai
        }
    });

    const targetView = document.getElementById(`${viewName}-view`);
    if (targetView) {
        // 2. Set display:flex agar elemen bisa dilihat
        targetView.style.display = 'flex'; 
        
        // 3. Jeda singkat (50ms) sebelum fade-in
        setTimeout(() => {
            targetView.classList.add('active');
        }, 50); 
    }

    // Panggil fungsi render spesifik setelah tampilan berubah
    if (viewName === VIEWS.LEVEL_SELECT) {
        setTimeout(renderLevelSelection, 600); 
    } else if (viewName === VIEWS.MATERIAL) {
        setTimeout(renderMaterial, 600); 
    }
};
window.showView = showView; 

// --- 1. Halaman Utama Logic ---

document.getElementById('player-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('player-name');
    const classInput = document.getElementById('player-class');
    const schoolInput = document.getElementById('player-school');
    let isValid = true;

    // Simple validation check
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
        
        // NAVIGASI: Pindah ke halaman MATERI
        showView(VIEWS.MATERIAL); 
    }
});

// --- 2. Halaman Materi Logic ---

const renderMaterial = () => {
    const materialContainer = document.getElementById('material-content');
    materialContainer.innerHTML = ''; 
    
    document.getElementById('material-player-name').textContent = player.name;
    
    // Buat HTML dari data materi
    const materialHTML = materialData.map(item => `
        <div class="material-section p-6 mb-6 bg-white rounded-xl shadow-lg border-l-4 border-yellow-500">
            <h3 class="text-2xl font-bold text-yellow-700 mb-3">${item.title}</h3>
            <p class="text-gray-700 leading-relaxed">${item.content}</p>
        </div>
    `).join('');
    
    materialContainer.insertAdjacentHTML('beforeend', materialHTML);
};

// --- 3. Halaman Pemilihan Level Logic ---

const isLevelUnlocked = (level, scores) => {
    if (level === 1) return true;
    const previousLevel = level - 1;
    const previousScore = scores[previousLevel] || 0;
    return previousScore >= QUIZ_SETTINGS.PASS_SCORE;
};

const renderLevelSelection = () => {
    const scores = loadPlayerData(); 
    const levelList = document.getElementById('level-list');
    levelList.innerHTML = ''; 

    document.getElementById('player-greeting').textContent = `Halo ${player.name} (${player.class}, ${player.school}), pilih level yang ingin kamu mainkan!`;

    quizData.forEach(data => {
        const isLocked = !isLevelUnlocked(data.level, scores);
        const currentScore = scores[data.level] || 0;
        const lockIcon = isLocked ? `<i class="fas fa-lock text-white/50 ml-2"></i>` : ''; 

        const levelButtonHTML = `
            <div class="level-btn-container ${isLocked ? 'locked' : ''}" data-level="${data.level}">
                <button class="level-btn flex justify-between items-center" ${isLocked ? 'disabled' : ''} onclick="startQuiz(${data.level})">
                    <div class="flex flex-col items-start">
                        <span class="text-xs font-light text-gray-300">Level ${data.level}</span>
                        <span class="text-xl font-bold">${data.theme}</span>
                    </div>
                    <div class="text-right">
                        <span class="text-sm font-light text-gray-300">Skor Tertinggi:</span>
                        <span class="text-lg font-extrabold text-${currentScore >= QUIZ_SETTINGS.PASS_SCORE ? 'yellow-300' : 'red-300'}">${currentScore} Poin ${lockIcon}</span>
                    </div>
                </button>
            </div>
        `;
        levelList.insertAdjacentHTML('beforeend', levelButtonHTML);
    });
};

// --- 4. Halaman Kuis Logic ---

const startQuiz = (level) => {
    currentLevel = level;
    currentQuestionIndex = 0;
    currentScore = 0;
    document.getElementById('quiz-level-title').textContent = `Kuis Level ${level}: ${quizData[level - 1].theme}`;
    document.getElementById('current-quiz-score').textContent = currentScore;
    
    showQuestion(0);
    showView(VIEWS.QUIZ);
};
window.startQuiz = startQuiz;

const showQuestion = (index) => {
    currentQuestionIndex = index;
    const levelData = quizData[currentLevel - 1]; 

    if (!levelData || !levelData.questions) {
        console.error("Kesalahan: Level data atau pertanyaan tidak ditemukan.");
        showResult();
        return;
    }
    
    const questionData = levelData.questions[index];
    const container = document.getElementById('question-container');
    const feedbackContainer = document.getElementById('feedback-container');

    feedbackContainer.innerHTML = ''; 

    if (!questionData) {
        // End of quiz for this level
        showResult();
        return;
    }

    document.getElementById('current-question-number').textContent = index + 1;
    
    // Randomize options (A to D) - Perlu diimplementasi pengacakan di sini jika mau
    const options = [...questionData.opts];
    
    const optionLetters = ['A', 'B', 'C', 'D'];
    const optionHTML = options.map((opt, i) => `
        <button
            class="option-btn w-full p-3 sm:p-4 mb-3 text-left bg-gray-100 rounded-xl border border-gray-300 shadow-md hover:bg-yellow-100 transition duration-200 text-gray-800"
            data-answer="${opt.trim()}"
            onclick="checkAnswer(this, '${questionData.ans.replace(/'/g, "\\'")}')"
            >
            <span class="font-bold text-yellow-600 mr-2">${optionLetters[i]}.</span> ${opt}
        </button>
    `).join('');

    container.innerHTML = `
        <div class="question-card">
            <p class="text-xl sm:text-2xl font-semibold mb-6 text-gray-800">${questionData.q}</p>
            <div id="options-list" class="space-y-3">
                ${optionHTML}
            </div>
        </div>
    `;
};

const checkAnswer = (selectedButton, correctAnswer) => {
    const buttons = document.querySelectorAll('#options-list .option-btn');
    buttons.forEach(btn => {
        btn.disabled = true;
        btn.classList.remove('hover:bg-yellow-100');
    });

    const userAnswer = selectedButton.getAttribute('data-answer');
    const feedbackContainer = document.getElementById('feedback-container');
    
    if (userAnswer === correctAnswer) {
        currentScore += QUIZ_SETTINGS.POINTS_CORRECT;
        playSound('correct');
        feedbackContainer.innerHTML = `
            <div class="inline-flex items-center text-green-600 text-3xl font-bold animate-bounce" style="text-shadow: 0 0 15px var(--color-success)">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                </svg>
                BENAR! (+${QUIZ_SETTINGS.POINTS_CORRECT} Poin)
            </div>
        `;
        selectedButton.classList.add('bg-green-200', 'border-green-500', 'shadow-lg');
    } else {
        currentScore += QUIZ_SETTINGS.POINTS_WRONG;
        playSound('wrong');
        feedbackContainer.innerHTML = `
            <div class="inline-flex items-center text-red-600 text-3xl font-bold animate-shake" style="text-shadow: 0 0 15px var(--color-error)">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
                SALAH! (${QUIZ_SETTINGS.POINTS_WRONG} Poin)
            </div>
        `;
        selectedButton.classList.add('bg-red-200', 'border-red-500', 'shadow-lg');
        buttons.forEach(btn => {
            if (btn.getAttribute('data-answer') === correctAnswer) {
                btn.classList.add('bg-green-300', 'border-green-600', 'font-bold');
            }
        });
    }

    document.getElementById('current-quiz-score').textContent = currentScore;

    setTimeout(() => {
        showQuestion(currentQuestionIndex + 1);
    }, 1500); 
};
window.checkAnswer = checkAnswer;

// --- 5. Halaman Hasil Logic ---

const showResult = () => {
    const scores = loadPlayerData();
    const highestScore = scores[currentLevel] || 0;
    
    // 1. Simpan skor level saat ini (jika lebih tinggi)
    if (currentScore > highestScore) {
        scores[currentLevel] = currentScore;
        saveScores(scores);
    }

    const passed = currentScore >= QUIZ_SETTINGS.PASS_SCORE;
    
    // 2. Cek apakah ini level terakhir (Level 10) DAN pemain lulus
    const isLastLevel = currentLevel === quizData.length;
    const allLevelsPlayed = Object.keys(scores).length === quizData.length;
    
    if (isLastLevel && passed && allLevelsPlayed) {
        // Jika Level 10 LULUS, hitung skor kumulatif dan cek Top 3
        const cumulativeScore = calculateCumulativeScore(scores);
        checkAndShowSpecialResult(cumulativeScore);
        return; 
    }

    // 3. Tampilkan hasil normal
    showView(VIEWS.RESULT);
    
    const resultLevelNum = document.getElementById('result-level-num');
    const resultPlayerName = document.getElementById('result-player-name');
    const finalScoreEl = document.getElementById('final-score');
    const scoreDisplay = document.getElementById('score-display');
    const resultMessageEl = document.getElementById('result-message');
    const resultActions = document.getElementById('result-actions');
    
    resultLevelNum.textContent = currentLevel;
    resultPlayerName.textContent = player.name;
    finalScoreEl.textContent = `${currentScore} Poin`;
    resultActions.innerHTML = '';
    
    finalScoreEl.style.color = passed ? 'var(--color-success)' : 'var(--color-error)';
    scoreDisplay.classList.toggle('bg-green-100', passed);
    scoreDisplay.classList.toggle('bg-red-100', !passed);
    
    if (passed) {
        resultMessageEl.textContent = "Selamat! Anda LULUS dan membuka level berikutnya!";
        
        const nextLevel = currentLevel + 1;
        if (nextLevel <= quizData.length) {
            const continueBtn = `
                <button class="modern-btn w-full" onclick="showView('${VIEWS.LEVEL_SELECT}')">
                    Lanjut ke Level Berikutnya (${nextLevel})
                </button>
            `;
            resultActions.insertAdjacentHTML('beforeend', continueBtn);
        } else {
            resultMessageEl.textContent = "Luar biasa! Anda telah menyelesaikan semua level Kediri Raya!";
        }
        
    } else {
        resultMessageEl.textContent = "Maaf, nilai Anda belum mencapai batas kelulusan (60 poin). Silakan coba lagi!";
        
        const retryBtn = `
            <button class="modern-btn w-full" onclick="startQuiz(${currentLevel})" style="background-color: var(--color-error); color: white;">
                Coba Lagi
            </button>
        `;
        resultActions.insertAdjacentHTML('beforeend', retryBtn);
    }
    
    const backBtn = `
        <button class="w-full text-sm mt-2 text-gray-500 hover:text-gray-800 transition" onclick="showView('${VIEWS.LEVEL_SELECT}')">
            Kembali ke Menu Level
        </button>
    `;
    resultActions.insertAdjacentHTML('beforeend', backBtn);
};

// --- LOGIC HASIL SPESIAL (TOP 3) ---

const checkAndShowSpecialResult = (cumulativeScore) => {
    let leaderboard = loadLeaderboard();
    const newEntry = { 
        name: player.name, 
        score: cumulativeScore, 
        class: player.class, 
        school: player.school 
    };

    const playerIdentifier = `${player.name}-${player.class}-${player.school}`;
    const playerIndex = leaderboard.findIndex(entry => 
        `${entry.name}-${entry.class}-${entry.school}` === playerIdentifier
    );
    
    if (playerIndex !== -1) {
        if (newEntry.score > leaderboard[playerIndex].score) {
            leaderboard[playerIndex].score = newEntry.score;
        }
    } else {
        leaderboard.push(newEntry);
    }
    
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 10);
    saveLeaderboard(leaderboard);
    
    const finalRank = leaderboard.findIndex(entry => 
        `${entry.name}-${entry.class}-${entry.school}` === playerIdentifier && entry.score === newEntry.score
    ) + 1;

    if (finalRank > 0 && finalRank <= 3) {
        showSpecialResult(finalRank, newEntry.score);
    } else {
        showView(VIEWS.LEVEL_SELECT);
        alert(`Selamat, ${player.name}!\nSkor Kumulatif Anda: ${newEntry.score} Poin.\nAnda berada di peringkat #${finalRank} Leaderboard.`);
    }
};

const showSpecialResult = (rank, score) => {
    showView(VIEWS.SPECIAL_RESULT);
    playSound('win_special'); 

    const badgeDisplay = document.getElementById('badge-display');
    const totalScoreEl = document.getElementById('total-cumulative-score');
    const titleEl = document.getElementById('special-result-title');
    
    totalScoreEl.textContent = `${score} Poin`;
    badgeDisplay.innerHTML = ''; 

    let badgeClass = '';
    let rankText = '';
    
    if (rank === 1) {
        badgeClass = 'badge-gold';
        rankText = 'PERINGKAT EMAS';
    } else if (rank === 2) {
        badgeClass = 'badge-silver';
        rankText = 'PERINGKAT PERAK';
    } else if (rank === 3) {
        badgeClass = 'badge-bronze';
        rankText = 'PERINGKAT PERUNGGU';
    }
    
    titleEl.innerHTML = `🎉 ${rankText}! 🎉`;
    
    const badgeHTML = `<div class="badge ${badgeClass}">#${rank}</div>`;
    badgeDisplay.insertAdjacentHTML('beforeend', badgeHTML);
};

const resetAllDataConfirmation = () => {
    const confirmed = confirm("ANDA YAKIN INGIN MENGHAPUS SEMUA DATA KUIS (Skor Level, Data Pemain, dan Leaderboard)? Tindakan ini tidak dapat dibatalkan.");
    if (confirmed) {
        localStorage.removeItem('kediriQuizPlayer');
        localStorage.removeItem('kediriQuizScores');
        localStorage.removeItem('kediriQuizLeaderboard');
        alert("Semua data kuis telah dihapus!");
        showView(VIEWS.HOME);
        window.location.reload(); 
    }
};
window.resetAllDataConfirmation = resetAllDataConfirmation;

// --- Initialization ---
window.onload = () => {
    const scores = loadPlayerData();
    if (player.name) {
        // Jika pemain sudah ada, langsung ke menu materi/level
        setTimeout(() => {
            // Arahkan ke level select, yang akan merender level dengan data skor tersimpan
            showView(VIEWS.LEVEL_SELECT); 
            bgMusic.volume = 0.4;
            bgMusic.play().catch(e => console.log("Music auto-play blocked."));
        }, 500);
    } else {
        // Initial view is HOME
        showView(VIEWS.HOME);
    }
};
