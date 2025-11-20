const VIEWS = {
    HOME: 'home',
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
        // Mute icon
        icon.innerHTML = `<path d="M14.5 13.5l2-2 1-1-2-2-1 1-2 2-1-1-2-2 1-1-2-2-1 1-2 2 1 1-2 2 1 1 2-2 1-1-2-2 1-1-2 2-1 1zm-4-4l-1 1 2 2-1 1-2 2 1 1 2-2 1-1-2-2 1-1 2-2-1-1-2 2-1 1zm"/>`; 
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
    }
};

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
            { q: "Pintu air peninggalan Belanda yang menjadi landmark di Kediri adalah ...", ans: "Bendungan Waru Turi", opts: ["Bendungan Sutami", "Bendungan Karangkates", "Bendungan Waru Turi", "Bendungan Wling

