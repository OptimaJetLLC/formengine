import {BuilderView, type ComponentLibraryDescription, define, type LanguageFullCode, string} from '@react-form-builder/core'
import {fireEvent, waitFor} from '@testing-library/react'
import {renderBuilder} from '../util/renderBuilder'
import {asyncAct} from './asyncAct'
import {switchLanguage} from './designerUtils'
import form from './forms/component-library-description-form.json'

interface MyComponentProps {
  prop1?: string
  prop2?: string
}

const MyComponent = (props: MyComponentProps) => {
  const {prop1, prop2, ...rest} = props
  return <div {...rest}>
    <span>{prop1 ?? 'PROP1'}</span>
    {prop2 ?? 'PROP2'}
  </div>
}

const myComponent = define(MyComponent, 'MyComponent')
  .category('myCategory')
  .props({
    prop1: string.named('P1'),
    prop2: string,
  })

const description: Record<LanguageFullCode, ComponentLibraryDescription> = {
  'en-US': {
    categories: {
      myCategory: {
        name: 'My category EN',
      }
    },
    components: {
      MyComponent: {
        name: 'My component EN',
        props: {
          prop2: {
            name: 'My prop2 EN',
          }
        }
      }
    }
  },
  'de-DE': {
    categories: {
      myCategory: {
        name: 'My category DE',
      }
    },
    components: {
      MyComponent: {
        name: 'My component DE',
        props: {
          prop1: {
            name: 'My prop1 DE',
          },
          prop2: {
            name: 'My prop2 DE',
          }
        }
      }
    }
  }
}

const view = new BuilderView([myComponent.build()])
  .withComponentLibraryDescription(description)

describe('Component library description test', () => {
  it('The component should have a localized name and category', async () => {
    const {container, findByTestId} = await renderBuilder(form, {view})
    const category = await findByTestId('myCategory-palette-category')
    expect(category).toHaveTextContent('My component EN')

    const component = await findByTestId('MyComponent-palette-component')
    expect(component.querySelector('label')).toHaveTextContent('My component EN')

    await switchLanguage('de-DE', container)
    await waitFor(() => expect(category).toHaveTextContent('My component DE'))
    await waitFor(() => expect(component.querySelector('label')).toHaveTextContent('My component DE'))
  })

  it('The component should have a localized properties', async () => {
    const {container, findByTestId} = await renderBuilder(form, {view})

    const component = await findByTestId('MyComponent')

    await asyncAct(async () => {
      fireEvent.click(component)
    })

    const prop1Wrapper = await findByTestId('prop1-labeled-wrapper')
    const prop2Wrapper = await findByTestId('prop2-labeled-wrapper')

    expect(prop1Wrapper.querySelector('label')).toHaveTextContent('P1')
    expect(prop2Wrapper.querySelector('label')).toHaveTextContent('My prop2 EN')

    await switchLanguage('de-DE', container)
    await waitFor(() => {
      expect(prop1Wrapper.querySelector('label')).toHaveTextContent('My prop1 DE')
      expect(prop2Wrapper.querySelector('label')).toHaveTextContent('My prop2 DE')
    })

    await switchLanguage('en-US', container)
    await waitFor(() => {
      expect(prop1Wrapper.querySelector('label')).toHaveTextContent('P1')
      expect(prop2Wrapper.querySelector('label')).toHaveTextContent('My prop2 EN')
    })
  })
})
