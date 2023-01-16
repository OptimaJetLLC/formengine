import styled from '@emotion/styled'
import React from 'react'
import ColorPicker from 'rsuite-color-picker'
import 'rsuite-color-picker/lib/styles.css'
import {LabeledProperty} from '../../ui/Containers'
import {PropertyEditorProps} from '../types'
import {makeAnnotationProps} from '../utils'

export const ColorInput = ({componentStore, annotation}: PropertyEditorProps) => {
  const {value, onChange} = makeAnnotationProps({componentStore, annotation})
  const handleChange = ({rgb}: any) => {
    const {r, g, b, a} = rgb
    onChange(`rgba(${r}, ${g}, ${b}, ${a})`)
  }
  return <LabeledProperty annotation={annotation}>
    <SColorPicker><ColorPicker value={value} onChange={handleChange}/></SColorPicker>
  </LabeledProperty>
}

const SColorPicker = styled.div`
  width: 100%;

  .rsuite-color-picker {
    min-height: 30px;
    width: 100%;
    padding: 6px;
    background-clip: content-box;
    background-position: 0 0, 10px 10px;
    background-size: 20px 20px;
    background-image: linear-gradient(45deg, #eee 25%, transparent 25%, transparent 75%, #eee 75%, #eee 100%), linear-gradient(45deg, #eee 25%, white 25%, white 75%, #eee 75%, #eee 100%);

    .rsuite-color-picker-overlay {
      left: initial;
      right: 0;
      z-index: 10;
    }
  }
`
