import type {ComponentData} from '@react-form-builder/core'
import {namedObserver} from '@react-form-builder/core'
import {useCallback, useEffect} from 'react'
import {Table} from 'rsuite'
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

const {Cell, Column, HeaderCell} = Table

const ComponentCell = ({rowData, onLinkClick}: { rowData: PropertyErrorColumn, onLinkClick: (component: ComponentData) => void }) => {
  const handleClick = useCallback(() => onLinkClick(rowData.component), [onLinkClick, rowData.component])
  return <a onClick={handleClick}>{rowData.component.key}</a>
}

const RawPropertyErrors = ({onClose}: PropertyErrorsProps) => {
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

  const handleLinkClick = useCallback((component: ComponentData) => {
    onClose()
    store.selectNode(component)
  }, [onClose, store])

  const cellRenderer = useCallback((rowData: PropertyErrorColumn) => {
    return <ComponentCell rowData={rowData} onLinkClick={handleLinkClick}/>
  }, [handleLinkClick])

  useEffect(() => {
    store.validate().catch(console.error)
  }, [store])

  return (
    <Table height={400} data={data}>
      <Column width={220} align="center" fixed>
        <HeaderCell>Component</HeaderCell>
        <Cell>{cellRenderer}</Cell>
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

export const PropertyErrors = namedObserver('PropertyErrors', RawPropertyErrors)
