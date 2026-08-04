import type {ComponentStore, CssPart, Meta, Model} from '@react-form-builder/core'
import {
  cfDisableStyles,
  cfDisableStylesForClassNameEditor,
  cfDisableWrapperStyles,
  cfEnableInlineStylesEditor,
  className,
  namedObserver,
  useStore
} from '@react-form-builder/core'
import {useCallback, useState} from 'react'
import type {Device} from '../../../../../utils/types'
import {CSSEditor} from '../../../../annotation-editors/CSSEditor'
import {StyleEditor} from '../../../../annotation-editors/StyleEditor'
import {PropertyEditorWrapper} from '../../../../components/PropertyEditorWrapper/PropertyEditorWrapper'
import {useTranslationPart} from '../../../../localization/hooks'
import {DevicePicker} from './DevicePicker'
import {PropertyBlock} from './PropertyBlock'

const useCssContextInitializer = (fieldKey: CssPart, store: ComponentStore, device: Device) =>
  useCallback(() => {
    store[fieldKey] ??= {}
    store[fieldKey][device] ??= {}
    store[fieldKey][device].object ??= {}
    return store[fieldKey][device].object ?? {}
  }, [fieldKey, store, device])

interface StyleBlockProps {
  meta: Meta
  store: ComponentStore
  device: Device
  cssPart: CssPart
  header: string
  headerHint: string
}

const RawStyleBlock = ({meta, store, device, cssPart, header, headerHint}: StyleBlockProps) => {
  const initContext = useCssContextInitializer(cssPart, store, device)
  const viewerStore = useStore()
  const model = viewerStore.getModel(meta.type)
  const context = store[cssPart]?.[device]?.object ?? {}
  const isComponent = model.kind === 'component' || model.kind === 'repeater'

  return (
    <PropertyBlock header={isComponent ? header : undefined}
                   headerHint={isComponent ? headerHint : undefined}
                   annotations={meta[cssPart]} context={context} initContext={initContext}/>
  )
}

const StyleBlock = namedObserver('StyleBlock', RawStyleBlock)

const isCssEditorHidden = (model: Model) => {
  if (model.isFeatureEnabled(cfDisableStylesForClassNameEditor)) return true

  const disableStyles = model.isFeatureEnabled(cfDisableStyles)
  const disableWrapperStyles = model.isFeatureEnabled(cfDisableWrapperStyles)

  if (model.kind === 'template' && disableWrapperStyles) return true
  if (model.kind === 'component' && disableStyles && disableWrapperStyles) return true

  return disableStyles
}

const getDefaultActiveCssTab = (model: Model) => {
  if (model.kind === 'template') return 'wrapperCss'

  if (model.kind === 'component' && model.isFeatureEnabled(cfDisableStyles)) {
    return 'wrapperCss'
  }

  return 'css'
}

const isStylesEditorVisible = (model: Model) => {
  if (!model.isFeatureEnabled(cfEnableInlineStylesEditor)) return false

  const disableStyles = model.isFeatureEnabled(cfDisableStyles)
  const disableWrapperStyles = model.isFeatureEnabled(cfDisableWrapperStyles)

  if (model.kind === 'template' && disableWrapperStyles) return false
  if (model.kind === 'component' && disableStyles && disableWrapperStyles) return false

  return !disableStyles
}

const getDefaultActiveStyleTab = (model: Model) => {
  if (model.kind === 'template') return 'wrapperStyle'

  if (model.kind === 'component' && model.isFeatureEnabled(cfDisableStyles)) {
    return 'wrapperStyle'
  }

  return 'style'
}

const RawStyles = ({meta, store}: { meta: Meta, store: ComponentStore }) => {
  const t = useTranslationPart('style')
  const [device, setDevice] = useState<Device>('any')
  const viewerStore = useStore()
  const model = viewerStore.getModel(meta.type)
  const isComponent = model.kind === 'component'
  const isTemplate = model.kind === 'template'
  const classNameEditor = <PropertyEditorWrapper annotation={className} context={store.props}/>

  const cssEditorHidden = isCssEditorHidden(model)
  const stylesEditorVisible = isStylesEditorVisible(model)
  const disableStyles = model.isFeatureEnabled(cfDisableStyles)
  const disableWrapperStyles = model.isFeatureEnabled(cfDisableWrapperStyles)

  // only components have styles and wrapper styles
  const useWrapperStyles = isComponent && !disableStyles && !disableWrapperStyles

  const activeCssTab = getDefaultActiveCssTab(model)
  const activeStyleTab = getDefaultActiveStyleTab(model)

  if (disableStyles && disableWrapperStyles) return null

  return <>
    <DevicePicker value={device} onChange={setDevice}/>
    {!isTemplate && !disableStyles &&
      <StyleBlock meta={meta} store={store} device={device} cssPart={'css'} header={t('component')} headerHint={t('componentHint')}/>
    }
    {isComponent && !disableStyles && classNameEditor}
    {!disableWrapperStyles &&
      <StyleBlock meta={meta} store={store} device={device} cssPart={'wrapperCss'} header={t('wrapper')} headerHint={t('wrapperHint')}/>
    }
    {!isComponent && !disableWrapperStyles && classNameEditor}

    {!cssEditorHidden &&
      <CSSEditor device={device} useWrapperStyles={useWrapperStyles} defaultActiveTab={activeCssTab}/>
    }

    {stylesEditorVisible &&
      <StyleEditor device={device} useWrapperStyles={useWrapperStyles} defaultActiveTab={activeStyleTab}/>
    }
  </>
}

/**
 * Renders the Style tab editors (device picker, CSS/style blocks, Monaco editors).
 */
export const Styles = namedObserver('Styles', RawStyles)
