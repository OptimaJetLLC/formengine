import {PropertyEditorProps} from '../../annotation/types'
import {ActionList} from './components/ActionList'
import {AddActionButton} from './components/AddActionButton'

//EventEditor: one eventName - one editor - some actions
export const EventEditor = ({annotation}: PropertyEditorProps<Function | undefined>) => {
  const title = annotation.title.split(' ').splice(1).join(' ') + ' Actions'


  return <div style={{marginBottom: 20}}>
    <label style={{marginLeft: 10}}>{title}</label>
    <ActionList eventName={annotation.key}/>
    <AddActionButton eventKey={annotation.key}/>
  </div>
}
