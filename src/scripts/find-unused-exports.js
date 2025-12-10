import {execSync} from 'node:child_process'

const patterns = ['index.ts', 'index-lite.ts', '.config.ts', 'view.ts', 'packages/.*/config/']
const grepArgs = patterns.map(pattern => `-e "${pattern.toString()}"`).join(' ')

const buffer = execSync(`npx ts-prune | grep -v -e ".d.ts:" | grep -v -e "(used in module)" ${grepArgs} || echo OK`)

const errors = buffer.toString()

if (errors.trim() === 'OK') {
  process.exit(0)
}

console.error(errors)
process.exit(1)
