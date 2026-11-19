import {BuilderView} from '@react-form-builder/core'
import {FormBuilder} from '@react-form-builder/designer'
import {allComponentsBuilder} from '@react-form-builder/tests-common/lib/all-components'
import {render} from '@testing-library/react'
import {describe, expect, it} from 'vitest'

describe('Tab icons', () => {
  it('Should render icons using em-based dimensions', async () => {
    const {findByTestId} = render(<FormBuilder view={new BuilderView(allComponentsBuilder)} />)

    const componentsTab = await findByTestId('Components_Tab')
    const icon = componentsTab.querySelector('svg')

    expect(icon).toHaveAttribute('width', '1.2em')
    expect(icon).toHaveAttribute('height', '1.2em')
  })
})
