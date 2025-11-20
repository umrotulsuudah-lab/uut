/**
 * Toggles the visibility of the specified view and applies fade animation.
 * @param {string} viewName - The name of the view (e.g., 'home', 'level-select').
 */
const showView = (viewName) => {
    playSound('click');
    const allViews = document.querySelectorAll('.view-container');
    allViews.forEach(view => {
        // Hapus kelas 'active' dulu untuk memulai transisi fade-out
        view.classList.remove('active');
        // Setelah fade-out, sembunyikan sepenuhnya
        setTimeout(() => {
            view.style.display = 'none'; 
        }, 500); // Tunggu hingga transisi opacity (0.5s) selesai
    });

    const targetView = document.getElementById(`${viewName}-view`);
    if (targetView) {
        // Set display:flex agar elemen bisa dilihat
        targetView.style.display = 'flex'; 
        
        // Tunggu sedikit sebelum menambahkan 'active' untuk memicu fade-in
        setTimeout(() => {
            targetView.classList.add('active');
        }, 50); // Jeda singkat (50ms)
    }

    // ... (Logika spesifik lainnya)

    if (viewName === VIEWS.LEVEL_SELECT) {
        // Panggil renderLevelSelection setelah tampilan berubah
        setTimeout(renderLevelSelection, 600); 
    } 
};
