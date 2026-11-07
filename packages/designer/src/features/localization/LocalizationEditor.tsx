import {namedObserver} from '@react-form-builder/core'
import {Button} from 'rsuite'
import type {CalculableCodeEditorProps} from '../calculation/CalculableCodeEditor'
import {GenericCodeEditor} from '../calculation/GenericCodeEditor'
import {LocalizationPicker} from './components/LocalizationPicker'
import {useTranslationPart} from './hooks'
import {useLocalizationEditor} from './useLocalizationEditor'

const RawLocalizationEditor = ({editableProperty, onClose}: CalculableCodeEditorProps) => {
  const tPanel = useTranslationPart('bottomPanel')
  const {language, handleLanguageSelect, handleClear, genericCodeEditorProps} = useLocalizationEditor({editableProperty})

  const toolbarExtra = (
    // react-perf 3.4 treats JSX fragments as illegal prop values; this toolbar slot needs two controls.
    // eslint-disable-next-line react-perf/jsx-no-jsx-as-prop -- multi-control toolbar slot
    <>
      <LocalizationPicker data-testid="localization-editor-language" value={language.fullCode} onSelect={handleLanguageSelect} />
      <Button appearance="ghost" data-testid="localization-editor-clear" size="sm" onClick={handleClear}>
        {tPanel('clearLocalization')}
      </Button>
    </>
  )

  return <GenericCodeEditor {...genericCodeEditorProps} onClose={onClose} toolbarExtra={toolbarExtra} />
}

export const LocalizationEditor = namedObserver('LocalizationEditor', RawLocalizationEditor)
