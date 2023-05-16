import {IndentStyles, OtherStyles, SizeStyles} from '@react-form-builder/core'
import {useTranslation} from 'react-i18next'
import {StandardStylesGroup} from './StandardStylesGroup'

export const StandardStyles = () => {
  const {t} = useTranslation()

  return (
    <>
      <div>
        <h6>{t('style.size')}</h6>
        <StandardStylesGroup stylesDefinition={SizeStyles}/>
      </div>
      <div>
        <h6>{t('style.indent')}</h6>
        <StandardStylesGroup stylesDefinition={IndentStyles}/>
      </div>
      <div>
        <h6>{t('style.other')}</h6>
        <StandardStylesGroup stylesDefinition={OtherStyles}/>
      </div>
    </>
  )
}
