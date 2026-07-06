VERSION --try 0.8

FROM node:24.18.0

# --- Shared helpers ---

# Installs platform-specific native npm bindings (Linux containers in CI/verify).
INSTALL_NATIVE_BINDINGS:
  FUNCTION
  ARG --required targetDir
  RUN cd "$targetDir" && npm install oxc-parser oxc-resolver rollup @swc/core @biomejs/biome --no-save --no-audit --no-fund
  RUN case "$(uname -m)" in \
    aarch64|arm64) \
      cd "$targetDir" && npm install \
        @rollup/rollup-linux-arm64-gnu \
        @swc/core-linux-arm64-gnu \
        @swc/html-linux-arm64-gnu \
        @oxc-parser/binding-linux-arm64-gnu \
        @biomejs/cli-linux-arm64 \
        @rspack/binding-linux-arm64-gnu \
        --no-save --no-audit --no-fund ;; \
    *) \
      cd "$targetDir" && npm install \
        @rollup/rollup-linux-x64-gnu \
        @swc/core-linux-x64-gnu \
        @swc/html-linux-x64-gnu \
        @oxc-parser/binding-linux-x64-gnu \
        @biomejs/cli-linux-x64 \
        @rspack/binding-linux-x64-gnu \
        --no-save --no-audit --no-fund ;; \
    esac

# --- Dependencies (repo-root build context) ---

dependencies:
  WORKDIR /repo
  COPY package.json package-lock.json package.public.json package.private.json lerna.json biome.json .npmrc ./
  COPY .editorconfig .gitignore .eslintrc.cjs .eslintignore tsconfig.json vite.config.ts vite-plugin-app-version.ts knip.config.ts ./
  COPY .madgerc ./
  COPY --dir packages documentation tests scripts examples ./
  ENV npm_config_audit=false
  ENV npm_config_fund=false
  ENV npm_config_progress=true
  RUN npm ci --no-audit --no-fund
  SAVE ARTIFACT /repo /repo

sources:
  FROM +dependencies
  SAVE ARTIFACT /repo /repo

# --- CI ---

npm-build:
  FROM +sources
  WORKDIR /repo
  RUN npm run build:ci

npm-bundle:
  ARG prepareRcArchives=0
  IF [ "$prepareRcArchives" = "1" ]
    BUILD +prepare-rc-archives-from-pack
  ELSE
    FROM +sources
    WORKDIR /repo
    ENV NODE_OPTIONS="--max-old-space-size=8192"
    RUN npm run pack:ci
  END

npm-update-release-date:
  FROM +sources
  WORKDIR /repo
  RUN cd ./packages/apps/common-designer && npm run update-release-date

npm-demo-build:
  FROM +npm-update-release-date
  WORKDIR /repo
  RUN npm run demo:build

npm-formbuilder-build:
  FROM +npm-update-release-date
  WORKDIR /repo
  RUN cd ./packages/apps/formbuilder && npm run build

npm-build-apps-and-views:
  FROM +npm-update-release-date
  WORKDIR /repo
  RUN npm run build:check-build:ci

npm-documentation-build:
  FROM +sources
  WORKDIR /repo
  RUN npm run docs:build

npm-publish-rc-release:
  FROM node:24.18.0
  WORKDIR /repo
  COPY scripts/release scripts/release
  COPY .archives .archives
  ARG --required REPO_SLUG
  ARG --required GITHUB_SHA
  ENV GITHUB_REPOSITORY=$REPO_SLUG
  ENV GITHUB_SHA=$GITHUB_SHA
  RUN --secret GH_TOKEN \
    node scripts/release/upload-release-artifacts.ts

validate-rc-archives:
  FROM node:24.18.0
  WORKDIR /repo
  COPY scripts/release scripts/release
  COPY .archives .archives
  RUN node scripts/release/validate-archives.ts --archives-dir=.archives

