import Editor, {loader} from '@monaco-editor/react'
import * as monaco from 'monaco-editor'
import {fluentLanguageId} from '../../localization/consts'
import {monacoJavascriptDefaults} from './monacoJavascriptDefaults'

const vsExtendedTheme = {
  base: 'vs',
  inherit: true,
  rules: [
    {
      token: 'string.fluent',
      foreground: '008000',
    },
    {
      token: 'variable.fluent',
      foreground: '1d087a',
    },
    {
      token: 'regexp.fluent',
      foreground: '1d087a',
    },
    {
      token: 'constant.fluent',
      foreground: '4978ad',
    },
  ],
  colors: {
    'editor.background': '#f7f7fa',
  },
}

if (!import.meta.env.PROD) {
  const toWorkerUrl = (label: string) => {
    switch (label) {
      case 'json':
        return new URL('monaco-editor/language/json/json.worker.js', import.meta.url)
      case 'css':
      case 'scss':
      case 'less':
        return new URL('monaco-editor/language/css/css.worker.js', import.meta.url)
      case 'html':
      case 'handlebars':
      case 'razor':
        return new URL('monaco-editor/language/html/html.worker.js', import.meta.url)
      case 'typescript':
      case 'javascript':
        return new URL('monaco-editor/language/typescript/ts.worker.js', import.meta.url)
      default:
        return new URL('monaco-editor/editor/editor.worker.js', import.meta.url)
    }
  }

  self.MonacoEnvironment = {
    getWorker: (_, label) => {
      const workerUrl = toWorkerUrl(label)
      return new Worker(workerUrl, {name: label, type: 'module'})
    },
  }

  loader.config({monaco})
  monaco.typescript?.typescriptDefaults.setEagerModelSync(true)
}

loader.init().then(() => {
  monacoJavascriptDefaults.forEach(({content, filePath}) => {
    monaco.typescript?.javascriptDefaults.addExtraLib(content, filePath)
  })
  monaco.css?.scssDefaults.setOptions({lint: {emptyRules: 'ignore'}})
  monaco.css?.cssDefaults.setOptions({lint: {emptyRules: 'ignore'}})
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
        [/.*/, 'invalid'],
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
        [/.*/, 'invalid'],
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
        [/.*/, 'invalid'],
      ],
    },
  })
  monaco.editor.defineTheme('vs-extended', vsExtendedTheme as any)
})

export const MonacoCodeEditor = Editor
