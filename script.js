function roastUser() {
    const username = document.getElementById('username').value;
    const roastOutput = document.getElementById('roastOutput');
    
    if (username === '') {
        roastOutput.innerHTML = 'Yuk, isi username-nya dulu!';
        return;
    }
    
    fetch(`https://api.github.com/users/${username}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pengguna nggak ketemu');
            }
            return response.json();
        })
        .then(data => {
            const { login, public_repos, followers, following, created_at, bio, public_gists, hireable } = data;

            let roastMessage = `<p>Hey <strong>${login}</strong>!</p>`;

            // Roast berdasarkan jumlah repository
            if (public_repos > 50) {
                roastMessage += `<p>Wah, ${login}, ${public_repos} repo? Kamu pasti senang banget mengumpulkan proyek yang gak pernah selesai.</p>`;
            } else if (public_repos > 20) {
                roastMessage += `<p>Dengan ${public_repos} repo, sepertinya kamu lebih suka numpuk proyek daripada menyelesaikannya.</p>`;
            } else {
                roastMessage += `<p>Kamu cuma punya ${public_repos} repo? Lebih banyak waktu yang dihabiskan untuk bikin repo daripada bikin kode.</p>`;
            }
            
            // Roast berdasarkan jumlah followers
            if (followers > 1000) {
                roastMessage += `<p>${followers} followers? Wah, mereka sepertinya lebih sabar dari pada nungguin kamu bikin proyek.</p>`;
            } else if (followers > 100) {
                roastMessage += `<p>${followers} orang follow kamu? Mereka pasti ngarep kamu bakal bikin sesuatu yang keren suatu hari nanti.</p>`;
            } else {
                roastMessage += `<p>${followers} followers? Sepertinya mereka cuma nungguin kamu punya proyek yang akhirnya kelar.</p>`;
            }
            
            // Roast berdasarkan jumlah following
            if (following > 100) {
                roastMessage += `<p>Kamu follow ${following} orang? Sepertinya kamu lebih suka stalking daripada bikin proyek sendiri.</p>`;
            } else if (following > 50) {
                roastMessage += `<p>Kamu follow ${following} orang? Mungkin kamu lebih banyak ngintip kode orang lain daripada bikin kode sendiri.</p>`;
            } else {
                roastMessage += `<p>${following} orang yang kamu follow? Kayaknya kamu lebih banyak ngikutin orang daripada yang kamu kerjakan.</p>`;
            }
            
            // Roast berdasarkan jumlah gists publik
            if (public_gists > 50) {
                roastMessage += `<p>Kamu punya ${public_gists} gists publik? Sepertinya kamu terlalu senang membagi-bagi snippet yang enggak ada gunanya.</p>`;
            } else if (public_gists > 10) {
                roastMessage += `<p>${public_gists} gists publik? Kamu pasti suka share hal-hal kecil yang nggak terlalu penting.</p>`;
            } else {
                roastMessage += `<p>Kamu punya ${public_gists} gists? Sepertinya kamu belum banyak berbagi hal yang bermanfaat.</p>`;
            }
            
            // Roast berdasarkan tanggal pembuatan akun
            const accountAge = Math.floor((new Date() - new Date(created_at)) / (1000 * 60 * 60 * 24 * 365));
            if (accountAge > 5) {
                roastMessage += `<p>Akun kamu udah ${accountAge} tahun? Kayaknya kamu udah lama banget, tapi proyeknya belum berkembang.</p>`;
            } else if (accountAge > 2) {
                roastMessage += `<p>Akun kamu udah ada ${accountAge} tahun, tapi sepertinya nggak banyak kemajuan yang terjadi.</p>`;
            } else {
                roastMessage += `<p>Akun kamu baru ${accountAge} tahun? Semoga kamu bisa lebih produktif ke depannya.</p>`;
            }
            
            // Roast berdasarkan bio
            if (bio) {
                roastMessage += `<p>Bio kamu: "${bio}". Wah, sepertinya kamu lebih suka ngomong daripada nulis kode.</p>`;
            } else {
                roastMessage += `<p>Bio kamu kosong? Kayaknya kamu nggak punya sesuatu yang keren buat dibagi.</p>`;
            }
            
            // Roast berdasarkan status hireable
            if (hireable) {
                roastMessage += `<p>Kamu hireable? Mungkin kamu butuh kerjaan biar nggak cuma nambahin repo tanpa hasil.</p>`;
            } else {
                roastMessage += `<p>Kamu nggak hireable? Mungkin kamu lebih cocok jadi freelancer yang bikin kode sendirian.</p>`;
            }
            
            roastOutput.innerHTML = roastMessage;
        })
        .catch(error => {
            roastOutput.innerHTML = 'Pengguna tidak ditemukan. Mungkin coba yang lain aja.';
        });
}