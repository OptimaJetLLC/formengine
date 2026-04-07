import {Hinted} from '../../../../annotation-editors/Hinted'
import styles from './PropertyBlockHeader.module.css'

/**
 * The properties of the PropertyBlockHeader component.
 */
interface PropertyBlockHeaderProps {
  /**
   * The header hint.
   */
  hint?: string
  /**
   * The header value.
   */
  header: string
}

/**
 * Displays the header of the properties block.
 * @param props the React component properties.
 * @returns the React element.
 */
export const PropertyBlockHeader = (props: PropertyBlockHeaderProps) => {
  const {hint, header} = props
  return (
    <Hinted hint={hint}>
      <span className={styles.header}>{header}</span>
    </Hinted>
  )
}
