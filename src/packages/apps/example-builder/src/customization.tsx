import type {CustomizationMap} from '@react-form-builder/designer'
import {useFormBuilder} from '@react-form-builder/designer'
import {useCallback} from 'react'
import {Button} from 'rsuite'

const toggleLabels = {
  builder: 'EditMode',
  viewer: 'PreviewMode'
}

const CustomToggleModeButton = () => {
  const builder = useFormBuilder()
  const label = toggleLabels[builder.builderMode]
  const toggleMode = useCallback(() => {
    builder.builderMode = builder.builderMode === 'builder' ? 'viewer' : 'builder'
  }, [builder])

  return <Button onClick={toggleMode}>{label}</Button>
}

const toolbarStyle = {display: 'flex', gap: 10} as const

export const simpleCustomization: CustomizationMap = {
  MainMenu_Dropdown: {
    style: `
      background-color: lightblue !important;

      #menuitem-\\:r5\\: {
        display: none;
      }
    `
  },
  Header: {
    className: 'MyClassName',
    style: {
      backgroundColor: 'lightblue',
      borderRadius: '0 0 10px 10px',
      marginInline: 10,
      marginBottom: 10
    }
  },
  Header_Toolbar: {
    customRenderer: defaultElement => {
      const button = <button className={'rs-btn rs-btn-sm'}>My button</button>

      return <div style={toolbarStyle}>
        {defaultElement}
        {button}
      </div>
    }
  },
  ToggleModeButton: {
    customRenderer: () => <CustomToggleModeButton/>
  },
  LocalizationSelect: {
    hidden: true
  },
  JsonViewButton: {
    hidden: true
  }
}
