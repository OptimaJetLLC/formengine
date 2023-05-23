import {boolean, define, node, string} from '@react-form-builder/builder/view'
import {Content, Footer, Header, Sidebar} from 'rsuite'

export const rsHeader = define(Header)
  .type('RsHeader')
  .name('Header')
  .props({
    children: node
  })

export const rsContent = define(Content)
  .type('RsContent')
  .name('Content')
  .props({
    children: node
  })

export const rsFooter = define(Footer)
  .type('RsFooter')
  .name('Footer')
  .props({
    children: node
  })

export const rsSidebar = define(Sidebar)
  .type('RsSidebar')
  .name('Sidebar')
  .props({
    children: node,
    collapsible: boolean.hinted('Sidebar can be collapsed'),
    width: string.hinted('Width')
  })
