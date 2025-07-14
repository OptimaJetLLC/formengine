import axe from 'axe-core'
import {renderForm} from '../../util/renderForm'

const form = {
  'form': {
    'key': 'Screen',
    'type': 'Screen',
    'props': {},
    'children': [
      {
        'key': 'rsDropdown1',
        'type': 'RsDropdown',
        'props': {},
        'htmlAttributes': [
          {
            'name': 'data-testid',
            'value': 'mainInput'
          }
        ]
      }
    ]
  }
}

describe('WCAG Dropdown', () => {
  it('Dropdown should be WCAG compliant', async () => {
    const {findByTestId} = renderForm(form)

    await findByTestId('mainInput')
    const aceResult = await axe.run()

    const wcagViolations = aceResult.violations.filter(violation =>
      violation.tags.some(tag => tag.toLowerCase().includes('wcag'))
      && violation.id !== 'document-title'
      && violation.id !== 'html-has-lang'
    )

    if (wcagViolations.length > 0) {
      console.error(wcagViolations)
      throw new Error('RsDropdown should be WCAG compliant')
    }
  })
})
