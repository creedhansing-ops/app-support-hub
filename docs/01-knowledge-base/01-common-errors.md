---
id: common-errors
title: Common Error Handling
sidebar_position: 1
tags:
  - Troubleshooting
  - Errors
  - Database
---
# Common Error Handlin

Panduan ini berisi cara-cara standar untuk mengatasi masalah aplikasi, *timeout*, dan kesalahan konfigurasi yang sering terjadi pada lingkungan *production*.

## 1. Connection Timeouts (Kode 504)

*Gateway timeouts* biasanya mengindikasikan layanan di belakang gagal merespons dalam batas waktu (*TTL*) yang telah ditentukan. Hal ini paling sering terkait dengan database yang kelebihan beban.

:::info[Tip Diagnostik]
Selalu periksa *log Load Balancer* sebelum berasumsi aplikasi mengalami kegagalan. Pada 40% kasus, masalahnya ada pada *timeout* AWS ALB yang salah konfigurasi.
:::

### Langkah Penyelesaian:

1. Periksa metrik *connection pool* aktif.
2. Identifikasi *query* yang berjalan lama menggunakan `pg_stat_activity`.
3. *Restart container* yang bermasalah jika penggunaan memori melebihi 90%.

```sql
SELECT pid, age(query_start, clock_timestamp()), usename, query 
FROM pg_stat_activity 
WHERE query != '<idle>' AND query NOT ILIKE '%pg_stat_activity%' 
ORDER BY query_start desc;
```

## 2. Authentication Failures (Kode 401)

Token JWT yang tidak valid atau kedaluwarsa adalah penyebab utama *error 401*. 

:::warning[Peringatan Penting]
Jangan arahkan klien untuk menghapus seluruh *cache local storage* mereka karena akan merusak *state* aplikasi lain. Targetkan hanya *key* `auth_session`. 
Untuk memeriksa *IP address* dari *client* yang diblokir, bisa periksa IP berikut: <Secret>192.168.1.50</Secret>.
:::
