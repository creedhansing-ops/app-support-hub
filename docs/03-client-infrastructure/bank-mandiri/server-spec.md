---
id: server-spec
title: Server Specifications
sidebar_position: 2
---

# Server Spec: Bank Mandiri

Berikut adalah daftar rincian server yang digunakan oleh **Bank Mandiri**.

:::warning[Keamanan]
Pastikan Anda merahasiakan IP Publik dan Kata Sandi menggunakan fitur `<Secret>`.
:::

| Hostname | Role | IP Internal | IP Eksternal | OS |
| :--- | :--- | :--- | :--- | :--- |
| `app-prod-01` | Application | 10.0.1.10 | <Secret>103.X.X.X</Secret> | Ubuntu 22.04 |
| `db-prod-01`  | Database | 10.0.2.10 | - | Ubuntu 22.04 |

## Catatan Konfigurasi
- **Database Engine:** PostgreSQL 15
- **Web Server:** Nginx 1.24
