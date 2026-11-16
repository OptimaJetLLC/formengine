VERSION --try 0.8

FROM node:26.13.1

# --- Shared helpers ---

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

COPY_PRODUCTION_SOURCES:
  FUNCTION
  COPY lerna.json tsconfig.json vite.config.ts vite-license-defines.ts vite-plugin-app-version.ts vite-plugin-api-extractor.ts ./
  COPY --dir packages ./
  COPY --dir scripts/cli-lib scripts/release ./scripts/
  COPY scripts/build-with-concurrency.ts scripts/build-apps-and-views-with-concurrency.ts scripts/pack-with-concurrency.ts ./scripts/

# --- Dependencies (repo-root build context) ---

dependencies:
  WORKDIR /repo
  COPY package.json package-lock.json .npmrc ./
  # Workspace package.json + file: archives from package-lock.json. Examples and build config are not install inputs.
  RUN node -e "
    const {readFileSync} = require('fs')
    const {posix} = require('path')
    const {packages} = JSON.parse(readFileSync('package-lock.json', 'utf8'))
    const inputs = new Set()
    for (const [packagePath, meta] of Object.entries(packages)) {
      if (packagePath && !packagePath.split('/').includes('node_modules')) {
        inputs.add(posix.join(packagePath, 'package.json'))
      }
      if (meta.resolved?.startsWith('file:')) {
        inputs.add(meta.resolved.slice('file:'.length))
      }
    }
    for (const input of inputs) {
      if (!input.endsWith('package.json') && !input.endsWith('.tgz')) {
        throw new Error('Unsupported npm install input (add COPY --dir support): ' + input)
      }
    }
    process.stdout.write([...inputs].sort().join('\n') + '\n')
  " > /tmp/npm-install-inputs
  FOR dependency_input IN $(cat /tmp/npm-install-inputs)
    COPY "$dependency_input" "./$dependency_input"
  END
  ENV npm_config_audit=false
  ENV npm_config_fund=false
  ENV npm_config_progress=true
  RUN --mount=type=cache,target=/root/.npm npm ci --no-audit --no-fund --prefer-offline
  SAVE ARTIFACT /repo /repo

production-sources:
  FROM +dependencies
  DO +COPY_PRODUCTION_SOURCES

test-sources:
  FROM +production-sources
  COPY scripts/write-test-license-env.ts scripts/write-test-license-env.ts
  COPY --dir tests ./
  SAVE ARTIFACT /repo /repo

documentation-sources:
  ARG ENABLE_TYPEDOC=false
  FROM +dependencies
  COPY lerna.json tsconfig.json ./
  COPY --dir documentation ./
  IF [ "$ENABLE_TYPEDOC" = "true" ]
    DO +COPY_PRODUCTION_SOURCES
  END
  ENV ENABLE_TYPEDOC=$ENABLE_TYPEDOC

designer-guide-sources:
  FROM +dependencies
  COPY --dir designer-guide ./

sources:
  FROM +dependencies
  COPY package.public.json package.private.json lerna.json biome.json LICENSE.md README.private.md CHANGELOG.md ./
  COPY .editorconfig .gitignore eslint.config.mjs eslint.base.mjs tsconfig.json vite.config.ts vite-license-defines.ts knip.config.ts vite-plugin-app-version.ts .mdxlintrc.mjs vite-plugin-api-extractor.ts ./
  COPY scripts/write-test-license-env.ts scripts/write-test-license-env.ts
  COPY .madgerc ./
  COPY --dir packages documentation designer-guide tests scripts examples ./
  SAVE ARTIFACT /repo /repo

# Source tree for formengine-src.tgz only (no npm ci - avoids node_modules in the archive).
formengine-src-sources:
  WORKDIR /repo
  COPY package.json package-lock.json package.public.json package.private.json lerna.json biome.json .npmrc LICENSE.md README.private.md CHANGELOG.md ./
  COPY .editorconfig .gitignore eslint.config.mjs eslint.base.mjs tsconfig.json vite.config.ts vite-license-defines.ts knip.config.ts vite-plugin-app-version.ts vite-plugin-api-extractor.ts ./
  COPY scripts/write-test-license-env.ts scripts/write-test-license-env.ts
  COPY .madgerc ./
  COPY --dir packages documentation designer-guide tests scripts examples ./

# --- CI ---

npm-build:
  FROM +production-sources
  WORKDIR /repo
  RUN npm run build:ci

npm-bundle:
  ARG prepareRcArchives=0
  IF [ "$prepareRcArchives" = "1" ]
    BUILD +prepare-rc-archives-from-pack
  ELSE
    FROM +production-sources
    WORKDIR /repo
    ENV NODE_OPTIONS="--max-old-space-size=8192"
    RUN npm run pack:ci
  END

npm-update-release-date:
  FROM +production-sources
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
  ARG ENABLE_TYPEDOC=false
  FROM +documentation-sources --ENABLE_TYPEDOC=$ENABLE_TYPEDOC
  ENV NODE_OPTIONS="--max-old-space-size=8192"
  WORKDIR /repo
  RUN npm run docs:build

npm-designer-guide-build:
  FROM +designer-guide-sources
  WORKDIR /repo
  RUN npm run designer-guide:build

