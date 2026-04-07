import {BiDi, loadResource, namedObserver, unloadResource} from '@react-form-builder/core'
import {useEffect} from 'react'
import type {StylesProviderProps} from './StylesProviderProps'

const styles = {
  [BiDi.LTR]: () => import('../../../../public/css/designer.ltr.css?url'),
  [BiDi.RTL]: () => import('../../../../public/css/designer.rtl.css?url'),
}

const loadRsuiteCss = async (biDi: BiDi) => {
  const href = (await styles[biDi]()).default
  await loadResource(`rsuite-${biDi}-css`, href, 'stylesheet')
  const previousBidi = biDi === BiDi.LTR ? BiDi.RTL : BiDi.LTR
  unloadResource(`rsuite-${previousBidi}-css`)
}

const RawBidiStylesProvider = ({bidi, children}: StylesProviderProps) => {
  useEffect(() => {
    loadRsuiteCss(bidi).catch(console.error)
  }, [bidi])

  return children
}

export const BidiStylesProvider = namedObserver('BidiStylesProvider', RawBidiStylesProvider)
