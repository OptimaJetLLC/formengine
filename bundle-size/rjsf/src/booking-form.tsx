import type {FormProps, IChangeEvent} from '@rjsf/core'
import type {FormValidation, RJSFSchema, UiSchema, ValidatorType} from '@rjsf/utils'
import validator from '@rjsf/validator-ajv8'
import {useCallback, useMemo, useState} from 'react'

type RoomType = 'queen' | 'king' | 'deluxe-king' | 'superior-king'

export interface BookingFormData {
  rowDatesGuests?: {
    checkInDate: string
    checkOutDate: string
    numberOfGuests?: string
  }
  rowRoomType?: {
    roomType?: RoomType
    nonSmoking?: boolean
  }
  rowRoomsPets?: {
    numberOfRooms?: number
    withPets?: boolean
  }
  rowExtras?: {
    extras?: string[]
  }
  rowNotes?: {
    notes?: string
  }
  // Keep flat structure for backward compatibility and easier access
  checkInDate?: string
  checkOutDate?: string
  numberOfGuests?: string
  roomType?: RoomType
  nonSmoking?: boolean
  numberOfRooms?: number
  withPets?: boolean
  extras?: string[]
  notes?: string
  lastName?: string
  firstName?: string
  addressLine1?: string
  addressLine2?: string
  city?: string
  zip?: string
  state?: string
  country?: string
  phone?: string
}

