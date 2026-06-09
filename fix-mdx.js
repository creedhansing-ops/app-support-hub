const fs = require('fs');

const filePath = '/home/abil/final_asp/website-dokumentasi/versioned_docs/version-1.0/01-knowledge-base/instalation-guide-3dolphin.md';
let content = fs.readFileSync(filePath, 'utf8');

const replacements = [
  { from: '<Enter Temporary Password>', to: '\\<Enter Temporary Password\\>' },
  { from: '{server tetangga nya (jika ada)}', to: '\\{server tetangga nya (jika ada)\\}' },
  { from: '{DNS Customer}', to: '\\{DNS Customer\\}' },
  { from: '{server third party untuk integrasi}', to: '\\{server third party untuk integrasi\\}' },
  { from: '{user}', to: '\\{user\\}' },
  { from: '{password}', to: '\\{password\\}' }
];

replacements.forEach(r => {
  content = content.split(r.from).join(r.to);
});

// Fix broken code blocks if they exist
content = content.replace(/```bashsystemctl/g, '```bash\nsystemctl');
content = content.replace(/```bashnet/g, '```bash\nnet');
content = content.replace(/```bashdnf/g, '```bash\ndnf');
content = content.replace(/```bash/g, '```bash\n');

fs.writeFileSync(filePath, content, 'utf8');
console.log("Fixed markdown syntax again");
