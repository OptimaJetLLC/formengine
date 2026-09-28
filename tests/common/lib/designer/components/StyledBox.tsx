import {define} from '@react-form-builder/core'

const StyledBox = () => {
  return (
    <div data-testid="styled-box" style={{minHeight: 40, minWidth: 120}}>
      StyledBox
    </div>
  )
}

export const styledBoxComponent = define(StyledBox, 'StyledBox')
  .name('StyledBox')
  .category('Error')
  .showInlineStylesEditor(true)
  .showClassNameStylesEditor(false)
