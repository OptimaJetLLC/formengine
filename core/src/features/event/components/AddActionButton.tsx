import {Dropdown, IconButton, Popover, Whisper} from "rsuite";
import _ from "lodash";
import PlusIcon from "@rsuite/icons/Plus";
import {observer} from "mobx-react";
import {ComponentStore} from "../../../stores/ComponentStore";
import {Node} from "../../../utils/Node";
import {useStore} from "../../../utils/StoreContext";

const AddActionButton = ({eventKey, componentStore} : {eventKey: string, componentStore: ComponentStore}) => {
    const store = useStore()
    const nodes = store.getAllNodes().filter(node => !_.isEmpty(node.definition?.actions))
    const groups = nodes.reduce((groups: any, node: Node) => {
        const group: Node[] = (groups[node.definition.name] || []);
        group.push(node);
        groups[node.definition.name] = group;
        return groups;
    }, {});
    const Menu = ({onClose, left, top, className}: any, ref: any) =>
        <Popover ref={ref} className={className} style={{left, top, marginLeft: -14}} full>
            <Dropdown.Menu onSelect={(value: any) => {
                onClose();
                store.addEvent(eventKey, value.action, {}, componentStore, value.node.data!)
            }}>
                {
                    Object.keys(groups).map((group) => (
                        <div style={{padding: "0 15px", marginTop: 5}} key={group}>
                            <h6>{group + "s"}</h6>
                            {
                                groups[group].map((node: Node, i: number) => (
                                    <Dropdown.Menu
                                        key={node.key + i}
                                        title={node.key}
                                        onClick={event => event.preventDefault()}
                                        children={
                                            node.definition?.actions?.map((action) =>
                                                <Dropdown.Item
                                                    key={action.name}
                                                    eventKey={{node, action}}
                                                    children={action.name}
                                                />
                                            )
                                        }
                                    />
                                ))
                            }
                        </div>
                    ))
                }
            </Dropdown.Menu>
        </Popover>

    return <Whisper placement="left" trigger="click" speaker={Menu}>
        <IconButton block icon={<PlusIcon/>} appearance="default" size={"sm"}/>
    </Whisper>
}

export default observer(AddActionButton)
