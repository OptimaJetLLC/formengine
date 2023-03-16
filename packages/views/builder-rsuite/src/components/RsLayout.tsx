import {boolean, define, node, string} from 'fb-core'
import {Content, Footer, Header, Sidebar} from 'rsuite'

export const rsHeader = define(Header)
  .typed('RsHeader')
  .props({
    children: node
  })

export const rsContent = define(Content)
  .typed('RsContent')
  .props({
    children: node
  })

export const rsFooter = define(Footer)
  .typed('RsFooter')
  .props({
    children: node
  })

export const rsSidebar = define(Sidebar)
  .typed('RsSidebar')
  .props({
    children: node,
    collapsible: boolean.hinted('Sidebar can be collapsed'),
    width: string.hinted('Width')
  })
