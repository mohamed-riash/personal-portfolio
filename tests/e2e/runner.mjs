// Starts the production build on a free port, runs the end-to-end tests against it, then stops it.
// Requires an existing build: run `npm run build` first.
import { spawn } from 'node:child_process';
import { existsSync, readdirSync } from 'node:fs';
import { createServer } from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const testDir = path.join(root, 'tests', 'e2e');

if (!existsSync(path.join(root, '.next', 'BUILD_ID'))) {
  console.error('No production build found. Run `npm run build` before `npm test`.');
  process.exit(1);
}

const freePort = () =>
  new Promise((resolve, reject) => {
    const srv = createServer();
    srv.unref();
    srv.on('error', reject);
    srv.listen(0, () => {
      const { port } = srv.address();
      srv.close(() => resolve(port));
    });
  });

const port = await freePort();
const baseUrl = `http://localhost:${port}`;
const nextBin = path.join(root, 'node_modules', 'next', 'dist', 'bin', 'next');
const server = spawn(process.execPath, [nextBin, 'start', '-p', String(port)], {
  cwd: root,
  stdio: ['ignore', 'ignore', 'pipe'],
});
let serverErrors = '';
server.stderr.on('data', (chunk) => {
  serverErrors += chunk;
});

const stopServer = () => {
  if (server.exitCode === null) server.kill();
};
process.on('exit', stopServer);

const deadline = Date.now() + 30_000;
let ready = false;
while (!ready && Date.now() < deadline) {
  if (server.exitCode !== null) break;
  try {
    ready = (await fetch(baseUrl)).ok;
  } catch {
    await new Promise((r) => setTimeout(r, 300));
  }
}
if (!ready) {
  console.error(`Production server did not start on ${baseUrl}.\n${serverErrors}`);
  stopServer();
  process.exit(1);
}

const testFiles = readdirSync(testDir)
  .filter((f) => f.endsWith('.test.mjs'))
  .map((f) => path.join(testDir, f));

const tests = spawn(process.execPath, ['--test', '--test-reporter=spec', ...testFiles], {
  cwd: root,
  stdio: 'inherit',
  env: { ...process.env, BASE_URL: baseUrl },
});
const code = await new Promise((resolve) => tests.on('close', resolve));
stopServer();
process.exit(code ?? 1);
