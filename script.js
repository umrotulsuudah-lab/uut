// --- KONFIGURASI DAN DATA KUIS (TIDAK BERUBAH) ---

const VIEWS = {
    HOME: 'home',
    LEVEL_SELECT: 'level-select',
    QUIZ: 'quiz',
    RESULT: 'result',
    SPECIAL_RESULT: 'special-result' // BARU: Tampilan Spesial Top 3
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
        case 'win_special': // BARU
            synth.triggerAttackRelease(["C5", "E5", "G5", "C6"], "2n");
            break;
    }
};

// --- Data Kuis (Dibuat sesuai tema Kediri) ---
// (Data kuis Level 1-10 Anda di sini, tidak diubah)
const quizData = [ /* ... */ ];

// --- STATE KUIS ---
let currentLevel = 1;
let currentQuestionIndex = 0;
let currentScore = 0;
let player = {};

// --- DATA MANAGEMENT & LEADERBOARD (BARU) ---

const loadLeaderboard = () => {
    const storedLeaderboard = localStorage.getItem('kediriQuizLeaderboard');
    // Leaderboard disimpan sebagai array objek: [{name: '...', score: 1000, ...}]
    return storedLeaderboard ? JSON.parse(storedLeaderboard) : [];
};

const saveLeaderboard = (leaderboard) => {
    localStorage.setItem('kediriQuizLeaderboard', JSON.stringify(leaderboard));
};

const calculateCumulativeScore = (scores) => {
    // Menghitung total skor dari semua level yang telah disimpan
    return Object.values(scores).reduce((total, score) => total + score, 0);
};

/**
 * Load player data and scores from localStorage. (Diperbarui)
 */
const loadPlayerData = () => {
    const storedPlayer = localStorage.getItem('kediriQuizPlayer');
    const storedScores = localStorage.getItem('kediriQuizScores');
    if (storedPlayer) {
        player = JSON.parse(storedPlayer);
    }
    return storedScores ? JSON.parse(storedScores) : {};
};

/**
 * Save player scores to localStorage.
 * @param {Object} scores - The score object.
 */
const saveScores = (scores) => {
    localStorage.setItem('kediriQuizScores', JSON.stringify(scores));
};

// --- Utility Functions ---

/**
 * Toggles the visibility of the specified view and applies fade animation.
 * FIX: Memastikan transisi berjalan mulus
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
        // Beri waktu lebih lama agar transisi selesai sebelum rendering
        setTimeout(renderLevelSelection, 600); 
    }
};
// Attach showView globally for inline HTML click events
window.showView = showView; 

// --- 1. Halaman Utama Logic (SAMA) ---

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
        showView(VIEWS.LEVEL_SELECT);
    }
});

// --- 2. Halaman Pemilihan Level Logic (SAMA) ---

/**
 * Determines if a level is unlocked.
 * @param {number} level - The level number.
 * @param {Object} scores - The stored scores.
 * @returns {boolean} - True if unlocked, false otherwise.
 */
const isLevelUnlocked = (level, scores) => {
    if (level === 1) return true;
    const previousLevel = level - 1;
    const previousScore = scores[previousLevel] || 0;
    return previousScore >= QUIZ_SETTINGS.PASS_SCORE;
};

/**
 * Renders the list of level buttons.
 */
