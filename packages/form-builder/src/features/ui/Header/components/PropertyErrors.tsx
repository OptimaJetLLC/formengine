import {ComponentStore} from '@react-form-builder/core'
import {observer} from 'mobx-react'
import {useEffect} from 'react'
import {Table} from 'rsuite'
import {Cell, Column, HeaderCell} from 'rsuite-table'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {useComputed} from '../../../../utils/useComputed'

type PropertyErrorColumn = {
  componentStore: ComponentStore
  property: string
  message: string
}

export const PropertyErrors = observer(({onClose}: { onClose: () => void }) => {
  const store = useBuilderStore()

  const data = useComputed(() => {
    const data: PropertyErrorColumn[] = []
    store.errorMap.forEach((value, componentStore) => {
      Object.entries(value).forEach(([property, message]) => {
        if (message) data.push({componentStore, property, message})
      })
    })
    return data
  })

  useEffect(() => {
    store.validate()
  }, [])

  const handleLinkClick = (componentStore: ComponentStore) => {
    onClose()
    store.selectNode(componentStore)
  }

  return (
    <Table height={400} data={data}>
      <Column width={220} align="center" fixed>
        <HeaderCell>Component</HeaderCell>
        <Cell>
          {(rowData: PropertyErrorColumn) => {
            return <a onClick={() => handleLinkClick(rowData.componentStore)}>{rowData.componentStore.key}</a>
          }}
        </Cell>
      </Column>

      <Column width={150}>
        <HeaderCell>Property</HeaderCell>
        <Cell dataKey="property"/>
      </Column>

      <Column width={450}>
        <HeaderCell>Error message</HeaderCell>
        <Cell dataKey="message"/>
      </Column>
    </Table>
  )
})
