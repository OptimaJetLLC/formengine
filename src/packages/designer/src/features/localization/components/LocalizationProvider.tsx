import {BiDi, loadResource, namedObserver, unloadResource} from '@react-form-builder/core'
import {format} from 'date-fns'
import type {ReactNode} from 'react'
import {useCallback, useEffect} from 'react'
import {CustomProvider} from 'rsuite'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {dateFnsLocales, defaultComponentsLocale} from '../languageUtils'

const styles = {
  [BiDi.LTR]: () => import('../../../../public/css/rsuite-no-reset.min.css?url'),
  [BiDi.RTL]: () => import('../../../../public/css/rsuite-no-reset-rtl.min.css?url'),
  ['common']: () => import('../../../../public/css/formengine-rsuite.css?url')
}

const loadRsuiteCss = async (biDi: BiDi) => {
  const href = (await styles[biDi]()).default
  await loadResource(`rsuite-${biDi}-css`, href, 'stylesheet')
  const previousBidi = biDi === BiDi.LTR ? BiDi.RTL : BiDi.LTR
  unloadResource(`rsuite-${previousBidi}-css`)
}

const loadFormEngineCss = async () => {
  const href = (await styles['common']()).default
  await loadResource('designer-form-engine-css', href, 'stylesheet')
}

interface LocalizationProps {
  children: ReactNode
}

const RawLocalizationProvider = (props: LocalizationProps) => {
  const builderStore = useBuilderStore()
  const {bidi} = builderStore.formBuilderLanguage
  const componentsLocale = builderStore.componentsLocale ?? defaultComponentsLocale

  // FE-1288 workaround
  const formatDate = useCallback((date: Date | number, formatStr: string, options?: any) => {
    const locale = dateFnsLocales[componentsLocale.code]

    return format(date, formatStr, {
      locale,
      ...options
    })
  }, [componentsLocale])

  useEffect(() => {
    loadRsuiteCss(bidi).catch(console.error)
  }, [bidi])

  useEffect(() => {
    loadFormEngineCss().catch(console.error)
  }, [])

  return (
    <CustomProvider rtl={builderStore.isRTL} locale={componentsLocale} theme={builderStore.theme} formatDate={formatDate}>
      {props.children}
    </CustomProvider>
  )
}

export const LocalizationProvider = namedObserver('LocalizationProvider', RawLocalizationProvider)
