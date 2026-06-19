const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '../versioned_docs/version-1.0');

if (fs.existsSync(docsDir)) {
  const folders = fs.readdirSync(docsDir).filter(f => f.startsWith('api-'));
  
  for (const folder of folders) {
    const apiDir = path.join(docsDir, folder);
    const files = fs.readdirSync(apiDir);
    
    // Hapus blok penghapusan info.mdx karena Docusaurus masih membutuhkannya di route registry
    // Kita hanya perlu menghapusnya dari sidebar.ts agar tidak muncul di navigasi

    
    // Bersihkan sidebar.ts dari referensi info.mdx
    const sidebarPath = path.join(apiDir, 'sidebar.ts');
    if (fs.existsSync(sidebarPath)) {
      let content = fs.readFileSync(sidebarPath, 'utf8');
      
      // Hapus block object doc yang menunjuk ke file info (biasanya item pertama)
      // Format yang akan dihapus:
      // {
      //   type: "doc",
      //   id: "version-1.0/api-qdrant/qdrant",
      // },
      content = content.replace(/\{\s*type:\s*"doc",\s*id:\s*"[^"]+",\s*\},?\s*/g, (match) => {
        // Jangan hapus jika itu endpoint biasa (tapi di docusaurus-plugin-openapi-docs, 
        // endpoint biasanya di dalam category. Info ada di level teratas sidebar)
        if (match.includes('/api-') && !match.includes('.api')) {
           return '';
        }
        return match;
      });
      
      fs.writeFileSync(sidebarPath, content);
    }
  }
}