const renderLevelSelection = () => {
    const scores = loadPlayerData(); // Reload scores
    const levelList = document.getElementById('level-list');
    levelList.innerHTML = ''; // Clear previous buttons

    document.getElementById('player-greeting').textContent = `Halo ${player.name} (${player.class}, ${player.school}), pilih level yang ingin kamu mainkan!`;

    quizData.forEach(data => {
        const isLocked = !isLevelUnlocked(data.level, scores);
        const currentScore = scores[data.level] || 0;

        const lockIcon = isLocked ? `<i class="fas fa-lock text-white/50 ml-2"></i>` : ''; // Ikon Kunci (Membutuhkan Font Awesome)

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

// --- 3. Halaman Kuis Logic (SAMA) ---

/**
 * Starts the quiz for a given level.
 * @param {number} level - The level number to start.
 */
const startQuiz = (level) => {
    currentLevel = level;
    currentQuestionIndex = 0;
    currentScore = 0;
    document.getElementById('quiz-level-title').textContent = `Kuis Level ${level}: ${quizData[level - 1].theme}`;
    document.getElementById('current-quiz-score').textContent = currentScore;
    
    // Opsional: Acak urutan pertanyaan setiap kali kuis dimulai
    // quizData[level - 1].questions.sort(() => Math.random() - 0.5); 

    showQuestion(0);
    showView(VIEWS.QUIZ);
};
// Attach startQuiz globally for inline HTML click events
window.startQuiz = startQuiz;

/**
 * Displays the current question. (SAMA)
 * @param {number} index - The index of the question in the current level's array.
 */
const showQuestion = (index) => {
    currentQuestionIndex = index;
    const questionData = quizData[currentLevel - 1].questions[index];
    const container = document.getElementById('question-container');
    const feedbackContainer = document.getElementById('feedback-container');

    feedbackContainer.innerHTML = ''; // Clear previous feedback

    if (!questionData) {
        // End of quiz for this level
        showResult();
        return;
    }

    document.getElementById('current-question-number').textContent = index + 1;
    
    // Randomize options (A to D)
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

    // Apply fade-in animation
    container.innerHTML = `
        <div class="question-card">
            <p class="text-xl sm:text-2xl font-semibold mb-6 text-gray-800">${questionData.q}</p>
            <div id="options-list" class="space-y-3">
                ${optionHTML}
            </div>
        </div>
    `;
};

/**
 * Checks the user's answer, updates score, and shows feedback. (SAMA)
 * @param {HTMLElement} selectedButton - The button clicked by the user.
 * @param {string} correctAnswer - The correct answer string.
 */
const checkAnswer = (selectedButton, correctAnswer) => {
    // Disable all buttons immediately
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
        // Correct feedback (Green checkmark + glow)
        feedbackContainer.innerHTML = `
            <div class="inline-flex items-center text-green-600 text-3xl font-bold animate-bounce" style="text-shadow: 0 0 15px var(--color-success)">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/>
                </svg>
                BENAR! (+${QUIZ_SETTINGS.POINTS_CORRECT} Poin)
            </div>
        `;
        // Highlight correct button
        selectedButton.classList.add('bg-green-200', 'border-green-500', 'shadow-lg');
    } else {
        currentScore += QUIZ_SETTINGS.POINTS_WRONG;
        playSound('wrong');
        // Wrong feedback (Red cross + shake)
        feedbackContainer.innerHTML = `
            <div class="inline-flex items-center text-red-600 text-3xl font-bold animate-shake" style="text-shadow: 0 0 15px var(--color-error)">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
                SALAH! (${QUIZ_SETTINGS.POINTS_WRONG} Poin)
            </div>
        `;
        // Highlight wrong button
        selectedButton.classList.add('bg-red-200', 'border-red-500', 'shadow-lg');
        // Find and highlight the correct one
        buttons.forEach(btn => {
            if (btn.getAttribute('data-answer') === correctAnswer) {
                btn.classList.add('bg-green-300', 'border-green-600', 'font-bold');
            }
        });
    }

    document.getElementById('current-quiz-score').textContent = currentScore;

    // Move to next question after a delay
    setTimeout(() => {
        showQuestion(currentQuestionIndex + 1);
    }, 1500); // 1.5 second delay
};
// Attach checkAnswer globally for inline HTML click events
window.checkAnswer = checkAnswer;

// --- 4. Halaman Hasil Logic (MODIFIED) ---

/**
 * Displays the quiz results and updates score/lock status.
 */
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
    // Cek apakah semua level sudah ada skornya (untuk memastikan kumulatif skor valid)
    const allLevelsPlayed = Object.keys(scores).length === quizData.length;
    
    if (isLastLevel && passed && allLevelsPlayed) {
        // Jika Level 10 LULUS, hitung skor kumulatif dan cek Top 3
        const cumulativeScore = calculateCumulativeScore(scores);
        checkAndShowSpecialResult(cumulativeScore);
        return; // Hentikan dan tampilkan hasil spesial
    }

    // 3. Tampilkan hasil normal (untuk level 1 hingga 9 atau Level 10 tapi tidak lulus)
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
    
    // Add 'Kembali ke Menu Level' button
    const backBtn = `
        <button class="w-full text-sm mt-2 text-gray-500 hover:text-gray-800 transition" onclick="showView('${VIEWS.LEVEL_SELECT}')">
            Kembali ke Menu Level
        </button>
    `;
    resultActions.insertAdjacentHTML('beforeend', backBtn);
};

// --- LOGIC HASIL SPESIAL (TOP 3) (BARU) ---

/**
 * Memeriksa skor kumulatif pemain dan menampilkan hasil spesial jika masuk Top 3.
 */
const checkAndShowSpecialResult = (cumulativeScore) => {
    let leaderboard = loadLeaderboard();
    const newEntry = { 
        name: player.name, 
        score: cumulativeScore, 
        class: player.class, 
        school: player.school 
    };

    // Menggunakan kombinasi nama, kelas, dan sekolah sebagai identifier unik
    const playerIdentifier = `${player.name}-${player.class}-${player.school}`;
    const playerIndex = leaderboard.findIndex(entry => 
        `${entry.name}-${entry.class}-${entry.school}` === playerIdentifier
    );
    
    if (playerIndex !== -1) {
        // Jika pemain sudah ada, update skor jika yang baru lebih tinggi
        if (newEntry.score > leaderboard[playerIndex].score) {
            leaderboard[playerIndex].score = newEntry.score;
        }
    } else {
        leaderboard.push(newEntry);
    }
    
    // Sortir dan potong (Top 10)
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 10);
    saveLeaderboard(leaderboard);
    
    // Cek peringkat pemain saat ini
    const finalRank = leaderboard.findIndex(entry => 
        `${entry.name}-${entry.class}-${entry.school}` === playerIdentifier && entry.score === newEntry.score
    ) + 1;

    if (finalRank > 0 && finalRank <= 3) {
        // Masuk Top 3!
        showSpecialResult(finalRank, newEntry.score);
    } else {
        // Tidak masuk Top 3, kembali ke menu level dengan pesan
        showView(VIEWS.LEVEL_SELECT);
        alert(`Selamat, ${player.name}!\nSkor Kumulatif Anda: ${newEntry.score} Poin.\nAnda berada di peringkat #${finalRank} Leaderboard.`);
    }
};

