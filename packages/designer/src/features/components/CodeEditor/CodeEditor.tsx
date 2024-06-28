import type {WrapperProps} from '@react-form-builder/core'
import {namedObserver} from '@react-form-builder/core'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import type {CodeEditorProps} from './CodeEditorProps'
import {ConstrainedCodeEditor} from './ConstrainedCodeEditor'
import {UnconstrainedCodeEditor} from './UnconstrainedCodeEditor'

const LtrDiv = ({children}: WrapperProps) => {
  return <div dir="ltr" style={{width: '100%', height: '100%', minHeight: 0}}>{children}</div>
}

const RawCodeEditor = (props: CodeEditorProps) => {
  const builderStore = useBuilderStore()
  const themeFromBuilder = builderStore.theme === 'light' ? 'vs-extended' : 'vs-dark'
  const theme = props.theme ?? themeFromBuilder

  const codeEditorProps = {...props, theme}
  let editor = <ConstrainedCodeEditor {...codeEditorProps}/>

  if (!props.beginContextLine && !props.endContextLine) {
    const unconstrainedProps = {...codeEditorProps}
    // remove unnecessary properties
    delete unconstrainedProps.beginContextLine
    delete unconstrainedProps.endContextLine
    delete unconstrainedProps.canEditBeginContextLine
    editor = <UnconstrainedCodeEditor {...unconstrainedProps}/>
  }

  return <LtrDiv>{editor}</LtrDiv>
}

export const CodeEditor = namedObserver('CodeEditor', RawCodeEditor)
