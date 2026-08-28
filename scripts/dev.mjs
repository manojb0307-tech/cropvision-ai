/**
 * Dev helper: runs the CropVision API server (Express + Gemini)
 * and the Vite dev server together, and shuts both down on exit.
 *
 * Usage: npm run dev:full
 */
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const viteBin = path.join(__dirname, '..', 'node_modules', 'vite', 'bin', 'vite.js');

function run(command, args) {
  const child = spawn(command, args, { stdio: 'inherit' });
  child.on('error', (err) => {
    console.error(`Failed to start: ${command} ${args.join(' ')}`, err);
    process.exit(1);
  });
  return child;
}

const server = run('node', ['server/server.js']);
const vite = run(process.execPath, [viteBin, '--port=3000', '--host=0.0.0.0']);

function shutdown() {
  server.kill();
  vite.kill();
  process.exit(0);
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('exit', shutdown);
