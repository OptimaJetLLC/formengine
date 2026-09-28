import {namedObserver} from '@react-form-builder/core'
import {format} from 'date-fns'
import type {ReactNode} from 'react'
import {useCallback} from 'react'
import {CustomProvider} from 'rsuite'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {dateFnsLocales, defaultComponentsLocale} from '../languageUtils'
import {BidiStylesProvider} from './BidiStylesProvider'

interface LocalizationProps {
  children: ReactNode
}

const RawLocalizationProvider = (props: LocalizationProps) => {
  const builderStore = useBuilderStore()
  const {bidi} = builderStore.formBuilderLanguage
  const componentsLocale = builderStore.componentsLocale ?? defaultComponentsLocale

  // FE-1288 workaround
  const formatDate = useCallback(
    (date: Date | number, formatStr: string, options?: any) => {
      const locale = dateFnsLocales[componentsLocale.code]

      return format(date, formatStr, {
        locale,
        ...options,
      })
    },
    [componentsLocale]
  )

  const Provider = builderStore.props.stylesProvider ?? BidiStylesProvider

  return (
    <CustomProvider rtl={builderStore.isRTL} locale={componentsLocale} theme={builderStore.theme} formatDate={formatDate}>
      <Provider bidi={bidi}>{props.children}</Provider>
    </CustomProvider>
  )
}

export const LocalizationProvider = namedObserver('LocalizationProvider', RawLocalizationProvider)