npm-test:
  FROM +sources
  WORKDIR /repo
  ENV CI=true
  TRY
    RUN npm run test:module
  FINALLY
    SAVE ARTIFACT tests/module/reports/junit-report.xml AS LOCAL test-results/module.xml
  END
  TRY
    RUN npm run test:component
  FINALLY
    SAVE ARTIFACT tests/react-17/reports/junit-report.xml AS LOCAL test-results/react-17-report.xml
    SAVE ARTIFACT tests/react-18/reports/junit-report.xml AS LOCAL test-results/react-18-report.xml
    SAVE ARTIFACT tests/react-19/reports/junit-report.xml AS LOCAL test-results/react-19-report.xml
  END

npm-check-all:
  FROM +sources
  WORKDIR /repo
  RUN npm install -D @biomejs/biome
  RUN npm run check:all

npm-check-circular-deps:
  FROM +sources
  WORKDIR /repo
  RUN npm run check:circular-deps

npm-eslint:
  FROM +sources
  WORKDIR /repo
  RUN npm run eslint

npm-check-unused-exports:
  FROM +sources
  WORKDIR /repo
  RUN npm run check:unused-exports

npm-check-tsc:
  FROM +sources
  WORKDIR /repo
  RUN npm run check:tsc

npm-e2e:
  FROM mcr.microsoft.com/playwright:v1.57.0-noble
  ENV CI=true
  ENV PLAYWRIGHT_DOCKER=1
  ENV PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=1
  COPY +sources/repo+ /repo
  WORKDIR /repo
  RUN npm run test:e2e
  RUN npx lerna run --stream test:browser:headless --concurrency=1

# --- Prepare (release archives) ---

