import {faMarker} from '@fortawesome/free-solid-svg-icons'
import {Close, Copy} from '@rsuite/icons'
import type {ComponentProps} from 'react'
import {HintedIconButton} from '../annotation-editors/Hinted'
import {useTranslationPart} from '../localization/hooks'
import {FaIcon} from './Icons'

const editButtonIcon = <FaIcon icon={faMarker} />

/**
 * The React form builder component that displays a button with a tooltip and a edit icon.
 * @param props the React component properties.
 * @returns the React element.
 * @internal
 */
export const EditButton = (props: ComponentProps<any>) => {
  const t = useTranslationPart('common')

  return <HintedIconButton hint={t('edit')} icon={editButtonIcon} {...props} />
}

const cloneButtonIcon = <Copy />

/**
 * The React form builder component that displays a button with a tooltip and a clone icon.
 * @param props the React component properties.
 * @returns the React element.
 * @internal
 */
export const CloneButton = (props: ComponentProps<any>) => {
  const t = useTranslationPart('common')

  return <HintedIconButton hint={t('clone')} icon={cloneButtonIcon} {...props} />
}

const removeButtonIcon = <Close />

/**
 * The React form builder component that displays a button with a tooltip and a delete icon.
 * @param props the React component properties.
 * @returns the React element.
 * @internal
 */
export const RemoveButton = (props: ComponentProps<any>) => {
  const t = useTranslationPart('common')

  return <HintedIconButton hint={t('remove')} icon={removeButtonIcon} {...props} />
}
