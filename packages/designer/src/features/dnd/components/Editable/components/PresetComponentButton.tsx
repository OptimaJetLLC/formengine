import type {IconDefinition} from '@fortawesome/fontawesome-common-types'
import * as faBookmark from '@fortawesome/free-regular-svg-icons/faBookmark.js'
import type {MouseEventHandler} from 'react'
import {useCallback} from 'react'
import {InputPicker} from 'rsuite'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {Hinted} from '../../../../annotation-editors/Hinted'
import {FaIcon} from '../../../../components/Icons'
import {useTranslationPart} from '../../../../localization/hooks'
import type {PromptDialogProps} from '../../../../ui/PromptDialogProps'

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
      if (builderStore.view.findMeta(name)) return {name: t('nameExists')}
    }
    const categories = new Set(builderStore.builderComponents.map(({category}) => category))
    const props = {
      data: [...categories.values()].map((value) => ({label: value, value})),
      block: true,
      creatable: true,
      'data-testid': 'preset-category-picker'
    }

    builderStore.showPromptModal({
      fields: [
        {name: 'name', label: t('name'), placeholder: t('namePlaceholder')},
        {name: 'category', label: t('category'), component: InputPicker, props}
      ],
      onOk: ({name, category}) => builderStore.createPresetComponentFromSelected(name, category),
      title: t('enterPresetName'),
      validate
    })
  }, [builderStore, t])

  return <Hinted hint={t('createPreset')} placement={'autoVertical'}>
    <FaIcon onClick={onPreset} icon={faBookmark as unknown as IconDefinition} className={'create-preset-button'}/>
  </Hinted>
}