const todayIso = () => {
  const date = new Date()
  date.setDate(date.getDate() + 1)
  date.setHours(0, 0, 0, 0)
  return date.toISOString().slice(0, 10)
}
const tomorrowIso = () => {
  const date = new Date()
  date.setDate(date.getDate() + 2)
  date.setHours(0, 0, 0, 0)
  return date.toISOString().slice(0, 10)
}
export const defaultFormData: BookingFormData = {
  rowDatesGuests: {
    checkInDate: todayIso(),
    checkOutDate: tomorrowIso(),
    numberOfGuests: '2',
  },
  rowRoomType: {
    roomType: 'queen',
    nonSmoking: false,
  },
  rowRoomsPets: {
    numberOfRooms: 1,
    withPets: false,
  },
  rowExtras: {
    extras: [],
  },
  rowNotes: {
    notes: '',
  },
}
export const bookingSchema: RJSFSchema = {
  type: 'object',
  required: ['rowDatesGuests', 'rowRoomType'],
  properties: {
    rowDatesGuests: {
      type: 'object',
      title: '',
      required: ['checkInDate', 'checkOutDate'],
      properties: {
        checkInDate: {
          type: 'string',
          format: 'date',
          title: 'Check-in',
          description: "Check-in date cannot precede today's date.",
        },
        checkOutDate: {
          type: 'string',
          format: 'date',
          title: 'Check-out',
          description: 'Invalid date range: check-out date cannot precede check-in date.',
        },
        numberOfGuests: {
          type: 'string',
          title: 'Number of guests',
          enum: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10+'],
          default: '2',
        },
      },
    },
    rowRoomType: {
      type: 'object',
      title: '',
      required: ['roomType'],
      properties: {
        roomType: {
          type: 'string',
          title: 'Room type',
          oneOf: [
            {const: 'queen', title: 'Queen Room'},
            {const: 'king', title: 'King Room'},
            {const: 'deluxe-king', title: 'Deluxe King Room'},
            {const: 'superior-king', title: 'Superior King Room'},
          ],
        },
        nonSmoking: {
          type: 'boolean',
          title: 'Non-smoking',
          default: false,
        },
      },
    },
    rowRoomsPets: {
      type: 'object',
      title: '',
      properties: {
        numberOfRooms: {
          type: 'integer',
          title: 'Number of rooms',
          minimum: 1,
          maximum: 5,
        },
        withPets: {
          type: 'boolean',
          title: 'I am traveling with pets',
          default: false,
        },
      },
    },
    rowExtras: {
      type: 'object',
      title: '',
      properties: {
        extras: {
          type: 'array',
          title: 'Extras',
          uniqueItems: true,
          items: {
            type: 'string',
            enum: ['Breakfast', 'Fitness', 'Parking', 'Swimming pool', 'Restaurant', 'Spa'],
          },
        },
      },
    },
    rowNotes: {
      type: 'object',
      title: '',
      properties: {
        notes: {
          type: 'string',
          title: 'Notes',
        },
      },
    },
  },
}
export const travelerSchema: RJSFSchema = {
  title: 'Traveler info',
  type: 'object',
  required: ['rowContact'],
  properties: {
    rowContact: {
      type: 'object',
      title: '',
      required: ['firstName', 'lastName'],
      properties: {
        lastName: {
          type: 'string',
          title: 'Last name',
          description: 'Must match the passport exactly.',
          minLength: 1,
        },
        firstName: {
          type: 'string',
          title: 'First name',
          minLength: 1,
        },
      },
    },
    rowAddressLine1: {
      type: 'object',
      title: '',
      properties: {
        addressLine1: {
          type: 'string',
          title: 'Address line 1',
        },
        addressLine2: {
          type: 'string',
          title: 'Address line 2',
        },
      },
    },
    rowAddressLine2: {
      type: 'object',
      title: '',
      properties: {
        city: {
          type: 'string',
          title: 'City',
        },
        zip: {
          type: 'string',
          title: 'Zip code',
        },
        state: {
          type: 'string',
          title: 'State',
        },
      },
    },
    rowPhone: {
      type: 'object',
      title: '',
      properties: {
        country: {
          type: 'string',
          title: 'Country',
          oneOf: [
            {const: 'United States', title: 'United States'},
            {const: 'Canada', title: 'Canada'},
            {const: 'United Kingdom', title: 'United Kingdom'},
            {const: 'France', title: 'France'},
            {const: 'Germany', title: 'Germany'},
            {const: 'Japan', title: 'Japan'},
          ],
        },
        phone: {
          type: 'string',
          title: 'Phone',
          description: 'Example: +1 (555) 777-55-22',
          pattern: '^\\+?[0-9\\s().-]{7,}$',
        },
      },
    },
  },
}
export const bookingUiSchema: UiSchema<BookingFormData> = {
  'ui:order': ['rowDatesGuests', 'rowRoomType', 'rowRoomsPets', 'rowExtras', 'rowNotes'],
  rowDatesGuests: {
    'ui:options': {label: false},
    'ui:classNames': 'rjsf-row',
    checkInDate: {
      'ui:placeholder': 'Check-in',
      'ui:options': {label: false},
    },
    checkOutDate: {
      'ui:placeholder': 'Check-out',
      'ui:options': {label: false},
    },
    numberOfGuests: {
      'ui:placeholder': '# of guests',
      'ui:options': {label: false},
    },
  },
  rowRoomType: {
    'ui:options': {label: false},
    'ui:classNames': 'rjsf-row',
    roomType: {
      'ui:placeholder': 'Room type',
      'ui:options': {label: false},
    },
    nonSmoking: {
      'ui:widget': 'checkbox',
    },
  },
  rowRoomsPets: {
    'ui:options': {label: false},
    'ui:classNames': 'rjsf-row',
    numberOfRooms: {
      'ui:placeholder': '# of rooms',
      'ui:options': {label: false},
    },
    withPets: {
      'ui:widget': 'checkbox',
    },
  },
  rowExtras: {
    'ui:options': {label: false},
    extras: {
      'ui:widget': 'select',
      'ui:placeholder': 'Extras',
      'ui:options': {label: false},
    },
  },
  rowNotes: {
    'ui:options': {label: false},
    notes: {
      'ui:widget': 'textarea',
      'ui:placeholder': 'Notes...',
      'ui:options': {label: false, rows: 4},
    },
  },
}
export const travelerUiSchema: UiSchema<BookingFormData> = {
  'ui:order': ['rowContact', 'rowAddressLine1', 'rowAddressLine2', 'rowPhone'],
  rowContact: {
    'ui:options': {label: false},
    'ui:classNames': 'rjsf-row',
    lastName: {
      'ui:placeholder': 'Last name',
      'ui:options': {label: false},
    },
    firstName: {
      'ui:placeholder': 'First name',
      'ui:options': {label: false},
    },
  },
  rowAddressLine1: {
    'ui:options': {label: false},
    'ui:classNames': 'rjsf-row',
    addressLine1: {
      'ui:placeholder': 'Address line 1',
      'ui:options': {label: false},
    },
    addressLine2: {
      'ui:placeholder': 'Address line 2',
      'ui:options': {label: false},
    },
  },
  rowAddressLine2: {
    'ui:options': {label: false},
    'ui:classNames': 'rjsf-row',
    city: {
      'ui:placeholder': 'City',
      'ui:options': {label: false},
    },
    zip: {
      'ui:placeholder': 'Zip code',
      'ui:options': {label: false},
    },
    state: {
      'ui:placeholder': 'State',
      'ui:options': {label: false},
    },
  },
  rowPhone: {
    'ui:options': {label: false},
    'ui:classNames': 'rjsf-row',
    country: {
      'ui:placeholder': 'Country',
      'ui:options': {label: false},
    },
    phone: {
      'ui:placeholder': 'Phone',
      'ui:options': {label: false},
    },
  },
}

