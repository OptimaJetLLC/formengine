import {ComponentData} from '@react-form-builder/core'
import {observer} from 'mobx-react'
import {useEffect} from 'react'
import {Table} from 'rsuite'
import {Cell, Column, HeaderCell} from 'rsuite-table'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {useComputed} from '../../../../utils/useComputed'

type PropertyErrorColumn = {
  component: ComponentData
  property: string
  message: string
}

export const PropertyErrors = observer(({onClose}: { onClose: () => void }) => {
  const store = useBuilderStore()

  const data = useComputed(() => {
    const data: PropertyErrorColumn[] = []
    store.errorMap.forEach((value, component) => {
      Object.entries(value).forEach(([property, message]) => {
        if (message) data.push({component, property, message})
      })
    })
    return data
  })

  useEffect(() => {
    store.validate().catch(console.error)
  }, [])

  const handleLinkClick = (component: ComponentData) => {
    onClose()
    store.selectNode(component)
  }

  return (
    <Table height={400} data={data}>
      <Column width={220} align="center" fixed>
        <HeaderCell>Component</HeaderCell>
        <Cell>
          {(rowData: PropertyErrorColumn) => {
            return <a onClick={() => handleLinkClick(rowData.component)}>{rowData.component.key}</a>
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
