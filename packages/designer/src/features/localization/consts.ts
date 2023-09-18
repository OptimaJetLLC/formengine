import createCache from '@emotion/cache'
import {BiDi} from '@react-form-builder/core'
import rtlPlugin from 'stylis-plugin-rtl'

export const emotionCache = {
  LTR: createCache({
    key: BiDi.LTR
  }),
  RTL: createCache({
    key: BiDi.RTL,
    stylisPlugins: [rtlPlugin],
    prepend: true
  }),
}

const cssFiles = import.meta.glob('../../../public/css/*', {as: 'url'})

export const cssUrls = {
  [BiDi.LTR]: cssFiles['../../../public/css/rsuite.min.css'],
  [BiDi.RTL]: cssFiles['../../../public/css/rsuite-rtl.min.css'],
}

export const fluentLanguageId = 'fluent'
