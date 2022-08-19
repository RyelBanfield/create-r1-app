#! /usr/bin/env node

import chalk from 'chalk';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const { log, error } = console;

const runCommand = (command) => {
  try {
    execSync(`${command}`, { stdio: 'inherit' });
  } catch (err) {
    error(`Failed to execute ${command}`, err);
    return false;
  }
  return true;
};

log(chalk.red('Rocket is ready to launch 🚀'));

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
log('Actually, I\'ll install those deps for you 😉');
log(' ');
runCommand(`cd ${appName} && npm install ${devDependencies.join(' ')} --save-dev`);
log(' ');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '../root-files');
const srcDir = path.join(__dirname, '../src-files');

fs.readdirSync(rootDir).forEach((file) => {
  fs.copyFileSync(path.join(rootDir, file), path.join(appName, file));
});

fs.readdirSync(srcDir).forEach((file) => {
  fs.copyFileSync(path.join(srcDir, file), path.join(appName, `src/${file}`));
});

runCommand(`cd ${appName} && rm src/App.css`);

log(`${chalk.green('All done! 🎉 ')}You can ${chalk.blue('cd ')}into ${chalk.blue(`${appName} `)}and start coding ${chalk.red('now 👨🏽‍💻')}`);
