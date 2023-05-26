import {boolean, define, event, node, string} from '@react-form-builder/builder/view'
import type {PanelProps} from 'rsuite'
import {Panel} from 'rsuite'
import {headerSize} from '../commonProperties'
import {RsTitle} from './RsTitle'

interface RsCardProps extends PanelProps {
  title?: string
  headerSize: string
}

const RsCard = ({header, title, headerSize, ...props}: RsCardProps) => {
  const panelHeader = <>
    {!!title && <RsTitle headerSize={headerSize} content={title}/>}
    {header}
  </>
  return <Panel header={panelHeader} {...props}/>
}

export const rsCard = define(RsCard)
  .type('RsCard')
  .name('Card')
  .props({
    header: node,
    children: node,
    title: string.default('Title'),
    headerSize,
    bodyFill: boolean,
    bordered: boolean.default(true),
    shaded: boolean.default(true),
    defaultExpanded: boolean,
    collapsible: boolean,
    eventKey: string,
    onSelect: event
  })
