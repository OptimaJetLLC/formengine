# Components for FormViewer/FormBuilder

## Overview

This folder contains libraries with React components for FormViewer/FormBuilder.

## Typical contents of a folder with a component package

1. LICENSE, a file containing the license, usually MIT.
2. README.md file with a brief description and usage example.
3. The components themselves, view. All of this should be in separate exports in package.json.
4. The package.json file itself must be filled in, example:

   ```json
   {
     "name": "@react-form-builder/components-mantine",
     "description": "OptimaJet Form Builder Components - Mantine",
     "version": "7.8.0",
     "license": "MIT",
     "private": false,
     "author": "Optimajet",
     "homepage": "https://formengine.io/",
     "repository": {
       "type": "git",
       "url": "git+ssh://git@github.com/optimajet/formengine.git"
     },
     "main": "src/index.ts",
     "type": "module",
     "sideEffects": false,
     "exports": {
       ".": {
         "import": "./src/index.ts"
       },
       "./view": {
         "import": "./src/view.ts"
       }
     },
     "bugs": {
       "email": "support@optimajet.com"
     },
     "peerDependencies": {
       "@react-form-builder/core": "7.8.0",
       "react": "^18 || ^19"
     },
     "peerDependenciesMeta": {
       "@react-form-builder/core": {
         "optional": false
       }
     }
   }
   ```

5. The dependency on the library itself must be specified as a peer dependency. If the version range is not supported, specify a specific
   version.
6. The dependency on React must be specified as a range of supported versions, e.g. "^18 || ^19".
7. Component descriptions in English, automatically translated descriptions for other languages.
8. It is desirable that components support light and dark themes.
9. It is desirable that the components support multiple languages.
10. Components must be included in the build via the `Earthfile` file in the root of the repository.
11. If necessary, components can be included in the automatic generation of `api-reference` documentation.
12. If necessary, the component library can be described in the documentation on the website.
13. Components must use correct annotations for valued properties, boolean for true/false properties, string for string values, array for
    arrays, date for dates, time for time.
