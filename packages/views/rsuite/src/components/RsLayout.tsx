import {boolean, define, node, string} from 'form-builder'
import {Content, Footer, Header, Sidebar} from 'rsuite'

export const rsHeader = define(Header)
  .type('RsHeader')
  .props({
    children: node
  })

export const rsContent = define(Content)
  .type('RsContent')
  .props({
    children: node
  })

export const rsFooter = define(Footer)
  .type('RsFooter')
  .props({
    children: node
  })

export const rsSidebar = define(Sidebar)
  .type('RsSidebar')
  .props({
    children: node,
    collapsible: boolean.hinted('Sidebar can be collapsed'),
    width: string.hinted('Width')
  })
