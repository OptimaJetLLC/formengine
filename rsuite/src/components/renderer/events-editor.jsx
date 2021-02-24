import React from 'react';
import { Form, Button } from 'semantic-ui-react';
import { CollectionEditor, Dictionary, isDefined, isUndefined, register } from 'optimajet-builder-shared';

register('events-editor', options => {
    const data = options.props.data;
    const events = options.props.events;

    let res = [];
    events.forEach(function (e) {
        let key = e + '_events';
        let event = isDefined(data) ? data[e] : {};

        let dropdownControl = {
            element: Form.Dropdown,
            props: {
                className: "dwkit-action-dropdown",                
                multiple: true, search: true, selection: true, allowAdditions: true,
            }
        };
        let collectionEditorControl = {
            element: CollectionEditor,
            props: {
                className: "parameters-editor",
                multiple: true, search: true, selection: true, allowAdditions: true,
            }
        };

        res.push(<div key={key}>
            <Form.Checkbox className={event.active ? "events-editor-checkbox" : ""} width={3} key="active" label={e} name="active" checked={event.active}
                           onChange={options.me.handleChange.bind(options.me, e)}/>
            <div className="events-editor-block" style={event.active ? {} : { display: 'none' }}>
                <CollectionEditor draggable
                    columns={[
                        {
                            key: 'actions', name: 'Actions', control: 'custom', customControl: dropdownControl.element,
                            customControlGetPropsFunc: data => ({
                                options: options.actionOptions, value: data.actions, ...dropdownControl.props
                                })
                        },
                        {
                            key: 'parameters', name: 'Parameters',  control: 'custom', customControl: collectionEditorControl.element,
                            customControlGetPropsFunc: data => ({
                                value: data.parameters, columns: [{key: 'name', name: 'Name'}, {key: 'value', name: 'Value'}], ...collectionEditorControl.props
                            })
                        },
                        {
                            key: 'targets', name: 'Targets', control: 'custom', customControl: dropdownControl.element,
                            customControlGetPropsFunc: data => ({
                                options: options.targetOptions, value: data.targets, ...dropdownControl.props
                                })
                        }
                    ]}
                    name="triggers"
                    className="events-editor"
                    value={event.triggers}
                    onChange={options.me.handleChange.bind(options.me, e)}
                />
                <Button onClick={options.me.initNewTrigger.bind(options.me, e)}
                    basic size='mini' style={{width: 'calc(100% - 70px)', marginLeft: 20, fontWeight: 900, padding: 4, fontSize: 19}}>+</Button>
            </div>

        </div>);
    });

    return (<div>{res}</div>);
});
