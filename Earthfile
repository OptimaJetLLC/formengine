VERSION 0.8
FROM node:20.17.0
WORKDIR /form-engine

# npm-build builds all npm packages
npm-build:
  FROM +sources
  RUN NODE_OPTIONS="--max-old-space-size=4096" npm run build

# npm-bundle builds all npm bundles
npm-bundle:
  FROM +sources
  RUN npm run bundle

# npm-update-release-date updates the demo release date
npm-update-release-date:
  FROM +sources
  RUN cd ./packages/apps/demo && npm run update-release-date

# npm-demo-build builds demo
npm-demo-build:
  FROM +npm-update-release-date
  RUN NODE_OPTIONS="--max-old-space-size=4096" npm run demo:build

# npm-documentation-build builds documentation
npm-documentation-build:
  FROM +sources
  RUN npm run docs:build

# npm-check-circular-deps checks for cyclic dependencies
npm-check-circular-deps:
  FROM +sources
  RUN npm run check:circular-deps

# npm-check-wrong-imports check for incorrect import statements
npm-check-wrong-imports:
  FROM +sources
  RUN npm run check:wrong-imports

# npm-eslint performs eslint
npm-eslint:
  FROM +sources
  RUN NODE_OPTIONS="--max-old-space-size=4096" npm run eslint

# npm-check-unused-exports checks for unused import statements
npm-check-unused-exports:
  FROM +sources
  RUN npm run check:unused-exports

# npm-check-tsc performs a TypeScript compilation check
npm-check-tsc:
  FROM +sources
  RUN npm run check:tsc

# prepare-npm-archives packs npm modules into tgz archives
prepare-npm-archives:
  FROM +sources
  RUN apt-get update && apt-get -y install jq
  LET packagesToArchive = 'packages/core packages/designer packages/designer-bundle packages/viewer-bundle packages/views/rsuite packages/views/fast-qr packages/views/rich-text packages/views/google-map'
  LET archiveName = ''
  FOR package IN $packagesToArchive
    RUN cd $package && npm run bundle
    # We use jq to get the archive name from the npm pack command
    SET archiveName=$(cd $package && npm pack --json | jq -r .[0].filename)
    SAVE ARTIFACT $package/$archiveName AS LOCAL .archives/$archiveName
  END

# prepare-demo-archive archive the demo
prepare-demo-archive:
  FROM +npm-demo-build
  RUN cd packages/apps/demo/dist/ && tar -zcvf demo.tgz *
  SAVE ARTIFACT packages/apps/demo/dist/demo.tgz AS LOCAL .archives/demo.tgz

# prepare-documentation-archive archive the documentation
prepare-documentation-archive:
  FROM +npm-documentation-build
  RUN tar -czvf documentation.tgz -C documentation/website/build .
  SAVE ARTIFACT documentation.tgz AS LOCAL .archives/documentation.tgz

# prepare-github-formengine-archive creates an archive for the GitHub repository optimajet/formengine
prepare-github-formengine-archive:
  COPY --dir sample-apps/formengine github-formengine
  COPY --dir examples github-formengine
  RUN tar -czvf formengine.tgz -C github-formengine .
  SAVE ARTIFACT formengine.tgz AS LOCAL .archives/formengine.tgz

# prepare-github-formenginesupport-archive creates an archive for the GitHub repository optimajet/formenginesupport
prepare-github-formenginesupport-archive:
  FROM +sources
  COPY --dir BuildScripts/private-sources BuildScripts/private-sources
  COPY .editorconfig .editorconfig
  RUN cd BuildScripts/private-sources && npm install
  RUN cd BuildScripts/private-sources && npm run create-private-sources
  SAVE ARTIFACT .archives/formenginesupport.zip AS LOCAL .archives/formenginesupport.zip

prepare-version-archive:
  COPY BuildScripts/version.txt version.txt
  SAVE ARTIFACT version.txt AS LOCAL .archives/version.txt

prepare-github-release-notes-archive:
  RUN mkdir -p gh-release-notes
  COPY --dir BuildScripts/github-release-notes ./gh-release-notes
  COPY --dir BuildScripts/github ./gh-release-notes
  RUN tar -czvf gh-release-notes.tgz -C gh-release-notes .
  SAVE ARTIFACT gh-release-notes.tgz AS LOCAL .archives/gh-release-notes.tgz

