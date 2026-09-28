import type {IconDefinition} from '@fortawesome/fontawesome-common-types'
import {faSitemap} from '@fortawesome/free-solid-svg-icons'
import {useCallback} from 'react'
import {Dropdown} from 'rsuite'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {FaIcon} from '../../../../components/Icons'
import {customizable} from '../../../../customization/customizable'
import {useTranslationPart} from '../../../../localization/hooks'
import type {CustomizableMenuItemProps} from './CustomizableMenuItemProps'

const sitemapIcon = <FaIcon icon={faSitemap as unknown as IconDefinition} />

const RawExportJsonFormSchemaButton = ({className}: CustomizableMenuItemProps) => {
  const builderStore = useBuilderStore()
  const t = useTranslationPart('leftMenu')

  const handleGenerateSchema = useCallback(() => {
    builderStore.downloadJsonFormSchema()
  }, [builderStore])

  if (!builderStore.props.generateJsonFormSchema) return null

  return (
    <Dropdown.Item onSelect={handleGenerateSchema} icon={sitemapIcon} className={className}>
      {t('exportJsonFormSchema')}
    </Dropdown.Item>
  )
}

// eslint-disable-next-line no-secrets/no-secrets
export const ExportJsonFormSchemaButton = customizable('MainMenu_Item_ExportJsonFormSchema', RawExportJsonFormSchemaButton)
