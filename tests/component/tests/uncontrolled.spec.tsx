import {rSuiteComponents} from '@react-form-builder/components-rsuite'
import {
  array,
  ComponentStore,
  createView,
  date,
  define,
  FormViewer,
  FormViewerProps,
  IFormViewer,
  PersistedForm,
  string,
} from '@react-form-builder/core'
import {render} from '@testing-library/react'
import {createElement, ForwardedRef, useCallback, useMemo} from 'react'
import {describe, expect, it} from 'vitest'

const SimpleHtmlInput = (props: any) => {
  return <input {...props} />
}

const simpleHtmlInput = define(SimpleHtmlInput, 'SimpleHtmlInput')
  .category('test')
  .props({
    value: string.valued.uncontrolledValue(''),
  })

const findUnderlyingComponent = (type: string) => {
  const definer = rSuiteComponents.find(definer => definer.data.typeName === type)
  if (!definer) throw new Error('Calendar component not found')
  return definer.data.component
}

const WrappedCalendar = (props: any) => {
  const RealComponent = useMemo(() => {
    return findUnderlyingComponent('RsCalendar')
  }, [])

  const {value, ...rest} = props
  const dateValue = typeof value === 'string' ? new Date(value) : value
  return createElement(RealComponent, {...rest, value: dateValue})
}

const wrappedCalendar = define(WrappedCalendar, 'WrappedCalendar').category('test').props({
  value: date.valued,
})

const WrappedTagPicker = (props: any) => {
  const RealComponent = useMemo(() => {
    return findUnderlyingComponent('RsTagPicker')
  }, [])

  const {value, ...rest} = props
  const arrayValue = useMemo(() => {
    return typeof value === 'string' ? JSON.parse(value) : value
  }, [value])

  return createElement(RealComponent, {...rest, value: arrayValue})
}

const wrappedTagPicker = define(WrappedTagPicker, 'WrappedTagPicker').category('test').props({
  value: array.valued,
})

const WrappedUploader = (props: any) => {
  const RealComponent = useMemo(() => {
    return findUnderlyingComponent('RsUploader')
  }, [])

  const {fileList, ...rest} = props
  const arrayValue = useMemo(() => {
    return typeof fileList === 'string' ? JSON.parse(fileList) : fileList
  }, [fileList])

  return createElement(RealComponent, {...rest, value: arrayValue, action: '/'})
}

const wrappedUploader = define(WrappedUploader, 'WrappedUploader').category('test').props({
  fileList: array.valued,
})

const definers = [...rSuiteComponents, simpleHtmlInput, wrappedCalendar, wrappedTagPicker, wrappedUploader]

// Here we filter out components that don't have a value property and components that are specially wrapped for this test
const wrappedComponents = new Set(['RsCalendar', 'RsTagPicker', 'RsUploader'])
const componentsMetadata = definers
  .map(definer => definer.build().model)
  .filter(model => typeof model.valued !== 'undefined')
  .filter(model => model.dataBindingType === 'twoWay')
  .filter(model => !wrappedComponents.has(model.type))

const componentsView = createView(componentsMetadata)

const createForm = (): PersistedForm => {
  return {
    form: {
      key: 'Screen',
      type: 'Screen',
      props: {},
      children: [
        {
          key: 'testData',
          type: 'RsInput',
          props: {},
        },
      ],
    },
    localization: {},
    languages: [],
    defaultLanguage: 'en',
  }
}

interface TestApplicationProps extends Partial<FormViewerProps> {
  form: PersistedForm
}

const TestApplication = ({form, ...props}: TestApplicationProps) => {
  const getForm = useCallback(() => {
    return JSON.stringify(form)
  }, [form])

  return <FormViewer {...props} view={componentsView} getForm={getForm} />
}

type TestComponentSettings = {
  controlledValue: unknown
  valueProp?: string
}

const expectedSettings: Record<string, TestComponentSettings> = {
  WrappedCalendar: {
    controlledValue: '2027-03-31T07:14:56.000Z',
  },
  RsCheckbox: {
    controlledValue: true,
    valueProp: 'checked',
  },
  RsDatePicker: {
    controlledValue: new Date('2020-01-01'),
  },
  RsTimePicker: {
    controlledValue: '23:12:56',
  },
  RsDropdown: {
    controlledValue: '1256',
  },
  RsInput: {
    controlledValue: 'some value',
  },
  RsNumberFormat: {
    controlledValue: 42,
  },
  RsPatternFormat: {
    controlledValue: 144,
  },
  RsRadioGroup: {
    controlledValue: 'option1',
  },
  RsSearch: {
    controlledValue: 'keyword',
  },
  RsSignature: {
    controlledValue:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAD0lEQVQIW2NkwAIYaSAIAAGkAAbQmcMRAAAAAElFTkSuQmCC',
  },
  WrappedTagPicker: {
    controlledValue: '["warp", "speed"]',
  },
  RsTextArea: {
    controlledValue: 'Leo',
  },
  RsToggle: {
    controlledValue: true,
    valueProp: 'checked',
  },
  WrappedUploader: {
    controlledValue: '[]',
    valueProp: 'fileList',
  },
  RsProgressCircle: {
    controlledValue: 46,
    valueProp: 'percent',
  },
  RsProgressLine: {
    controlledValue: 47,
    valueProp: 'percent',
  },
  RsWizard: {
    controlledValue: 45,
    valueProp: 'activeIndex',
  },
  SimpleHtmlInput: {
    controlledValue: 'value',
  },
  RsAutoComplete: {
    controlledValue: `${new Date()}`,
  },
}

describe.each(componentsMetadata)(`Uncontrolled state test`, function (model) {
  it(`The '${model.type}' should be in controlled state`, async function () {
    const settings = expectedSettings[model.type]
    expect(settings).toBeDefined()

    const component = new ComponentStore('testedComponent', model.type)
    const propName = settings.valueProp ?? 'value'
    const definedValue = JSON.stringify(settings.controlledValue)
    // in this test, we need to change a property from an undefined to a defined value
    component.props = {
      [propName]: {
        value: undefined,
        computeType: 'function',
        fnSource: 'return typeof form.data.testData === "undefined" ? undefined : ' + definedValue,
      },
    }

    const testId = `${model.type}-test-id`
    component.htmlAttributes = [
      {
        name: 'data-testid',
        value: testId,
      },
    ]

    const persistedForm = createForm()
    persistedForm.form.children?.push(component)

    const viewerRef: ForwardedRef<IFormViewer> = {current: null}
    const {rerender, findByTestId} = render(<TestApplication form={persistedForm} viewerRef={viewerRef} />)

    expect(await findByTestId(testId)).toBeInTheDocument()

    const data = viewerRef.current?.formData.data
    expect(data).toBeDefined()
    expect(data?.testedComponent).toBeUndefined()

    rerender(<TestApplication form={persistedForm} viewerRef={viewerRef} initialData={{testData: ''}} />)

    const rerenderedData = viewerRef.current?.formData.data
    expect(rerenderedData?.testedComponent).toEqual(settings.controlledValue)
  })
})
