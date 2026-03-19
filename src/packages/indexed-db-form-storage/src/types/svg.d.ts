declare module '*.svg' {
  import * as React from 'react'

  const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {title?: string; titleId?: string; desc?: string; descId?: string}
  >

  export default ReactComponent
}
