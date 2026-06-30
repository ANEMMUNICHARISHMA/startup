import fs from 'fs';
import path from 'path';

const analyticsDir = 'c:\\Users\\anema\\Projects\\startup-crm-lite\\src\\components\\analytics';
const analyticsPage = 'c:\\Users\\anema\\Projects\\startup-crm-lite\\src\\pages\\Analytics.jsx';

const replacements = [
  { from: /bg-\[#0B0F19\]/g, to: 'bg-slate-50 dark:bg-[#0B0F19]' },
  { from: /bg-\[#131826\]/g, to: 'bg-white dark:bg-[#131826]' },
  { from: /border-\[#1F2937\]/g, to: 'border-slate-200 dark:border-[#1F2937]' },
  { from: /bg-\[#1F2937\]/g, to: 'bg-slate-200 dark:bg-[#1F2937]' },
  { from: /text-slate-100/g, to: 'text-slate-900 dark:text-slate-100' },
  { from: /text-white/g, to: 'text-slate-900 dark:text-white' },
];

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;
  
  for (const { from, to } of replacements) {
    newContent = newContent.replace(from, to);
  }
  
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log(`Updated ${filePath}`);
  }
}

// Process components
const files = fs.readdirSync(analyticsDir);
for (const file of files) {
  if (file.endsWith('.jsx')) {
    processFile(path.join(analyticsDir, file));
  }
}

// Process page
processFile(analyticsPage);
console.log('Done');
