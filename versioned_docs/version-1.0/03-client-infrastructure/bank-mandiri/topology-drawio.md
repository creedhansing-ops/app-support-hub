---
client_name: bank-mandiri
id: topology-drawio
title: Topology Server (Draw.io)
sidebar_position: 2
---

# Topologi Server Bank Mandiri

Berikut adalah diagram arsitektur untuk infrastruktur Bank Mandiri. 
Gambar di bawah ini merupakan **Editable SVG**, yang dibuat menggunakan **Draw.io**.

:::tip[Cara Mengedit Diagram Ini]
1. Gambar di bawah ini bukan sekadar gambar biasa (`.png` atau `.jpg`).
2. Format aslinya adalah `.drawio.svg`.
3. Anda dapat mengunduh gambar ini, lalu membukanya di aplikasi [Draw.io](https://app.diagrams.net/) (File -> Open).
4. Kode XML struktur grafis Anda sudah tertanam (ter-*embed*) di dalam gambar SVG ini sehingga Anda bisa merevisinya kapan pun tanpa kehilangan sumber aslinya!
:::

![Topologi Draw.io SVG](pathname:///img/logo.png) {/* Nanti ganti dengan file .drawio.svg yang asli */}

## Detail Spesifikasi

Diagram di atas mencakup:
1. **Load Balancer**: Bertugas membagi trafik aplikasi.
2. **Web Server**: Menangani logika antarmuka pengguna.
3. **Database Server**: Menyimpan data transaksional yang sudah direplikasi.
