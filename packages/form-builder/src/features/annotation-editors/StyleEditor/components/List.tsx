import styled from '@emotion/styled'
import {AutoComplete} from 'rsuite'

//TODO нормальную сортировку выпадающих вариантов
const CompactCell = ({dataKey, rowIndex, value, onChange, options, ...props}: any) => {
  return (
    <StyledInput
      className={value?.length ? '' : 'empty'} data={options}
      style={{color: dataKey == 'styleName' ? 'var(--rs-text-secondary)' : 'initial'}}
      value={value}
      onChange={onChange}
      {...props}
    />
  )
}

const LabelCell = ({label, ...props}: any) => {
  return <Label {...props}>{label}</Label>
}

const Label = styled.label`
  display: flex;
  flex: 1;
  padding: 4px 2px;
`

const Row = styled.div`
  display: flex;
  flex: 1;
`

const StyledInput = styled(AutoComplete)`
  display: flex;
  flex: 1;
  padding: 4px 2px;

  input {
    padding: 2px 4px;
    line-height: 1.35;
    border-radius: 0;
    border: none;
    word-break: break-word !important;
    //font-weight: bold;
    //&:focus, &:active, 
    &:hover {
      outline: 1px solid var(--rs-border-primary) !important;
      //box-shadow: var(--rs-state-focus-shadow);
    }
  }

  &.empty > input {
    //background-color: var(--rs-listbox-option-selected-bg);
    //font-weight: initial;
    border-bottom: 1px solid var(--rs-border-primary);
  }
`

export {CompactCell, LabelCell, Row}


