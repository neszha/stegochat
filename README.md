# StegoChat: Private Messaging

<img src="docs/typeface-logo.png" width="100%">

## Deskripsi Aplikasi

StegoChat adalah aplikasi chat berbasis WEB yang mengimplementasikan teknik steganografi dan kriptografi untuk membuat saluran komunikasi yang aman.

## Kebutuhan Aplikasi

- Database Redis
- NodeJS runtime

## Menjalankan Aplikasi

Sebelum menjalankan aplikasi, pastikan semua paket atau library sudah terinstall:
```
# npm install
# cd stegoview && npm install
```

Menyiapkan file `.env` pada root project dan pada project `./stegoview/.env`.

!Pastikan database redis telah dijalankan.

Perintah untuk menjalankan aplikasi WEB Server:
```
# npm run start:dev
```

Perintah untuk menjalankan aplikasi WEB Clinet:
```
# cd stegoview
# npm run dev
```

Akan muncul link akses aplikasi dan buka link menggunakan Web Browser.