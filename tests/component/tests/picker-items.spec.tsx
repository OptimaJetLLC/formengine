import {BuilderView, buildForm, define, oneOf} from '@react-form-builder/core'
import {FormBuilder} from '@react-form-builder/designer'
import {fireEvent, render, within} from '@testing-library/react'
import {describe, expect, it} from 'vitest'

const FirstVariantComponent = (props: {variant?: string}) => {
  const {variant} = props
  return <p data-testid="first-variant-component">{variant}</p>
}

const SecondVariantComponent = (props: {variant?: string}) => {
  const {variant} = props
  return <p data-testid="second-variant-component">{variant}</p>
}

const firstVariantComponent = define(FirstVariantComponent, 'FirstVariantComponent')
  .props({
    variant: oneOf('primary', 'secondary').default('primary'),
  })
  .build()

const secondVariantComponent = define(SecondVariantComponent, 'SecondVariantComponent')
  .props({
    variant: oneOf('danger', 'warning').default('danger'),
  })
  .build()

const variantForm = buildForm()
  .component('firstVariantComponent', 'FirstVariantComponent')
  .component('secondVariantComponent', 'SecondVariantComponent')
  .json()

const variantView = new BuilderView([firstVariantComponent, secondVariantComponent])

describe('Picker property items', () => {
  it('must be updated when switching between components', async () => {
    const getForm = () => variantForm
    const renderResult = render(<FormBuilder view={variantView} getForm={getForm} />)
    const {findByTestId} = renderResult

    const firstComponent = await findByTestId('first-variant-component')
    const secondComponent = await findByTestId('second-variant-component')

    fireEvent.click(firstComponent)
    let variantWrapper = await findByTestId('variant-property-input')
    fireEvent.click(variantWrapper)
    let pickerPopup = await findByTestId('picker-popup')
    let options = await within(pickerPopup).findAllByRole('option')
    expect(options.map(option => option.textContent?.toLowerCase())).toStrictEqual(['primary', 'secondary'])
    fireEvent.mouseDown(document)

    fireEvent.click(secondComponent)
    variantWrapper = await findByTestId('variant-property-input')
    fireEvent.click(variantWrapper)
    pickerPopup = await findByTestId('picker-popup')
    options = await within(pickerPopup).findAllByRole('option')
    expect(options.map(option => option.textContent?.toLowerCase())).toStrictEqual(['danger', 'warning'])
  })
})
