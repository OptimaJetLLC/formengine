import {useComponentData} from '../../../../../utils/contexts/ComponenDataContext'
import {DropZone} from '../components/DropZone'
import {isContainer} from '../../../../annotation/utils'

export const useInnerDropZone = (props: Record<string, any>) => {
  const {model} = useComponentData()
  //const containers = model.properties.filter(value => value.isContainer);
  const containers = model.properties.filter(isContainer)

  for (let container of containers) {
    if (!props[container.key]) props[container.key] = <DropZone isInner={true}/>
  }
}