# prepare-all-archives creates all archives for publishing
prepare-all-archives:
  BUILD +prepare-npm-archives
  BUILD +prepare-github-formengine-archive
  BUILD +prepare-github-formenginesupport-archive
  BUILD +prepare-demo-archive
  BUILD +prepare-documentation-archive
  BUILD +prepare-version-archive
  BUILD +prepare-github-release-notes-archive

PUBLISH_DEMO:
  FUNCTION
  RUN mkdir -p ~/.ssh
  RUN echo "demo.formengine.io ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBA0e2FxO/vVLKPM9R4Xd64wmh7G//xe2yZyY2SKF8CXx3SjxuIScKaUx9B8gEPz2Xq7iIFiUT3rVDgCbFQ72bvQ=" >> ~/.ssh/known_hosts
  RUN --push --ssh scp demo.tgz root@demo.formengine.io:/home/demo-fb2/archive
  RUN --push --ssh ssh root@demo.formengine.io 'tar -xvf /home/demo-fb2/archive/demo.tgz -C /home/demo-fb2/www/'

# publish-artifact-demo publishes a demo from a local artifact
publish-artifact-demo:
  COPY +prepare-demo-archive/demo.tgz demo.tgz
  DO +PUBLISH_DEMO

# publish-archive-demo publishes a demo from the local ".archives" folder
publish-archive-demo:
  COPY .archives/demo.tgz ./
  DO +PUBLISH_DEMO

PUBLISH_DOCUMENTATION:
  FUNCTION
  RUN mkdir -p ~/.ssh
  RUN echo "formengine.io ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIH2R3RNAOu8lPXTAZc1gPB7SCOGjMcpcc50c2uTzOt6h" >> ~/.ssh/known_hosts
  RUN --push --ssh scp documentation.tgz root@formengine.io:/home/formengine-site/archive
  RUN --push --ssh ssh root@formengine.io 'tar -xvf /home/formengine-site/archive/documentation.tgz -C /home/formengine-site/www/documentation'

# publish-artifact-documentation publishes documentation from the local artifact
publish-artifact-documentation:
  COPY +prepare-documentation-archive/documentation.tgz documentation.tgz
  DO +PUBLISH_DOCUMENTATION

# publish-archive-documentation publishes documentation from the local ".archives" folder
publish-archive-documentation:
  COPY .archives/documentation.tgz ./
  DO +PUBLISH_DOCUMENTATION

PUBLISH_GITHUB_OPTIMAJET_FORMENGINE:
  FUNCTION
  ARG --required disableDryRun
  LET gitUrl=git@github.com:optimajet/formengine.git
  LET libVersion=$(awk -F "=" '/NpmVersion/ {print $2}' version.txt | tr -d "\r")
  LET gitDestDir=formengine-copy
  DO +DEEP_CLONE_GITHUB_REPOSITORY --gitUrl=$gitUrl --destDir=$gitDestDir

  LET tempGitDir=gh-formengine
  RUN mkdir -p $tempGitDir
  RUN cp -r $gitDestDir/.git $tempGitDir
  RUN rm -rf $gitDestDir
  RUN tar -xvf formengine.tgz -C $tempGitDir

  WORKDIR $tempGitDir
  RUN npm install
  RUN npm install @react-form-builder/core@$libVersion @react-form-builder/designer@$libVersion @react-form-builder/components-rsuite@$libVersion
  RUN rm -rf node_modules
  DO +GITHUB_COMMIT_AND_PUSH --gitRepository=$gitUrl --gitBranch=master --commitMessage="Version $libVersion (autocommit)" --disableDryRun=$disableDryRun

# publish-artifact-github-optimajet-formengine updates the GitHub repository optimajet/formengine from the local artifact
publish-artifact-github-optimajet-formengine:
  COPY +prepare-github-formengine-archive/formengine.tgz formengine.tgz
  COPY +prepare-version-archive/version.txt version.txt
  ARG disableDryRun=false
  DO +PUBLISH_GITHUB_OPTIMAJET_FORMENGINE --disableDryRun=$disableDryRun

# publish-archive-github-optimajet-formengine updates the GitHub repository optimajet/formengine from the local ".archives" folder
publish-archive-github-optimajet-formengine:
  COPY .archives/formengine.tgz ./
  COPY .archives/version.txt ./
  ARG disableDryRun=false
  DO +PUBLISH_GITHUB_OPTIMAJET_FORMENGINE --disableDryRun=$disableDryRun

