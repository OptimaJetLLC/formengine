import {useComponentData} from 'fb-core'
import {observer} from 'mobx-react'
import {CompactCell, LabelCell, Row} from './List'

interface StandardStylesGroupProps {
  stylesDefinition: object
}

export const StandardStylesGroup = observer(({stylesDefinition}: StandardStylesGroupProps) => {
  const data = useComponentData()
  const css = data.componentStore.css
  if (!css) return null

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
              value={css.object?.[name] ?? css.object?.[name] ?? ''}
              onChange={(value: string) => {
                css.object ??= {}
                css.object[name] = value
              }}
            />
          </Row>
        )
      })}
    </>
  )
})
