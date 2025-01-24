// import path from "path";
// import { dirname } from 'node:path';
// import { fileURLToPath } from 'node:url';
import {createLogger} from "@react-form-builder/tests-common/lib/loader/util.cjs";

// const __dirname = dirname(fileURLToPath(import.meta.url));
const nodeModulesReact = 'node_modules/react/';
// const localReact = path.resolve(path.join(__dirname, `./${nodeModulesReact}`));

const log = createLogger('|||||||||||')


export function load(url, context, defaultLoad) {
  if (url.toLowerCase().indexOf(nodeModulesReact) !== -1) {
    // log(url)
    //     return { format: 'module', source };
  }

  return defaultLoad(url, context);
}

export function resolve(url, context, nextResolve) {
  if (url.toLowerCase().indexOf(nodeModulesReact) !== -1) {
    log(url)
  }

  return nextResolve(url);
}
