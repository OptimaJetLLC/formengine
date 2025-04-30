import styled from '@emotion/styled'
import {namedObserver, useStore} from '@react-form-builder/core'
import type {PropsWithChildren} from 'react'
import {Button, Message} from 'rsuite'
import {useCreateForm} from '../../utils/useCreateForm'
import {useTranslationPart} from '../localization/hooks'

const SMessage = styled(Message)`
  font-size: 16px;
  font-weight: bolder;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
`

export const ErrorFormWrapper = namedObserver('ErrorFormPlaceholder', function ({children}: PropsWithChildren<any>) {
  const {formLoadError} = useStore()
  const t = useTranslationPart('formsList')
  const createForm = useCreateForm()

  const withWrapper = <Container>
    <SMessage type={'info'} showIcon>
      {children}
    </SMessage>
    <Button onClick={createForm} block appearance={'primary'}>{t('addNewForm')}</Button>
  </Container>

  return formLoadError ? withWrapper : children
})
