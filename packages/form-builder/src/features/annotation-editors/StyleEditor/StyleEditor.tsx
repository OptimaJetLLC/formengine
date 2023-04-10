import {useComponentData} from 'fb-core'
import {useEffect} from 'react'
import {Rows} from '../../components/Containers'
import {CSSBlock} from './components/CSSBlock'
import {DefinedStyles} from './components/DefinedStyles'
import {StandardStyles} from './components/StandardStyles'

export const StyleEditor = () => {
  const {componentStore} = useComponentData()

  useEffect(() => {
    componentStore.css ??= {}
  }, [componentStore.css])

  if (!componentStore.css) return null

  return (
    <Rows ml={'5px'} my={0}>
      <StandardStyles/>
      <CSSBlock/>
      <DefinedStyles/>
    </Rows>
  )
}

