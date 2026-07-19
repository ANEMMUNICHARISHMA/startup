import fs from 'fs';
import path from 'path';

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;

      if (fullPath.endsWith('.css')) {
        content = content.replace(/background: #1e293b;/g, 'background: var(--color-border);');
        content = content.replace(/background: #e2e8f0;/g, 'background: var(--color-border);');
        content = content.replace(/background: #334155;/g, 'background: var(--color-secondary);');
        content = content.replace(/background: #cbd5e1;/g, 'background: var(--color-secondary);');
        content = content.replace(/rgba\(15, 23, 42, 0\.7\)/g, 'rgba(27, 36, 53, 0.7)'); // #1B2435
      } else {
        content = content.replace(/dark:bg-\[#111827\]/g, 'dark:bg-surface');
        content = content.replace(/dark:bg-\[#0f172a\]/g, 'dark:bg-surface');
        content = content.replace(/dark:bg-\[#090d16\]/g, 'dark:bg-background');
        content = content.replace(/dark:bg-\[#0b0f19\]/g, 'dark:bg-background');
        content = content.replace(/dark:bg-\[#131826\]/g, 'dark:bg-surface');
        
        content = content.replace(/bg-surface dark:bg-surface/g, 'bg-surface');
        content = content.replace(/bg-background dark:bg-background/g, 'bg-background');
        
        content = content.replace(/dark:ring-\[#0f172a\]/g, 'dark:ring-background');
        content = content.replace(/dark:ring-\[#090d16\]/g, 'dark:ring-background');
        
        content = content.replace(/'#1e293b'/gi, "'var(--color-border)'");
        content = content.replace(/'#1E293B'/gi, "'var(--color-border)'");
        content = content.replace(/'#131826'/gi, "'var(--color-background)'");
        
        content = content.replace(/background: '#1e293b'/g, "background: 'var(--color-surface)'");
        content = content.replace(/color: '#f8fafc'/g, "color: 'var(--color-text)'");
      }
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDir('c:/Users/anema/Projects/startup-crm-lite/src');
