import {css, cx} from '@emotion/css'
import {CSSObject} from '@emotion/serialize/dist/declarations/types'
import {assign, clone as lodashClone} from 'lodash-es'
import {CSSProperties} from 'react'
import {Styles} from '../../../style/types'
import {EditorType} from '../../types'
import {StyleAn} from '../../types/annotations/StyleAn'
import {BaseBuilder} from './BaseBuilder'

export class StyleBuilder<T> extends BaseBuilder<T> {
  className?: string
  inlineStyle?: CSSProperties
  defaultStyle?: Styles
  cssObject?: object
  cssString?: string

  constructor(editor: EditorType) {
    super()
    this.annotation = {editor}
    this.options.type = 'Style'
  }

  css(value: CSSObject | string) {
    const clone = this.clone()
    clone.className = cx(this.className, css(value))
    assignCssSource(clone, value)
    return clone
  }

  inline(value: CSSProperties) {
    const clone = this.clone()
    clone.inlineStyle = value
    return clone
  }

  default(value: Styles) {
    const clone = this.clone()
    clone.defaultStyle = value
    return clone
  }

  build(key: string): StyleAn {
    const ann = super.build(key)
    const styleAnn = new StyleAn(ann.key, ann.name)
    return Object.assign(styleAnn, ann, {
      className: this.className,
      inline: this.inlineStyle,
      default: this.defaultStyle,
      css: {
        object: this.cssObject,
        string: this.cssString,
      }
    })
  }
}

function assignCssSource<T>(clone: StyleBuilder<T>, value: CSSObject | string) {
  if (typeof value === 'object') {
    clone.cssObject ??= {}
    clone.cssObject = lodashClone(clone.cssObject)
    assign(clone.cssObject, value)
  } else {
    //Remove first and last \n symbol
    let cssString1 = value.replace(new RegExp(/^\\n(.*\\n)?$/igm, 'g'), '').trim()
    clone.cssString ??= ''
    clone.cssString += cssString1 + '\n'
  }
}
