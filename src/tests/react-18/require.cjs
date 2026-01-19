const Module = require('node:module');
const {readFileSync} = require('node:fs');
const {sep} = require('node:path');
const {join, resolve} = require('node:path');
const {createLogger} = require("@react-form-builder/tests-common/lib/loader/util.cjs");

const log = createLogger('@@@@@@@@@@@')

const nodeModulesReact = `node_modules${sep}react${sep}`;
const nodeModulesReactDom = `node_modules${sep}react-dom${sep}`;
const localReact = resolve(join(__dirname, `.${sep}${nodeModulesReact}`));
const localReactDom = resolve(join(__dirname, `.${sep}${nodeModulesReactDom}`));

let replaceReact = function (module, filename) {
  const react = filename.indexOf(nodeModulesReact) !== -1;
  const reactDom = filename.indexOf(nodeModulesReactDom) !== -1;
  let target = filename;

  if (react) {
    const part = filename.split(nodeModulesReact);
    const fn = join(localReact, part[1]);
    target = fn;
    if (target !== filename) log(`${filename} => ${fn}`);
  } else if (reactDom) {
    const part = filename.split(nodeModulesReactDom);
    const fn = join(localReactDom, part[1]);
    target = fn;
    if (target !== filename) log(`${filename} => ${fn}`);
  }

  const content = readFileSync(target, 'utf8');
  module._compile(content, filename);
};

Module._extensions['.js'] = replaceReact;
Module._extensions['.cjs'] = replaceReact;
Module._extensions['.mjs'] = replaceReact;

const oldResolve = Module._resolveFilename;

Module._resolveFilename = (path, context) => {
  if (path === 'react') {
    return localReact + '/index.js';
  }

  if (path === 'react-dom') {
    return localReactDom + '/index.js';
  }

  if (path === 'react-dom/test-utils') {
    return localReactDom + '/test-utils.js';
  }

  if (path === 'react-dom/client') {
    return localReactDom + '/client.js'
  }

  return oldResolve(path, context);
}
