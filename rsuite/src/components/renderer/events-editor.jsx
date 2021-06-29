import React from 'react';
import { Checkbox, Button, Table } from 'rsuite';
import { CollectionEditor, Dictionary, isDefined, isUndefined, register } from 'optimajet-builder-shared';
import EditableTable from '../common/EditableTable';
import { TagPickerCell, SelectCell } from '../common/CustomCells';

const { Column, HeaderCell, Cell } = Table;

register('events-editor', options => {
    const data = options.props.data;
    const events = options.props.events;

    let res = [];
    events.forEach(function (e) {
        let key = e + '_events';
        let event = isDefined(data) ? data[e] : {};

        const pickerProps = {
            labelKey: "text"
        }

        let dropdownControl = {
            props: {
                className: "dwkit-action-dropdown",                
                multiple: true, search: true, selection: true, allowAdditions: true,
                pickerProps
            }
        };
        let collectionEditorControl = {
            props: {
                className: "parameters-editor",
                multiple: true, search: true, selection: true, allowAdditions: true,
                pickerProps
            }
        };
        
        const onColumnChange = val => this.onMappingChange(data.map);

        const columns = [
            <Column flexGrow={1}>
              <HeaderCell>Actions</HeaderCell>
              <TagPickerCell dataKey="actions" options={options.actionOptions} onChange={onColumnChange} {...dropdownControl.props}/>
            </Column>,            
            <Column flexGrow={1}>
              <HeaderCell>Targets</HeaderCell>
              <TagPickerCell dataKey="targets" options={options.targetOptions} onChange={onColumnChange} {...collectionEditorControl.props}/>
            </Column>
        ];           

        res.push(<div key={key}>

            <Checkbox className={event.active ? "events-editor-checkbox" : ""} key="active" children={e} name="active" checked={event.active}
                           onChange={options.me.handleChange.bind(options.me, e)}/>
            <div className="events-editor-block" style={event.active ? {} : { display: 'none' }}>            
                <EditableTable data={event.triggers} columns={columns} className="events-editor"
                               onChange={options.me.handleChange.bind(options.me, e)}/>
                <Button onClick={options.me.initNewTrigger.bind(options.me, e)} size='xs' style={{width: 'calc(100% - 70px)', marginLeft: 20, fontWeight: 900, padding: 4, fontSize: 19}}>+</Button>
            </div>

        </div>);
    });

    return (<div>{res}</div>);
});
