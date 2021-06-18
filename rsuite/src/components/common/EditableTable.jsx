import React from "react";
import { Table, ControlLabel, Button, Icon } from 'rsuite';
import { ActionCell } from './CustomCells';

const { Column, HeaderCell, Cell } = Table;

export default class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    const {data} = props;
    this.state = {
      data: this.setRowsID(data),
    };
    this.tableRef = React.createRef();
  }
  
  render() {
    const { data } = this.state;
    const { onAdd, onChange, columns, label, ...props} = this.props;
    return (<>
      {!!label && <ControlLabel>{label}</ControlLabel>}
      <Table rowClassName="EditableTableRow" {...props}
             ref={this.tableRef}
             data={data} rowKey="__id">
          {!!columns && columns.map(col => col)}
          <Column width={45}>
              <HeaderCell></HeaderCell>
              <ActionCell onAction={this.onRemove} iconName="close"/>
          </Column>
      </Table>
      <Button appearance="primary" onClick={this.onAdd} block><Icon icon="plus" /></Button>
    </>);
  }

  componentDidUpdate(prevProps) {
    setTimeout(_=> this.updateSize(), 10);
  
    const {data} = this.props;
    if(prevProps.data != data) {
      this.setState({data: this.setRowsID(data)});
    }
  }

  updateSize() {
    this.tableRef.current?.calculateTableWidth();
  }

  onAdd = () => {
    const nextData = Object.assign([], this.state.data);
    nextData.push({__id: _.uniqueId('CLIENT_')});
    this.setState({data: nextData}, () => {
      setTimeout(() => {
        const scrollHeight = this.tableRef?.current?.tableBodyRef?.current?.scrollHeight || Number.MAX_SAFE_INTEGER;
        this.tableRef.current?.scrollTop(scrollHeight + 200);
      }, 100);
    });
    this.props.onAdd && this.props.onAdd(nextData)
    this.props.onChange && this.props.onChange(nextData);
  }

  onChange = (rowData, rowIndex, dataKey, value) => {
    const nextData = Object.assign([], this.state.data);
    nextData[rowIndex][dataKey] = value;
    this.setState({data: nextData});
    this.props.onChange && this.props.onChange(nextData);
  }

  onRemove = index => {
    const nextData = Object.assign([], this.state.data);
    nextData.splice(index, 1);
    this.setState({data: nextData});
    this.props.onChange && this.props.onChange(nextData);
  }

  setRowsID(data) {
    data.forEach(item => {
      if (!item.__id) item.__id = _.uniqueId('CLIENT_');
    })
    return data;
  }
}