import type {WrapperProps} from '@react-form-builder/core'
import {namedObserver} from '@react-form-builder/core'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import styles from './CodeEditor.module.css'
import type {CodeEditorProps} from './CodeEditorProps'
import {ConstrainedCodeEditor} from './ConstrainedCodeEditor'
import {UnconstrainedCodeEditor} from './UnconstrainedCodeEditor'

const LtrDiv = ({children}: WrapperProps) => {
  return (
    <div dir="ltr" className={styles.ltr}>
      {children}
    </div>
  )
}

const RawCodeEditor = (props: CodeEditorProps) => {
  const builderStore = useBuilderStore()
  const themeFromBuilder = builderStore.theme === 'light' ? 'vs-extended' : 'vs-dark'
  const theme = props.theme ?? themeFromBuilder

  const codeEditorProps = {...props, theme}

  if (!props.beginContextLine && !props.endContextLine) {
    const unconstrainedProps = {...codeEditorProps}
    // remove unnecessary properties
    delete unconstrainedProps.beginContextLine
    delete unconstrainedProps.endContextLine
    delete unconstrainedProps.canEditBeginContextLine
    return (
      <LtrDiv>
        <UnconstrainedCodeEditor {...unconstrainedProps} />
      </LtrDiv>
    )
  }

  const constrainedProps = {...codeEditorProps}
  delete constrainedProps.autoformat

  return (
    <LtrDiv>
      <ConstrainedCodeEditor {...constrainedProps} />
    </LtrDiv>
  )
}

export const CodeEditor = namedObserver('CodeEditor', RawCodeEditor)
