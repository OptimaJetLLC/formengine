import React, { LegacyRef, RefObject, Component } from "react";
import { Table, TableProps, ControlLabel, Button, Icon } from 'rsuite';
import { ActionCell, InputCell } from './CustomCells';
const uniqueId = require('lodash/uniqueId') ;

const { Column, HeaderCell, Cell } = Table;


interface EditableTableProps {
  data?: Array<Object>,
  onAdd?: Function,
  onChange?: Function,
  columns: Array<string | any>,
  label?: string,
  compact?: boolean,
}

interface EditableTableState {
  data: Array<Object>,
}

type X = typeof Table;
export default class EditableTable extends Component<EditableTableProps, EditableTableState> {
  tableRef: RefObject<Component<TableProps>> = React.createRef();

  constructor(props: EditableTableProps) {
    super(props);
    this.state = {
      data: this.setRowsID(props.data),
    };
  }
  
  render() {
    const { data } = this.state;
    const { onAdd, onChange, columns, label, compact, ...props} = this.props;
    const tableProps = {
      rowKey: "__id", ref: this.tableRef,
      rowClassName: ("EditableTableRow" + (compact ? " compact" : "")),
      ...props, data, 
    }

    let columnsElements = columns;
    if (typeof columns[0] == typeof '') {
      columnsElements = columns.map(label => (
        <Column flexGrow={1}>
              <HeaderCell>{label}</HeaderCell>
              <InputCell/>
          </Column>
      ))
    }
    return (<>
      {!!label && <ControlLabel>{label}</ControlLabel>}
      <Table {...tableProps} >
          {columnsElements}
          <Column width={38}>
              <HeaderCell></HeaderCell>
              <ActionCell onAction={this.onRemove} iconName="close"/>
          </Column>
      </Table>
      <Button appearance="primary" onClick={this.onAdd} block><Icon icon="plus" /></Button>
    </>);
  }

  componentDidUpdate(prevProps: EditableTableProps) {
    setTimeout(_=> this.updateSize(), 10);
  
    const {data} = this.props;
    if(prevProps.data != data) {
      this.setState({data: this.setRowsID(data)});
    }
  }

  updateSize() {
    //this.tableRef?.current?.calculateTableWidth(); //todo
  }

  onAdd = () => {
    const nextData = Object.assign([], this.state.data);
    nextData.push({__id: uniqueId('CLIENT_')});
    this.setState({data: nextData}
      // , () => { //todo
      //   setTimeout(() => {
      //     const scrollHeight = this.tableRef?.current?.tableBodyRef?.current?.scrollHeight || Number.MAX_SAFE_INTEGER;
      //     this.tableRef.current?.scrollTop(scrollHeight + 200);
      //   }, 100);
      // }
    );
    this.props.onAdd && this.props.onAdd(nextData)
    this.props.onChange && this.props.onChange(nextData);
  }

  onChange = (rowData: any, rowIndex: number, dataKey: any, value: any) => {
    const nextData: any = Object.assign([], this?.state.data);
    nextData[rowIndex][dataKey] = value;
    this.setState({data: nextData});
    this.props.onChange && this.props.onChange(nextData);
  }

  onRemove = (index: number) => {
    const nextData = Object.assign([], this.state.data);
    nextData.splice(index, 1);
    this.setState({data: nextData});
    this.props.onChange && this.props.onChange(nextData);
  }

  setRowsID(data: any) {
    data.forEach((item: any) => {
      if (!item.__id) item.__id = uniqueId('CLIENT_');
    })
    return data;
  }
}