PUBLISH_GITHUB_OPTIMAJET_FORMENGINESUPPORT:
  FUNCTION
  ARG --required disableDryRun
  LET gitUrl=git@github.com:optimajet/formenginesupport.git
  LET libVersion=$(awk -F "=" '/NpmVersion/ {print $2}' version.txt | tr -d "\r")
  LET gitDestDir=formenginesupport-copy
  DO +DEEP_CLONE_GITHUB_REPOSITORY --gitUrl=$gitUrl --destDir=$gitDestDir

  LET tempGitDir=gh-formenginesupport
  RUN mkdir -p $tempGitDir
  RUN cp -r $gitDestDir/.git $tempGitDir
  RUN rm -rf $gitDestDir
  RUN unzip formenginesupport.zip -d $tempGitDir

  WORKDIR $tempGitDir
  DO +GITHUB_COMMIT_AND_PUSH --gitRepository=$gitUrl --gitBranch=master --commitMessage="Version $libVersion (autocommit)" --disableDryRun=$disableDryRun

# publish-artifact-github-optimajet-formenginesupport updates the GitHub repository optimajet/formenginesupport from the local artifact
publish-artifact-github-optimajet-formenginesupport:
  COPY +prepare-github-formenginesupport-archive/formenginesupport.zip formenginesupport.zip
  COPY +prepare-version-archive/version.txt version.txt
  ARG disableDryRun=false
  DO +PUBLISH_GITHUB_OPTIMAJET_FORMENGINESUPPORT --disableDryRun=$disableDryRun

# publish-archive-github-optimajet-formenginesupport updates the GitHub repository optimajet/formenginesupport from the local ".archives" folder
publish-archive-github-optimajet-formenginesupport:
  COPY .archives/formenginesupport.zip ./
  COPY .archives/version.txt ./
  ARG disableDryRun=false
  DO +PUBLISH_GITHUB_OPTIMAJET_FORMENGINESUPPORT --disableDryRun=$disableDryRun

PUBLISH_GITHUB_RELEASE_NOTES:
  FUNCTION
  ARG owner=optimajet
  ARG --required repository
  ARG --required product
  RUN apt-get update && apt-get -y install jq

  RUN tar -xvf gh-release-notes.tgz -C ./

  LET libVersion=$(awk -F "=" '/NpmVersion/ {print $2}' version.txt | tr -d "\r")
  LET notesBody=$(cat github-release-notes/notes-$libVersion.md)
  RUN jq --null-input \
    --arg owner "$owner" \
    --arg repo "$repository" \
    --arg tagName "$libVersion" \
    --arg name "$product $libVersion" \
    --arg body "$notesBody" \
    '$ARGS.named' > ./github/release.json

  RUN cd github && npm install
  RUN --push --secret GITHUB_ACCESS_TOKEN cd github && \
    env GITHUB_ACCESS_TOKEN="$GITHUB_ACCESS_TOKEN" npm run create-release

# publish-artifact-github-optimajet-formenginesupport-release-notes creates release on the GitHub repository optimajet/formenginesupport
# from local artifacts
publish-artifact-github-optimajet-formenginesupport-release-notes:
  COPY +prepare-github-release-notes-archive/gh-release-notes.tgz ./
  COPY +prepare-version-archive/version.txt version.txt
  DO +PUBLISH_GITHUB_RELEASE_NOTES --repository=formenginesupport --product="Form Engine"

# publish-archive-github-optimajet-formenginesupport-release-notes creates release on the GitHub repository optimajet/formenginesupport
# from local archives
publish-archive-github-optimajet-formenginesupport-release-notes:
  COPY .archives/gh-release-notes.tgz ./
  COPY .archives/version.txt ./
  DO +PUBLISH_GITHUB_RELEASE_NOTES --repository=formenginesupport --product="Form Engine"

# publish-artifact-github-optimajet-formengine-release-notes creates release on the GitHub repository optimajet/formengine
# from local artifacts
publish-artifact-github-optimajet-formengine-release-notes:
  COPY +prepare-github-release-notes-archive/gh-release-notes.tgz ./
  COPY +prepare-version-archive/version.txt version.txt
  DO +PUBLISH_GITHUB_RELEASE_NOTES --repository=formengine --product="Form Engine"

# publish-archive-github-optimajet-formengine-release-notes creates release on the GitHub repository optimajet/formengine
# from local archives
publish-archive-github-optimajet-formengine-release-notes:
  COPY .archives/gh-release-notes.tgz ./
  COPY .archives/version.txt ./
  DO +PUBLISH_GITHUB_RELEASE_NOTES --repository=formengine --product="Form Engine"

