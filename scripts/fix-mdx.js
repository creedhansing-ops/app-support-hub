const fs = require('fs');
const path = require('path');

const directoriesToScan = ['docs', 'versioned_docs', 'blog', 'src/pages'];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let originalContent = content;
  
  // Regex untuk mencari autolinks markdown seperti <https://example.com> atau <http://example.com>
  // Docusaurus MDX parser akan error jika melihat angle brackets yang berisi karakter '/'
  // Jadi kita ubah menjadi standar markdown link: [https://example.com](https://example.com)
  content = content.replace(/<(https?:\/\/[^>]+)>/g, '[$1]($1)');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`[MDX-Fixer] Fixed autolinks in: ${filePath}`);
  }
}

function scanDirectory(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDirectory(fullPath);
    } else if (fullPath.endsWith('.md') || fullPath.endsWith('.mdx')) {
      try {
        processFile(fullPath);
      } catch (err) {
        console.error(`[MDX-Fixer] Error processing file ${fullPath}:`, err);
      }
    }
  }
}

console.log('[MDX-Fixer] Scanning markdown files for invalid angle bracket autolinks...');
directoriesToScan.forEach(dir => scanDirectory(path.join(__dirname, '..', dir)));
console.log('[MDX-Fixer] Scan complete.');
