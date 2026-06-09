const fs = require('fs');

const filePath = '/home/abil/final_asp/website-dokumentasi/versioned_docs/version-1.0/01-knowledge-base/instalation-guide-3dolphin.md';
let content = fs.readFileSync(filePath, 'utf8');

// The file is badly formatted due to CMS Rich Text editor destroying newlines.
// To fix the immediate build error so Vercel can deploy, we must escape < and { that are causing MDX crashes.
// And fix the code blocks.

content = content.replace(/```bash/g, '\n```bash\n');
content = content.replace(/```/g, '\n```\n');
content = content.replace(/<Enter Temporary Password>/g, '\\<Enter Temporary Password\\>');
content = content.replace(/\{user\}/g, '\\{user\\}');
content = content.replace(/\{password\}/g, '\\{password\\}');
content = content.replace(/\{server tetangga nya \(jika ada\)\}/g, '\\{server tetangga nya (jika ada)\\}');
content = content.replace(/\{DNS Customer\}/g, '\\{DNS Customer\\}');
content = content.replace(/\{server third party untuk integrasi\}/g, '\\{server third party untuk integrasi\\}');

fs.writeFileSync(filePath, content, 'utf8');
console.log("Fixed markdown syntax");