PUBLISH_NPM_PACKAGE:
  FUNCTION
  ARG --required disableDryRun
  ARG --required archivePrefix
  LET libVersion=$(awk -F "=" '/NpmVersion/ {print $2}' version.txt | tr -d "\r")
  LET libTag=$(awk -F "=" '/NpmPublishTag/ {print $2}' version.txt | tr -d "\r")
  LET fileName="$archivePrefix-$libVersion.tgz"
  LET tempFolderName=temp
  RUN mkdir -p $tempFolderName
  RUN tar -xvf $fileName -C $tempFolderName
  # We use jq to get the package name and version
  LET packageName=$(jq -r .name $tempFolderName/package/package.json)
  LET packageVersion=$(jq -r .version $tempFolderName/package/package.json)
  RUN rm -rf $tempFolderName

  LET fullName="$packageName@$packageVersion"
  LET existsCheck=$(npm view --json $fullName | jq -r .name 2>&1)
  IF [ "$existsCheck" != "$packageName" ]
    IF [ "$disableDryRun" = "true" ]
      RUN --push npm publish $fileName --access public --tag $libTag
    ELSE
      RUN --push npm publish --dry-run $fileName --access public --tag $libTag
    END
  ELSE
    RUN --push echo "Package $fullName already published"
  END

PUBLISH_RELEASE_TO_NPM:
  FUNCTION
  ARG --required disableDryRun
  RUN apt-get update && apt-get -y install jq
  RUN --secret NPMRC_FILE printf "$NPMRC_FILE" > ~/.npmrc
  DO +PUBLISH_NPM_PACKAGE --disableDryRun=$disableDryRun --archivePrefix="react-form-builder-core"
  DO +PUBLISH_NPM_PACKAGE --disableDryRun=$disableDryRun --archivePrefix="react-form-builder-designer"
  DO +PUBLISH_NPM_PACKAGE --disableDryRun=$disableDryRun --archivePrefix="react-form-builder-components-rsuite"
  DO +PUBLISH_NPM_PACKAGE --disableDryRun=$disableDryRun --archivePrefix="react-form-builder-components-fast-qr"
  DO +PUBLISH_NPM_PACKAGE --disableDryRun=$disableDryRun --archivePrefix="react-form-builder-components-rich-text"
  DO +PUBLISH_NPM_PACKAGE --disableDryRun=$disableDryRun --archivePrefix="react-form-builder-components-google-map"
  DO +PUBLISH_NPM_PACKAGE --disableDryRun=$disableDryRun --archivePrefix="react-form-builder-designer-bundle"
  DO +PUBLISH_NPM_PACKAGE --disableDryRun=$disableDryRun --archivePrefix="react-form-builder-viewer-bundle"

# publish-artifact-release-to-npm publishes npm packages from local artifacts
publish-artifact-release-to-npm:
  COPY +prepare-npm-archives/react-form-builder-*.tgz ./
  COPY +prepare-version-archive/version.txt version.txt
  ARG disableDryRun=false
  DO +PUBLISH_RELEASE_TO_NPM --disableDryRun=$disableDryRun

# publish-archive-release-to-npm publishes npm packages from the local ".archives" folder
publish-archive-release-to-npm:
  COPY .archives/react-form-builder-*.tgz ./
  COPY .archives/version.txt ./
  ARG disableDryRun=false
  DO +PUBLISH_RELEASE_TO_NPM --disableDryRun=$disableDryRun

run-sonar-analysis:
  FROM sonarsource/sonar-scanner-cli
  LET SONAR_HOST_URL=https://sonar.optimajet.com
  LET SONAR_SCANNER_OPTS=-Dsonar.projectKey=FB -Dsonar.scm.provider=git -Dsonar.sourceEncoding=UTF-8 -Dsonar.projectBaseDir=./
  WORKDIR /usr/src
  COPY +sources/form-engine ./
  COPY .git ./
  # Delete directories from the current working directory:
  RUN find . -name 'node_modules' -type d -prune -exec rm -rf '{}' +
  RUN --push --secret SONAR_FB_TOKEN echo "sonar.token=$SONAR_FB_TOKEN" > sonar-project.properties
  RUN --push sonar-scanner

# sources copies the source code
sources:
  FROM +dependencies
  COPY .eslintignore .eslintrc.cjs lerna.json LICENSE.md nx.json README.md tsconfig.json vite.config.ts ./
  COPY --dir types documentation packages scripts ./
  SAVE ARTIFACT /form-engine

