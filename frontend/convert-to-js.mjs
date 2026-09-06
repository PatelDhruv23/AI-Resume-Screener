import { readFileSync, writeFileSync, unlinkSync, readdirSync, statSync } from 'fs';
import { join, extname, dirname, basename } from 'path';
import { transformSync } from '@babel/core';

const SRC_DIR = './src';
const ROOT_DIR = '.';

function getAllFiles(dir, files = []) {
  const entries = readdirSync(dir);
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      if (entry === 'node_modules' || entry === '.git') continue;
      getAllFiles(fullPath, files);
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

// Get all .tsx and .ts files
const allFiles = getAllFiles(SRC_DIR);
const viteConfig = 'vite.config.ts';

const tsFiles = allFiles.filter(f => /\.(tsx?|ts)$/.test(f));
// Also add vite.config.ts
tsFiles.push(viteConfig);

console.log(`Found ${tsFiles.length} TypeScript files to convert:\n`);

for (const filePath of tsFiles) {
  const ext = extname(filePath);
  const newExt = ext === '.tsx' ? '.jsx' : '.js';
  const newPath = filePath.replace(/\.tsx?$/, newExt);
  
  console.log(`Converting: ${filePath} -> ${newPath}`);
  
  const code = readFileSync(filePath, 'utf8');
  
  try {
    const result = transformSync(code, {
      filename: filePath,
      presets: [
        ['@babel/preset-typescript', { isTSX: ext === '.tsx', allExtensions: true }]
      ],
      retainLines: true,
    });
    
    // Fix import paths: change .tsx imports to .jsx, .ts to .js
    let output = result.code;
    // Remove any remaining "use client" since it's not needed in plain React
    // Actually keep it, it doesn't hurt and some tools use it
    
    writeFileSync(newPath, output, 'utf8');
    
    // Delete the original .ts/.tsx file (only if different path)
    if (newPath !== filePath) {
      unlinkSync(filePath);
      console.log(`  Deleted: ${filePath}`);
    }
  } catch (err) {
    console.error(`  ERROR converting ${filePath}: ${err.message}`);
  }
}

console.log('\nDone! All TypeScript files converted to JavaScript.');
