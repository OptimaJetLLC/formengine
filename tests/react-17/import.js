import path from "path";
import {dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createLogger} from "@react-form-builder/tests-common/lib/loader/util.cjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const nodeModulesReact = 'node_modules/react/';
const testing = 'node_modules/@testing-library'
// const localReact = path.resolve(path.join(__dirname, `./${nodeModulesReact}`));
const localTesting = path.resolve(path.join(__dirname, `./${testing}`));

const log = createLogger('|||||||||||')

export function load(url, context, defaultLoad) {
  if (url.toLowerCase().indexOf(nodeModulesReact) !== -1) {
    // log(url)
    //     return { format: 'module', source };
  }

  if (url.toLowerCase().indexOf('@testing-library') !== -1) {
    // log(url)
    //     return { format: 'module', source };
  }

  return defaultLoad(url, context);
}

export function resolve(url, context, nextResolve) {
  if (url.toLowerCase().indexOf(nodeModulesReact) !== -1) {
    log(url)
  }

  if (url.toLowerCase().indexOf('@testing-library/dom') !== -1) {
    const parts = url.split('@testing-library')
    let fn = localTesting + parts[1];
    log(url, '=>', fn)
    return nextResolve(fn)
  }

  if (url.toLowerCase().indexOf('@testing-library/react') !== -1) {
    const parts = url.split('@testing-library')
    let fn = localTesting + parts[1];
    log(url, '=>', fn)
    return nextResolve(fn)
  }

  return nextResolve(url);
}
