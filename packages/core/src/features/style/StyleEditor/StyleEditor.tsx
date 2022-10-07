import {useTranslation} from 'react-i18next'
import {PropertyEditorProps} from '../../annotation/types'
import {Rows} from '../../ui/Containers'
import {IndentStyles, OtherStyles, SizeStyles} from '../conts'
import {CSSBlock} from './components/CSSBlock'
import {CSSList} from './components/CSSList'
import {StandardStyles} from './components/StandardStyles'

export const StyleEditor = ({componentStore}: PropertyEditorProps) => {
  const {t} = useTranslation()

  //TODO mobx.createViewModel (непонятно как заставить работать с массивами) https://github.com/mobxjs/mobx-utils/issues/209
  return <Rows ml={'5px'} my={0}>
    <div>
      <h6>{t('style.size')}</h6>
      <StandardStyles componentStore={componentStore} stylesDefinition={SizeStyles}/>
    </div>
    <div>
      <h6>{t('style.indent')}</h6>
      <StandardStyles componentStore={componentStore} stylesDefinition={IndentStyles}/>
    </div>
    <div>
      <h6>{t('style.other')}</h6>
      <StandardStyles componentStore={componentStore} stylesDefinition={OtherStyles}/>
    </div>
    <div>
      <h6>{t('style.cssStyles')}</h6>
      <CSSList componentStore={componentStore}/>
    </div>
    <div>
      <h6 style={{marginBottom: 5}}>{t('style.cssStyleBlock')}</h6>
      <CSSBlock componentStore={componentStore}/>
    </div>
  </Rows>
}
