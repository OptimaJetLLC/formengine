import {ComponentData, namedObserver} from '@react-form-builder/core'
import {useCallback, useEffect} from 'react'
import {Table} from 'rsuite'
import {Cell, Column, HeaderCell} from 'rsuite-table'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {useComputed} from '../../../../utils/useComputed'

type PropertyErrorColumn = {
  component: ComponentData
  property: string
  message: string
}

/**
 * PropertyErrors React component properties.
 */
export interface PropertyErrorsProps {
  /**
   * The callback function called when an error window is closed.
   */
  onClose: () => void
}

const _PropertyErrors = ({onClose}: PropertyErrorsProps) => {
  const store = useBuilderStore()

  const getData = useCallback(() => {
    const data: PropertyErrorColumn[] = []
    store.errorMap.forEach((value, component) => {
      Object.entries(value).forEach(([property, message]) => {
        if (message) data.push({component, property, message})
      })
    })
    return data
  }, [store.errorMap])

  const data = useComputed(getData)

  useEffect(() => {
    store.validate().catch(console.error)
  }, [store])

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
}

export const PropertyErrors = namedObserver('PropertyErrors', _PropertyErrors)
