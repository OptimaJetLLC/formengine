import '@testing-library/jest-dom'
import failOnConsole from 'vitest-fail-on-console'
import {addMatchMediaFunctionToWindow} from './matchMedia.mock'

addMatchMediaFunctionToWindow()

failOnConsole()
