import {isContainer, useComponentData} from 'fb-core'
import {DropZone} from '../components/DropZone'

export const useInnerDropZone = (props: Record<string, any>) => {
  const {model} = useComponentData()
  //const containers = model.properties.filter(value => value.isContainer);
  const containers = model.properties.filter(isContainer)

  for (let container of containers) {
    if (!props[container.key]) props[container.key] = <DropZone isInner={true}/>
  }
}
