const fs = require('fs');
const path = require('path');

const dirs = [
  '/home/abil/final_asp/website-dokumentasi/docs/03-client-infrastructure',
  '/home/abil/final_asp/website-dokumentasi/versioned_docs/version-1.0/03-client-infrastructure'
];

for (const dir of dirs) {
  if (fs.existsSync(dir)) {
    const clients = fs.readdirSync(dir).filter(f => fs.statSync(path.join(dir, f)).isDirectory());
    for (const client of clients) {
      const clientDir = path.join(dir, client);
      const files = fs.readdirSync(clientDir).filter(f => f.endsWith('.md') || f.endsWith('.mdx'));
      for (const file of files) {
        const filePath = path.join(clientDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Check if client_name already exists
        if (!content.includes('client_name:')) {
          // Add client_name to frontmatter
          content = content.replace(/^---\n/, `---\nclient_name: ${client}\n`);
          fs.writeFileSync(filePath, content, 'utf8');
          console.log(`Updated ${filePath}`);
        }
      }
    }
  }
}
