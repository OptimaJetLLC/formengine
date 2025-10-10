import {define, isNull, useComponentData} from '@react-form-builder/core'
import {useMemo} from 'react'
import './styles.css'

const iconStyle = {width: 24, height: 24}

const DebugDataIcon = () => (
  <svg style={iconStyle} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 8 L4 12 L7 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <line x1="14" y1="8" x2="10" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M17 8 L20 12 L17 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

function highlightJson(json: string) {
  const escapeHTML = (str: string) => str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

  const processString = (str: string) =>
    `<span class="string">"${escapeHTML(str)}"</span>`

  const processValue = (value: any, indent = 0) => {
    const indentStr = '  '.repeat(indent)

    if (typeof value === 'string') {
      return processString(value)
    }

    if (typeof value === 'number') {
      return `<span class="number">${value}</span>`
    }

    if (typeof value === 'boolean') {
      return `<span class="boolean">${value}</span>`
    }

    if (isNull(value)) {
      return `<span class="null">null</span>`
    }

    if (Array.isArray(value)) {
      if (value.length === 0) return '[]'

      let result = '[\n'
      value.forEach((item, i) => {
        result += `${indentStr}  ${processValue(item, indent + 1)}`
        result += i < value.length - 1 ? '<span class="comma">,</span>\n' : '\n'
      })
      return result + `${indentStr}]`
    }

    if (typeof value === 'object') {
      const keys = Object.keys(value)
      if (keys.length === 0) return '{}'

      let result = '{\n'
      keys.forEach((key, i) => {
        result += `${indentStr}  <span class="key">"${escapeHTML(key)}"</span><span class="colon">:</span> `
        result += processValue(value[key], indent + 1)
        result += i < keys.length - 1 ? '<span class="comma">,</span>\n' : '\n'
      })
      return result + `${indentStr}}`
    }

    return value
  }

  try {
    const parsed = JSON.parse(json)
    return processValue(parsed)
  } catch (e) {
    return `<span style="color: red;">JSON parsing error: ${(e as Error).message}</span>`
  }
}

const DebugData = () => {
  const componentData = useComponentData()

  const innerHtml = useMemo(() => {
    const html = highlightJson(JSON.stringify(componentData.dataRoot.data))
    return {__html: html}
  }, [componentData.dataRoot.data])

  return <div className="json-container" dangerouslySetInnerHTML={innerHtml}/>
}

export const debugData = define(DebugData, 'DebugData')
  .name('Debug data')
  .category('Debug')
  .icon(DebugDataIcon)
