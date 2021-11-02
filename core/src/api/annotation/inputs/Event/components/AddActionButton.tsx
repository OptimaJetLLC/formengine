import {Dropdown, IconButton, Popover, Whisper} from "rsuite";
import {store} from "../../../../../stores/Store";
import _ from "lodash";
import PlusIcon from "@rsuite/icons/Plus";
import {observer} from "mobx-react";
import {ComponentStore} from "../../../../../stores/ComponentStore";
import {getAllNodes} from "../../../../../utils/tree";

const AddActionButton = ({eventKey, componentStore} : {eventKey: string, componentStore: ComponentStore}) => {


    return <Whisper placement="bottomStart" trigger="click"
                    speaker={({onClose, left, top, className}, ref) =>
                        <Popover ref={ref} className={className} style={{left, top}} full>
                            <Dropdown.Menu onSelect={(value: any) => {
                                onClose();
                                store.addEvent(eventKey, value.action, {}, componentStore, value.node.data!)
                            }}>
                                {getAllNodes()
                                    .filter(node => !_.isEmpty(node.definition?.actions))
                                    .map((node) =>
                                        <Dropdown.Menu
                                            key={node.key}
                                            title={node.key}
                                            children={
                                                node.definition?.actions?.map((action) =>
                                                    <Dropdown.Item
                                                        key={action.name}
                                                        eventKey={{node, action}}
                                                        children={action.name}
                                                    />)
                                            }
                                        />
                                    )}
                            </Dropdown.Menu>
                        </Popover>
                    }>
        <IconButton block icon={<PlusIcon/>} appearance="subtle" placement="left" children="Add another action"/>
    </Whisper>
}

export default observer(AddActionButton)
