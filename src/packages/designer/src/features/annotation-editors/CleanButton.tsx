import {cx} from '@emotion/css'
import {Close} from '@rsuite/icons'
import {useMemo} from 'react'
import {useTranslationPart} from '../localization/hooks'
import {Hinted} from './Hinted'

/**
 * The properties of the clean button.
 */
export interface CleanButtonProps {
  /**
   * The callback function called when the button is clicked.
   */
  onClick: () => void
}

/**
 * The React component that the clean button.
 * @param props the React component properties.
 * @param props.onClick the callback function called when the button is clicked.
 * @returns the React element.
 */
export const CleanButton = ({onClick}: CleanButtonProps) => {
  const getLabel = useTranslationPart('propertiesEditor')
  const cleanLabel = useMemo(() => getLabel('clean'), [getLabel])
  const cls = useMemo(() => cx(['rs-picker-clean', 'rs-btn-close']), [])

  return <Hinted hint={cleanLabel}>
    <button className={cls} onClick={onClick}>
      <Close/>
    </button>
  </Hinted>
}
