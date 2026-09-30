import type {IconDefinition} from '@fortawesome/fontawesome-common-types'
import * as faBookmark from '@fortawesome/free-regular-svg-icons/faBookmark.js'
import cx from 'clsx'
import type {MouseEventHandler} from 'react'
import {useCallback} from 'react'
import {InputPicker} from 'rsuite'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {Hinted} from '../../../../annotation-editors/Hinted'
import {FaIcon} from '../../../../components/Icons'
import {useTranslationPart} from '../../../../localization/hooks'
import type {PromptDialogProps} from '../../../../ui/PromptDialogProps'
import toolbarStyles from './Toolbar.module.css'

/**
 * Button for create the preset components.
 * @returns the preset components button.
 */
export const PresetComponentButton = () => {
  const builderStore = useBuilderStore()
  const t = useTranslationPart('presetComponent')

  const onPreset: MouseEventHandler = useCallback(() => {
    // eslint-disable-next-line @typescript-eslint/require-await
    const validate: PromptDialogProps['validate'] = async ({name}) => {
      if (!name) return {name: t('enterPresetName')}
      if (builderStore.view.findMeta(name)) return {name: t('nameExists')}
    }

    const categoriesArray = builderStore.builderComponents.map(({category}) => category ?? '').filter(value => !!value)
    const categories = new Set(categoriesArray)
    const props = {
      data: [...categories.values()].map(value => ({label: value, value})),
      block: true,
      creatable: true,
      'data-testid': 'preset-category-picker',
    }

    builderStore.showPromptModal({
      fields: [
        {name: 'name', label: t('name'), placeholder: t('namePlaceholder')},
        {name: 'category', label: t('category'), component: InputPicker, props},
      ],
      onOk: ({name, category}) => builderStore.createPresetComponentFromSelected(name, category),
      title: t('enterPresetName'),
      validate,
    })
  }, [builderStore, t])

  return (
    <Hinted hint={t('createPreset')} placement={'autoVertical'}>
      <button
        type="button"
        className={cx(toolbarStyles.actionButton, 'create-preset-button')}
        data-testid="toolbar-create-preset-button"
        aria-label={t('createPreset')}
        onClick={onPreset}
      >
        <FaIcon icon={faBookmark as unknown as IconDefinition} className={'create-preset-button'} />
      </button>
    </Hinted>
  )
}
