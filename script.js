// ... (Kode yang sudah ada di bagian atas: VIEWS, QUIZ_SETTINGS, Audio Setup)

// Tambahkan VIEW baru ke daftar
const VIEWS = {
    HOME: 'home',
    LEVEL_SELECT: 'level-select',
    QUIZ: 'quiz',
    RESULT: 'result',
    SPECIAL_RESULT: 'special-result' // BARU
};

// ... (quizData array)

let currentLevel = 1;
let currentQuestionIndex = 0;
let currentScore = 0;
let player = {};

// --- Leaderboard Data Structure ---
// leaderboard = [ { name: 'Player A', score: 900, class: '...', school: '...' }, ... ]
const loadLeaderboard = () => {
    const storedLeaderboard = localStorage.getItem('kediriQuizLeaderboard');
    return storedLeaderboard ? JSON.parse(storedLeaderboard) : [];
};

const saveLeaderboard = (leaderboard) => {
    localStorage.setItem('kediriQuizLeaderboard', JSON.stringify(leaderboard));
};

/**
 * Menghitung skor kumulatif dari semua level yang telah dimainkan.
 * @param {Object} scores - Skor per level.
 * @returns {number} Total skor.
 */
const calculateCumulativeScore = (scores) => {
    return Object.values(scores).reduce((total, score) => total + score, 0);
};

// ... (Utility Functions: showView, loadPlayerData, saveScores, isLevelUnlocked, renderLevelSelection, startQuiz, showQuestion, checkAnswer)

// --- 4. Halaman Hasil Logic (showResult dimodifikasi) ---

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
    
    // 2. Cek apakah ini level terakhir (semua level sudah dimainkan)
    const isLastLevel = currentLevel === quizData.length;
    const allLevelsPlayed = Object.keys(scores).length === quizData.length;
    
    if (isLastLevel && passed && allLevelsPlayed) {
        // Jika level terakhir LULUS, hitung skor kumulatif dan cek Top 3
        const cumulativeScore = calculateCumulativeScore(scores);
        checkAndShowSpecialResult(cumulativeScore);
        return; 
    }
    
    // 3. Tampilkan hasil normal
    showView(VIEWS.RESULT);
    
    // ... (Logika RESULT VIEW sama seperti sebelumnya) ...
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
            resultMessageEl.textContent = "Luar biasa! Semua level telah selesai. Kunjungi Menu Level untuk melihat skor kumulatif!";
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

/**
 * Memeriksa skor kumulatif pemain dan menampilkan hasil spesial jika masuk Top 3.
 * @param {number} cumulativeScore - Total skor dari semua level.
 */
const checkAndShowSpecialResult = (cumulativeScore) => {
    let leaderboard = loadLeaderboard();
    const newEntry = { 
        name: player.name, 
        score: cumulativeScore, 
        class: player.class, 
        school: player.school 
    };

    // 1. Tambahkan/Perbarui entri pemain
    const playerIndex = leaderboard.findIndex(entry => 
        entry.name === player.name && entry.class === player.class && entry.school === player.school
    );
    
    if (playerIndex !== -1) {
        // Jika pemain sudah ada, update skor jika yang baru lebih tinggi
        if (cumulativeScore > leaderboard[playerIndex].score) {
            leaderboard[playerIndex].score = cumulativeScore;
        }
    } else {
        leaderboard.push(newEntry);
    }
    
    // 2. Sortir dan potong (hanya simpan Top 10, misalnya)
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 10);
    saveLeaderboard(leaderboard);
    
    // 3. Cek apakah pemain masuk Top 3
    const finalRank = leaderboard.findIndex(entry => 
        entry.name === player.name && entry.score === cumulativeScore
    ) + 1;

    if (finalRank > 0 && finalRank <= 3) {
        showSpecialResult(finalRank, cumulativeScore);
    } else {
        // Jika tidak masuk Top 3, kembali ke menu level atau tampilkan hasil normal terakhir
        showView(VIEWS.LEVEL_SELECT);
        alert(`Skor Kumulatif Anda: ${cumulativeScore} Poin.\nAnda berada di peringkat #${finalRank}.`);
    }
};

/**
 * Menampilkan tampilan spesial untuk Top 3.
 * @param {number} rank - Peringkat pemain (1, 2, atau 3).
 * @param {number} score - Skor kumulatif.
 */
const showSpecialResult = (rank, score) => {
    showView(VIEWS.SPECIAL_RESULT);
    
    const badgeDisplay = document.getElementById('badge-display');
    const totalScoreEl = document.getElementById('total-cumulative-score');
    const titleEl = document.getElementById('special-result-title');
    
    totalScoreEl.textContent = `${score} Poin`;
    badgeDisplay.innerHTML = ''; // Clear previous badges

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
    
    titleEl.innerHTML = `🎉 LUAR BIASA! (${rankText}) 🎉`;
    
    const badgeHTML = `
        <div class="badge ${badgeClass}">#${rank}</div>
    `;
    badgeDisplay.insertAdjacentHTML('beforeend', badgeHTML);
};

/**
 * Konfirmasi reset data.
 */
const resetAllDataConfirmation = () => {
    playSound('wrong');
    const confirmed = confirm("ANDA YAKIN INGIN MENGHAPUS SEMUA DATA KUIS (Skor Level dan Leaderboard)? Tindakan ini tidak dapat dibatalkan.");
    if (confirmed) {
        localStorage.removeItem('kediriQuizPlayer');
        localStorage.removeItem('kediriQuizScores');
        localStorage.removeItem('kediriQuizLeaderboard');
        alert("Semua data kuis telah dihapus!");
        showView(VIEWS.HOME);
        window.location.reload(); // Reload untuk memastikan state bersih
    }
};
// Attach globally
window.resetAllDataConfirmation = resetAllDataConfirmation;

// ... (Initialization: window.onload)
