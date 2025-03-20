const Module = require('module');
const {readFileSync} = require('fs');
const {sep} = require('path');
const {join, resolve} = require('path');
const {createLogger} = require("@react-form-builder/tests-common/lib/loader/util.cjs");

const log = createLogger('@@@@@@@@@@@')

const nodeModulesReact = `node_modules${sep}react${sep}`;
const nodeModulesReactDom = `node_modules${sep}react-dom${sep}`;
const localReact = resolve(join(__dirname, `.${sep}${nodeModulesReact}`));
const localReactDom = resolve(join(__dirname, `.${sep}${nodeModulesReactDom}`));


const nodeModulesReactTestingDom = 'node_modules/@testing-library/dom/';
const nodeModulesReactTestingReact = 'node_modules/@testing-library/react/';
const nodeModulesReactTestingJest = 'node_modules/@testing-library/jest-dom/';
const nodeModulesSched = 'node_modules/scheduler';
const localReactTestingDom = resolve(join(__dirname, `./${nodeModulesReactTestingDom}`));
const localReactTestingReact = resolve(join(__dirname, `./${nodeModulesReactTestingReact}`));
const localReactTestingJest = resolve(join(__dirname, `./${nodeModulesReactTestingJest}`));
const localSched = resolve(join(__dirname, `./${nodeModulesSched}`));


let replaceReact = function (module, filename) {
  const react = filename.indexOf(nodeModulesReact) !== -1;
  const reactDom = filename.indexOf(nodeModulesReactDom) !== -1;
  const testingDom = filename.indexOf(nodeModulesReactTestingDom) !== -1;
  const testingReact = filename.indexOf(nodeModulesReactTestingReact) !== -1;
  const testingJest = filename.indexOf(nodeModulesReactTestingJest) !== -1;
  let target = filename

  if (react) {
    const part = filename.split(nodeModulesReact);
    const fn = join(localReact, part[1])
    target = fn
    if (target !== filename) log(`${filename} => ${fn}`);
  } else if (reactDom) {
    const part = filename.split(nodeModulesReactDom);
    const fn = join(localReactDom, part[1])
    target = fn
    if (target !== filename) log(`${filename} => ${fn}`);
  } else if (testingReact) {
    const part = filename.split(nodeModulesReactTestingReact);
    const fn = join(localReactTestingReact, part[1])
    target = fn
    if (target !== filename) log(`${filename} => ${fn}`);
  } else if (testingDom) {
    const part = filename.split(nodeModulesReactTestingDom);
    const fn = join(localReactTestingDom, part[1])
    target = fn
    if (target !== filename) log(`${filename} => ${fn}`);
  } else if (testingJest) {
    const part = filename.split(nodeModulesReactTestingJest);
    const fn = join(localReactTestingJest, part[1])
    target = fn
    if (target !== filename) log(`${filename} => ${fn}`);
  }

  const content = readFileSync(target, 'utf8');

  module._compile(content, filename);
};

Module._extensions['.js'] = replaceReact
Module._extensions['.cjs'] = replaceReact
Module._extensions['.mjs'] = replaceReact

const oldResolve = Module._resolveFilename;

Module._resolveFilename = (path, context) => {
  if (path === 'react') {
    return localReact + '/index.js'
  }

  if (path === 'react-dom') {
    return localReactDom + '/index.js'
  }

  if (path === 'react-dom/test-utils') {
    return localReactDom + '/test-utils.js'
  }

  if (path === 'react-dom/client') {
    return localReactDom + '/index.js'
  }

  if (path === 'scheduler/tracing') {
    return localSched + '/tracing.js'
  }

  // if(path.indexOf('@testing-library/dom') > -1) {
  //   log('11111111111', path, localReactTestingDom)
  //   return localReactTestingDom + '/dist/index.js'
  // }

  // if(path.indexOf('@testing-library/react') > -1) {
  //   log('11111111111', path, localReactTestingReact)
  //   return localReactTestingReact + '/dist/index.js'
  // }

  // if(path.indexOf('react') !== -1) {
  //   log(path)
  // }

  return oldResolve(path, context)
}