prepare-npm-archives:
  FROM +npm-build
  WORKDIR /repo
  RUN cd ./packages/apps/common-designer && npm run update-release-date
  RUN mkdir -p .archives
  RUN node scripts/release/prepare-npm-archives.ts
  SAVE ARTIFACT --force .archives/* AS LOCAL .archives/

prepare-npm-archives-from-pack:
  FROM +sources
  WORKDIR /repo
  ENV NODE_OPTIONS="--max-old-space-size=8192"
  RUN npm run pack:ci
  RUN mkdir -p .archives
  RUN node scripts/release/prepare-npm-archives.ts --from-pack
  SAVE ARTIFACT /repo/.archives/* AS LOCAL .archives/

prepare-demo-archive:
  FROM +npm-demo-build
  WORKDIR /repo
  RUN tar -czvf demo.tgz -C packages/apps/demo/dist .
  SAVE ARTIFACT --force demo.tgz AS LOCAL .archives/demo.tgz

prepare-formbuilder-archive:
  FROM +npm-formbuilder-build
  WORKDIR /repo
  RUN tar -czvf formbuilder.tgz -C packages/apps/formbuilder/dist .
  SAVE ARTIFACT --force formbuilder.tgz AS LOCAL .archives/formbuilder.tgz

prepare-documentation-archive:
  FROM +npm-documentation-build
  WORKDIR /repo
  RUN tar -czvf documentation.tgz -C documentation/website/build .
  SAVE ARTIFACT --force documentation.tgz AS LOCAL .archives/documentation.tgz

prepare-github-formengine-examples:
  FROM +sources
  WORKDIR /repo
  ENV NODE_OPTIONS="--max-old-space-size=8192"
  RUN npm run pack:ci
  RUN mkdir -p .archives
  RUN node scripts/release/prepare-npm-archives.ts --from-pack
  RUN node scripts/examples-install-local-packages.ts --from-archives .archives
  RUN mkdir -p /prepared/packages/views /prepared/packages/apps
  RUN cp -r /repo/examples /prepared/examples
  RUN cp -r /repo/packages/core /prepared/packages/core
  RUN cp -r /repo/packages/json-schema-generator /prepared/packages/json-schema-generator
  RUN cp -r /repo/packages/views/rsuite /prepared/packages/views/rsuite
  RUN cp -r /repo/packages/views/material-ui /prepared/packages/views/material-ui
  RUN cp -r /repo/packages/views/mantine /prepared/packages/views/mantine
  RUN cp -r /repo/packages/views/uploader /prepared/packages/views/uploader
  RUN cp -r /repo/packages/viewer-bundle /prepared/packages/viewer-bundle
  RUN cp -r /repo/packages/apps/common /prepared/packages/apps/common
  RUN cp -r /repo/packages/apps/example-viewer /prepared/packages/apps/example-viewer
  SAVE ARTIFACT /repo/.archives
  SAVE ARTIFACT /prepared

prepare-github-formengine-archive:
  FROM +prepare-github-formengine-examples
  WORKDIR /repo
  RUN mkdir -p .archives
  COPY +prepare-github-formengine-examples/.archives /tmp/npm-archives
  RUN find /tmp/npm-archives -name 'react-form-builder-*.tgz' -exec cp {} .archives/ \;
  COPY --dir scripts/includes/github-optimajet-formengine/ github-formengine
  COPY --dir +prepare-github-formengine-examples/prepared/packages/core github-formengine/community/packages/core
  COPY --dir +prepare-github-formengine-examples/prepared/packages/json-schema-generator github-formengine/community/packages/json-schema-generator
  COPY --dir +prepare-github-formengine-examples/prepared/packages/views/rsuite github-formengine/community/packages/views/rsuite
  COPY --dir +prepare-github-formengine-examples/prepared/packages/views/material-ui github-formengine/community/packages/views/material-ui
  COPY --dir +prepare-github-formengine-examples/prepared/packages/views/mantine github-formengine/community/packages/views/mantine
  COPY --dir +prepare-github-formengine-examples/prepared/packages/views/uploader github-formengine/community/packages/views/uploader
  COPY --dir +prepare-github-formengine-examples/prepared/packages/viewer-bundle github-formengine/community/packages/viewer-bundle
  COPY --dir +prepare-github-formengine-examples/prepared/packages/apps/common github-formengine/community/packages/apps/common
  COPY --dir +prepare-github-formengine-examples/prepared/packages/apps/example-viewer github-formengine/community/packages/apps/example-viewer
  COPY --dir +prepare-github-formengine-examples/prepared/examples/community github-formengine/community/examples
  COPY --dir scripts/cli-lib github-formengine/community/scripts/cli-lib
  COPY .npmrc github-formengine/community/
  RUN rm -f github-formengine/community/examples/bundle-size/scripts/install-local-formengine.ts
  RUN sed -i 's|file:../../../scripts/cli-lib|file:../../scripts/cli-lib|g' github-formengine/community/examples/bundle-size/package.json
  RUN node scripts/patch-package-lock-from-archives.ts --archives-dir .archives --lockfile github-formengine/community/examples/bundle-size/package-lock.json --package-json github-formengine/community/examples/bundle-size/package.json
  COPY --dir +prepare-github-formengine-examples/prepared/examples/premium github-formengine/premium/examples
  COPY lerna.json github-formengine/community/
  COPY tsconfig.json github-formengine/community/
  COPY vite.config.ts github-formengine/community/
  COPY vite-plugin-app-version.ts github-formengine/community/
  COPY .eslintrc.cjs github-formengine/community/
  COPY .eslintignore github-formengine/community/
  COPY .editorconfig github-formengine/community/
  COPY .gitignore github-formengine/
  COPY package.public.json github-formengine/community/package.json
  COPY package-lock.json github-formengine/community/package-lock.json
  RUN node scripts/patch-package-lock-from-archives.ts --archives-dir .archives --lockfile github-formengine/community/package-lock.json --package-json github-formengine/community/package.json
  COPY CHANGELOG.md github-formengine
  RUN find github-formengine -name node_modules -type d -prune -exec rm -rf '{}' +
  RUN find github-formengine \( -name dist -o -name build -o -name reports \) -type d -prune -exec rm -rf '{}' +
  RUN tar -czvf formengine.tgz -C github-formengine .
  SAVE ARTIFACT --force formengine.tgz AS LOCAL .archives/formengine.tgz

prepare-github-formenginesupport-archive:
  FROM +sources
  WORKDIR /repo
  RUN mkdir -p .archives
  COPY +prepare-github-formengine-examples/.archives /tmp/npm-archives
  RUN find /tmp/npm-archives -name 'react-form-builder-*.tgz' -exec cp {} .archives/ \;
  LET dst=private-github
  COPY --dir packages/apps/common $dst/packages/apps/common
  COPY --dir packages/apps/common-designer $dst/packages/apps/common-designer
  COPY --dir packages/apps/example-builder $dst/packages/apps/example-builder
  COPY --dir packages/apps/example-viewer $dst/packages/apps/example-viewer
  COPY --dir packages/core $dst/packages/core
  COPY --dir packages/designer $dst/packages/designer
  COPY --dir packages/designer-bundle $dst/packages/designer-bundle
  COPY --dir packages/indexed-db-form-storage $dst/packages/indexed-db-form-storage
  COPY --dir packages/json-schema-generator $dst/packages/json-schema-generator
  COPY --dir packages/viewer-bundle $dst/packages/viewer-bundle
  COPY --dir packages/viewer-bundle-premium $dst/packages/viewer-bundle-premium
  COPY --dir packages/views/antd $dst/packages/views/antd
  COPY --dir packages/views/rsuite $dst/packages/views/rsuite
  COPY --dir packages/views/mantine $dst/packages/views/mantine
  COPY --dir packages/views/material-ui $dst/packages/views/material-ui
  COPY --dir packages/views/rsuite-table $dst/packages/views/rsuite-table
  COPY --dir packages/views/signature $dst/packages/views/signature
  COPY --dir packages/views/fast-qr $dst/packages/views/fast-qr
  COPY --dir packages/views/rich-text $dst/packages/views/rich-text
  COPY --dir packages/views/google-map $dst/packages/views/google-map
  COPY --dir packages/views/uploader $dst/packages/views/uploader
  COPY --dir scripts/cli-lib $dst/scripts/cli-lib
  COPY lerna.json $dst/
  COPY LICENSE.md $dst/
  COPY package.private.json $dst/package.json
  COPY package-lock.json $dst/package-lock.json
  COPY README.private.md $dst/README.md
  COPY .eslintrc.cjs $dst/
  COPY .eslintignore $dst/
  COPY tsconfig.json $dst/
  COPY vite.config.ts $dst/
  COPY vite-plugin-app-version.ts $dst/
  COPY CHANGELOG.md $dst/
  COPY .editorconfig $dst/
  COPY .gitignore $dst/
  COPY .npmrc $dst/
  RUN node scripts/patch-package-lock-from-archives.ts --archives-dir .archives --lockfile $dst/package-lock.json --package-json $dst/package.json
  RUN find $dst -name node_modules -type d -prune -exec rm -rf '{}' +
  RUN find $dst \( -name dist -o -name build -o -name reports \) -type d -prune -exec rm -rf '{}' +
  RUN tar -czvf formenginesupport.tgz -C $dst .
  SAVE ARTIFACT --force formenginesupport.tgz AS LOCAL .archives/formenginesupport.tgz

prepare-version-archive:
  FROM +sources
  WORKDIR /repo
  SAVE ARTIFACT --force lerna.json AS LOCAL .archives/lerna.json

prepare-github-release-notes-archive:
  FROM +sources
  WORKDIR /repo
  RUN mkdir -p /tmp/gh-release-notes
  RUN cp -r scripts/github-release-notes /tmp/gh-release-notes/
  RUN tar -czvf gh-release-notes.tgz -C /tmp/gh-release-notes .
  SAVE ARTIFACT --force gh-release-notes.tgz AS LOCAL .archives/gh-release-notes.tgz

prepare-all-archives:
  BUILD +prepare-npm-archives
  BUILD +prepare-github-formengine-archive
  BUILD +prepare-github-formenginesupport-archive
  BUILD +prepare-demo-archive
  BUILD +prepare-formbuilder-archive
  BUILD +prepare-documentation-archive
  BUILD +prepare-version-archive
  BUILD +prepare-github-release-notes-archive

prepare-rc-archives-from-pack:
  # Documentation archive is built separately (ci-build-documentation GHA job).
  BUILD +prepare-github-formengine-archive
  BUILD +prepare-github-formenginesupport-archive
  BUILD +prepare-demo-archive
  BUILD +prepare-formbuilder-archive
  BUILD +prepare-version-archive
  BUILD +prepare-github-release-notes-archive
  FROM +sources
  WORKDIR /repo
  RUN mkdir -p .archives
  COPY +prepare-github-formengine-examples/.archives /tmp/npm-archives
  RUN find /tmp/npm-archives -name 'react-form-builder-*.tgz' -exec cp {} .archives/ \;
  COPY +prepare-github-formengine-archive/formengine.tgz .archives/formengine.tgz
  COPY +prepare-github-formenginesupport-archive/formenginesupport.tgz .archives/formenginesupport.tgz
  COPY +prepare-demo-archive/demo.tgz .archives/demo.tgz
  COPY +prepare-formbuilder-archive/formbuilder.tgz .archives/formbuilder.tgz
  COPY +prepare-version-archive/lerna.json .archives/lerna.json
  COPY +prepare-github-release-notes-archive/gh-release-notes.tgz .archives/gh-release-notes.tgz
  SAVE ARTIFACT --force .archives/* AS LOCAL .archives/

# --- Verify (archive smoke tests) ---

test-github-formengine-archive:
  FROM +sources
  WORKDIR /work
  COPY .archives/formengine.tgz formengine.tgz
  ENV NODE_OPTIONS="--max-old-space-size=8192"
  RUN tar zxvf formengine.tgz
  RUN cd community/examples/file-upload-server && npm install
  RUN cd /work/community/examples/bundle-size && npm install
  RUN cd /work/community && npm install
  DO +INSTALL_NATIVE_BINDINGS --targetDir=/work/community
  RUN cd /work/community && npm run pack
  RUN cd /work/premium/examples/formengine && npm install
  DO +INSTALL_NATIVE_BINDINGS --targetDir=/work/premium/examples/formengine
  RUN cd /work/premium/examples/formengine && npm run build
  RUN cd /work/premium/examples/with-formik && npm install
  DO +INSTALL_NATIVE_BINDINGS --targetDir=/work/premium/examples/with-formik
  RUN cd /work/premium/examples/with-formik && npm run build
  RUN cd /work/premium/examples/with-nextjs/with-nextjs-v16 && npm install
  DO +INSTALL_NATIVE_BINDINGS --targetDir=/work/premium/examples/with-nextjs/with-nextjs-v16
  RUN cd /work/premium/examples/with-nextjs/with-nextjs-v16 && npm run build
  RUN cd /work/premium/examples/with-remix/with-remix-v2 && npm install
  DO +INSTALL_NATIVE_BINDINGS --targetDir=/work/premium/examples/with-remix/with-remix-v2
  RUN cd /work/premium/examples/with-remix/with-remix-v2 && npm run build

test-github-formenginesupport-archive:
  FROM +sources
  WORKDIR /work
  COPY .archives/formenginesupport.tgz formenginesupport.tgz
  ENV NODE_OPTIONS="--max-old-space-size=8192"
  RUN tar zxvf formenginesupport.tgz
  RUN npm install
  RUN npm run build
  RUN npm run pack
