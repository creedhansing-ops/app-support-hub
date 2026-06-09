const fs = require('fs');

const filePath = '/home/abil/final_asp/website-dokumentasi/versioned_docs/version-1.0/01-knowledge-base/instalation-guide-3dolphin.md';
let content = fs.readFileSync(filePath, 'utf8');

// Fix MDX import/export crash by wrapping line-start "export " inside backticks
content = content.replace(/^export\b/gm, '`export`');

// Save the file
fs.writeFileSync(filePath, content, 'utf8');
console.log("Fixed export crash");