# dependencies installs node_modules dependencies
dependencies:
  COPY package.json package-lock.json ./

  RUN mkdir documentation packages \
   documentation/website packages/apps packages/views \
   packages/apps/demo packages/apps/example-builder packages/apps/example-viewer \
   packages/core packages/designer packages/designer-bundle packages/indexed-db-form-storage \
   packages/viewer-bundle packages/views/antd packages/views/default packages/views/rsuite \
   packages/views/fast-qr \
   packages/views/rich-text \
   packages/views/google-map

  COPY documentation/website/package.json documentation/website

  COPY packages/apps/demo/package.json packages/apps/demo
  COPY packages/apps/example-builder/package.json packages/apps/example-builder
  COPY packages/apps/example-viewer/package.json packages/apps/example-viewer
  COPY packages/apps/example-viewer/package.json packages/apps/example-viewer

  COPY packages/core/package.json packages/core
  COPY packages/designer/package.json packages/designer
  COPY packages/designer-bundle/package.json packages/designer-bundle
  COPY packages/indexed-db-form-storage/package.json packages/indexed-db-form-storage
  COPY packages/viewer-bundle/package.json packages/viewer-bundle

  COPY packages/views/antd/package.json packages/views/antd
  COPY packages/views/default/package.json packages/views/default
  COPY packages/views/rsuite/package.json packages/views/rsuite
  COPY packages/views/fast-qr/package.json packages/views/fast-qr
  COPY packages/views/rich-text/package.json packages/views/rich-text
  COPY packages/views/google-map/package.json packages/views/google-map

  RUN npm install
  SAVE ARTIFACT package.json AS LOCAL package.json
  SAVE ARTIFACT package-lock.json AS LOCAL package-lock.json

GITHUB_COMMIT_AND_PUSH:
  FUNCTION
  ARG --required commitMessage
  ARG --required gitRepository
  ARG --required gitBranch
  ARG --required disableDryRun
  RUN git add --all
  RUN git config --global user.email "support@optimajet.com"
  RUN git config --global user.name "optimajet"
  RUN git commit -m "$commitMessage"
  IF [ "$disableDryRun" = "true" ]
    RUN --push --ssh git push --set-upstream $gitRepository $gitBranch
  ELSE
    RUN --push --ssh git push --dry-run --set-upstream $gitRepository $gitBranch
  END

DEEP_CLONE_GITHUB_REPOSITORY:
  FUNCTION
  DO +ADD_GITHUB_KNOWN_HOSTS
  ARG --required gitUrl
  ARG --required destDir
  RUN --ssh git clone $gitUrl $destDir

ADD_GITHUB_KNOWN_HOSTS:
  FUNCTION
  RUN mkdir -p ~/.ssh
  RUN echo "github.com ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCj7ndNxQowgcQnjshcLrqPEiiphnt+VTTvDP6mHBL9j1aNUkY4Ue1gvwnGLVlOhGeYrnZaMgRK6+PKCUXaDbC7qtbW8gIkhL7aGCsOr/C56SJMy/BCZfxd1nWzAOxSDPgVsmerOBYfNqltV9/hWCqBywINIR+5dIg6JTJ72pcEpEjcYgXkE2YEFXV1JHnsKgbLWNlhScqb2UmyRkQyytRLtL+38TGxkxCflmO+5Z8CSSNY7GidjMIZ7Q4zMjA2n1nGrlTDkzwDCsw+wqFPGQA179cnfGWOWRVruj16z6XyvxvjJwbz0wQZ75XK5tKSb7FNyeIEs4TT4jk+S4dhPeAUC5y+bDYirYgM4GC7uEnztnZyaVWQ7B381AK4Qdrwt51ZqExKbQpTUNn+EjqoTwvqNj4kqx5QUCI0ThS/YkOxJCXmPUWZbhjpCg56i+2aB6CmK2JGhn57K5mj0MNdBXA4/WnwH6XoPWJzK5Nyu2zB3nAZp+S5hpQs+p1vN1/wsjk=" >> ~/.ssh/known_hosts
  RUN echo "github.com ecdsa-sha2-nistp256 AAAAE2VjZHNhLXNoYTItbmlzdHAyNTYAAAAIbmlzdHAyNTYAAABBBEmKSENjQEezOmxkZMy7opKgwFB9nkt5YRrYMjNuG5N87uRgg6CLrbo5wAdT/y6v0mKV0U2w0WZ2YB/++Tpockg=" >> ~/.ssh/known_hosts
  RUN echo "github.com ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIOMqqnkVzrm0SdG6UOoqKLsabgH5C9okWi0dh2l9GKJl" >> ~/.ssh/known_hosts
