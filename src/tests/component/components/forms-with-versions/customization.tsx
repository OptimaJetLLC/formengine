import type {CustomizationMap} from '@react-form-builder/designer'
import {VersionsList} from './VersionsList/VersionsList'

export const customization: CustomizationMap = {
  Forms_Tab_Content: {
    customRenderer: (defaultElement) => (
      <VersionsList>
        {defaultElement}
      </VersionsList>
    )
  }
}
