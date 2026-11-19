# Global Motion Pack 2027

Paket 10 motion graphic 4K (3840 × 2160, 30 FPS, 24 detik) dengan **teks dalam bahasa Inggris** untuk pasar global.
Dirender otomatis di GitHub Actions.

## Daftar komposisi

| ID | Tema | Gerakan utama |
|---|---|---|
| G01-ZeroWaste | Zero waste | Loop daur ulang yang berputar, daun mengorbit |
| G02-Telehealth | Telehealth | Monitor vital dengan jejak EKG, kapsul berputar |
| G03-SaleTag | Summer sale | Kartu produk muncul bergantian, badge diskon berputar |
| G04-VideoCall | Team video call | Grid peserta, pembicara aktif menyala, mikrofon berganti |
| G05-Growth | Steady growth | Grafik candlestick yang tergambar, panah tren, penghitung |
| G06-Travel | Travel | Globe berputar dengan busur penerbangan dan pesawat |
| G07-Learn | Online learning | Buku yang halamannya terbalik, topi kelulusan jatuh |
| G08-Coffee | Coffee break | Cangkir yang terisi kopi, uap yang naik |
| G09-Fitness | Daily activity | Tiga cincin aktivitas yang terisi, penghitung langkah |
| G10-ThankYou | Thank you | Huruf memantul, hati naik, pesan ucapan terima kasih |

## Cara render

1. Buka **Actions > Render Motion Video > Run workflow**.
2. Ketik ID komposisi, misalnya `G01-ZeroWaste`.
3. Pilih `preview` (1280 × 720) untuk cek cepat, atau `final-4k` untuk hasil akhir.
4. Unduh MP4 dari bagian **Artifacts**. Nama file: `out/<ID>_<mode>.mp4`.

## Upload ke GitHub

- Unggah seluruh isi folder proyek (termasuk `src/`), bukan hanya file workflow.
- File workflow harus berada di `.github/workflows/render.yml` (folder bernama `workflows`).
- Jika unggah folder bertitik gagal di browser, gunakan GitHub Desktop.

## Catatan

- Output berupa MP4 tanpa alpha.
- Hindari logo, merek dagang, dan wajah orang yang dapat dikenali kecuali sudah memiliki model release.
