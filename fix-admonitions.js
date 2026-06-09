const fs = require('fs');
const glob = require('glob');
const path = require('path');

const dir = '/home/abil/final_asp/website-dokumentasi';

// We don't have glob installed globally maybe, let's just use an array of known files
const files = [
  'docs/01-knowledge-base/01-common-errors.md',
  'docs/03-client-infrastructure/bank-bca/topology.md',
  'docs/03-client-infrastructure/bank-bca/server-spec.md',
  'docs/03-client-infrastructure/bank-mandiri/topology.md',
  'docs/03-client-infrastructure/bank-mandiri/server-spec.md',
  'versioned_docs/version-1.0/01-knowledge-base/01-common-errors.md',
  'versioned_docs/version-1.0/03-client-infrastructure/bank-mandiri/topology.md',
  'versioned_docs/version-1.0/03-client-infrastructure/bank-mandiri/server-spec.md',
  'versioned_docs/version-1.0/03-client-infrastructure/bank-bca/topology.md',
  'versioned_docs/version-1.0/03-client-infrastructure/bank-bca/server-spec.md',
  'versioned_docs/version-1.0/03-client-infrastructure/bank-mandiri/topology-drawio.md',
  'scripts/scaffold-client.js'
];

for (const f of files) {
  const fullPath = path.join(dir, f);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    const newContent = content.replace(/^:::(info|warning|danger|note|tip)\s+([^\[\]\n]+)$/gm, ':::$1[$2]');
    if (content !== newContent) {
      fs.writeFileSync(fullPath, newContent, 'utf8');
      console.log(`Updated ${f}`);
    }
  }
}
