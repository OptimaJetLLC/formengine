import type {Definer} from '@react-form-builder/core'
import {muiBox} from './components/MuiBox'
import {muiBreadcrumbs} from './components/MuiBreadcrumbs'
import {muiButton} from './components/MuiButton'
import {muiButtonGroup} from './components/MuiButtonGroup'
import {muiCard} from './components/MuiCard'
import {muiCheckbox} from './components/MuiCheckbox'
import {muiCircularProgress} from './components/MuiCircularProgress'
import {muiContainer} from './components/MuiContainer'
import {muiErrorWrapper} from './components/MuiErrorWrapper'
import {muiFormControlLabel} from './components/MuiFormControlLabel'
import {muiFormLabel} from './components/MuiFormLabel'
import {muiLinearProgress} from './components/MuiLinearProgress'
import {muiLink} from './components/MuiLink'
import {muiRadioGroup} from './components/MuiRadioGroup'
import {muiRadioItem} from './components/MuiRadioItem'
import {muiSelect} from './components/MuiSelect'
import {muiSwitch} from './components/MuiSwitch'
import {muiTextField} from './components/MuiTextField'
import {muiTooltip} from './components/MuiTooltip'
import {muiTypography} from './components/MuiTypography'

/**
 * An array of Material UI component metadata factories.
 */
export const muiComponents: Definer<any>[] = [
  // inputs
  muiButton,
  muiButtonGroup,
  muiCheckbox,
  muiRadioGroup,
  muiRadioItem,
  muiSelect,
  muiSwitch,
  muiTextField,
  // dataDisplay
  muiTypography,
  muiTooltip,
  // feedback
  muiCircularProgress,
  muiErrorWrapper,
  muiLinearProgress,
  // layout
  muiBox,
  muiContainer,
  // surfaces
  muiCard,
  // navigation
  muiBreadcrumbs,
  muiLink,
  // form
  muiFormControlLabel,
  muiFormLabel,
]

const prefix = 'Mui'

muiComponents.forEach(c => {
  if (!c.getType().startsWith(prefix)) {
    throw new Error(`The component type must start with '${prefix}', type: '${c.getType()}'`)
  }
})

export const muiBuilderComponents = muiComponents.map(def => def.build())
