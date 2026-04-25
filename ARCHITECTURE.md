# Dokumentasi Arsitektur Proyek

Dokumen ini menjelaskan struktur folder dan pola arsitektur yang digunakan dalam proyek Next.js ini. Proyek ini dibangun dengan fokus pada skalabilitas, modularitas, dan keamanan tipe (type-safety).

## 🚀 Teknologi Utama

- **Framework**: [Next.js 15+ (App Router)](https://nextjs.org/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

---

## 📁 Struktur Folder Modular

Struktur folder diatur agar kode mudah ditemukan, diuji, dan dikelola seiring berkembangnya aplikasi.

```text
src/
├── app/                # Direktori Utama Next.js (Routing & Layout)
│   ├── favicon.ico
│   ├── globals.css     # Style global
│   ├── layout.tsx      # Root Layout (Tempat StoreProvider berada)
│   └── page.tsx        # Halaman Utama (Landing Page)
├── components/         # Komponen UI Reusable
│   ├── common/         # Komponen kecil/atom (Buttons, Input, dll)
│   └── layout/         # Komponen struktur besar (Header, Footer, Sidebar)
├── hooks/              # Custom React Hooks
├── services/           # Logika integrasi API (e.g. Axios, Fetch)
├── store/              # Konfigurasi State Management (Redux)
│   ├── slices/         # Redux Slices (Logika bisnis per modul)
│   ├── hooks.ts        # Typed hooks (useAppSelector, useAppDispatch)
│   ├── store.ts        # Konfigurasi utama Store
│   └── StoreProvider.tsx # Wrapper untuk menghubungkan Redux ke App Router
├── types/              # Definisi interface dan tipe TypeScript
├── utils/              # Fungsi pembantu (helper functions / formatters)
└── styles/             # (Opsional) Token CSS atau tema tambahan
```

---

## ⚛️ Implementasi Redux

Kami menggunakan **Redux Toolkit (RTK)** dengan pola yang direkomendasikan untuk Next.js App Router:

### 1. Store Configuration (`src/store/store.ts`)
Menggunakan fungsi `makeStore` untuk memastikan store baru dibuat untuk setiap request jika diperlukan (terutama penting untuk SSR/Streaming).

### 2. Typed Hooks (`src/store/hooks.ts`)
Kami menyediakan `useAppDispatch` and `useAppSelector` yang sudah memiliki tipe data (`TypeScript`), sehingga Anda mendapatkan *autocomplete* dan deteksi error saat mengakses state.

### 3. Store Provider (`src/store/StoreProvider.tsx`)
Komponen Client yang membungkus aplikasi. Menggunakan `useState` untuk inisialisasi store satu kali saja di sisi client agar state tidak tereset saat re-render.

---

## 🛠️ Cara Menambah Fitur Baru

Untuk menambahkan state baru:
1. Buat file slice baru di `src/store/slices/namaSlice.ts`.
2. Daftarkan reducer tersebut di `src/store/store.ts`.
3. Gunakan state di komponen dengan `useAppSelector`.
4. Ubah state dengan `dispatch(action())` menggunakan `useAppDispatch`.

---

## 📝 Catatan Tambahan
- Selalu gunakan **TypeScript** untuk setiap komponen dan fungsi baru.
- Pisahkan logika bisnis (di dalam *slice* atau *services*) dari tampilan (komponen UI).
- Gunakan direktori `common` untuk komponen yang bisa digunakan kembali di berbagai halaman.
