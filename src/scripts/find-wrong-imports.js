import fs from 'node:fs'

const wrongImportRegex = /import.*from\s*['|"]@.*\/src\/.*['|"]/g

const errors = []

const needAnalyzeFile = file => {
  return file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.jsx')
}

function readFiles(dir) {
  const fileList = fs.readdirSync(dir)
  for (const file of fileList) {
    const name = `${dir}/${file}`
    if (fs.statSync(name).isDirectory()) {
      readFiles(name)
    } else {
      const content = fs.readFileSync(name, 'utf-8')
      if (needAnalyzeFile(name) && content.match(wrongImportRegex)) {
        errors.push(name)
      }
    }
  }
}

readFiles('./packages')

if (errors.length === 0) {
  process.exit(0)
}

console.error('Wrong imports found:')
errors.forEach(error => console.error(error))

process.exit(1)
