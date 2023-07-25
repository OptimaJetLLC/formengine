import styled from '@emotion/styled'
import {AutoComplete} from 'rsuite'
import {compactInput} from '../../../components/styles'

// todo move to StandardStylesGroup.tsx
//TODO normal sorting of drop-down options
// todo remove unused rowIndex property
/**
 * The React component that displays an autocomplete cell.
 * @param props the React component properties.
 * @param props.dataKey the data key for styling.
 * @param props.rowIndex the row index of the cell.
 * @param props.value the value of the autocomplete component.
 * @param props.onChange the onChange callback for the autocomplete component.
 * @param props.options the data for the autocomplete component.
 * @param props.props the other properties of the component.
 * @returns the React element.
 */
const CompactCell = ({dataKey, rowIndex, value, onChange, options, ...props}: any) => {
  return (
    <AutoComplete
      className={compactInput} data={options}
      // todo change '==' to '==='
      style={{color: dataKey == 'styleName' ? 'var(--rs-text-secondary)' : 'initial'}}
      value={value}
      onChange={onChange}
      {...props}
    />
  )
}

/**
 * The React component that displays the label for a cell.
 * @param props the React component properties.
 * @param props.label the label text.
 * @param props.props the other properties of the component.
 * @returns the React element.
 */
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


