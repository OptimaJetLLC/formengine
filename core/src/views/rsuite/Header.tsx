import {string} from '../../features/annotation'
import {define} from '../../features/annotation/utils/define'

interface HeaderProps {
  content: string
  subheader?: string
}

const Header = (props: HeaderProps) => {

  return (
    <div style={{textAlign: 'center'}}>
      <h4>{props.content}</h4>
      <label>{props.subheader}</label>
    </div>
  )
}

export const header = define(Header)
  .props({
    content: string.isRequired('Header'),
    subheader: string,
  })

