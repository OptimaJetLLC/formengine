import React from 'react'

if (process.env.NODE_ENV === 'development' && !!process.env.WDYR) {
  // @ts-ignore
  const whyDidYouRender = await import('@welldone-software/why-did-you-render')
  whyDidYouRender.default(React, {
    trackAllPureComponents: true,
    trackHooks: true
  })
}
