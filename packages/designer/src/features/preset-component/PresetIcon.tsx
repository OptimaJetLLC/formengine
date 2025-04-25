import type {IconDefinition} from '@fortawesome/fontawesome-common-types'
import * as faBookmark from '@fortawesome/free-solid-svg-icons/faBookmark.js'
import {FaIcon} from '../components/Icons'

const iconStyle = {marginTop: 2}

/**
 * The default icon for the preset component.
 * @param props the React component properties.
 * @returns the React element.
 */
export const PresetIcon = (props: any) => {
  return <FaIcon icon={faBookmark as unknown as IconDefinition} {...props}
                 viewBox="0 0 384 512" width={18} height={14} style={iconStyle}/>
}
