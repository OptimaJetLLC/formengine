import {Icon} from '@rsuite/icons'
import {icons} from '../../../icons/icons'

/**
 * Icon to mark the AI-generated content.
 * @param props the React component properties.
 * @param props.className the CSS class name.
 * @returns the React element.
 */
export const AiIcon = ({className}: { className?: string }) => {
  return <Icon fontSize={16} as={icons.Sparks} color={'var(--rs-text-secondary)'} className={className}/>
}
