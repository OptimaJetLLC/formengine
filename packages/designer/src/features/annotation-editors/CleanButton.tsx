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
  /**
   * The test identifier.
   */
  'data-testid'?: string
}

/**
 * The React component that displays the cross button.
 * @param props the React component properties.
 * @returns the React element.
 */
export const CrossButton = (props: CrossButtonProps) => {
  const {onClick, hint, className, ['data-testid']: testId} = props

  return <Hinted hint={hint}>
    <button className={cx(['rs-picker-clean', 'rs-btn-close', className])} onClick={onClick} data-testid={testId}>
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
  /**
   * The test identifier.
   */
  'data-testid'?: string
}

/**
 * The React component that displays the clean button.
 * @param props the React component properties.
 * @returns the React element.
 */
export const CleanButton = (props: CleanButtonProps) => {
  const {onClick, className, ['data-testid']: testId} = props
  const getLabel = useTranslationPart('propertiesEditor')
  const cleanLabel = useMemo(() => getLabel('clean'), [getLabel])

  return <CrossButton hint={cleanLabel} onClick={onClick} className={className} data-testid={testId}/>
}
