import type {ComponentData} from '@react-form-builder/core'
import {act, fireEvent} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import {renderForm} from '../util/renderRsuiteForm'

describe('RSuite navigation selection', () => {
  it.each(['RsMenu', 'RsTab'])('%s updates the active item and invokes onSelect', async type => {
    const selectedValues: unknown[] = []
    const items =
      type === 'RsMenu'
        ? [{title: 'First'}, {title: 'Second'}]
        : [
            {label: 'First', value: 'First'},
            {label: 'Second', value: 'Second'},
          ]
    const form = {
      form: {
        key: 'root',
        type: 'RsContainer',
        children: [
          {
            key: 'navigation',
            type,
            props: {
              items: {value: items},
              activeKey: {value: 'First'},
              ...(type === 'RsMenu' ? {itemsAs: {value: 'button'}} : {showNavigation: {value: true}}),
            },
            events: {onSelect: [{name: 'captureSelection', type: 'custom'}]},
          },
        ],
      },
    }
    const {findByText, formData} = renderForm(form, {
      actions: {
        captureSelection: e => {
          selectedValues.push(e.value)
        },
      },
    })
    const secondItem = await findByText('Second')
    const componentData = (formData as ComponentData).findByKey('navigation')!
    act(() => {
      componentData.setUserDefinedProp('title', 'Preserved override')
    })

    fireEvent.click(secondItem)

    expect(secondItem).toHaveClass('rs-nav-item-active')
    expect(selectedValues).toEqual(['Second'])
    expect(componentData.userDefinedProps).toMatchObject({title: 'Preserved override', activeKey: 'Second'})
  })
})
