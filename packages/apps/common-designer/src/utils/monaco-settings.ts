import {loader} from '@monaco-editor/react'
import * as monaco from 'monaco-editor'
import DefaultWorker from 'monaco-editor/editor/editor.worker.js?worker'
import CssWorker from 'monaco-editor/language/css/css.worker.js?worker'
import HtmlWorker from 'monaco-editor/language/html/html.worker.js?worker'
import JsonWorker from 'monaco-editor/language/json/json.worker.js?worker'
import TypeScriptWorker from 'monaco-editor/language/typescript/ts.worker.js?worker'

self.MonacoEnvironment = {
  getWorker: (_, label) => {
    switch (label) {
      case 'json':
        return new JsonWorker()
      case 'css':
      case 'scss':
      case 'less':
        return new CssWorker()
      case 'html':
      case 'handlebars':
      case 'razor':
        return new HtmlWorker()
      case 'typescript':
      case 'javascript':
        return new TypeScriptWorker()
      default:
        return new DefaultWorker()
    }
  },
}

loader.config({monaco})
monaco.typescript?.typescriptDefaults.setEagerModelSync(true)
