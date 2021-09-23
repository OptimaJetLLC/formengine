import React from 'react';
import { TagPicker, InputPicker, Table, Input, IconButton, Icon, Checkbox, Tag } from 'rsuite';
const { Cell } = Table;

const ErrorWrapper = ({ rowIndex, dataKey, errorMap, ...props } : any) => {
    let errorMessage;
    if (errorMap && errorMap[rowIndex] && errorMap[rowIndex][dataKey]) errorMessage = errorMap[rowIndex][dataKey];
    return <div {...props} className={!!errorMessage ? "dwkit-cell-error" : ""}/>
        
}

const InputCell = ({ rowData, dataKey, onChange, ...props } : any) => {
    return (
      <Cell {...props}>
        <Input defaultValue={rowData[dataKey]} size="sm"
              onChange={value => {
                rowData[dataKey] = value;
                if (onChange) onChange(value);
              }}
          />
      </Cell>
    );
  };

  const CheckCell = ({ rowData, dataKey, onChange, ...props } : any) => {
    return (
      <Cell {...props}>
        <div style={{ lineHeight: '20px', marginTop: -3, marginLeft: -13 }}>
            <Checkbox
              inline
              checked={rowData[dataKey]}
              onChange={(value, checked) => {
                  rowData[dataKey] = checked;
                  if (onChange) onChange(checked, rowData);
                }}
            />
        </div>
      </Cell>
    );
  };
  
  const SelectCell = ({ rowData, rowIndex, dataKey, options, onChange, onSelect, errorMap, ...props } : any) => {
    return (
      <Cell {...props}>
       <ErrorWrapper rowIndex={rowIndex} dataKey={dataKey} errorMap={errorMap}>
        <InputPicker value={rowData[dataKey]} data={options} onSelect={onSelect}
                onChange={value => {
                    rowData[dataKey] = value;
                    if (onChange) onChange(value);
                }}
                cleanable={false} creatable block size="sm"
            />
       </ErrorWrapper>
      </Cell>
    );
  };
  
  const TagPickerCell = ({ rowData, rowIndex, dataKey, options, onChange, onSelect, errorMap, pickerProps, ...props } : any) => {
    return (
      <Cell {...props}>
        <ErrorWrapper rowIndex={rowIndex} dataKey={dataKey} errorMap={errorMap}>
            <TagPicker value={rowData[dataKey]} data={options} onSelect={onSelect} {...pickerProps}
                onChange={value => {
                    rowData[dataKey] = value;
                    if (onChange) onChange(value);
                }}
                cleanable={false} creatable block size="sm"
            />
        </ErrorWrapper>
      </Cell>
    );
  };  
    
  const TagsCell = ({ rowData, dataKey, ...props } : any) => (
    <Cell {...props} style={{ padding: 0 }}>
      <div style={{ lineHeight: '46px' }}>
        {rowData[dataKey] && rowData[dataKey].map((item : any) => <Tag>{item}</Tag>)}
      </div>
    </Cell>
  );
  
  
  const ActionCell = ({ rowData, rowIndex, onAction, iconName, ...props } : any) => {
    return (
      <Cell {...props}>
        <IconButton
            appearance="subtle" size="sm"
            onClick={_=>onAction(rowIndex)}
            icon={<Icon icon={iconName} />}
          />
      </Cell>
    );
  };

  export { InputCell, SelectCell, TagPickerCell, ActionCell, CheckCell, TagsCell };