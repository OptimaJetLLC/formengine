import fs from 'fs'
import {fileURLToPath} from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const configFilePath = path.join(__dirname, '..', 'src', 'utils', 'config.json')

const content = fs.readFileSync(configFilePath, 'utf8');
const config = JSON.parse(content)

config.releaseDate = new Date().getTime()
const modifiedContent = JSON.stringify(config, undefined, 2) + '\n'
fs.writeFileSync(configFilePath, modifiedContent)
