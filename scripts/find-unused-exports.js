import {execSync} from 'child_process'

const buffer = execSync('npx ts-prune | grep -v -e "(used in module)" -e "index.ts" -e ".config.ts" -e "view.ts" || echo OK')

const errors = buffer.toString()

if (errors.trim() === 'OK') {
  process.exit(0)
}

console.error(errors)
process.exit(1)
