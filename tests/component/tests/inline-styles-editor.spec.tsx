import {BuilderView, buildForm, ComponentKind, define} from '@react-form-builder/core'
import {FormBuilder} from '@react-form-builder/designer'
import {fireEvent, render} from '@testing-library/react'
import {describe, it} from 'vitest'

interface FeatureCombination {
  kind: ComponentKind
  enableInlineStyles: boolean
  disableStyles: boolean
  disableWrapperStyles: boolean
}

const combinations: FeatureCombination[] = []

const kinds: ComponentKind[] = ['component', 'template', 'repeater', 'container']

for (const kind of kinds) {
  for (const enableInlineStyles of [false, true]) {
    for (const disableStyles of [false, true]) {
      for (const disableWrapperStyles of [false, true]) {
        combinations.push({
          kind,
          enableInlineStyles,
          disableStyles,
          disableWrapperStyles,
        })
      }
    }
  }
}

const createTestComponent = (id: number, combination: FeatureCombination) => {
  const {kind, enableInlineStyles, disableStyles, disableWrapperStyles} = combination
  const name = `InlineStyles_${kind}_${id}`
  const key = `${name}_key`
  const dataTestId = `${name}_testId`

  const Component = () => {
    return <div data-testid={dataTestId} />
  }

  let def = define(Component, name)

  if (kind === 'template') {
    def = def.kind('template')
  } else if (kind === 'repeater') {
    def = def.kind('repeater')
  }

  if (enableInlineStyles) {
    def = def.showInlineStylesEditor(true)
  }

  if (disableStyles) {
    def = def.withoutStyles(true)
  }

  if (disableWrapperStyles) {
    def = def.withoutWrapperStyles(true)
  }

  return {
    component: def.build(),
    key,
    dataTestId,
  }
}

const builtComponents = combinations.map((c, index) => createTestComponent(index, c))

const form = buildForm()
  .component('Screen', 'Screen')
  .children(builder => {
    builtComponents.forEach(({key, component}) => {
      builder.component(key, component.model.type)
    })
    return builder
  })
  .json()

const view = new BuilderView(builtComponents.map(({component}) => component))

describe('Inline styles editor visibility', () => {
  it('should show or hide Inline styles section according to model.kind and features', async () => {
    const getForm = () => form
    const {findByTestId, queryByText} = render(<FormBuilder view={view} getForm={getForm} />)
    const stylesTab = await findByTestId('Style_Tab')

    for (let index = 0; index < builtComponents.length; index += 1) {
      const {dataTestId} = builtComponents[index]
      const combination = combinations[index]
      const componentNode = await findByTestId(dataTestId)

      fireEvent.click(componentNode)
      fireEvent.click(stylesTab)

      const inlineStylesHeader = queryByText('Inline styles')
      const {kind, enableInlineStyles, disableStyles, disableWrapperStyles} = combination
      const combinationLabel = `kind=${kind}, enableInlineStyles=${enableInlineStyles}, disableStyles=${disableStyles}, disableWrapperStyles=${disableWrapperStyles}`
      let expectedVisible: boolean

      if (!enableInlineStyles) {
        expectedVisible = false
      } else if (kind === 'template' && disableWrapperStyles) {
        expectedVisible = false
      } else if (kind === 'component' && disableStyles && disableWrapperStyles) {
        expectedVisible = false
      } else {
        expectedVisible = !disableStyles
      }

      if (expectedVisible && !inlineStylesHeader) {
        throw new Error(`Expected 'Inline styles' section to be visible, but it was hidden. (${combinationLabel})`)
      }

      if (!expectedVisible && inlineStylesHeader) {
        throw new Error(`Expected 'Inline styles' section to be hidden, but it was visible. (${combinationLabel})`)
      }
    }
  })
})
