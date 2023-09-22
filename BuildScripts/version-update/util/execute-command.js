import {chdir, cwd} from 'node:process'
import {exec} from 'node:child_process'

export function executeCommand(command, path) {
  const workingDirectory = cwd()
  chdir(path)
  try {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(stderr)
        throw error
      }
      console.log(stdout)
    })
  } finally {
    chdir(workingDirectory)
  }
}
