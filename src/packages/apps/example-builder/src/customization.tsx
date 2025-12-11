import type {CustomizationMap} from '@react-form-builder/designer'
import {Dropdown} from 'rsuite'
import {version} from '../package.json'
import {BuilderViewPicker} from './components/BuilderViewPicker'
import {info} from './components/icons'

const containerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
}

/**
 * Customization map for the form builder UI.
 */
export const customization: CustomizationMap = {
  Header_Toolbar: {
    customRenderer: defaultElement => (
      <div style={containerStyle}>
        {defaultElement}
        <BuilderViewPicker />
      </div>
    ),
  },
  MainMenu_Items: {
    customRenderer: defaultElement => (
      <div>
        {defaultElement}
        <Dropdown.Item icon={info} disabled={true}>
          v{version}
        </Dropdown.Item>
      </div>
    ),
  },
}
