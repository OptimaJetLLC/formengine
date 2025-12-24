import en from '@vueform/vueform/locales/en'
import {defineConfig, email, min, regex, required} from '@vueform/vueform/src/core.js'

import {
  ButtonElement,
  CheckboxElement,
  classes,
  columns,
  ElementDescription,
  ElementError,
  ElementInfo,
  ElementLabel,
  ElementLabelFloating,
  ElementLayout,
  ElementMessage,
  ElementRequired,
  ElementText,
  FormElements,
  FormErrors,
  TextElement,
  Vueform,
} from '@vueform/vueform/themes/vueform'

import '@vueform/vueform/themes/vueform/css/index.min.css'

const vueform = {
  templates: {
    Vueform,
    FormElements,
    FormErrors,
    ElementLayout,
    ElementLabelFloating,
    ElementLabel,
    ElementInfo,
    ElementDescription,
    ElementError,
    ElementRequired,
    ElementMessage,
    ElementText,
    TextElement,
    CheckboxElement,
    ButtonElement,
  },
  classes,
  columns,
}

export default defineConfig({
  theme: vueform,
  locales: {en},
  locale: 'en',
  rules: {
    required,
    email,
    min,
    regex,
  },
})
