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

# Copies validated react-form-builder-*.tgz archives into .archives/.
# fromPack=0: run npm run pack in each workspace package.
# fromPack=1: copy tarballs produced earlier (for example by npm run pack:ci).
PREPARE_NPM_ARCHIVES:
  FUNCTION
  ARG fromPack=0
  RUN set -eu && \
    mkdir -p .archives && \
    packages=$(node -e "import {NPM_PACKAGE_PATHS} from './scripts/release/constants.ts'; process.stdout.write(NPM_PACKAGE_PATHS.join(' '))") && \
    for package_path in $packages; do \
      archive_name=$(node -e "import {readFileSync} from 'node:fs'; import {join} from 'node:path'; import {tarballFilename} from './scripts/cli-lib/npm-pack.ts'; const packagePath=process.argv[1]; const pkg=JSON.parse(readFileSync(join(packagePath,'package.json'),'utf8')); process.stdout.write(tarballFilename(pkg));" "$package_path") && \
      archive_path="$package_path/$archive_name" && \
      if [ "$fromPack" = "1" ]; then \
        test -f "$archive_path" || { echo "Missing packed archive $archive_path; run npm run pack first" >&2; exit 1; }; \
      else \
        find "$package_path" -maxdepth 1 -name '*.tgz' -delete && \
        npm run pack --prefix "$package_path" && \
        test -f "$archive_path" || { echo "Pack did not produce $archive_path" >&2; exit 1; }; \
      fi && \
      node scripts/release/validate-publication-tarball.ts "$archive_path" && \
      cp "$archive_path" ".archives/$archive_name"; \
    done

# Verifies .archives/ contains REQUIRED_ARCHIVE_FILES and at least one react-form-builder-*.tgz.
VALIDATE_ARCHIVES:
  FUNCTION
  ARG archivesDir=.archives
  RUN set -eu && \
    test -d "$archivesDir" || { echo "Missing archives directory $archivesDir" >&2; exit 1; } && \
    find "$archivesDir" -maxdepth 1 -type f | grep -q . || { echo "$archivesDir is empty" >&2; exit 1; } && \
    required=$(node -e "import {REQUIRED_ARCHIVE_FILES} from './scripts/release/constants.ts'; process.stdout.write(REQUIRED_ARCHIVE_FILES.join(' '))") && \
    for name in $required; do \
      test -f "$archivesDir/$name" || { echo "Missing $archivesDir/$name" >&2; exit 1; }; \
    done && \
    find "$archivesDir" -maxdepth 1 -type f -name 'react-form-builder-*.tgz' | grep -q . || { echo "No react-form-builder-*.tgz in $archivesDir" >&2; exit 1; } && \
    echo "Archives OK: $archivesDir"

# --- Dependencies (repo-root build context) ---

dependencies:
  WORKDIR /repo
  COPY package.json package-lock.json package.public.json package.private.json lerna.json biome.json .npmrc LICENSE.md README.private.md CHANGELOG.md ./
  COPY .editorconfig .gitignore .eslintrc.cjs .eslintignore tsconfig.json vite.config.ts knip.config.ts vite-plugin-app-version.ts ./
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

# Source tree for formengine-src.tgz only (no npm ci — avoids node_modules in the archive).
formengine-src-sources:
  WORKDIR /repo
  COPY package.json package-lock.json package.public.json package.private.json lerna.json biome.json .npmrc LICENSE.md README.private.md CHANGELOG.md ./
  COPY .editorconfig .gitignore .eslintrc.cjs .eslintignore tsconfig.json vite.config.ts knip.config.ts vite-plugin-app-version.ts ./
  COPY .madgerc ./
  COPY --dir packages documentation tests scripts examples ./

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
  ENV NODE_OPTIONS="--max-old-space-size=8192"
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
  DO +VALIDATE_ARCHIVES --archivesDir=.archives
  RUN --secret GH_TOKEN \
    node scripts/release/upload-release-artifacts.ts

validate-rc-archives:
  FROM node:24.18.0
  WORKDIR /repo
  COPY scripts/release scripts/release
  COPY .archives .archives
  DO +VALIDATE_ARCHIVES --archivesDir=.archives

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
  RUN find packages -name 'react-form-builder-*.tgz' -delete
  DO +PREPARE_NPM_ARCHIVES --fromPack=0
  SAVE ARTIFACT --force .archives/* AS LOCAL .archives/

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

prepare-formengine-src-archive:
  FROM +formengine-src-sources
  WORKDIR /repo
  RUN set -eu && \
    excludes=$(node -e "import {FORMENGINE_SRC_TAR_EXCLUDES} from './scripts/release/constants.ts'; process.stdout.write(FORMENGINE_SRC_TAR_EXCLUDES.map((e) => '--exclude=' + e).join(' '))") && \
    tar -czf /tmp/formengine-src.tgz $excludes -C /repo .
  SAVE ARTIFACT --force /tmp/formengine-src.tgz AS LOCAL .archives/formengine-src.tgz

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
  BUILD +prepare-formengine-src-archive
  BUILD +prepare-demo-archive
  BUILD +prepare-formbuilder-archive
  BUILD +prepare-documentation-archive
  BUILD +prepare-version-archive
  BUILD +prepare-github-release-notes-archive

prepare-rc-archives-from-pack:
  # Documentation archive is built separately (ci-build-documentation GHA job).
  BUILD +prepare-formengine-src-archive
  BUILD +prepare-demo-archive
  BUILD +prepare-formbuilder-archive
  BUILD +prepare-version-archive
  BUILD +prepare-github-release-notes-archive
  FROM +sources
  WORKDIR /repo
  ENV NODE_OPTIONS="--max-old-space-size=8192"
  RUN find packages -name 'react-form-builder-*.tgz' -delete
  RUN npm run pack:ci
  DO +PREPARE_NPM_ARCHIVES --fromPack=1
  RUN mkdir -p .archives
  COPY +prepare-formengine-src-archive/formengine-src.tgz .archives/formengine-src.tgz
  COPY +prepare-demo-archive/demo.tgz .archives/demo.tgz
  COPY +prepare-formbuilder-archive/formbuilder.tgz .archives/formbuilder.tgz
  COPY +prepare-version-archive/lerna.json .archives/lerna.json
  COPY +prepare-github-release-notes-archive/gh-release-notes.tgz .archives/gh-release-notes.tgz
  SAVE ARTIFACT --force .archives/* AS LOCAL .archives/
