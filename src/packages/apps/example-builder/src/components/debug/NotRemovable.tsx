import {define} from '@react-form-builder/core'

const divStyle = {
  width: 100,
  height: 100,
  backgroundColor: 'aliceblue'
}

const NotRemovable = () => <div style={divStyle}/>

export const notRemovable = define(NotRemovable, 'NotRemovable')
  .name('Not removable')
  .category('Debug')
  .disableRemove()
