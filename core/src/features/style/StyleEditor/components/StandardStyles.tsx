import _ from 'lodash/fp'
import {ComponentStore} from '../../../../stores/ComponentStore'
import {CompactCell, LabelCell, Row} from './List'

export const StandardStyles = ({
                                 componentStore,
                                 stylesDefinition
                               }: { componentStore: ComponentStore, stylesDefinition: any }) => {
  //TODO mobx.createViewModel (непонятно как заставить работать с массивами) https://github.com/mobxjs/mobx-utils/issues/209
  const styles = _.cloneDeep(componentStore.styles) || {}

  return <>
    {Object.entries(stylesDefinition).map((item, index) => {
      const cellProps = {
        rowData: styles, rowIndex: index, editable: true,
        onBlur: () => {
          componentStore.styles = styles
        }
      }
      return (
        <Row key={index}>
          <LabelCell label={item[0]}/>
          <CompactCell dataKey={item[0]} placeholder={'default'} {...cellProps} />
        </Row>
      )
    })}
  </>
}
