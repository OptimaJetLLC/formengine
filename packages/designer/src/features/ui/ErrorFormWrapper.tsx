import {namedObserver, useStore} from '@react-form-builder/core'
import type {PropsWithChildren} from 'react'
import {Button, Message} from 'rsuite'
import {useCreateForm} from '../../utils/useCreateForm'
import {useTranslationPart} from '../localization/hooks'
import styles from './ErrorFormWrapper.module.css'

export const ErrorFormWrapper = namedObserver('ErrorFormPlaceholder', function ({children}: PropsWithChildren<any>) {
  const {formLoadError} = useStore()
  const t = useTranslationPart('formsList')
  const createForm = useCreateForm()

  const withWrapper = (
    <div className={styles.container}>
      <Message className={styles.message} type={'info'} showIcon>
        {children}
      </Message>
      <Button onClick={createForm} block appearance={'primary'}>{t('addNewForm')}</Button>
    </div>
  )

  return formLoadError ? withWrapper : children
})
