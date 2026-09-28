import {viewWithCss} from '@react-form-builder/components-rsuite'
import {array, boolean, date, define, object, string, type ValidationRuleSettings} from '@react-form-builder/core'

const FakeArrayComponent = (props: any) => {
  const {value, ...rest} = props
  return <span {...rest}>{JSON.stringify(value)}</span>
}

const fakeArray = define(FakeArrayComponent, 'FakeArrayComponent')
  .props({
    value: array.valued,
  })
  .build()

const FakeBooleanComponent = (props: any) => {
  const {value, ...rest} = props
  return <span {...rest}>{value}</span>
}

const fakeBoolean = define(FakeBooleanComponent, 'FakeBooleanComponent')
  .props({
    value: boolean.valued,
  })
  .build()

const FakeDateComponent = (props: any) => {
  const {value, ...rest} = props
  return <span {...rest}>{value}</span>
}

const fakeDate = define(FakeDateComponent, 'FakeDateComponent')
  .props({
    value: date.valued,
  })
  .build()

const FakeInputComponent = (props: any) => {
  const {value, ...rest} = props
  return <span {...rest}>{JSON.stringify(value)}</span>
}

const fakeInput = define(FakeInputComponent, 'FakeInputComponent')
  .props({
    value: string.valued,
  })
  .build()

const FakeObjectComponent = (props: any) => {
  const {value, ...rest} = props
  return <span {...rest}>{JSON.stringify(value)}</span>
}

const fakeObject = define(FakeObjectComponent, 'FakeObjectComponent')
  .props({
    value: object.valued,
  })
  .build()

/**
 * Builds a one-field form for Zod validation component tests.
 * @param validations one rule or a rule list.
 * @param componentType the component type key.
 * @returns a persisted-form-shaped test fixture.
 */
export const generateTestForm = (validations: ValidationRuleSettings | ValidationRuleSettings[], componentType = 'RsInput') => ({
  form: {
    key: 'Screen',
    type: 'Screen',
    children: [
      {
        key: 'zodInput',
        type: componentType,
        schema: {
          validations: Array.isArray(validations) ? validations : [validations],
          autoValidate: false,
        },
        htmlAttributes: [{name: 'data-testid', value: 'zodInput'}],
      },
    ],
  },
})

export const zodValidationView = viewWithCss
zodValidationView.define(fakeArray.model)
zodValidationView.define(fakeBoolean.model)
zodValidationView.define(fakeDate.model)
zodValidationView.define(fakeInput.model)
zodValidationView.define(fakeObject.model)
