# yFlix Subtitle Downloader

Userscript untuk mengunduh subtitle dari [yFlix.to](https://yflix.to) dengan mudah.

## 📋 Fitur

- **Download Subtitle Otomatis** - Menampilkan popup dengan daftar subtitle yang tersedia
- **Antarmuka Minimalis** - Panel subtitle dapat diminimalkan untuk kenyamanan menonton
- **Pemberi Nama Otomatis** - Subtitle otomatis dinamai berdasarkan judul film/serial
- **Format VTT** - Semua subtitle diunduh dalam format `.vtt` yang kompatibel dengan mayoritas pemain video
- **Deteksi Otomatis** - Secara otomatis mendeteksi subtitle yang tersedia di halaman

## 🚀 Instalasi

### Persyaratan
- Browser yang mendukung userscript (Chrome, Firefox, Edge, Safari)
- Ekstensi [Tampermonkey](https://tampermonkey.net/) atau [Greasemonkey](https://www.greasespot.net/)

### Langkah Instalasi
1. Instal ekstensi Tampermonkey/Greasemonkey untuk browser Anda
2. Buka file `yFlix Subtitle Downloader-7.5.user.js`
3. Klik **Install** pada halaman install userscript

Atau, langsung kunjungi tautan instalasi jika script sudah di-hosting di repositori.

## 💻 Cara Menggunakan

1. Buka halaman nonton film/serial di **yflix.to/watch/**
2. Panel subtitle akan otomatis muncul di sudut kanan atas halaman
3. Tunggu beberapa detik hingga daftar subtitle ter-load
4. Klik tombol **⬇** di sebelah subtitle yang ingin diunduh
5. File akan otomatis disimpan dengan format: `[Judul Film]_[Bahasa].vtt`

### Kontrol Panel
- **Klik judul "SUBTITLES"** untuk meminimalkan/memaksimalkan panel
- Panel disimpan di **sudut kanan atas** layar
- Desain dark mode dengan aksen hijau untuk kenyamanan mata

## 📝 Spesifikasi Teknis

| Aspek | Detail |
|-------|--------|
| **Versi** | 7.5 |
| **Author** | Gemini |
| **Kompatibel** | yflix.to |
| **Format Output** | VTT |
| **Bahasa Script** | JavaScript |

## 🔧 Fitur Khusus

- **Monitor Navigasi** - Script secara otomatis cleanup UI ketika meninggalkan halaman watch
- **Caching Subtitle** - Cache subtitle untuk performa lebih baik
- **Deteksi Iframe** - Otomatis mengekstrak URL subtitle dari iframe `sub.list`
- **Validasi URL** - Hanya menampilkan UI di halaman `/watch/`

## 📜 Lisensi

Script ini dibuat untuk tujuan pendidikan dan kemudahan akses konten.

## ⚠️ Disclaimer

Script ini hanya untuk tujuan pribadi. Pengguna bertanggung jawab atas penggunaan script dan harus mematuhi persyaratan layanan yFlix.to.

## 🐛 Troubleshooting

**Subtitle tidak muncul?**
- Pastikan Anda berada di halaman watch (`yflix.to/watch/...`)
- Tunggu 2-3 detik hingga subtitle ter-load
- Buka console browser (F12) untuk melihat error

**Download tidak bekerja?**
- Pastikan Tampermonkey memiliki permission untuk mengakses yflix.to
- Coba refresh halaman dan coba lagi

## 🤝 Kontribusi

Jika menemukan bug atau ingin menambah fitur, silakan buat issue atau pull request.

---

**Selamat menonton! 🎬**
