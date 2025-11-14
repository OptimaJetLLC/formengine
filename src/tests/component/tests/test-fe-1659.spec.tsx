import {fastQrComponent} from '@react-form-builder/components-fast-qr'
import {BuilderView} from '@react-form-builder/core'
import {waitFor} from '@testing-library/react'
import {isBrowserMode} from '../config/isBrowserMode'
import {renderBuilder} from '../util/renderBuilder'
import {switchToViewerMode} from './designerUtils'

const form = {
  'version': '1',
  'tooltipType': 'RsTooltip',
  'modalType': 'RsModal',
  'form': {
    'key': 'Screen',
    'type': 'Screen',
    'props': {},
    'children': [
      {
        'key': 'fastQr1',
        'type': 'FastQR',
        'props': {},
        'dataKey': 'aaaaaaaaaa',
        'htmlAttributes': [
          {name: 'data-testid', value: 'test-qr'},
        ]
      }
    ]
  },
  'localization': {},
  'languages': [
    {
      'code': 'en',
      'dialect': 'US',
      'name': 'English',
      'description': 'American English',
      'bidi': 'ltr'
    }
  ],
  'defaultLanguage': 'en-US'
}

const view = new BuilderView([fastQrComponent.build()])

describe('FE-1659 FastQr: TypeError: Cannot read properties of undefined (reading \'length\')', () => {
  it('Should not render QR', async () => {
    if (!isBrowserMode()) {
      return
    }

    const {findByTestId, findByText, queryByTestId} = await renderBuilder(form, {view})

    expect(await findByTestId('test-qr')).toBeInTheDocument()

    await switchToViewerMode(findByText)
    await waitFor(() => expect(queryByTestId('test-qr')).not.toBeInTheDocument())
  })
})
