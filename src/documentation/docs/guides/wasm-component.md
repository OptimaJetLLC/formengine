---
sidebar_position: 40
title: Adding WASM component
description: Guide to connecting the WASM component
slug: /adding-wasm-component
---

# Adding WASM component

:::info

You can find the ready-to-connect component in
the [@react-form-builder/components-fast-qr](https://www.npmjs.com/package/@react-form-builder/components-fast-qr) NPM package.
You can find information on connecting the component in [this section](/formengine-designer/components/qr-code).

:::

## Overview

[WebAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly) is a popular technology that is becoming more and more popular on the
Internet. Let's see how you can connect a WASM (WebAssembly) component to FormEngine.

Currently, WASM components use JavaScript helper code to work with the DOM. So we will take a component that already has this code.

In this article we will connect a component that generates a QR code from the [fast_qr](https://www.npmjs.com/package/fast_qr) library. The
author of the library claims that it is a very fast generator. The library is written in [Rust](https://www.rust-lang.org/), compiled in
WASM, and has TypeScript type definitions. A great set of technologies. Well, let's get started!

## Bootstrapping application

Let's create a React application, we will use [Vite](https://vitejs.dev/), open the console and run the following commands:

```bash
npm create vite@latest my-react-app -- --template react-ts
cd my-react-app
npm install
npm run dev
```

OK, now stop the application and install the FormEngine dependencies (see this [article](https://formengine.io/documentation/installation)
for details):

```bash
npm install @react-form-builder/core @react-form-builder/designer @react-form-builder/components-rsuite
```

Let's remove the default styles from `src/main.tsx`, your `main.tsx` will look like this:

```typescript jsx title='src/main.tsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
)
```

Replace the contents of the `src/App.tsx` file with the following:

```typescript jsx title='src/App.tsx'
import {rSuiteComponents} from '@react-form-builder/components-rsuite'
import {BuilderView, FormBuilder} from '@react-form-builder/designer'

const components = rSuiteComponents.map(c => c.build())
const builderView = new BuilderView(components)

function App() {
  return <FormBuilder view={builderView}/>
}

export default App
```

Basically the application is ready, you can run it using the `npm run dev` command. In the browser you will see a ready window with the
designer:

![WASM component](/assets/guides/wasm-component/wasm-component-01.png)

## Adding QR code component

First we need to install the `fast_qr` library as a dependency:

```bash
npm install fast_qr
```

Second, we need to understand how the component should be used. GitHub has the following example
in [description](https://github.com/erwanvivien/fast_qr?tab=readme-ov-file#javascript--typescript):

```javascript
/// Once `init` is called, `qr_svg` can be called any number of times
import init, {qr_svg, SvgOptions, Shape} from '/pkg/fast_qr.js'

const options = new SvgOptions()
  .margin(4)
  .shape(Shape.Square)
  .image("")  // Can be a URL or a base64 encoded image
  .background_color("#b8a4e5")
  .module_color("#ffffff");

// Using then / catch:
init()
  .then(() => {
    for (let i = 0; i < 10; i++) {
      const svg = qr_svg("https://fast-qr.com", options);
      console.log(svg);
    }
  })
  .catch(console.error);

// Or using modern async await:
await init();
for (let i = 0; i < 10; i++) {
  const svg = qr_svg("https://fast-qr.com", options);
  console.log(svg);
}
```

It looks simple and straightforward. First you need to call the `init` function, and then you can call the `qr_svg` function, which will
return a line containing the SVG with the QR code. Let's make a React component that encapsulates this logic. Create a file `src/QrCode.tsx`
with the following content:

```typescript jsx title='src/QrCode.tsx' showLineNumbers {1,5,17-25,27,42}
import init, {qr_svg, Shape, SvgOptions} from 'fast_qr'
import {RefObject, useEffect, useRef} from 'react'
import {define} from '@react-form-builder/core'

export interface QrCodeProps {
  /**
   * The QR code width.
   */
  width?: number

  /**
   * The CSS class name.
   */
  className?: string
}

export const QrCode = (props: QrCodeProps) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    renderQr(ref).catch(console.error)
  }, [])

  return <div className={props.className} style={{width: props.width}} ref={ref}></div>
}

async function renderQr(ref: RefObject<HTMLDivElement>) {
  await init()

  if (!ref.current) return

  const options = new SvgOptions()
    .margin(4)
    .shape(Shape.Square)
    .image("")  // Can be a URL or a base64 encoded image
    .background_color("#b8a4e5")
    .module_color("#ffffff")

  ref.current.innerHTML = qr_svg("https://fast-qr.com", options)
}

export const qrCode = define(QrCode, 'QrCode')
  .name('QR code')
  .category('static')
```

So, we have defined the component properties as the `QrCodeProps` interface. We also defined the React functional component `QrCode` that
displays `div`. The imperative logic is defined in the `renderQr` function - here the `init` method is called, and if we already have a
reference to the rendered `div`, then the created SVG with QR code is installed via the `innerHTML` property. At the end, we defined a
constant `qrCode` with the description of the component to connect it to the list of components.

It's time to add the component and run the application. Modify the `src/App.tsx` file as shown in the example below:

```typescript jsx title='src/App.tsx' {3,6}
import {rSuiteComponents} from '@react-form-builder/components-rsuite'
import {BuilderView, FormBuilder} from '@react-form-builder/designer'
import {qrCode} from './QrCode'

const components = rSuiteComponents.map(c => c.build())
const builderView = new BuilderView([...components, qrCode.build()])

function App() {
  return <FormBuilder view={builderView}/>
}

export default App
```

Run the application with the `npm run dev` command, open the browser, you should see that the QR code component is in the left pane:

![WASM component](/assets/guides/wasm-component/wasm-component-02.png)

Great, now drag and drop the QR code component into the center panel:

![WASM component](/assets/guides/wasm-component/wasm-component-03.png)

Wait, what's that blue line, and where's our generated QR code? Well, the Frontend is dark and full of terrors. Just kidding!

If you open the browser console, you will see an error there:

![WASM component](/assets/guides/wasm-component/wasm-component-04.png)

Two things are evident here:

1. WASM module is being loaded - in the console the message starts with `WebAssembly.instantiateStreaming`. There was an error due to a
   MIME-type mismatch, the web server (Vite in this case) returned `text/html` while `application/wasm` was expected.
2. There is a stack-trace of the error.

Judging from the stack trace, the problem occurred in `QrCode.tsx:28`. And this is nothing more than calling the `init` function, which
internally calls the `__wbg_init` function, which in turn calls the `__wbg_load` function. If you click on the links from the console, you
can see the code of these functions. At the moment of writing this article we are using the library version `0.12.5`, in your case the code
may be different.

Below is the code of these functions, the lines we are interested in are highlighted.

```javascript title='function __wbg_init' {4-6,15}
async function __wbg_init(input) {
  if (wasm !== undefined) return wasm;

  if (typeof input === 'undefined') {
    input = new URL('fast_qr_bg.wasm', import.meta.url);
  }
  const imports = __wbg_get_imports();

  if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
    input = fetch(input);
  }

  __wbg_init_memory(imports);

  const {instance, module} = await __wbg_load(await input, imports);

  return __wbg_finalize_init(instance, module);
}
```

```javascript title='function __wbg_load' {18}
async function __wbg_load(module, imports) {
  if (typeof Response === 'function' && module instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming === 'function') {
      try {
        return await WebAssembly.instantiateStreaming(module, imports);

      } catch (e) {
        if (module.headers.get('Content-Type') != 'application/wasm') {
          console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

        } else {
          throw e;
        }
      }
    }

    const bytes = await module.arrayBuffer();
    return await WebAssembly.instantiate(bytes, imports);

  } else {
    const instance = await WebAssembly.instantiate(module, imports);

    if (instance instanceof WebAssembly.Instance) {
      return {instance, module};

    } else {
      return instance;
    }
  }
}
```

If you're curious about the cryptic prefixes in the function name `__wbg_`, it's short for
[wasm-bindgen](https://github.com/rustwasm/wasm-bindgen), a utility that generates helper code for WASM modules written in Rust.

Okay, how do we solve this problem? Let's load the WASM module using Vite.

## Loading WASM module

Vite supports loading WebAssembly modules [out of the box](https://vitejs.dev/guide/features.html#webassembly). We just need to add `?init`
to the import statement as indicated in the example in the documentation. Also, the `init` function in the `fast_qr` library can take the
loaded WASM module as a parameter. The `init` function can also take the path to a WASM module as an argument. You can see the `init`
function declaration, usually - in the IDE you can just do a "Go to definition" (<kbd>Ctrl</kbd>+<kbd>Click</kbd> / <kbd>⌘</kbd>+
<kbd>Click</kbd>). Here is
the type description from the library (yes, yes, the `init` function is `__wbg_init`):

```typescript
export default function __wbg_init(module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
```

Loading the module path is also supported in Vite [out of the box](https://vitejs.dev/guide/assets.html#explicit-url-imports), all you need
to do is add `?url` to the import statement.

Okay, which module should I load? It's easy to understand if you open the "Network" tab in the browser, and we can see that only one
module `fast_qr_bg.wasm` is loaded:

![WASM component](/assets/guides/wasm-component/wasm-component-05.png)

The fact that the module loads twice is normal, we are in development mode, and we have
React [StrictMode](https://react.dev/reference/react/StrictMode) enabled.

In this article, we will load the path to the module, and pass this path to the `init` function. Here is the full text of
the `src/QrCode.tsx` file (changed lines are highlighted):

```typescript jsx title='src/QrCode.tsx' {2,29}
import init, {qr_svg, Shape, SvgOptions} from 'fast_qr'
import module from 'fast_qr/fast_qr_bg.wasm?url'
import {RefObject, useEffect, useRef} from 'react'
import {define} from '@react-form-builder/core'

export interface QrCodeProps {
  /**
   * The QR code width.
   */
  width?: number

  /**
   * The CSS class name.
   */
  className?: string
}

export const QrCode = (props: QrCodeProps) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    renderQr(ref).catch(console.error)
  }, [])

  return <div className={props.className} style={{width: props.width}} ref={ref}></div>
}

async function renderQr(ref: RefObject<HTMLDivElement>) {
  await init(module)

  if (!ref.current) return

  const options = new SvgOptions()
    .margin(4)
    .shape(Shape.Square)
    .image("")  // Can be a URL or a base64 encoded image
    .background_color("#b8a4e5")
    .module_color("#ffffff")

  ref.current.innerHTML = qr_svg("https://fast-qr.com", options)
}

export const qrCode = define(QrCode, 'QrCode')
  .name('QR code')
  .category('static')
```

Go back to your browser, add the QR code to the form, and you'll see something like this:

![WASM component](/assets/guides/wasm-component/wasm-component-06.png)

Great, all that's left is to add properties to the component and make them editable in the designer.

## Adding properties

As you may have noticed, the library uses the `SvgOptions` class to customize the parameters of the QR code. This class is a regular builder
that is configured through a chain of function calls:

```typescript
const options = new SvgOptions()
  .margin(4)
  .shape(Shape.Square)
  .image("")  // Can be a URL or a base64 encoded image
  .background_color("#b8a4e5")
  .module_color("#ffffff")
```

You can find the type descriptions in the file `fast_qr.d.ts` (in the `fast_qr` package in the `node_modules` folder), the file is quite
large, so it is under the cut:

<details>
<summary>fast_qr.d.ts</summary>

```typescript title='fast_qr.d.ts'
/* tslint:disable */

/* eslint-disable */
/**
 * Generate a QR code from a string. All parameters are automatically set.
 * @param {string} content
 * @returns {Uint8Array}
 */
export function qr(content: string): Uint8Array;

/**
 * Generate a QR code from a string. All parameters are automatically set.
 * @param {string} content
 * @param {SvgOptions} options
 * @returns {string}
 */
export function qr_svg(content: string, options: SvgOptions): string;

/**
 * Enum containing all possible `QRCode` versions
 */
export enum Version {
  /**
   * Version n°01
   */
  V01 = 0,
  /**
   * Version n°02
   */
  V02 = 1,
  /**
   * Version n°03
   */
  V03 = 2,
  /**
   * Version n°04
   */
  V04 = 3,
  /**
   * Version n°05
   */
  V05 = 4,
  /**
   * Version n°06
   */
  V06 = 5,
  /**
   * Version n°07
   */
  V07 = 6,
  /**
   * Version n°08
   */
  V08 = 7,
  /**
   * Version n°09
   */
  V09 = 8,
  /**
   * Version n°10
   */
  V10 = 9,
  /**
   * Version n°11
   */
  V11 = 10,
  /**
   * Version n°12
   */
  V12 = 11,
  /**
   * Version n°13
   */
  V13 = 12,
  /**
   * Version n°14
   */
  V14 = 13,
  /**
   * Version n°15
   */
  V15 = 14,
  /**
   * Version n°16
   */
  V16 = 15,
  /**
   * Version n°17
   */
  V17 = 16,
  /**
   * Version n°18
   */
  V18 = 17,
  /**
   * Version n°19
   */
  V19 = 18,
  /**
   * Version n°20
   */
  V20 = 19,
  /**
   * Version n°21
   */
  V21 = 20,
  /**
   * Version n°22
   */
  V22 = 21,
  /**
   * Version n°23
   */
  V23 = 22,
  /**
   * Version n°24
   */
  V24 = 23,
  /**
   * Version n°25
   */
  V25 = 24,
  /**
   * Version n°26
   */
  V26 = 25,
  /**
   * Version n°27
   */
  V27 = 26,
  /**
   * Version n°28
   */
  V28 = 27,
  /**
   * Version n°29
   */
  V29 = 28,
  /**
   * Version n°30
   */
  V30 = 29,
  /**
   * Version n°31
   */
  V31 = 30,
  /**
   * Version n°32
   */
  V32 = 31,
  /**
   * Version n°33
   */
  V33 = 32,
  /**
   * Version n°34
   */
  V34 = 33,
  /**
   * Version n°35
   */
  V35 = 34,
  /**
   * Version n°36
   */
  V36 = 35,
  /**
   * Version n°37
   */
  V37 = 36,
  /**
   * Version n°38
   */
  V38 = 37,
  /**
   * Version n°39
   */
  V39 = 38,
  /**
   * Version n°40
   */
  V40 = 39,
}

/**
 * Error Correction Coding has 4 levels
 */
export enum ECL {
  /**
   * Low, 7%
   */
  L = 0,
  /**
   * Medium, 15%
   */
  M = 1,
  /**
   * Quartile, 25%
   */
  Q = 2,
  /**
   * High, 30%
   */
  H = 3,
}

/**
 * Different possible Shapes to represent modules in a [`crate::QRCode`]
 */
export enum Shape {
  /**
   * Square Shape
   */
  Square = 0,
  /**
   * Circle Shape
   */
  Circle = 1,
  /**
   * RoundedSquare Shape
   */
  RoundedSquare = 2,
  /**
   * Vertical Shape
   */
  Vertical = 3,
  /**
   * Horizontal Shape
   */
  Horizontal = 4,
  /**
   * Diamond Shape
   */
  Diamond = 5,
}

/**
 * Different possible image background shapes
 */
export enum ImageBackgroundShape {
  /**
   * Square shape
   */
  Square = 0,
  /**
   * Circle shape
   */
  Circle = 1,
  /**
   * Rounded square shape
   */
  RoundedSquare = 2,
}

/**
 * Configuration for the SVG output.
 */
export class SvgOptions {
  free(): void;

  /**
   * Updates the shape of the QRCode modules.
   * @param {Shape} shape
   * @returns {SvgOptions}
   */
  shape(shape: Shape): SvgOptions;

  /**
   * Updates the module color of the QRCode. Tales a string in the format `#RRGGBB[AA]`.
   * @param {string} module_color
   * @returns {SvgOptions}
   */
  module_color(module_color: string): SvgOptions;

  /**
   * Updates the margin of the QRCode.
   * @param {number} margin
   * @returns {SvgOptions}
   */
  margin(margin: number): SvgOptions;

  /**
   * Updates the background color of the QRCode. Tales a string in the format `#RRGGBB[AA]`.
   * @param {string} background_color
   * @returns {SvgOptions}
   */
  background_color(background_color: string): SvgOptions;

  /**
   * Updates the image of the QRCode. Takes base64 or a url.
   * @param {string} image
   * @returns {SvgOptions}
   */
  image(image: string): SvgOptions;

  /**
   * Updates the background color of the image. Takes a string in the format `#RRGGBB[AA]`.
   * @param {string} image_background_color
   * @returns {SvgOptions}
   */
  image_background_color(image_background_color: string): SvgOptions;

  /**
   * Updates the shape of the image background. Takes an convert::ImageBackgroundShape.
   * @param {ImageBackgroundShape} image_background_shape
   * @returns {SvgOptions}
   */
  image_background_shape(image_background_shape: ImageBackgroundShape): SvgOptions;

  /**
   * Updates the size of the image. Takes a size and a gap (unit being module size).
   * @param {number} size
   * @param {number} gap
   * @returns {SvgOptions}
   */
  image_size(size: number, gap: number): SvgOptions;

  /**
   * Updates the position of the image. Takes an array [x, y] (unit being module size).
   * @param {Float64Array} image_position
   * @returns {SvgOptions}
   */
  image_position(image_position: Float64Array): SvgOptions;

  /**
   * Updates the error correction level of the QRCode (can increase the size of the QRCode)
   * @param {ECL} ecl
   * @returns {SvgOptions}
   */
  ecl(ecl: ECL): SvgOptions;

  /**
   * Forces the version of the QRCode
   * @param {Version} version
   * @returns {SvgOptions}
   */
  version(version: Version): SvgOptions;

  /**
   * Creates a new SvgOptions object.
   */
  constructor();
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly qr: (a: number, b: number, c: number) => void;
  readonly __wbg_svgoptions_free: (a: number) => void;
  readonly svgoptions_shape: (a: number, b: number) => number;
  readonly svgoptions_module_color: (a: number, b: number, c: number) => number;
  readonly svgoptions_margin: (a: number, b: number) => number;
  readonly svgoptions_background_color: (a: number, b: number, c: number) => number;
  readonly svgoptions_image: (a: number, b: number, c: number) => number;
  readonly svgoptions_image_background_color: (a: number, b: number, c: number) => number;
  readonly svgoptions_image_background_shape: (a: number, b: number) => number;
  readonly svgoptions_image_size: (a: number, b: number, c: number) => number;
  readonly svgoptions_image_position: (a: number, b: number, c: number) => number;
  readonly svgoptions_ecl: (a: number, b: number) => number;
  readonly svgoptions_version: (a: number, b: number) => number;
  readonly svgoptions_new: () => number;
  readonly qr_svg: (a: number, b: number, c: number, d: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;

/**
 * Instantiates the given `module`, which can either be bytes or
 * a precompiled `WebAssembly.Module`.
 *
 * @param {SyncInitInput} module
 *
 * @returns {InitOutput}
 */
export function initSync(module: SyncInitInput): InitOutput;

/**
 * If `module_or_path` is {RequestInfo} or {URL}, makes a request and
 * for everything else, calls `WebAssembly.instantiate` directly.
 *
 * @param {InitInput | Promise<InitInput>} module_or_path
 *
 * @returns {Promise<InitOutput>}
 */
export default function __wbg_init(module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
```

</details>

What's left to do:

1. Add the necessary properties to the `QrCodeProps` interface for our `QrCode` component.
2. Pass the property values to the corresponding methods of the `SvgOptions` object.
3. Describe the added properties in the `qrCode` object using `props`.

Below is the code of the component, it adds all of the above. In the code you will also find a color converter from the rgba format, which
is passed by the designer property editor, to the hex format used by the component.

<details>
<summary>src/QrCode.tsx</summary>

```typescript jsx title='src/QrCode.tsx'
import init, {qr_svg, SvgOptions} from 'fast_qr'
import module from 'fast_qr/fast_qr_bg.wasm?url'
import {RefObject, useEffect, useRef} from 'react'
import {color, define, number, oneOf, string} from '@react-form-builder/core'

export interface QrCodeProps {
  /**
   * The QR code width.
   */
  width?: number

  /**
   * The CSS class name.
   */
  className?: string

  /**
   * The QR code content.
   */
  content: string

  /**
   * The different possible shapes to represent modules.
   */
  shape?: number

  /**
   * The background color.
   */
  backgroundColor?: string

  /**
   * The module color.
   */
  moduleColor?: string

  /**
   * The margin.
   */
  margin?: number

  /**
   * The image, base64 or URL.
   */
  image?: string

  /**
   * The image background color.
   */
  imageBackgroundColor?: string

  /**
   * The image background shape.
   */
  imageBackgroundShape?: number

  /**
   * The image X position in module units.
   */
  imagePositionX?: number

  /**
   * The image Y position in module units.
   */
  imagePositionY?: number

  /**
   * Image size in module units.
   */
  imageSize?: number

  /**
   * Image gap in module units.
   */
  imageGap?: number

  /**
   * The error correction coding level.
   */
  errorCorrectionLevel?: number

  /**
   * The QR code version.
   */
  version?: number
}

export const QrCode = (props: QrCodeProps) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    renderQr(props, ref).catch(console.error)
  }, [props])

  return <div className={props.className} style={{width: props.width}} ref={ref}></div>
}

const colorPartToHex = (color: number) => {
  if (color % 1 === 0) return (color | 1 << 8).toString(16).slice(1)
  return Math.trunc((color * 255) | 1 << 8).toString(16).slice(1)
}

const rgbaColorToHex = (color?: string) => {
  if (!color) return undefined

  const index = color.indexOf(')')
  if (color.startsWith('rgba(') && index >= 0) {
    const colors = color.substring(5, index)
      .split(',')
      .map(s => s.trim())
      .map(s => Number(s))
      .map(colorPartToHex)
      .join('')
    return `#${colors}`
  }
}

async function renderQr(props: QrCodeProps, ref: RefObject<HTMLDivElement>) {
  await init(module)

  if (!ref.current) return

  let svgOptions = new SvgOptions()
  if (props.margin) svgOptions = svgOptions.margin(props.margin)

  const backgroundColor = rgbaColorToHex(props.backgroundColor)
  if (backgroundColor) svgOptions = svgOptions.background_color(backgroundColor)

  const moduleColor = rgbaColorToHex(props.moduleColor)
  if (moduleColor) svgOptions = svgOptions.module_color(moduleColor)

  if (props.shape) svgOptions = svgOptions.shape(props.shape)
  if (props.image) svgOptions = svgOptions.image(props.image)

  const imageBackgroundColor = rgbaColorToHex(props.imageBackgroundColor)
  if (imageBackgroundColor) svgOptions = svgOptions.image_background_color(imageBackgroundColor)

  if (props.imageBackgroundShape) svgOptions = svgOptions.image_background_shape(props.imageBackgroundShape)
  if (props.imageSize !== undefined && props.imageGap !== undefined) {
    svgOptions = svgOptions.image_size(props.imageSize, props.imageGap)
  }
  if (props.imagePositionX && props.imagePositionY) {
    const position = new Float64Array([props.imagePositionX, props.imagePositionY])
    svgOptions = svgOptions.image_position(position)
  }

  if (props.errorCorrectionLevel) svgOptions = svgOptions.ecl(props.errorCorrectionLevel)
  if (props.version) svgOptions = svgOptions.version(props.version)

  ref.current.innerHTML = qr_svg(props.content, svgOptions)
}

const nonNegNumber = number.withEditorProps({min: 0})

export const qrCode = define(QrCode, 'QrCode')
  .name('QR code')
  .category('static')
  .props({
    width: nonNegNumber.default(300).hinted('The QR code width'),
    content: string.default('https://formengine.io').hinted('The QR code content'),
    moduleColor: color.hinted('The module color'),
    shape: oneOf(0, 1, 2, 3, 4, 5).default(0)
      .labeled('Square', 'Circle', 'RoundedSquare', 'Vertical', 'Horizontal', 'Diamond')
      .withEditorProps({creatable: false})
      .hinted('The different possible shapes to represent modules'),
    errorCorrectionLevel: oneOf(0, 1, 2, 3).default(0)
      .labeled('Low, 7%', 'Medium, 15%', 'Quartile, 25%', 'High, 30%')
      .withEditorProps({creatable: false})
      .hinted('The error correction coding level'),
    version: number.withEditorProps({min: 0, max: 39})
      .named('QR version')
      .hinted('The QR code version'),
    image: string.hinted('The image, base64 or URL'),
    imageBackgroundColor: color.hinted('The image background color'),
    imageBackgroundShape: oneOf(0, 1, 2).default(0)
      .labeled('Square', 'Circle', 'RoundedSquare')
      .withEditorProps({creatable: false})
      .hinted('The image background shape'),
  })
```

</details>

Now we have a fully functional component that we can play with in the designer:

![WASM component](/assets/guides/wasm-component/wasm-component-07.png)

## Conclusion

Connecting a WASM component to a React application is not a difficult task. We will add the QR code component to the FormEngine component
collection so that you can easily connect it via the usual npm dependency.
