import {loader} from '@monaco-editor/react'
import {fluentLanguageId} from '../../localization/consts'
import {monacoJavascriptDefaults} from './monacoJavascriptDefaults'

// todo The lines below are commented out because they do not work in the assembled npm-package
// import * as monaco from 'monaco-editor'
// import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker.js?worker'
// import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker.js?worker'
// import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker.js?worker'
// import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker.js?worker'
//
// const isDev = process.env.NODE_ENV === 'development'
// const isFirefox = navigator.userAgent.indexOf('Firefox') != -1
//
// if (!isDev || !isFirefox) {
//   self.MonacoEnvironment = {
//     getWorker(_, label) {
//       switch (label) {
//         case 'json':
//           return new jsonWorker()
//         case 'css':
//           return new cssWorker()
//         case 'typescript':
//         case 'javascript':
//           return new tsWorker()
//         default:
//           return new editorWorker()
//       }
//     },
//   }
//
//   loader.config({monaco})
// }

loader.init().then(monaco => {
  monacoJavascriptDefaults.forEach(({content, filePath}) => {
    monaco?.languages.typescript?.javascriptDefaults.addExtraLib(content, filePath)
  })
  monaco?.languages.css?.scssDefaults.setOptions({lint: {emptyRules: 'ignore'}})
  //fluent syntax reference https://projectfluent.org/fluent/guide/
  //init fluent syntax highlight
  const identifier = /[a-zA-Z-][a-zA-Z0-9_-]*/.source
  const string = /([^{}\s[\]]+)/.source
  //tab is two or four spaces
  const tab = /\s\s|\s\s\s\s/.source
  //two or four spaces
  const nonTab = /\s|\s\s\s|\s{5,}/.source
  //several spaces
  const spaces = /(\s*)/.source
  const requireNewline = /$/.source
  //variable reference {$name} | { $name } https://projectfluent.org/fluent/guide/variables.html
  const fluentVariable = `${spaces}({${spaces}[$])${string}${spaces}}`
  //fluent function start { $name -> newline required https://projectfluent.org/fluent/guide/selectors.html
  const fluentFunctionStart = `${spaces}({${spaces}[$])${string}${spaces}->${spaces}(${requireNewline})`
  //plural category [one], *[other] https://projectfluent.org/fluent/guide/selectors.html
  const pluralCategory = /\*?\[(zero|one|two|few|many|other)]/.source
  //another category [some], *[none] etc https://projectfluent.org/fluent/guide/selectors.html
  const category = `\\*?\\[${string}]`
  //quoted text {"some text"}, attention this regexp contains groups https://projectfluent.org/fluent/guide/special.html
  const quotedText = `(\\s*{\\s*")(.*)("\\s*})`

  monaco?.languages.register({id: fluentLanguageId})
  monaco?.languages.setMonarchTokensProvider(fluentLanguageId, {
    tokenizer: {
      root: [
        [`^-?${identifier}${spaces}=`, 'constant', '@value'],
        [/.*/, 'invalid']
      ],
      value: [
        //https://projectfluent.org/fluent/guide/variables.html
        [fluentVariable, 'variable'],
        //https://projectfluent.org/fluent/guide/selectors.html
        [fluentFunctionStart, 'regexp', '@function'],
        //https://projectfluent.org/fluent/guide/special.html
        [quotedText, ['variable', 'string', 'variable']],
        //new line string must be started with tab
        //https://projectfluent.org/fluent/guide/multiline.html
        [`^(${tab})${string}`, 'string'],
        [`^(${nonTab})(.*)`, 'invalid'],
        [`^${string}`, 'invalid'],
        //first line string
        [`${spaces}${string}`, 'string'],
        [/.*/, 'invalid']
      ],
      function: [
        //https://projectfluent.org/fluent/guide/variables.html
        [fluentVariable, 'variable'],
        //https://projectfluent.org/fluent/guide/selectors.html
        [fluentFunctionStart, 'regexp', '@function'],
        //https://projectfluent.org/fluent/guide/special.html
        [quotedText, ['variable', 'string', 'variable']],
        //https://projectfluent.org/fluent/guide/selectors.html
        [`${spaces}${pluralCategory}`, 'regexp'],
        [`${spaces}${category}`, 'regexp'],
        [`${spaces}${string}`, 'string'],
        [`${spaces}}`, 'regexp', '@pop'],
        [/.*/, 'invalid']
      ],
    }
  })
  monaco.editor.defineTheme('vs-extended', vsExtendedTheme as any)
})

const vsExtendedTheme = {
  base: 'vs',
  inherit: true,
  rules: [
    {
      token: 'string.fluent',
      foreground: '008000'
    },
    {
      token: 'variable.fluent',
      foreground: '1d087a'
    },
    {
      token: 'regexp.fluent',
      foreground: '1d087a'
    },
    {
      token: 'constant.fluent',
      foreground: '4978ad'
    },
  ],
  colors: {}
}
