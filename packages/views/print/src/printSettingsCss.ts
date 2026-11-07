/**
 * Builds the CSS `content` value for a print settings template.
 * `{page}` and `{pages}` become `counter(page)` and `counter(pages)`.
 * @param template the header or footer template.
 * @returns the CSS content list.
 */
function cssContentFromTemplate(template: string): string {
  const tokens: string[] = []
  const placeholder = /\{pages\}|\{page\}/g
  let lastIndex = 0
  // eslint-disable-next-line no-useless-assignment -- init-declarations requires an initializer; exec overwrites it
  let match: RegExpExecArray | null = null
  while ((match = placeholder.exec(template))) {
    if (match.index > lastIndex) {
      tokens.push(JSON.stringify(template.slice(lastIndex, match.index)))
    }
    tokens.push(match[0] === '{pages}' ? 'counter(pages)' : 'counter(page)')
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < template.length) {
    tokens.push(JSON.stringify(template.slice(lastIndex)))
  }
  return tokens.length > 0 ? tokens.join(' ') : '""'
}

/**
 * Alignments for print settings margin boxes.
 */
type PrintSettingsAlign = 'start' | 'center' | 'end'

/**
 * Resolves a print settings alignment, falling back to center.
 * @param value the raw alignment value.
 * @returns a supported alignment.
 */
function resolvePrintSettingsAlign(value: unknown): PrintSettingsAlign {
  if (value === 'start' || value === 'center' || value === 'end') return value
  return 'center'
}

function marginBox(kind: 'header' | 'footer', align: PrintSettingsAlign): string {
  const isHeader = kind === 'header'
  switch (align) {
    case 'start':
      return isHeader ? '@top-left' : '@bottom-left'
    case 'center':
      return isHeader ? '@top-center' : '@bottom-center'
    case 'end':
      return isHeader ? '@top-right' : '@bottom-right'
  }
}

/**
 * Builds `@page` margin-box CSS for PrintSettings.
 * @param header the optional header template.
 * @param footer the optional footer template.
 * @param headerAlign the header alignment.
 * @param footerAlign the footer alignment.
 * @returns the CSS text, or an empty string when both bands are empty.
 */
export function buildPrintSettingsCss(
  header: string | undefined,
  footer: string | undefined,
  headerAlign: unknown,
  footerAlign: unknown
): string {
  const rules: string[] = []
  const headerText = header?.trim()
  const footerText = footer?.trim()
  if (headerText) {
    rules.push(`  ${marginBox('header', resolvePrintSettingsAlign(headerAlign))} { content: ${cssContentFromTemplate(headerText)}; }`)
  }
  if (footerText) {
    rules.push(`  ${marginBox('footer', resolvePrintSettingsAlign(footerAlign))} { content: ${cssContentFromTemplate(footerText)}; }`)
  }
  if (rules.length === 0) return ''
  return `@page {\n${rules.join('\n')}\n}\n`
}
