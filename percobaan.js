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
// Catatan: Pastikan Anda telah menyertakan library Tone.js di index.html
const synth = new Tone.PolySynth(Tone.Synth).toDestination();
const bgMusic = document.getElementById('background-music');
let isMuted = false;

// Pastikan elemen #mute-btn dan #audio-icon ada di HTML
if (document.getElementById('mute-btn')) {
    document.getElementById('mute-btn').addEventListener('click', () => {
        isMuted = !isMuted;
        const icon = document.getElementById('audio-icon');

        if (isMuted) {
            bgMusic.pause();
            icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M13.5 13.5l2-2 1-1-2-2-1 1-2 2-1-1-2-2 1-1-2-2-1 1-2 2 1 1-2 2 1 1 2-2 1-1-2-2 1-1-2 2-1 1zm-4-4l-1 1 2 2-1 1-2 2 1 1 2-2 1-1-2-2 1-1 2-2-1-1-2 2-1 1zm-4-4l-1 1 2 2-1 1-2 2 1 1 2-2 1-1-2-2 1-1 2-2-1-1-2 2-1 1zm-4-4l-1 1 2 2-1 1-2 2 1 1 2-2 1-1-2-2 1-1 2-2-1-1-2 2-1 1z"/></svg>`;
        } else {
            bgMusic.play().catch(e => console.error("Auto-play blocked, please interact with the page.", e));
            icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path d="M18.846 17.518L21 19.67l-2-2-1.92-1.93l-1.9-1.9l-1.9-1.9l-1.9-1.9l-1.9-1.9l-1.9-1.9l-1.9-1.9L0 1.99l1.41-1.41l1.92 1.92l1.91 1.91l1.9 1.9l1.9 1.9l1.9 1.9l1.9 1.9l1.9 1.9l1.9 1.9l.01.01zM11 10.59L9.59 12L11 13.41L12.41 12L11 10.59z"/></svg>`;
        }
    });
}


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

// --- DATA MATERI KEDIRI RAYA (LENGKAP) ---
const materialData = [
    {
        title: "1. Pengantar dan Geografi 🏞️",
        content: "Kediri terkenal sebagai **'Kota Tahu'** karena produk olahan kedelai yang melimpah. Secara geografis, Kota ini terbelah oleh sungai besar **Sungai Brantas** dan dikelilingi oleh **Gunung Wilis** (Barat) serta **Gunung Kelud** (Timur). Ikon terkenalnya adalah **Simpang Lima Gumul (SLG)**, monumen yang menyerupai Arc de Triomphe. Kediri terbagi menjadi **Kota Kediri** dan **Kabupaten Kediri**, dengan ibukota Kabupaten di **Kecamatan Ngasem**."
    },
    {
        title: "2. Sejarah Kerajaan dan Tokoh Penting 👑",
        content: "Kediri adalah pusat **Kerajaan Kediri** (Abad ke-11 hingga ke-13 M), pecahan dari Kerajaan Mataram Kuno yang didirikan oleh **Sri Jayawarśa Digjaya Śastraprabhu**. Puncak kejayaan pada masa **Prabu Jayabaya** (terkenal dengan **Jangka Jayabaya**). Karya sastra monumental: **Kitab Bharatayuddha** oleh **Mpu Sedah** dan **Mpu Panuluh**. Peninggalan penting: **Situs Tondowongso** dan **Candi Surowono**."
    },
    {
        title: "3. Kuliner Khas 🍲",
        content: "Kuliner identik Kediri meliputi: **Tahu Kuning** (dengan warna kuning cerah dari kunyit), **Stik Tahu** (dari ampas tahu), dan **Nasi Pecel Tumpang** (disajikan dengan **Sambal Tumpang** yang terbuat dari tempe bosok/fermentasi)."
    },
    {
        title: "4. Kesenian dan Budaya 🎭",
        content: "Kesenian lokal meliputi: **Tari Topeng Panji** (tarian penyambutan) dan **Wayang Krucil** (seni pertunjukan wayang kulit yang menceritakan kisah **Panji dan Sekartaji**). Kerajinan unggulan adalah produk **Tenun Ikat** dengan motif-motif unik."
    }
];

// --- Data Kuis (sesuai tema Kediri) ---
const quizData = [
    {
        level: 1, theme: "Pengenalan Kediri & Geografi",
        questions: [
            { q: "Apa nama ikon terkenal Kota Kediri yang menyerupai Arc de Triomphe di Paris?", ans: "Simpang Lima Gumul (SLG)", opts: ["Tugu Pahlawan", "Simpang Lima Gumul (SLG)", "Monumen Kapal Selam", "Patung Semar"]},
            { q: "Kediri dikenal sebagai 'Kota ...'", ans: "Tahu", opts: ["Gudeg", "Tahu", "Bakpia", "Batik"]},
            { q: "Sungai besar yang membelah Kota Kediri adalah ...", ans: "Sungai Brantas", opts: ["Sungai Bengawan Solo", "Sungai Brantas", "Sungai Ciliwung", "Sungai Musi"]},
            { q: "Gunung yang terletak di sebelah Timur Kediri dan terkenal dengan letusannya adalah...", ans: "Gunung Kelud", opts: ["Gunung Wilis", "Gunung Kelud", "Gunung Bromo", "Gunung Semeru"]},
            { q: "Ibukota Kabupaten Kediri secara administratif berada di...", ans: "Kecamatan Ngasem", opts: ["Kecamatan Ngasem", "Kecamatan Pare", "Kota Kediri", "Kecamatan Wates"]},
        ]
    },
    {
        level: 2, theme: "Sejarah Kerajaan",
        questions: [
            { q: "Siapakah raja Kediri yang terkenal dengan ramalannya 'Jangka Jayabaya'?", ans: "Prabu Jayabaya", opts: ["Prabu Siliwangi", "Prabu Jayabaya", "Prabu Brawijaya", "Sultan Ageng Tirtayasa"]},
            { q: "Kitab sastra terkenal pada masa Kerajaan Kediri yang ditulis oleh Mpu Sedah dan Mpu Panuluh adalah ...", ans: "Kitab Bharatayuddha", opts: ["Kitab Nagarakertagama", "Kitab Bharatayuddha", "Kitab Sutasoma", "Kitab Pararaton"]},
            { q: "Kerajaan Kediri merupakan pecahan dari Kerajaan ...", ans: "Mataram Kuno", opts: ["Singasari", "Majapahit", "Mataram Kuno", "Pajajaran"]},
            { q: "Situs bersejarah yang diyakini sebagai pusat ibukota Kerajaan Kediri adalah ...", ans: "Situs Tondowongso", opts: ["Situs Trowulan", "Situs Tondowongso", "Situs Gunung Padang", "Situs Ratna Bima"]},
            { q: "Pendiri Kerajaan Kediri adalah...", ans: "Sri Jayawarśa Digjaya Śastraprabhu", opts: ["Mpu Sindok", "Airlangga", "Sri Jayawarśa Digjaya Śastraprabhu", "Ken Arok"]},
        ]
    },
    {
        level: 3, theme: "Kuliner dan Budaya",
        questions: [
            { q: "Sambal khas yang digunakan pada Nasi Pecel Tumpang Kediri terbuat dari...", ans: "Tempe bosok (fermentasi)", opts: ["Kacang mete", "Terasi udang", "Tempe bosok (fermentasi)", "Daging ayam"]},
            { q: "Makanan ringan khas Kediri yang terbuat dari olahan ampas tahu adalah ...", ans: "Stik Tahu", opts: ["Stik Tahu", "Tahu Bulat", "Kerupuk Kulit", "Lumpia"]},
            { q: "Jenis seni pertunjukan rakyat berupa wayang kulit yang sering menceritakan kisah Panji dan Sekartaji di Kediri disebut...", ans: "Wayang Krucil", opts: ["Wayang Golek", "Wayang Krucil", "Wayang Orang", "Wayang Beber"]},
            { q: "Kerajinan tangan khas Kediri yang terkenal hingga mancanegara adalah...", ans: "Tenun Ikat", opts: ["Batik Tulis", "Ukiran Jepara", "Tenun Ikat", "Keramik Plered"]},
            { q: "Tarian tradisional Kediri yang sering dibawakan dalam acara penyambutan adalah...", ans: "Tari Topeng Panji", opts: ["Tari Topeng Panji", "Tari Reog Ponorogo", "Tari Saman", "Tari Kecak"]},
        ]
    },
    // Tambahkan level kuis lainnya di sini jika diperlukan
];

let currentLevel = 1;
let currentQuestionIndex = 0;
let currentScore = 0;
let player = {};

// --- Utility Functions (NAVIGASI KE MATERIAL) ---

/**
 * Toggles the visibility of the specified view and applies fade animation.
 */
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
        
        // 3. Jeda singkat sebelum fade-in
        setTimeout(() => {
            targetView.classList.add('active');
        }, 10); 
    }

    // 4. Panggil fungsi render spesifik
    if (viewName === VIEWS.LEVEL_SELECT) {
        renderLevelSelection();
    } else if (viewName === VIEWS.MATERIAL) {
        renderMaterial(); // Panggil renderMaterial
    }
};
window.showView = showView;

/**
 * Load player data and scores from localStorage.
 */
const loadPlayerData = () => {
    const storedPlayer = localStorage.getItem('kediriQuizPlayer');
    const storedScores = localStorage.getItem('kediriQuizScores');
    if (storedPlayer) {
        player = JSON.parse(storedPlayer);
    }
    if (storedScores) {
        return JSON.parse(storedScores);
    }
    return {};
};

/**
 * Save player scores to localStorage.
 */
const saveScores = (scores) => {
    localStorage.setItem('kediriQuizScores', JSON.stringify(scores));
};


// --- 1. Halaman Utama Logic ---

document.getElementById('player-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('player-name');
    const classInput = document.getElementById('player-class');
    const schoolInput = document.getElementById('player-school');
    let isValid = true;

    // Simple validation check (as defined in original code)
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
        bgMusic.play().catch(e => console.error("Auto-play blocked."));
        
        // NAVIGASI: Pindah ke halaman MATERI
        showView(VIEWS.MATERIAL); 
    }
});

// --- 2. FUNGSI RENDER MATERI ---

const renderMaterial = () => {
    const materialContainer = document.getElementById('material-content');
    if (!materialContainer) {
        console.error("Error: Element material-content not found. Check index.html.");
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

        const levelButtonHTML = `
            <div class="level-btn-container ${isLocked ? 'locked' : ''}" data-level="${data.level}">
                <button class="level-btn flex justify-between items-center" ${isLocked ? 'disabled' : ''} onclick="startQuiz(${data.level})">
                    <div class="flex flex-col items-start">
                        <span class="text-xs font-light text-gray-300">Level ${data.level}</span>
                        <span class="text-xl font-bold">${data.theme}</span>
                    </div>
                    <div class="text-right">
                        <span class="text-sm font-light text-gray-300">Skor Tertinggi:</span>
                        <span class="text-lg font-extrabold text-${currentScore >= QUIZ_SETTINGS.PASS_SCORE ? 'yellow-300' : 'red-300'}">${currentScore} Poin</span>
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
    currentQuesAtionIndex = 0;
    currentScore = 0;
    document.getElementById('quiz-level-title').textContent = `Kuis Level ${level}: ${quizData[level - 1].theme}`;
    document.getElementById('current-quiz-score').textContent = currentScore;
    
    showQuestion(0);
    showView(VIEWS.QUIZ);
};
window.startQuiz = startQuiz;

const showQuestion = (index) => {
    currentQuestionIndex = index;
    const questionData = quizData[currentLevel - 1].questions[index];
    const container = document.getElementById('question-container');
    const feedbackContainer = document.getElementById('feedback-container');

    feedbackContainer.innerHTML = '';

    if (!questionData) {
        showResult();
        return;
    }

    document.getElementById('current-question-number').textContent = index + 1;
    
    // Randomize options (options are stored in opts)
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
                BENAR! (+${QUIZ_SETTINGS.POINTS_CORRECT} Poin)
            </div>
        `;
        selectedButton.classList.add('bg-green-200', 'border-green-500', 'shadow-lg');
    } else {
        currentScore += QUIZ_SETTINGS.POINTS_WRONG;
        playSound('wrong');
        feedbackContainer.innerHTML = `
            <div class="inline-flex items-center text-red-600 text-3xl font-bold animate-shake" style="text-shadow: 0 0 15px var(--color-error)">
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
    showView(VIEWS.RESULT);
    
    const finalScoreEl = document.getElementById('final-score');
    const resultMessageEl = document.getElementById('result-message');
    const resultActions = document.getElementById('result-actions');
    
    document.getElementById('result-level-num').textContent = currentLevel;
    document.getElementById('result-player-name').textContent = player.name;
    finalScoreEl.textContent = `${currentScore} Poin`;
    resultActions.innerHTML = '';
    
    const scores = loadPlayerData();
    const highestScore = scores[currentLevel] || 0;
    
    if (currentScore > highestScore) {
        scores[currentLevel] = currentScore;
        saveScores(scores);
    }

    const passed = currentScore >= QUIZ_SETTINGS.PASS_SCORE;
    finalScoreEl.style.color = passed ? 'var(--color-success)' : 'var(--color-error)';
    document.getElementById('score-display').classList.toggle('bg-green-100', passed);
    document.getElementById('score-display').classList.toggle('bg-red-100', !passed);
    
    if (passed) {
        resultMessageEl.textContent = "Selamat! Anda LULUS dan membuka level berikutnya!";
        const nextLevel = currentLevel + 1;
        if (nextLevel <= quizData.length) {
            resultActions.insertAdjacentHTML('beforeend', `<button class="modern-btn w-full" onclick="showView('${VIEWS.LEVEL_SELECT}')">Lanjut ke Level Berikutnya (${nextLevel})</button>`);
        } else {
            resultMessageEl.textContent = "Luar biasa! Anda telah menyelesaikan semua level Kediri Raya!";
        }
    } else {
        resultMessageEl.textContent = "Maaf, nilai Anda belum mencapai batas kelulusan (60 poin). Silakan coba lagi!";
        resultActions.insertAdjacentHTML('beforeend', `<button class="modern-btn w-full" onclick="startQuiz(${currentLevel})" style="background-color: var(--color-error); color: white;">Coba Lagi</button>`);
    }
    
    resultActions.insertAdjacentHTML('beforeend', `<button class="w-full text-sm mt-2 text-gray-500 hover:text-gray-800 transition" onclick="showView('${VIEWS.LEVEL_SELECT}')">Kembali ke Menu Level</button>`);
};

// --- Initialization ---
window.onload = () => {
    const scores = loadPlayerData();
    if (player && player.name) {
        setTimeout(() => {
            showView(VIEWS.MATERIAL); 
            bgMusic.volume = 0.4;
            bgMusic.play().catch(e => console.log("Music auto-play blocked."));
        }, 500);
    } else {
        showView(VIEWS.HOME);
    }
    
    window.resetAllDataConfirmation = () => {
        if (confirm("Apakah Anda yakin ingin menghapus semua data pemain dan skor kuis? Tindakan ini tidak dapat dibatalkan.")) {
            localStorage.removeItem('kediriQuizPlayer');
            localStorage.removeItem('kediriQuizScores');
            alert("Data berhasil direset. Silakan mulai ulang kuis.");
            window.location.reload();
        }
    };
};
