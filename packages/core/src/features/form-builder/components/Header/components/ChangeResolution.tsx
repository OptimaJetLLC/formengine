import styled from '@emotion/styled'
import {IconDefinition} from '@fortawesome/fontawesome-common-types'
import * as faDesktop from '@fortawesome/free-solid-svg-icons/faDesktop'
import * as faMobile from '@fortawesome/free-solid-svg-icons/faMobile'
import * as faTablet from '@fortawesome/free-solid-svg-icons/faTablet'
import {observer} from 'mobx-react'
import React from 'react'
import {useTranslation} from 'react-i18next'
import {Radio, RadioGroup} from 'rsuite'
import {BuilderViewMode} from '../../../../../stores/Store'
import {useStore} from '../../../../../utils/contexts/StoreContext'
import {FaIcon} from '../../../../ui/Icons'

const resolutions = [
  {name: 'desktop', icon: faDesktop},
  {name: 'mobile', icon: faMobile},
  {name: 'tablet', icon: faTablet}
]

const _ChangeResolution = () => {
  const store = useStore()
  const {t} = useTranslation()

  return <RadioGroup name="changeResolutionList" inline appearance="picker" value={store.viewMode}
                     onChange={value => store.viewMode = value as BuilderViewMode}>
    {resolutions.map((value, index) =>
      <Radio value={value.name} key={index}>
        <SFaIcon icon={value.icon as unknown as IconDefinition}/>
        {t('rightMenu.' + value.name)}
      </Radio>)
    }
  </RadioGroup>
}

export const ChangeResolution = observer(_ChangeResolution)

const SFaIcon = styled(FaIcon)`
  margin-right: 6px;
`
