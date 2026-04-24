import {ViewPicker} from '@react-form-builder/apps-common'
import {addToDefaultElement, customization as common} from '@react-form-builder/apps-common-designer'
import {useComponentData} from '@react-form-builder/core'
import type {CustomizationMap} from '@react-form-builder/designer'
import styles from './customization.module.css'

const customToolbar = false

const toolbarStyle = {border: '1px solid purple'}
const deleteStyle = {width: '10px', height: '10px'}

// Style constants for language customization
const languageSwitchStyle = {
  minWidth: '200px',
}

const englishItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
}

const englishTextStyle = {
  fontWeight: 'bold' as const,
}

const spanishItemStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
}

const spanishInnerStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
}

const spanishTextStyle = {
  color: 'var(--rs-text-secondary)',
}

const componentToolbarCustomization: CustomizationMap['Component_Toolbar'] = {
  customRenderer: defaultElement => {
    return customToolbar ? <div style={toolbarStyle}>{defaultElement}</div> : defaultElement
  },
}

const CustomTitle = () => {
  const cd = useComponentData()

  return <span>{cd.id}</span>
}

/**
 * Customization map for the form builder UI.
 */
export const customization: CustomizationMap = {
  ...common,
  Header: {
    customRenderer: defaultElement => <div className={styles.header}>{defaultElement}</div>,
  },
  MainMenu_Item_Save: {
    className: styles.customMenuSaveItem,
    customRenderer: defaultElement => (
      <div className={styles.customMenuSaveWrapper}>
        {defaultElement}
        <span className={styles.customMenuItemBadge}>Custom</span>
      </div>
    ),
  },
  MainMenu_Item_SaveAs: {
    className: styles.customMenuSaveAsItem,
  },
  Header_Toolbar: addToDefaultElement(<ViewPicker />),
  Component_Toolbar: componentToolbarCustomization,
  Component_Toolbar_RemoveButton: {
    customRenderer: (defaultElement, _component, props) => {
      return customToolbar ? (
        <div style={deleteStyle} onClick={props.onRemove}>
          R
        </div>
      ) : (
        defaultElement
      )
    },
  },
  Component_Toolbar_Items: {
    customRenderer: defaultElement => {
      return customToolbar ? (
        <div>
          <CustomTitle />
          {defaultElement}
        </div>
      ) : (
        defaultElement
      )
    },
  },
  // Language switch customization examples
  MainMenu_Item_LanguageSwitch: {
    className: styles.customLanguageSwitch,
    style: languageSwitchStyle,
  },
  // Customize English language item
  MainMenu_Item_LanguageItem_en_US: {
    customRenderer: () => (
      <div style={englishItemStyle}>
        <span>🇺🇸</span>
        <span style={englishTextStyle}>English (US)</span>
      </div>
    ),
  },

  // Add custom styling for Spanish language item
  MainMenu_Item_LanguageItem_es_ES: {
    customRenderer: () => (
      <div style={spanishItemStyle}>
        <div style={spanishInnerStyle}>
          <span>🇪🇸</span>
          <span>Español</span>
        </div>
        <small style={spanishTextStyle}>(ES)</small>
      </div>
    ),
  },
  MainMenu_Item_LanguageItem_it_IT: {
    className: styles.customSpanishItem,
  },
}
