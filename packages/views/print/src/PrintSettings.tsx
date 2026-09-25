import {define, oneOfStrict, string} from '@react-form-builder/core'
import {useLayoutEffect} from 'react'
import {buildPrintSettingsCss} from './printSettingsCss'

const iconStyle = {width: 24, height: 24}

const Icon = () => (
  <svg style={iconStyle} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="3" width="14" height="18" rx="1.5" stroke="#9CA3AF" strokeWidth="2" />
    <path d="M8 7h8M8 17h5" stroke="#9CA3AF" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

const align = oneOfStrict('start', 'center', 'end')

/**
 * Props for the PrintSettings component.
 */
export interface PrintSettingsProps {
  /**
   * The printed header template. Use `{page}` and `{pages}` for page numbers.
   */
  header?: string
  /**
   * The printed footer template. Use `{page}` and `{pages}` for page numbers.
   */
  footer?: string
  /**
   * The header alignment in the page margin.
   */
  headerAlign?: 'start' | 'center' | 'end'
  /**
   * The footer alignment in the page margin.
   */
  footerAlign?: 'start' | 'center' | 'end'
  /**
   * The CSS class name.
   */
  className?: string
}

/**
 * Print header, footer, and page-number settings.
 * Visibility is owned by the non-visual host; this component only injects print CSS.
 * @param props the component props.
 * @returns the React element.
 */
const PrintSettings = (props: PrintSettingsProps) => {
  const {header, footer, headerAlign, footerAlign, className} = props

  useLayoutEffect(() => {
    const css = buildPrintSettingsCss(header, footer, headerAlign, footerAlign)
    if (!css) return
    const style = document.createElement('style')
    style.setAttribute('data-print-settings', '')
    style.textContent = css
    document.head.appendChild(style)
    return () => {
      style.remove()
    }
  }, [header, footer, headerAlign, footerAlign])

  return <div className={className} data-testid="print-settings" data-print-settings="" />
}

/**
 * Print settings component metadata for the form builder and form viewer.
 */
export const printSettings = define(PrintSettings, 'PrintSettings')
  .name('Print settings')
  .category('structure')
  .icon(Icon)
  .hideTooltipEditor()
  .hideStyleProperties()
  .singleton()
  .nonVisual()
  .props({
    header: string.default('Page {page} of {pages}'),
    footer: string.default('Page {page} of {pages}'),
    headerAlign: align.default('center'),
    footerAlign: align.default('center'),
  })
