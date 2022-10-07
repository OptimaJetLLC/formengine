import {Form as FormikForm, FormikContext, FormikContextType} from 'formik'
import {observable} from 'mobx'
import React, {useContext} from 'react'
import {useStore} from '../../../utils/contexts/StoreContext'

export const Form = (props: any) => {
  const store = useStore()
  store.formContext = useContext<FormikContextType<any>>(FormikContext)
  store.formContext.values = store.selected?.data.props ?? observable({})

  //TODO вывод данных об значениях поля, ошибках и тд для инспекции

  return (
    <FormikForm style={{display: 'flex', flexDirection: 'column', flex: 1}}>
      {props.children}
    </FormikForm>
  )
}
