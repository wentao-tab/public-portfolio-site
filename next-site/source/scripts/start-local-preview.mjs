import { spawn } from 'node:child_process';
import { closeSync, mkdirSync, openSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const runtime = join(root, '.local-runtime');
const url = 'http://127.0.0.1:13998/zh-cn/watch';
async function healthy() {
  try {
    const responses = await Promise.all([
      fetch(url, { signal: AbortSignal.timeout(1500) }),
      fetch('http://127.0.0.1:13998/api/health', { signal: AbortSignal.timeout(1500) }),
    ]);
    const ok = responses.every(response => response.ok);
    await Promise.all(responses.map(response => response.body?.cancel()));
    return ok;
  } catch { return false; }
}

if (await healthy()) {
  console.log(`本地预览已在运行：${url}`);
} else {
  mkdirSync(runtime, { recursive: true });
  const logFile = join(runtime, 'preview-background.log');
  const log = openSync(logFile, 'a');
  let child;
  try {
    child = spawn(process.execPath, [join(root, 'scripts/local-preview.mjs')], {
      cwd: root, detached: true, stdio: ['ignore', log, log], env: process.env,
    });
    await new Promise((done, reject) => { child.once('spawn', done); child.once('error', reject); });
  } finally { closeSync(log); }
  writeFileSync(join(root, 'local-preview.pid'), String(child.pid));
  child.unref();
  const start = Date.now();
  let ready = false;
  while (Date.now() - start < 45000) {
    if (await healthy()) { ready = true; break; }
    await new Promise(done => setTimeout(done, 400));
  }
  if (!ready) {
    console.error(`启动未完成，请查看日志：${logFile}`);
    process.exitCode = 1;
  } else {
    console.log(`本地预览已恢复：${url}\n后台 PID：${child.pid}\n关闭启动窗口不会停止服务。\n停止服务：kill ${child.pid}`);
  }
}
