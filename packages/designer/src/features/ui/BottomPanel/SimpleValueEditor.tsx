import {useTranslation} from 'react-i18next'
import {Button, ButtonGroup} from 'rsuite'
import type {CalculableCodeEditorProps} from '../../calculation/CalculableCodeEditor'
import {Rows} from '../../components/Containers'
import styles from './SimpleValueEditor.module.css'

/**
 * The React form builder component that displays a simple value editor for a property.
 * @param props the React component properties.
 * @param props.editableProperty the parameters of the calculated component property.
 * @param props.onClose the callback function called when closing the code editor.
 * @returns the React element.
 */
export const SimpleValueEditor = ({editableProperty, onClose}: CalculableCodeEditorProps) => {
  const {t} = useTranslation()
  return (
    <Rows>
      <div className={styles.placeholder}>{t('bottomPanel.simpleValueHint')}</div>
      <ButtonGroup size={'sm'}>
        <Button appearance="ghost" onClick={editableProperty.disableCompute}>
          {t('common.save')}
        </Button>
        <Button appearance="ghost" onClick={onClose}>
          {t('common.close')}
        </Button>
      </ButtonGroup>
    </Rows>
  )
}