/**
 * Menampilkan tampilan spesial untuk Top 3.
 */
const showSpecialResult = (rank, score) => {
    showView(VIEWS.SPECIAL_RESULT);
    playSound('win_special'); // Panggil suara spesial

    const badgeDisplay = document.getElementById('badge-display');
    const totalScoreEl = document.getElementById('total-cumulative-score');
    const titleEl = document.getElementById('special-result-title');
    const confettiEl = document.getElementById('confetti-layer'); // Asumsi ada elemen di HTML
    
    totalScoreEl.textContent = `${score} Poin`;
    badgeDisplay.innerHTML = ''; 

    let badgeClass = '';
    let rankText = '';
    
    if (rank === 1) {
        badgeClass = 'badge-gold';
        rankText = 'PERINGKAT EMAS';
        // Animasi kembang api/sparkle bisa diatur di CSS berdasarkan kelas atau properti elemen
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

/**
 * Konfirmasi reset data. (BARU)
 */
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

// --- Initialization (SAMA) ---
window.onload = () => {
    // Check for existing player data
    const scores = loadPlayerData();
    if (player.name) {
        // Jika pemain sudah ada, langsung ke menu level (setelah loading)
        setTimeout(() => {
            showView(VIEWS.LEVEL_SELECT);
            bgMusic.volume = 0.4;
            bgMusic.play().catch(e => console.log("Music auto-play blocked."));
        }, 500);
    } else {
        // Initial view is HOME
        showView(VIEWS.HOME);
    }
};
