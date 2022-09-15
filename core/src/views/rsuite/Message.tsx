import {Message} from 'rsuite'
import {string} from '../../features/annotation'
import {WithPicker} from '../../features/annotation/inputs/Picker'
import {AnnotationBuilder} from '../../features/annotation/utils/AnnotationBuilder'
import {define} from '../../features/annotation/utils/define'

export const message = define(Message)
  .props({
    // children: reactElements,
    // closeable: boolean,
    header: string.with({defaultValue: 'Test'}),
    type: new AnnotationBuilder<'info' | 'success' | 'warning' | 'error' | undefined>({
      component: WithPicker([
        {label: 'Info', value: 'info'},
        {label: 'Success', value: 'success'},
        {label: 'Warning', value: 'warning'},
        {label: 'Error', value: 'error'},
      ]),
    }),
  })
