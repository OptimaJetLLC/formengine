import {antdComponents} from '@react-form-builder/components-antd'
import {fastQrComponent} from '@react-form-builder/components-fast-qr'
import {googleMapComponent} from '@react-form-builder/components-google-map'
import {richTextComponent} from '@react-form-builder/components-rich-text'
import {rSuiteComponents} from '@react-form-builder/components-rsuite'
import {ComponentStore, definePreset} from '@react-form-builder/core'
import initialPresets from './designer/components/preset-components.json'
import {throwErrorComponent} from './designer/components/ThrowErrorComponent'

const presets = initialPresets.map(preset => {
  const components = preset.components.map(component => {
    return Object.assign(new ComponentStore('', component.key), component)
  })
  return definePreset(preset.name, components).category('Presets')
})

let allComponents = [...rSuiteComponents, ...antdComponents, ...presets,
  throwErrorComponent, fastQrComponent, richTextComponent, googleMapComponent]

export const allComponentsBuilder = allComponents.map(definer => definer.build())

export const allComponentsViewer = allComponentsBuilder.map(c => c.model)
