import {useComponentData} from 'fb-core'
import {Input} from 'rsuite'
import {useEditor} from '../../utils/useEditor'
import LabeledProperty from '../ui/common/LabeledProperty'

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
