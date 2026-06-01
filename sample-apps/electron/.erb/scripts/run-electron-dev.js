/**
 * Starts Electron for local development and restarts when the main/preload bundles change.
 * electronmon is not used because its --require hook breaks Chromium shared memory on Electron 35+.
 */
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const electronPath = require('electron');
const root = path.resolve(__dirname, '../..');
const watchFiles = [
  path.join(root, '.erb/dll/main.bundle.dev.js'),
  path.join(root, '.erb/dll/preload.bundle.dev.js'),
];

/** Must be set before Chromium starts; appendSwitch in main.ts is too late. */
const linuxChromiumFlags =
  process.platform === 'linux' ? ['--no-sandbox', '--disable-dev-shm-usage'] : [];

let child;
let restartTimer;
let readyToRestart = false;

function startElectron() {
  if (child) {
    child.kill('SIGTERM');
  }

  child = spawn(electronPath, ['.', ...linuxChromiumFlags, ...process.argv.slice(2)], {
    cwd: root,
    stdio: 'inherit',
    env: { ...process.env, NODE_ENV: 'development' },
  });
}

function scheduleRestart() {
  clearTimeout(restartTimer);
  restartTimer = setTimeout(startElectron, 500);
}

startElectron();

// Avoid restarting while webpack is writing the initial bundles.
setTimeout(() => {
  readyToRestart = true;
}, 2000);

for (const file of watchFiles) {
  fs.watch(file, () => {
    if (readyToRestart) {
      scheduleRestart();
    }
  });
}

process.on('SIGTERM', () => {
  if (child) {
    child.kill('SIGTERM');
  }
  process.exit(0);
});
