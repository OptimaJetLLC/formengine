import {defineComponent, h, resolveComponent} from 'vue'
import {loginSchema} from './login-schema.ts'

export const handleSubmit = (data: unknown) => {
  console.warn('Form data', data)
  return false
}

export const todayIso = () => {
  const date = new Date()
  date.setDate(date.getDate() + 1)
  date.setHours(0, 0, 0, 0)
  return date.toISOString().slice(0, 10)
}

export const tomorrowIso = () => {
  const date = new Date()
  date.setDate(date.getDate() + 2)
  date.setHours(0, 0, 0, 0)
  return date.toISOString().slice(0, 10)
}

export const LoginApp = defineComponent({
  name: 'Login',
  setup() {
    return {
      loginSchema,
      handleSubmit,
    }
  },

  render() {
    const VueformComponent = resolveComponent('Vueform')

    return h(
      'div',
      {
        style: 'margin-bottom: 32px',
      },
      [
        h('h2', 'Login Form'),
        h(VueformComponent, {
          schema: this.loginSchema,
          onSubmit: this.handleSubmit,
          endpoint: false,
        }),
      ]
    )
  },
})
