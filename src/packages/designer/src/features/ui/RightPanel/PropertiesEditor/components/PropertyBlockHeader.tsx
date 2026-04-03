import {css} from '@emotion/css'
import {Hinted} from '../../../../annotation-editors/Hinted'

const spanClassName = css`
  font-weight: bold;
  font-size: 16px;
`

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
  return <Hinted hint={hint}>
    <span className={spanClassName}>{header}</span>
  </Hinted>
}
