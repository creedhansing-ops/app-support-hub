const fs = require('fs');

const inputFile = '/home/abil/final_asp/Gudang Garam 1a4acf6afd358069abeee0882c77ff80.md';
const outputFile = '/home/abil/final_asp/website-dokumentasi/versioned_docs/version-1.0/01-knowledge-base/instalation-guide-3dolphin.md';

let lines = fs.readFileSync(inputFile, 'utf8').split('\n');
let newLines = [];
let inTable = false;
let currentRow = '';

for (let i = 0; i < lines.length; i++) {
  let line = lines[i];
  
  // Escape MDX special characters if not inside backticks (simple heuristic)
  // We'll just replace the specific ones known to cause issues
  line = line.replace(/<Enter Temporary Password>/g, '\\<Enter Temporary Password\\>');
  line = line.replace(/\{user\}/g, '\\{user\\}');
  line = line.replace(/\{password\}/g, '\\{password\\}');
  line = line.replace(/\{server tetangga nya \(jika ada\)\}/g, '\\{server tetangga nya (jika ada)\\}');
  line = line.replace(/\{DNS Customer\}/g, '\\{DNS Customer\\}');
  line = line.replace(/\{server third party untuk integrasi\}/g, '\\{server third party untuk integrasi\\}');

  if (line.trim().startsWith('|')) {
    if (!inTable) {
      inTable = true;
    }
    
    if (currentRow !== '') {
      newLines.push(currentRow);
    }
    currentRow = line;
  } else {
    if (inTable) {
      // Check if table has ended
      if (line.trim().startsWith('## ') || line.trim().startsWith('### ') || line.trim().startsWith('- Execute') || line.trim().startsWith('We recommend')) {
        inTable = false;
        if (currentRow !== '') {
          newLines.push(currentRow);
          currentRow = '';
        }
        newLines.push(line);
      } else {
        // It's a continuation of the table cell
        if (currentRow !== '') {
          currentRow += '<br/>' + line;
        } else {
          newLines.push(line);
        }
      }
    } else {
      newLines.push(line);
    }
  }
}

if (currentRow !== '') {
  newLines.push(currentRow);
}

// Add Docusaurus Frontmatter
const frontmatter = `---
id: installation-guide
title: Instalation Guide 3dolphin
sidebar_position: 2
---
`;

fs.writeFileSync(outputFile, frontmatter + newLines.join('\n'), 'utf8');
console.log("Successfully fixed tables and wrote to destination!");
