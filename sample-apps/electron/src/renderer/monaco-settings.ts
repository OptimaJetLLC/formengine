import * as monaco from 'monaco-editor';
import {loader} from '@monaco-editor/react';

// eslint-disable-next-line no-restricted-globals
self.MonacoEnvironment = {
  getWorkerUrl: (_, label) => {
    if (label === 'json') {
      return './json.worker.js';
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return './css.worker.js';
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return './html.worker.js';
    }
    if (label === 'typescript' || label === 'javascript') {
      return './ts.worker.js';
    }
    return './editor.worker.js';
  },
};

loader.config({monaco});