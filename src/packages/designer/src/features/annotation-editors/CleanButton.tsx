import {Close} from '@rsuite/icons'
import cx from 'clsx'
import {useMemo} from 'react'
import {useTranslationPart} from '../localization/hooks'
import {Hinted} from './Hinted'

/**
 * The properties of the cross button.
 */
interface CrossButtonProps {
  /**
   * The callback function called when the button is clicked.
   */
  onClick: () => void
  /**
   * The hint text.
   */
  hint?: string
  /**
   * The class name.
   */
  className?: string
}

/**
 * The React component that displays the cross button.
 * @param props the React component properties.
 * @returns the React element.
 */
export const CrossButton = (props: CrossButtonProps) => {
  const {onClick, hint, className} = props
  const cls = useMemo(() => cx(['rs-picker-clean', 'rs-btn-close', className]), [className])

  return <Hinted hint={hint}>
    <button className={cls} onClick={onClick}>
      <Close/>
    </button>
  </Hinted>
}

/**
 * The properties of the clean button.
 */
interface CleanButtonProps {
  /**
   * The callback function called when the button is clicked.
   */
  onClick: () => void
  /**
   * The class name.
   */
  className?: string
}

/**
 * The React component that displays the clean button.
 * @param props the React component properties.
 * @returns the React element.
 */
export const CleanButton = (props: CleanButtonProps) => {
  const {onClick, className} = props
  const getLabel = useTranslationPart('propertiesEditor')
  const cleanLabel = useMemo(() => getLabel('clean'), [getLabel])

  return <CrossButton hint={cleanLabel} onClick={onClick} className={className}/>
}
