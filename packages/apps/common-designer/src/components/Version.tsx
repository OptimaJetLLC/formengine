import {info} from '@react-form-builder/apps-common'
import {Dropdown} from 'rsuite'
import {version} from '../utils/config.json'

/**
 * Displays the application version.
 * @returns The version text.
 */
export const Version = () => {
  return (
    <Dropdown.Item icon={info} disabled={true}>
      {version}
    </Dropdown.Item>
  )
}