export const customValidate = (formData: BookingFormData | undefined, errors: FormValidation<BookingFormData>) => {
  if (!formData) return errors
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  // Handle nested structure
  const rowDatesGuests = formData.rowDatesGuests
  const checkIn = rowDatesGuests?.checkInDate ? new Date(rowDatesGuests.checkInDate) : undefined
  const checkOut = rowDatesGuests?.checkOutDate ? new Date(rowDatesGuests.checkOutDate) : undefined

  if (checkIn && checkIn < today) {
    errors.rowDatesGuests?.checkInDate?.addError("Check-in date cannot precede today's date.")
  }

  if (checkIn && checkOut && checkOut < checkIn) {
    errors.rowDatesGuests?.checkOutDate?.addError('Invalid date range: check-out date cannot precede check-in date.')
  }

  return errors
}

interface BookingFormProps {
  formComponent: React.ComponentType<FormProps<BookingFormData>>
  buttonClass: string
}

export function App({formComponent, buttonClass}: BookingFormProps) {
  const [formData, setFormData] = useState<BookingFormData>(defaultFormData)
  const [stepIndex, setStepIndex] = useState(0)
  const Form = formComponent

  const steps = useMemo(
    () => [
      {schema: bookingSchema, uiSchema: bookingUiSchema, submitText: 'Traveler Info ➝'},
      {schema: travelerSchema, uiSchema: travelerUiSchema, submitText: 'Book Now'},
    ],
    []
  )

  const handleChange = useCallback((event: IChangeEvent<BookingFormData>) => {
    if (event.formData) {
      setFormData(event.formData)
    }
  }, [])

  const handleSubmit = useCallback(
    (event: IChangeEvent<BookingFormData>) => {
      if (event.formData) {
        setFormData(event.formData)
      }
      const isLastStep = stepIndex === steps.length - 1
      if (isLastStep) {
        console.warn('Booking data', event.formData)
        return
      }
      setStepIndex(current => Math.min(current + 1, steps.length - 1))
    },
    [stepIndex, steps.length]
  )

  const handlePrev = useCallback(() => {
    setStepIndex(current => Math.max(current - 1, 0))
  }, [])

  const currentStep = steps[stepIndex]
  const isFirstStep = stepIndex === 0
  const isLastStep = stepIndex === steps.length - 1

  return (
    <>
      <Form
        schema={currentStep.schema}
        uiSchema={currentStep.uiSchema}
        validator={validator as ValidatorType<BookingFormData>}
        formData={formData}
        customValidate={customValidate}
        onChange={handleChange}
        onSubmit={handleSubmit}
      >
        <div style={{display: 'flex', gap: 12, marginTop: 16}}>
          {!isFirstStep ? (
            <button type="button" onClick={handlePrev} className={buttonClass}>
              Booking Details
            </button>
          ) : null}
          <button type="submit" className={buttonClass}>
            {isLastStep ? 'Book Now' : 'Traveler Info ➝'}
          </button>
        </div>
      </Form>
    </>
  )
}
