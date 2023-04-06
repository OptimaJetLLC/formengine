import {useComponentData} from 'fb-core'
import {Input} from 'rsuite'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import {useEditor} from '../../utils/useEditor'
import LabeledProperty from '../ui/common/LabeledProperty'

const KeyInput = () => {
  const {annotation} = useEditor()
  const {componentStore} = useComponentData()
  const store = useBuilderStore()

  const handleChange = (value: string) => {
    componentStore.key = value
    store.selectNode(value)
  }

  return (
    <LabeledProperty annotation={annotation}>
      <Input
        autoFocus
        value={componentStore.key}
        onChange={handleChange}
        size={'xs'}
      />
    </LabeledProperty>
  )
}

export {KeyInput}
