import {observer} from 'mobx-react'
import {useComponentData} from '../../../../utils/contexts/ComponenDataContext'
import {StyleAn} from '../../../annotation/utils/annotations/StyleAn'
import {useEditor} from '../../../annotation/utils/useEditor'
import {CompactCell, LabelCell, Row} from './List'

interface StandardStylesGroupProps {
  stylesDefinition: object
}

export const StandardStylesGroup = observer(({stylesDefinition}: StandardStylesGroupProps) => {
  const {annotation}: {annotation: StyleAn} = useEditor()
  const {componentStore} = useComponentData()

  return (
    <>
      {Object.keys(stylesDefinition).map((name, index) => {
        return (
          <Row key={index}>
            <LabelCell label={name}/>
            <CompactCell
              dataKey={name}
              placeholder={'default'}
              rowIndex={index}
              value={componentStore.styles!.cssObject?.[name] ?? annotation.default?.cssObject?.[name] ?? ''}
              onChange={(value: string) => {
                componentStore.styles!.cssObject ??= {}
                componentStore.styles!.cssObject[name] = value
              }}
            />
          </Row>
        )
      })}
    </>
  )
})
