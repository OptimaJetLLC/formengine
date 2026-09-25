import {define, oneOfStrict, useBuilderMode} from '@react-form-builder/core'
import type {CSSProperties} from 'react'
import {useMemo} from 'react'
import styles from './PageBreak.module.css'

const iconStyle = {width: 24, height: 24}

const Icon = () => (
  <svg style={iconStyle} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 8h16M4 16h16" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 3" />
  </svg>
)

/**
 * Page break rules applied when the form is printed.
 */
export type PageBreakRule = 'auto' | 'avoid' | 'page'

/**
 * Props for the PageBreak component.
 */
export interface PageBreakProps {
  /**
   * The CSS break-before value used in print.
   */
  breakBefore?: PageBreakRule
  /**
   * The CSS break-after value used in print.
   */
  breakAfter?: PageBreakRule
  /**
   * The CSS break-inside value used in print.
   */
  breakInside?: 'auto' | 'avoid'
  /**
   * The CSS class name.
   */
  className?: string
}

const breakBeforeAfter = oneOfStrict('auto', 'avoid', 'page')
const breakInside = oneOfStrict('auto', 'avoid')

/**
 * A print-only page break marker.
 * @param props the component props.
 * @returns the React element.
 */
const PageBreak = (props: PageBreakProps) => {
  const {breakBefore = 'page', breakAfter = 'auto', breakInside: breakInsideValue = 'auto', className} = props
  const isBuilder = useBuilderMode() === 'builder'
  const style = useMemo<CSSProperties>(
    () => ({
      breakBefore,
      breakAfter,
      breakInside: breakInsideValue,
      ...(isBuilder ? undefined : {display: 'none'}),
    }),
    [breakBefore, breakAfter, breakInsideValue, isBuilder]
  )

  return (
    <div
      className={[styles.root, className].filter(Boolean).join(' ')}
      data-testid="page-break"
      data-page-break=""
      data-print-hidden={isBuilder ? undefined : 'true'}
      style={style}
    >
      {isBuilder && (
        <span className={styles.placeholder} data-testid="page-break-placeholder">
          Page break
        </span>
      )}
    </div>
  )
}

/**
 * Page break component metadata for the form builder and form viewer.
 */
export const pageBreak = define(PageBreak, 'PageBreak')
  .name('Page break')
  .category('structure')
  .icon(Icon)
  .hideTooltipEditor()
  .hideStyleProperties()
  .props({
    breakBefore: breakBeforeAfter.default('page'),
    breakAfter: breakBeforeAfter.default('auto'),
    breakInside: breakInside.default('auto'),
  })
