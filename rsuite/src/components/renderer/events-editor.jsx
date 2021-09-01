import React from 'react';
import { Checkbox, Button, Table, Panel, TagPicker, ControlLabel } from 'rsuite';
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
        

        res.push(<>
            <Checkbox className={event.active ? "events-editor-checkbox" : ""} key="active" children={e} name="active" checked={event.active}
                    onChange={options.me.handleChange.bind(options.me, e)}/>
            {event.triggers.map(trigger => <Panel key={key} shaded>
                    <div className="events-editor-block" style={{ display: event.active ? 'flex' : 'none', flexDirection: "column" }}> 
                        <ControlLabel>Actions</ControlLabel>       
                        <TagPicker value={trigger.actions} data={options.actionOptions} onChange={onColumnChange}  labelKey="text"/>  
                        
                        <ControlLabel>Actions</ControlLabel> 
                        <TagPicker value={trigger.actions} data={options.actionOptions} onChange={onColumnChange}  labelKey="text"/>  
                        
                        <ControlLabel>Actions</ControlLabel> 
                        <TagPicker value={trigger.targets} data={options.targetOptions} onChange={onColumnChange}  labelKey="text"/>  
                    </div>        
                </Panel>
            )}
            <Button onClick={options.me.initNewTrigger.bind(options.me, e)} size='xs' style={{width: 'calc(100% - 70px)', marginLeft: 20, fontWeight: 900, padding: 4, fontSize: 19}}>+</Button>
        </>);            
    });

    return (<div>{res}</div>);
});
