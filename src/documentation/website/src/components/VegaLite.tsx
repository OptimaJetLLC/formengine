import React, {useEffect, useRef, useState} from 'react';
import {VegaLite as VegaLiteComponent} from 'react-vega';
import type {VisualizationSpec} from 'vega-embed'
import type {TopLevelSpec} from 'vega-lite';

/**
 * Vega-Lite chart component for use in Docusaurus markdown.
 * @param spec Vega-Lite specification object (can be JSON string or object)
 * @param data Optional data to override the spec's data
 * @param width Optional width override. If not provided, chart will use container width
 * @param height Optional height override
 */
interface VegaLiteProps {
  spec: TopLevelSpec | string;
  data?: Record<string, unknown>;
  width?: number | 'auto' | undefined;
  height?: number;
}

const style = {margin: '1rem 0', display: 'flex', justifyContent: 'center', overflow: 'visible', width: '100%'}
const RESIZE_DELAY = 250
const CHART_MARGIN = 150
const DEFAULT_WIDTH = 600

export const VegaLite: React.FC<VegaLiteProps> = ({spec, data, width, height}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const throttleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [containerWidth, setContainerWidth] = useState<number | undefined>(width || DEFAULT_WIDTH);
  const parsedSpec: TopLevelSpec = typeof spec === 'string' ? JSON.parse(spec) : spec;

  const finalSpec: VisualizationSpec = {
    ...parsedSpec,
    ...(containerWidth && {width: containerWidth}),
    ...(height && {height}),
  };

  useEffect(() => {
    if (typeof width !== 'undefined') {
      if (width === 'auto') {
        setContainerWidth(undefined);
        return
      }
      setContainerWidth(width);
      return;
    }

    const container = containerRef.current;
    if (!container) {
      return;
    }

    const updateWidth = () => {
      setContainerWidth(container.clientWidth - CHART_MARGIN);
    };

    const throttledUpdateWidth = () => {
      if (throttleTimeoutRef.current) {
        return;
      }

      throttleTimeoutRef.current = setTimeout(() => {
        updateWidth();
        throttleTimeoutRef.current = null;
      }, RESIZE_DELAY);
    };

    updateWidth();

    const resizeObserver = new ResizeObserver(throttledUpdateWidth);
    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      if (throttleTimeoutRef.current) {
        clearTimeout(throttleTimeoutRef.current);
        throttleTimeoutRef.current = null;
      }
    };
  }, [width]);

  return (
    <div ref={containerRef} style={style}>
      <VegaLiteComponent spec={finalSpec} data={data} actions={false} renderer="svg" />
    </div>
  );
};

export default VegaLite;