npm-documentation-sites-build:
  ARG ENABLE_TYPEDOC=false
  BUILD +npm-documentation-build --ENABLE_TYPEDOC=$ENABLE_TYPEDOC
  BUILD +npm-designer-guide-build

npm-publish-rc-release:
  FROM node:26.13.1
  WORKDIR /repo
  COPY scripts/release scripts/release
  COPY .archives .archives
  # Draft host is optimajet/formengine (not the product CI repo). REPO_SLUG/GITHUB_SHA are the
  # formengine slug and target_commitish (usually master), not the fb commit.
  ARG --required REPO_SLUG
  ARG --required GITHUB_SHA
  ENV DRAFT_RELEASE_GITHUB_REPOSITORY=$REPO_SLUG
  ENV DRAFT_RELEASE_TARGET_COMMITISH=$GITHUB_SHA
  DO +VALIDATE_ARCHIVES --archivesDir=.archives
  RUN --secret GH_TOKEN \
    node scripts/release/upload-release-artifacts.ts

validate-rc-archives:
  FROM node:26.13.1
  WORKDIR /repo
  COPY scripts/release scripts/release
  COPY .archives .archives
  DO +VALIDATE_ARCHIVES --archivesDir=.archives

npm-test:
  FROM +test-sources
  WORKDIR /repo
  ENV CI=true
  RUN --secret FORMENGINE_TEST_LICENSE_KEY --secret FORMENGINE_TEST_LICENSE_KEYS_JSON --secret FORMENGINE_FORMS_WITH_VERSIONS_LICENSE_KEY \
    node scripts/write-test-license-env.ts
  TRY
    RUN npm run test:module
  FINALLY
    SAVE ARTIFACT tests/module/reports/junit-report.xml AS LOCAL test-results/module.xml
  END
  TRY
    RUN npm run test:component
  FINALLY
    SAVE ARTIFACT tests/react-18/reports/junit-report.xml AS LOCAL test-results/react-18-report.xml
    SAVE ARTIFACT tests/react-19/reports/junit-report.xml AS LOCAL test-results/react-19-report.xml
  END

npm-check-all:
  FROM +sources
  WORKDIR /repo
  COPY .nvmrc AGENTS.md CONTRIBUTING.md ./
  RUN npm rebuild
  RUN npm run check-all

npm-check-circular-deps:
  FROM +sources
  WORKDIR /repo
  RUN npm run check:circular-deps

npm-eslint:
  FROM +sources
  WORKDIR /repo
  RUN npm run check:eslint

npm-check-unused-exports:
  FROM +sources
  WORKDIR /repo
  RUN npm run check:unused-exports

npm-check-tsc:
  FROM +sources
  WORKDIR /repo
  RUN npm run check:tsc

npm-e2e:
  FROM mcr.microsoft.com/playwright:v1.64.1-noble
  ENV CI=true
  ENV PLAYWRIGHT_DOCKER=1
  ENV PLAYWRIGHT_SKIP_VALIDATE_HOST_REQUIREMENTS=1
  COPY +test-sources/repo+ /repo
  WORKDIR /repo
  RUN --secret FORMENGINE_TEST_LICENSE_KEY --secret FORMENGINE_TEST_LICENSE_KEYS_JSON --secret FORMENGINE_FORMS_WITH_VERSIONS_LICENSE_KEY \
    node scripts/write-test-license-env.ts
  RUN --no-cache npm run test:e2e; echo $? > /tmp/npm-e2e-exit-code
  WAIT
    SAVE ARTIFACT --if-exists tests/e2e/reports/ctrf/ctrf-report.json AS LOCAL tests/e2e/reports/ctrf/ctrf-report.json
  END
  RUN exit "$(cat /tmp/npm-e2e-exit-code)"
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
  ARG ENABLE_TYPEDOC=false
  FROM +npm-documentation-build --ENABLE_TYPEDOC=$ENABLE_TYPEDOC
  WORKDIR /repo
  RUN tar -czvf documentation.tgz -C documentation/website/build .
  SAVE ARTIFACT --force documentation.tgz AS LOCAL .archives/documentation.tgz

prepare-designer-guide-archive:
  FROM +npm-designer-guide-build
  WORKDIR /repo
  RUN tar -czvf designer-guide.tgz -C designer-guide/dist .
  SAVE ARTIFACT --force designer-guide.tgz AS LOCAL .archives/designer-guide.tgz

prepare-documentation-sites-archives:
  ARG ENABLE_TYPEDOC=false
  BUILD +prepare-documentation-archive --ENABLE_TYPEDOC=$ENABLE_TYPEDOC
  BUILD +prepare-designer-guide-archive

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
  BUILD +prepare-designer-guide-archive
  BUILD +prepare-version-archive
  BUILD +prepare-github-release-notes-archive

prepare-rc-archives-from-pack:
  # Documentation archive is built separately (ci-build-documentation GHA job).
  BUILD +prepare-formengine-src-archive
  BUILD +prepare-demo-archive
  BUILD +prepare-formbuilder-archive
  BUILD +prepare-version-archive
  BUILD +prepare-github-release-notes-archive
  FROM +production-sources
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
