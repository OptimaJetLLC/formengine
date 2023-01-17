import {Input} from 'rsuite'
import {useComponentData} from '../../../utils/contexts/ComponenDataContext'
import {LabeledProperty} from '../../ui/Containers'
import {useEditor} from '../utils/useEditor'

const KeyInput = () => {
  const {annotation} = useEditor()
  const {componentStore} = useComponentData()
  return (
    <LabeledProperty annotation={annotation}>
      <Input
        value={componentStore.key}
        onChange={value => componentStore.key = value as string}
        size={'xs'}
      />
    </LabeledProperty>
  )
}

export {KeyInput}
