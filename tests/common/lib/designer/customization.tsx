import type {CustomizationMap} from '@react-form-builder/designer'

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
    customRenderer: defaultElement => <div style={{display: 'flex', gap: 10}}>
      {defaultElement}
      <button className={'rs-btn rs-btn-sm'}>My button</button>
    </div>
  },
  ToggleModeButton: {
    style: `
      background: black !important;

      svg {
        display: none;
      }
    `
  },
  LocalizationSelect: {
    hidden: true
  },
  JsonViewButton: {
    hidden: true
  }
}
