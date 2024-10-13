function escapeHtml(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// Contoh penggunaan:
const userInput = "<script>alert('XSS!')</script>";
const safeInput = escapeHtml(userInput);
console.log(userInput);
// Output: &lt;script&gt;alert(&#039;XSS!&#039;)&lt;/script&gt;

document.getElementsByClassName("root")[0].innerHTML = `
    <div class="alert" id="alertBox">
        <span class="closebtn">&times;</span>
        <strong>Selamat Datang</strong> Kawan
    </div>
    
    <div id="header">
        <h1>Tugas-2 Praktikum Pemrograman Web</h1>
    </div>
  
    <div class="container">
        <div class="form-container">
            <div id="formInput">
                <form id="myForm">
                    <label for="username">Username</label>
                    <input type="text" id="username" name="username" placeholder="Gerti Armanda Sembiring" required>

                    <label for="nim">NIM</label>
                    <input type="text" id="nim" name="nim" placeholder="231401133" required>

                    <label for="kom">KOM</label>
                    <input type="text" id="kom" name="kom" placeholder="A" required>

                    <label for="foto">Foto</label>
                    <div class="file-label">
                        <input type="file" id="fotoInput" name="foto" accept="image/*" required>
                        <span id="fotoStatus">Mohon Upload Foto Terlebih Dahulu</span>
                        <span class="checkmark" id="checkmark">✔</span> 
                    </div>

                    <button type="submit">Submit</button> <!-- Menghapus id submit dari tombol -->
                </form>
            </div>
        </div>

        <div class="result-container" id="hasil">
            <div id="card">
                <img id="cardImage" src="" alt="" style="display: none;">
                <label id="cardUsername">Username: </label>
                <label id="cardNIM">NIM: </label>
                <label id="cardKOM">KOM: </label>
            </div>
        </div>
    </div>`;

window.onload = function() {
            var alertBox = document.getElementById("alertBox");
            alertBox.classList.add("show"); // Tampilkan alert dengan animasi
        };
        
        const fotoInput = document.getElementById("fotoInput");
        const fotoStatus = document.getElementById("fotoStatus");
        const checkmark = document.getElementById("checkmark");

        fotoInput.addEventListener('change', function() {
            if (fotoInput.files.length > 0) {
                fotoStatus.textContent = "Foto Sudah Diupload";
                checkmark.style.display = "inline"; 
            } else {
                fotoStatus.textContent = "Mohon Upload Foto Terlebih Dahulu";
                checkmark.style.display = "none";
            }
        });

        fotoStatus.addEventListener('click', function() {
            fotoInput.click();
        });

        document.getElementById("myForm").onsubmit = function(event) {
            event.preventDefault();

            let username = escapeHtml(document.getElementById("username").value);
            let nim = escapeHtml(document.getElementById("nim").value);
            let kom = escapeHtml(document.getElementById("kom").value);

            if (username && nim && kom) {
                document.getElementById("cardUsername").innerText = "Username: " + username;
                document.getElementById("cardNIM").innerText = "NIM: " + nim;
                document.getElementById("cardKOM").innerText = "KOM: " + kom;
                const file = fotoInput.files[0];
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById("cardImage").src = e.target.result;
                    document.getElementById("cardImage").style.display = "block";
                };
                if (file) {
                    reader.readAsDataURL(file);
                }
                document.getElementById("card").style.display = "block";
            }

            alertBox.innerText = "Data Berhasil Dimasukkan!";
            alertBox.classList.remove("show"); // Menghapus kelas show untuk menghilangkan alert
            setTimeout(() => {
                alertBox.classList.add("show"); // Tampilkan kembali dengan animasi
                alertBox.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 100);
                    document.getElementById("alertBox").scrollIntoView({ behavior: "smooth", block: "start" });
        };

        // Menutup alert
        document.querySelector('.closebtn').onclick = function() {
            alertBox.style.display = "none";
        };

        // Menutup alert dengan click di luar
        window.onclick = function(event) {
            if (event.target === alertBox) {
                alertBox.style.display = "none";
            }
        };