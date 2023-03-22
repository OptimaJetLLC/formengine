import styled from '@emotion/styled'
import {AutoComplete} from 'rsuite'
import {compactInput} from '../../../ui/common/styles'

//TODO нормальную сортировку выпадающих вариантов
const CompactCell = ({dataKey, rowIndex, value, onChange, options, ...props}: any) => {
  return (
    <AutoComplete
      className={compactInput} data={options}
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

export {CompactCell, LabelCell, Row}


