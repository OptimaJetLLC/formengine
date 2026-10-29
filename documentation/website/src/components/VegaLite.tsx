import {useEffect, useRef, useState, type FC} from 'react'
import {VegaEmbed} from 'react-vega'
import type {VisualizationSpec} from 'vega-embed'
import type {TopLevelSpec} from 'vega-lite'

/**
 * Fixed pixel width, or `'auto'` to omit width until the container is measured.
 */
type VegaLiteWidth = number | 'auto'

interface VegaLiteProps {
  spec: TopLevelSpec | string
  width?: VegaLiteWidth
  height?: number
}

const style = {margin: '1rem 0', display: 'flex', justifyContent: 'center', overflow: 'visible', width: '100%'}
const RESIZE_DELAY = 250
const CHART_MARGIN = 150
const DEFAULT_WIDTH = 600

/**
 * Renders a Vega-Lite chart in Docusaurus markdown.
 * @param spec the Vega-Lite specification (JSON string or object).
 * @param width the optional width override. When omitted, the chart uses the container width.
 * @param height the optional height override.
 */
export const VegaLite: FC<VegaLiteProps> = ({spec, width, height}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const throttleTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [containerWidth, setContainerWidth] = useState<number | undefined>(typeof width === 'number' ? width : DEFAULT_WIDTH)
  const parsedSpec: TopLevelSpec = typeof spec === 'string' ? JSON.parse(spec) : spec

  const finalSpec: VisualizationSpec = {
    ...parsedSpec,
    ...(containerWidth && {width: containerWidth}),
    ...(height && {height}),
  }

  useEffect(() => {
    if (typeof width !== 'undefined') {
      if (width === 'auto') {
        setContainerWidth(undefined)
        return
      }
      setContainerWidth(width)
      return
    }

    const container = containerRef.current
    if (!container) {
      return
    }

    const updateWidth = () => {
      setContainerWidth(container.clientWidth - CHART_MARGIN)
    }

    const throttledUpdateWidth = () => {
      if (throttleTimeoutRef.current) {
        return
      }

      throttleTimeoutRef.current = setTimeout(() => {
        updateWidth()
        throttleTimeoutRef.current = null
      }, RESIZE_DELAY)
    }

    updateWidth()

    const resizeObserver = new ResizeObserver(throttledUpdateWidth)
    resizeObserver.observe(container)

    return () => {
      resizeObserver.disconnect()
      if (throttleTimeoutRef.current) {
        clearTimeout(throttleTimeoutRef.current)
        throttleTimeoutRef.current = null
      }
    }
  }, [width])

  return (
    <div ref={containerRef} style={style}>
      <VegaEmbed spec={finalSpec} options={{actions: false, renderer: 'svg'}} />
    </div>
  )
}

export type {VegaLiteProps, VegaLiteWidth}
