import type {AnnotationEditorProps} from '../AnnotationEditorProps'
import {ActionList} from './components/ActionList'
import {AddActionButton} from './components/AddActionButton'
import styles from './EventEditor.module.css'

/**
 * The property editor for the event property type.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
export const EventEditor = (props: AnnotationEditorProps) => {
  const eventName = props.annotation.key
  return (
    <div className={styles.root}>
      <h6 className={styles.heading}>{eventName}</h6>
      <ActionList {...props}/>
      <AddActionButton {...props}/>
    </div>
  )
}
