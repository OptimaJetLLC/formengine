import {updateDependenciesVersion} from './util/update-deps-version.js'
import {readVersions} from './util/read-versions.js'

const versions = readVersions()
updateDependenciesVersion(versions['NpmVersion'])
