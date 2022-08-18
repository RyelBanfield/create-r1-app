#! /usr/bin/env node
/* eslint-disable no-underscore-dangle */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const runCommand = (command) => {
  try {
    execSync(`${command}`, { stdio: 'inherit' });
  } catch (error) {
    console.error(`Failed to execute ${command}`, error);
    return false;
  }
  return true;
};

console.log('Rocket is ready to launch 🚀');

const appName = process.argv[2];
const createProjectCommand = `npm create vite@latest ${appName} -- --template react-ts`;

const devDependencies = [
  '@rollup/plugin-eslint',
  '@typescript-eslint/parser',
  '@typescript-eslint/eslint-plugin',
  'autoprefixer',
  'eslint',
  'eslint-config-airbnb',
  'eslint-config-airbnb-typescript',
  'eslint-plugin-import',
  'eslint-plugin-jsx-a11y',
  'eslint-plugin-react',
  'eslint-plugin-react-hooks',
  'eslint-plugin-simple-import-sort',
  'postcss',
  'tailwindcss',
];

runCommand(createProjectCommand);
console.log('Actually, I\'ll install those deps for you. 😉');
console.log(' ');
runCommand(`cd ${appName} && npm install ${devDependencies.join(' ')} --save-dev`);
console.log(' ');

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

const rootDir = path.join(__dirname, '../root-files');

fs.readdirSync(rootDir).forEach((file) => {
  fs.copyFileSync(path.join(rootDir, file), path.join(appName, file));
});

const srcDir = path.join(__dirname, '../src-files');

fs.readdirSync(srcDir).forEach((file) => {
  fs.copyFileSync(path.join(srcDir, file), path.join(appName, `src/${file}`));
});

console.log(`All done! 🎉 You can cd into ${appName} and start coding now. 👨🏽‍💻`);
