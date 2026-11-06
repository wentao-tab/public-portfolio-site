import { spawn } from 'node:child_process';
import { createRequire } from 'node:module';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

// Invoke the project's pinned Vite+ core with the already-installed local Node.
// This avoids a second runtime download by the Vite+ environment manager.
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const cli = join(dirname(require.resolve('vite')), 'cli.js');
const child = spawn(process.execPath, [cli, 'build', '--config', 'vite.config.start.ts'], {
  cwd: root,
  stdio: 'inherit',
  env: { ...process.env, JS_RUNTIME_VERSION: process.versions.node, JS_RUNTIME_NAME: 'node', NODE_PACKAGE_MANAGER: 'vite-plus' },
});
child.on('error', error => { console.error(error.message); process.exitCode = 1; });
child.on('exit', code => { process.exitCode = code ?? 1; });
