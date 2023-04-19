import {loader} from '@monaco-editor/react'
import {ActionEventArgsDeclaration, FormDeclaration} from 'fb-core'
import * as monaco from 'monaco-editor'
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

const isDev = process.env.NODE_ENV === 'development'
const isFirefox = navigator.userAgent.indexOf('Firefox') != -1

if (!isDev || !isFirefox) {
  self.MonacoEnvironment = {
    getWorker(_, label) {
      switch (label) {
        case 'json':
          return new jsonWorker()
        case 'css':
          return new cssWorker()
        case 'typescript':
        case 'javascript':
          return new tsWorker()
        default:
          return new editorWorker()
      }
    },
  }

  loader.config({monaco})
}

loader.init().then(monaco => {
  monaco?.languages.typescript?.javascriptDefaults.addExtraLib(ActionEventArgsDeclaration, 'ActionEventArgs')
  monaco?.languages.typescript?.javascriptDefaults.addExtraLib(FormDeclaration, 'Form')
})
