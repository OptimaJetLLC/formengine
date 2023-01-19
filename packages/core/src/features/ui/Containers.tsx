import styled from '@emotion/styled'
import {IconDefinition} from '@fortawesome/fontawesome-common-types'
import * as faCode from '@fortawesome/free-solid-svg-icons/faCode'
import {observer} from 'mobx-react'
import React, {cloneElement, ComponentProps} from 'react'
import {IconButton} from 'rsuite'
import useUniqueId from 'rsuite/cjs/utils/useUniqueId'
//https://styled-system.com/#expressive-consistent-ui-components
//https://styled-system.com/table
//Позволяет прописывать стили в виде коротких пропсов
import {color, layout, space} from 'styled-system'
import {useBuilderStore} from '../../utils/contexts/BuilderStoreContext'
import {useComponentData} from '../../utils/contexts/ComponenDataContext'
import {Hinted, HintedLabel} from '../annotation/components/Hinted'
import {Annotation} from '../annotation/utils/annotations/Annotation'
import {useTranslationPart} from '../localization/hooks'
import {FaIcon} from './Icons'

//TODO remove styled-system library

const Box = styled('div')(
  layout,
  space,
  color
)

const Rows = styled(Box)<{ margin?: number, mx?: number | string }>`
  display: flex;
  flex-direction: column;

  ${(props: any) => (props.my !== undefined) ? '' : 'margin: 10px 0;'}
  & > * {
    margin: ${(props: any) => (props.margin ?? '5') + 'px'} 0;
  }

  & > *:first-of-type {
    margin-top: 0;
  }

  & > *:last-of-type {
    margin-bottom: 0;
  }
`

const Columns = styled(Box)<{ margin?: number }>`
  display: flex;
  flex-direction: row;
  margin: 0 10px;

  & > * {
    margin: 0 ${(props: any) => (props.margin ?? '5') + 'px'};
    flex: 1;
  }

  & > *:first-of-type {
    margin-left: 0;
  }

  & > *:last-of-type {
    margin-right: 0;
  }
`

const LabeledInput = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;

  & > label {
    width: 100px;
    min-width: 80px;
  }
`

export interface LabeledPropertyProps extends ComponentProps<any> {
  idPrefix?: string
  annotation: Annotation
}

const _CodeButton = ({annotation}: { annotation: Annotation }) => {
  const {componentStore} = useComponentData()
  const store = useBuilderStore()
  const hasCode = componentStore.props[annotation.key]?.fnSource
  const getLabel = useTranslationPart('propertiesEditor.calculable')
  const hint = hasCode ? getLabel('edit') : getLabel('hint')
  const color = hasCode ? 'var(--rs-btn-primary-bg)' : undefined

  const setCurrentCalculatedProperty = () => store.calculatedProperty = {componentStore, annotation}
  return <Hinted hint={hint}>
    <SIconButton onClick={setCurrentCalculatedProperty} disabled={!annotation.calculable}
                 icon={<FaIcon icon={faCode as unknown as IconDefinition} color={color}/>}
                 size={'xs'} appearance={'subtle'}/>
  </Hinted>
}

export const CodeButton = observer(_CodeButton)

export const LabeledProperty = ({idPrefix, annotation, children}: LabeledPropertyProps) => {
  const id = useUniqueId(idPrefix || 'id-')
  const getLabel = useTranslationPart(`annotation.${annotation.key}`)

  return <LabeledInput>
    <CodeButton annotation={annotation}/>
    <HintedLabel htmlFor={id} hint={getLabel('hint') || annotation.hint}>
      <>{getLabel('name') || annotation.name}</>
    </HintedLabel>
    {children ? cloneElement(children, {id}) : undefined}
  </LabeledInput>
}

const SIconButton = styled(IconButton)`
  min-width: 24px;
  margin-inline-end: -6px;
  margin-bottom: -2px !important;
`

export {Box, Rows, Columns, LabeledInput}
