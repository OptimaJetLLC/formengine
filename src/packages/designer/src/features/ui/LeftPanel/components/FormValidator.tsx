import {namedObserver} from '@react-form-builder/core'
import {useCallback} from 'react'
import {Button} from 'rsuite'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {RemoveButton} from '../../../components/Buttons'
import {Columns} from '../../../components/Containers'
import {LabeledWrapper} from '../../../components/LabeledProperty'
import {useTranslationPart} from '../../../localization/hooks'
import styles from './FormValidator.module.css'

const RawFormValidator = () => {
  const builderStore = useBuilderStore()
  const form = builderStore.viewer.form
  const handleEdit = useCallback(() => builderStore.editFormValidator(), [builderStore])
  const t = useTranslationPart('annotation.code')
  const remove = useCallback(() => form.formValidator = undefined, [form])

  return (
    <LabeledWrapper label={t('name')} hint={t('hint')}>
      <Columns>
        <Button
          onClick={handleEdit}
          size="xs"
          appearance="ghost"
          block
          className={styles.button}
        >
          {t('hint')}
        </Button>
        {!!form.formValidator && <RemoveButton onClick={remove}/>}
      </Columns>
    </LabeledWrapper>
  )
}

export const FormValidator = namedObserver('FormValidator', RawFormValidator)
