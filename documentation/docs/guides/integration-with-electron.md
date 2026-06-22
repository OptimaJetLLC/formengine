---
sidebar_position: 20
title: Integration with Electron
description: How to run FormEngine in Electron and connect the Monaco editor locally, without CDN.
slug: /integration-with-electron
---

# Integration with Electron

## Overview

In this article, we will run FormEngine inside [Electron](https://www.electronjs.org/), and also make
the [Monaco editor](https://microsoft.github.io/monaco-editor/) work locally, without CDN.

## Bootstrap application

We will use [electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate) to create our simple
Electron application. Open your shell and execute the following commands:

```bash
git clone --depth 1 --branch main https://github.com/electron-react-boilerplate/electron-react-boilerplate.git electron-formengine
cd electron-formengine
npm install
```

Now you can run application by executing following command:

```bash
npm run start
```

![Electron FormEngine](/assets/guides/integration-with-electron/integration-with-electron-01.png)

## Installing FormEngine

Let's install the packages, run the following commands:

```bash
npm install @react-form-builder/designer @react-form-builder/components-rsuite
npm install
```

Now change the contents of the `App.tsx` file:

```typescript jsx title='src/renderer/App.tsx'
import React from 'react'
import {BuilderView, FormBuilder} from '@react-form-builder/designer'

const builderView = new BuilderView([])

function App() {
  return <FormBuilder view={builderView}/>
}

export default App
```

Great, now you can launch the application and see the error loading the Monaco scripts:

```bash
npm run start
```

![Electron FormEngine](/assets/guides/integration-with-electron/integration-with-electron-02.png)

The thing is that the Monaco editor is set to download from CDN by default. Let's change this behavior.

## Monaco settings

First of all, we need to add settings to load the Monaco editor from the local NPM package. Create a file `src/renderer/monaco-settings.ts`
with the following contents:

```typescript jsx title='src/renderer/monaco-settings.ts'
import * as monaco from 'monaco-editor';
import {loader} from '@monaco-editor/react';

// eslint-disable-next-line no-restricted-globals
self.MonacoEnvironment = {
  getWorkerUrl: (_, label) => {
    if (label === 'json') {
      return './json.worker.bundle.js';
    }
    if (label === 'css' || label === 'scss' || label === 'less') {
      return './css.worker.bundle.js';
    }
    if (label === 'html' || label === 'handlebars' || label === 'razor') {
      return './html.worker.bundle.js';
    }
    if (label === 'typescript' || label === 'javascript') {
      return './ts.worker.bundle.js';
    }
    return './editor.worker.bundle.js';
  },
};

loader.config({monaco});
```

FormEngine is using JavaScript code actions, which violates the CSP policies defined in the `src/renderer/index.ejs` file. Remove the `meta`
tag for "Content-Security-Policy" and your file will look like this:

```html title='src/renderer/index.ejs'
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>Hello Electron React!</title>
</head>
<body>
<div id="root"></div>
</body>
</html>
```

Now let's add the use of `monaco-settings` to `App.tsx`, and add the components. Change the contents of `App.tsx` to the following:

```typescript jsx title='src/renderer/App.tsx' {1}
import './monaco-settings';
import React from 'react';
import {BuilderView, FormBuilder} from '@react-form-builder/designer';
import {rSuiteComponents} from '@react-form-builder/components-rsuite';

const components = rSuiteComponents.map((c) => c.build());
const builderView = new BuilderView(components);

export default function App() {
  return (
    <div style={{width: '97vw', height: '97vh'}}>
      <FormBuilder view={builderView}/>
    </div>
  );
}
```

### Using monaco-editor-webpack-plugin

Starting with version 8.0.0, we recommend using
the [monaco-editor-webpack-plugin](https://www.npmjs.com/package/monaco-editor-webpack-plugin).

```typescript title='.erb/configs/webpack.config.base.ts' {2,15-17}
import webpack from 'webpack';
import path from 'path';
import TsconfigPathsPlugins from 'tsconfig-paths-webpack-plugin';
import webpackPaths from './webpack.paths';

const configuration: webpack.Configuration = {
  //...

  /**
   * Determine the array of extensions that should be used to resolve modules.
   */
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    modules: [webpackPaths.srcPath, 'node_modules'],
    alias: {
      'monaco-editor$': path.resolve(webpackPaths.rootPath, 'node_modules/monaco-editor/esm/vs/editor/editor.api.js'),
    },
    // There is no need to add aliases here, the paths in tsconfig get mirrored
    plugins: [new TsconfigPathsPlugins()],
  },

  // ...
};
```

```typescript title='.erb/configs/webpack.config.renderer.dev.ts' {10,19-21}
import 'webpack-dev-server';
import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import chalk from 'chalk';
import { merge } from 'webpack-merge';
import { execSync, spawn } from 'child_process';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import MonacoEditorWebpackPlugin from 'monaco-editor-webpack-plugin';
import baseConfig from './webpack.config.base';
import webpackPaths from './webpack.paths';
import checkNodeEnv from '../scripts/check-node-env';

const configuration: webpack.Configuration = {
  // ...
  plugins: [
    // ...
    new MonacoEditorWebpackPlugin({
      languages: ['json', 'css', 'html', 'typescript', 'javascript'],
    }),
  ],
  // ...
};
```

```typescript title='.erb/configs/webpack.config.renderer.prod.ts' {10,19-21}
import 'webpack-dev-server';
import path from 'path';
import fs from 'fs';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import chalk from 'chalk';
import { merge } from 'webpack-merge';
import { execSync, spawn } from 'child_process';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import MonacoEditorWebpackPlugin from 'monaco-editor-webpack-plugin';
import baseConfig from './webpack.config.base';
import webpackPaths from './webpack.paths';
import checkNodeEnv from '../scripts/check-node-env';

const configuration: webpack.Configuration = {
  // ...
  plugins: [
    // ...
    new MonacoEditorWebpackPlugin({
      languages: ['json', 'css', 'html', 'typescript', 'javascript'],
    }),
  ],
  // ...
};
```

### Without monaco-editor-webpack-plugin


The last bit is fixing the webpack configuration files to package Monaco workers. You can find many examples of how to do this in
the official [Monaco repository](https://github.com/microsoft/monaco-editor/tree/main/samples). Take a look at
this [example](https://github.com/microsoft/monaco-editor/blob/main/samples/electron-esm-webpack/webpack.config.js).

Open `.erb/configs/webpack.config.renderer.dev.ts` and change `entry` to the highlighted one, also change `output.filename` as below:

```javascript title='.erb/configs/webpack.config.renderer.dev.ts' {3-12,17}
const configuration: webpack.Configuration = {
  //...
  entry: {
    client: `webpack-dev-server/client?http://localhost:${port}/dist`,
    devServer: 'webpack/hot/only-dev-server',
    renderer: path.join(webpackPaths.srcRendererPath, 'index.tsx'),
    'editor.worker': 'monaco-editor/esm/vs/editor/editor.worker.js',
    'json.worker': 'monaco-editor/esm/vs/language/json/json.worker',
    'css.worker': 'monaco-editor/esm/vs/language/css/css.worker',
    'html.worker': 'monaco-editor/esm/vs/language/html/html.worker',
    'ts.worker': 'monaco-editor/esm/vs/language/typescript/ts.worker',
  },

  output: {
    path: webpackPaths.distRendererPath,
    publicPath: '/',
    filename: '[name].bundle.js',
    library: {
      type: 'umd',
    },
  },
  //...
};
```

Now let's add similar changes to the `.erb/configs/webpack.config.renderer.prod.ts` file - change `entry` and `output.filename`:

```javascript title='.erb/configs/webpack.config.renderer.prod.ts' {3-10,15}
const configuration: webpack.Configuration = {
  //...
  entry: {
    renderer: path.join(webpackPaths.srcRendererPath, 'index.tsx'),
    'editor.worker': 'monaco-editor/esm/vs/editor/editor.worker.js',
    'json.worker': 'monaco-editor/esm/vs/language/json/json.worker',
    'css.worker': 'monaco-editor/esm/vs/language/css/css.worker',
    'html.worker': 'monaco-editor/esm/vs/language/html/html.worker',
    'ts.worker': 'monaco-editor/esm/vs/language/typescript/ts.worker',
  },

  output: {
    path: webpackPaths.distRendererPath,
    publicPath: './',
    filename: '[name].bundle.js',
    library: {
      type: 'umd',
    },
  },
  //...
};
```

## Running application

Launch the application using the command:

```bash
npm run start
```

You will see something similar to what is shown in the screenshot below (the CSP warning only exists in development mode):

![Electron FormEngine](/assets/guides/integration-with-electron/integration-with-electron-03.png)

Go to the "Settings" tab in the left panel and click "Add a code action" button. The code editor has successfully loaded:

![Electron FormEngine](/assets/guides/integration-with-electron/integration-with-electron-04.png)

## Building for production

To package the application for production run the command:

```bash
npm run package
```

You can find the binaries for your platform in the `release/build` folder. For example, for macOS this would be `release/build/mac-arm64`.

Let's check how the CSS editor works. Select the "Screen" component, and then open the "Style" tab in the right pane. Start typing text in
the code editor, notice that IntelliSense is working:

![Electron FormEngine](/assets/guides/integration-with-electron/integration-with-electron-05.png)

## Conclusion

Packaging a FormEngine application in Electron is not much different from packaging any other React application, only packaging the Monaco
editor can cause difficulties. We hope this article will help you save your time. 
