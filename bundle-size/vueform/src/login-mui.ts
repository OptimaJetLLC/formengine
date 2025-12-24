import Vueform, {
  ButtonElement,
  CheckboxElement,
  ElementAddon,
  ElementDescription,
  ElementError,
  ElementInfo,
  ElementLabel,
  ElementLabelFloating,
  ElementLayout,
  ElementLoader,
  ElementMessage,
  ElementRequired,
  ElementText,
  FormErrors,
  TextElement,
} from '@vueform/vueform/src/core.js'
import {createApp} from 'vue'
import vueformConfig from '../vueform-mui.config-login.ts'
import {LoginApp} from './utils.ts'

const app = createApp(LoginApp)
app.use(Vueform, {
  ...vueformConfig,
  components: {
    FormErrors,
    ElementLoader,
    ElementAddon,
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
})
app.mount('#app')
