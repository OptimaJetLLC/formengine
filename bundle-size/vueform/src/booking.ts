import Vueform, {
  CheckboxElement,
  DateElement,
  DatepickerWrapper,
  ElementAddon,
  ElementAddonOptions,
  ElementDescription,
  ElementError,
  ElementInfo,
  ElementLabel,
  ElementLabelFloating,
  ElementLayout,
  ElementLayoutInline,
  ElementLoader,
  ElementMessage,
  ElementRequired,
  ElementText,
  FormErrors,
  FormMessages,
  FormStep,
  FormSteps,
  FormStepsControl,
  FormStepsControls,
  MultiselectElement,
  SelectElement,
  TextareaElement,
  TextElement,
  Validator,
} from '@vueform/vueform/src/core.js'
import {computed, createApp, defineComponent, h, ref, resolveComponent} from 'vue'
import vueformConfig from './../vueform.config-booking'
import {handleSubmit, todayIso, tomorrowIso} from './utils.ts'

const App = defineComponent({
  name: 'Booking',
  setup() {
    const formRef = ref()
    const checkInDateValue = ref('')

    const CheckInDateValidator = class extends Validator {
      get msg() {
        return "Check-in date cannot precede today's date."
      }

      check(value: string) {
        if (!value) return true
        const checkIn = new Date(value)
        checkIn.setHours(0, 0, 0, 0)
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        return checkIn >= today
      }
    }

    const createCheckOutDateValidator = () => {
      return class extends Validator {
        get msg() {
          return 'Invalid date range: check-out date cannot precede check-in date.'
        }

        check(value: string) {
          if (!value) return true
          const checkOut = new Date(value)
          checkOut.setHours(0, 0, 0, 0)
          if (!checkInDateValue.value) return true
          const checkIn = new Date(checkInDateValue.value)
          checkIn.setHours(0, 0, 0, 0)
          return checkOut >= checkIn
        }
      }
    }

    const CheckOutDateValidator = createCheckOutDateValidator()

    const steps = computed(() => ({
      page1: {
        label: 'Booking Details',
        elements: [
          'check-in-date',
          'check-out-date',
          'number-of-guests',
          'room-type',
          'non-smoking',
          'number-of-rooms',
          'with-pets',
          'extras',
          'notes',
        ],
      },
      page2: {
        label: 'Traveler Info',
        elements: ['last-name', 'first-name', 'address-line-1', 'address-line-2', 'city', 'zip', 'state', 'country', 'phone'],
      },
    }))

    const bookingSchema = computed(() => ({
      'check-in-date': {
        type: 'date',
        label: 'Check-in',
        placeholder: 'Check-in',
        description: "Check-in date cannot precede today's date.",
        default: todayIso(),
        rules: [CheckInDateValidator],
        update: (value: string) => {
          checkInDateValue.value = value || todayIso()
          if (formRef.value?.$vueform) {
            const checkOutField = formRef.value.$vueform.get('check-out-date')
            if (checkOutField) {
              checkOutField.validate()
            }
          }
        },
      },
      'check-out-date': {
        type: 'date',
        label: 'Check-out',
        placeholder: 'Check-out',
        description: 'Invalid date range: check-out date cannot precede check-in date.',
        default: tomorrowIso(),
        rules: [CheckOutDateValidator],
      },
      'number-of-guests': {
        type: 'select',
        label: 'Number of guests',
        placeholder: '# of guests',
        items: [
          {value: '1', label: '1'},
          {value: '2', label: '2'},
          {value: '3', label: '3'},
          {value: '4', label: '4'},
          {value: '5', label: '5'},
          {value: '6', label: '6'},
          {value: '7', label: '7'},
          {value: '8', label: '8'},
          {value: '9', label: '9'},
          {value: '10+', label: '10+'},
        ],
        default: '2',
      },
      'room-type': {
        type: 'select',
        label: 'Room type',
        placeholder: 'Room type',
        items: [
          {value: 'queen', label: 'Queen Room'},
          {value: 'king', label: 'King Room'},
          {value: 'deluxe-king', label: 'Deluxe King Room'},
          {value: 'superior-king', label: 'Superior King Room'},
        ],
        default: 'queen',
        rules: ['required'],
      },
      'non-smoking': {
        type: 'checkbox',
        label: 'Non-smoking',
        default: false,
      },
      'number-of-rooms': {
        type: 'number',
        label: 'Number of rooms',
        placeholder: '# of rooms',
        min: 1,
        max: 5,
        default: 1,
      },
      'with-pets': {
        type: 'checkbox',
        label: 'I am traveling with pets',
        default: false,
      },
      extras: {
        type: 'multiselect',
        label: 'Extras',
        placeholder: 'Extras',
        items: [
          {value: 'Breakfast', label: 'Breakfast'},
          {value: 'Fitness', label: 'Fitness'},
          {value: 'Parking', label: 'Parking'},
          {value: 'Swimming pool', label: 'Swimming pool'},
          {value: 'Restaurant', label: 'Restaurant'},
          {value: 'Spa', label: 'Spa'},
        ],
        default: [],
      },
      notes: {
        type: 'textarea',
        label: 'Notes',
        placeholder: 'Notes...',
        default: '',
      },
      'last-name': {
        type: 'text',
        label: 'Last name',
        placeholder: 'Last name',
        description: 'Must match the passport exactly.',
        rules: ['required'],
      },
      'first-name': {
        type: 'text',
        label: 'First name',
        placeholder: 'First name',
        rules: ['required'],
      },
      'address-line-1': {
        type: 'text',
        label: 'Address line 1',
        placeholder: 'Address line 1',
      },
      'address-line-2': {
        type: 'text',
        label: 'Address line 2',
        placeholder: 'Address line 2',
      },
      city: {
        type: 'text',
        label: 'City',
        placeholder: 'City',
      },
      zip: {
        type: 'text',
        label: 'Zip code',
        placeholder: 'Zip code',
      },
      state: {
        type: 'text',
        label: 'State',
        placeholder: 'State',
      },
      country: {
        type: 'select',
        label: 'Country',
        placeholder: 'Country',
        items: [
          {value: 'United States', label: 'United States'},
          {value: 'Canada', label: 'Canada'},
          {value: 'United Kingdom', label: 'United Kingdom'},
          {value: 'France', label: 'France'},
          {value: 'Germany', label: 'Germany'},
          {value: 'Japan', label: 'Japan'},
        ],
      },
      phone: {
        type: 'text',
        label: 'Phone',
        placeholder: 'Phone',
        description: 'Example: +1 (555) 777-55-22',
        rules: ['regex:^\\+?[0-9\\s().-]{7,}$'],
      },
    }))

    return {
      formRef,
      steps,
      bookingSchema,
      handleSubmit,
    }
  },
  render() {
    const VueformComponent = resolveComponent('Vueform')

    return h('div', [
      h(VueformComponent, {
        ref: 'formRef',
        schema: this.bookingSchema,
        steps: this.steps,
        endpoint: false,
        onSubmit: this.handleSubmit,
      }),
    ])
  },
})

const app = createApp(App)
app.use(Vueform, {
  ...vueformConfig,
  components: {
    FormErrors,
    FormMessages,
    FormSteps,
    FormStep,
    FormStepsControls,
    FormStepsControl,
    ElementLayout,
    ElementLayoutInline,
    ElementLoader,
    ElementLabelFloating,
    ElementLabel,
    ElementInfo,
    ElementDescription,
    ElementError,
    ElementRequired,
    ElementMessage,
    ElementText,
    ElementAddon,
    ElementAddonOptions,
    TextElement,
    CheckboxElement,
    DateElement,
    DatepickerWrapper,
    MultiselectElement,
    SelectElement,
    TextareaElement,
  },
})
app.mount('#app')
