import type {FunctionArgumentValue} from '@react-form-builder/core'
import {namedObserver, useComponentData} from '@react-form-builder/core'
import {useCallback, useMemo} from 'react'
import {useTranslation} from 'react-i18next'
import {Button} from 'rsuite'
import {EditableFunction} from '../../../../../../../../../../stores/EditableFunction'
import {useBuilderStore} from '../../../../../../../../../../utils/BuilderStoreContext'
import {RemoveButton} from '../../../../../../../../../components/Buttons'
import {Columns} from '../../../../../../../../../components/Containers'
import {useActionData} from '../../../../contexts/ActionDataContext'
import {useEventHandlerItem} from '../../../../contexts/EventHandlerItemContext'
import type {InputProps} from '../InputProps'

const buttonStyle = {borderStyle: 'dashed'}

const beginContextLine = `/**
 * @param {ActionEventArgs} e the action arguments.
 * @param {} args the action parameters arguments.
 * @param {Array} userArgs the rest parameters passed to the function form user space code.
 */
async function ArgumentCallback(e, args, ...userArgs) {`

const endContextLine = '}'

const getFunctionSource = (source: string) => `${beginContextLine}${source}${endContextLine}`

const useFnArgument = (name: string): [string | undefined, (src?: string) => void] => {
  const data = useActionData()
  const arg = data?.args?.[name] as FunctionArgumentValue
  const fnBody = arg?.body

  const setFnBody = useCallback((src?: string) => {
    data.args ??= {}
    data.args[name] = {type: 'fn', body: src}
  }, [data, name])

  return useMemo(() => [fnBody, setFnBody], [setFnBody, fnBody])
}

const RawInputFunction = ({name}: InputProps) => {
  const builderStore = useBuilderStore()
  const [value, setFn] = useFnArgument(name)
  const {t} = useTranslation()
  const componentData = useComponentData()
  const data = useActionData()
  const eventHandlerItem = useEventHandlerItem()
  const eventHandlerName = `${eventHandlerItem.eventName}[${eventHandlerItem.index}]`
  const title = `${t('bottomPanel.editCodeAction')}: ${componentData.key}.${eventHandlerName} ${data.name}:${name}`

  const clear = useCallback(() => setFn(undefined), [setFn])

  const onClose = useCallback(() => {
    builderStore.currentEditable = undefined
  }, [builderStore])

  const onCompile = useCallback((source: string) => {
    try {
      const src = getFunctionSource(source)
      const compiled = new Function('e', 'args', src)
      const result = compiled()
      return {error: false, result}
    } catch (e) {
      return {error: true, exceptions: [e as Error]}
    }
  }, [])

  const handleEdit = useCallback(() => {
    const editableFunction = new EditableFunction(
      title,
      setFn,
      onClose,
      onCompile,
      value || '',
      beginContextLine,
      endContextLine,
    )
    builderStore.editFunction(editableFunction)
  }, [builderStore, onClose, onCompile, setFn, title, value])

  return (<Columns>
    <Button onClick={handleEdit} size={'xs'} appearance={'ghost'} block style={buttonStyle}>
      {t('annotation.code.hint')}
    </Button>
    {!!value && <RemoveButton onClick={clear}/>}
  </Columns>)
}

export const InputFunction = namedObserver('InputFunction', RawInputFunction)
