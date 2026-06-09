const fs = require('fs');
const path = require('path');

// Ambil nama klien dari argumen command line
const clientName = process.argv[2];

if (!clientName) {
  console.error('\x1b[31m%s\x1b[0m', '❌ Error: Harap masukkan nama klien!');
  console.log('Gunakan format: npm run tambah-klien "Nama Klien"');
  process.exit(1);
}

// Format nama klien menjadi slug (contoh: "Bank BCA" -> "bank-bca")
const slug = clientName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const baseDir = path.join(__dirname, '..', 'docs', '03-client-infrastructure', slug);
const versionedDir = path.join(__dirname, '..', 'versioned_docs', 'version-1.0', '03-client-infrastructure', slug);

// Template Topology
const topologyContent = `---
id: topology
title: Network Topology
sidebar_position: 1
---

# Topology: ${clientName}

Ini adalah dokumen topologi jaringan untuk **${clientName}**.

:::info[Detail Lingkungan]
Dokumen ini menguraikan arsitektur jaringan pada lingkungan Production.
:::

## Diagram Jaringan

*(Anda bisa memasukkan gambar atau diagram Mermaid di sini)*

\`\`\`mermaid
graph TD;
    Internet-->Firewall;
    Firewall-->LoadBalancer;
    LoadBalancer-->AppServer1;
    LoadBalancer-->AppServer2;
    AppServer1-->Database;
    AppServer2-->Database;
\`\`\`
`;

// Template Server Spec
const serverSpecContent = `---
id: server-spec
title: Server Specifications
sidebar_position: 2
---

# Server Spec: ${clientName}

Berikut adalah daftar rincian server yang digunakan oleh **${clientName}**.

:::warning[Keamanan]
Pastikan Anda merahasiakan IP Publik dan Kata Sandi menggunakan fitur \`<Secret>\`.
:::

| Hostname | Role | IP Internal | IP Eksternal | OS |
| :--- | :--- | :--- | :--- | :--- |
| \`app-prod-01\` | Application | 10.0.1.10 | <Secret>103.X.X.X</Secret> | Ubuntu 22.04 |
| \`db-prod-01\`  | Database | 10.0.2.10 | - | Ubuntu 22.04 |

## Catatan Konfigurasi
- **Database Engine:** PostgreSQL 15
- **Web Server:** Nginx 1.24
`;

// Fungsi untuk membuat folder dan file
const scaffold = (targetDir) => {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
    
    fs.writeFileSync(path.join(targetDir, 'topology.md'), topologyContent);
    fs.writeFileSync(path.join(targetDir, 'server-spec.md'), serverSpecContent);
    
    console.log('\x1b[32m%s\x1b[0m', `✅ Berhasil membuat dokumentasi klien di: ${targetDir}`);
  } else {
    console.log('\x1b[33m%s\x1b[0m', `⚠️ Folder ${targetDir} sudah ada.`);
  }
};

console.log(`Memulai pembuatan struktur dokumentasi untuk: ${clientName}...`);

// Buat di folder docs/ (untuk Next version)
scaffold(baseDir);

// Buat di folder versioned_docs/version-1.0/ (untuk Current version)
if (fs.existsSync(path.join(__dirname, '..', 'versioned_docs', 'version-1.0'))) {
    scaffold(versionedDir);
}

console.log('\x1b[32m%s\x1b[0m', '🎉 Selesai! Halaman klien sudah bisa dilihat di Docusaurus.');
