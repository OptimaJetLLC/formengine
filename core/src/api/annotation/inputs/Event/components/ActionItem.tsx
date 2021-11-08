import {observer} from "mobx-react";
import {FullActionDefinition} from "../../../../../utils/Types";
import {Button, Dropdown} from "rsuite";
import ParameterInput from "./ActionArgument";
import {Columns} from "../../../../../components/GroupItems";
import {ArrowDownLine} from '@rsuite/icons';
import {ComponentStore} from "../../../../../stores/ComponentStore";
import {getAllNodes} from "../../../../../utils/tree";
import _ from "lodash";
import {Node} from "../../../../../utils/Node";
import {mapper} from "../../../../../views";

const ChooseTargetButton = ({data}: { data: FullActionDefinition }) => {
    const nodes = getAllNodes().filter(node => !_.isEmpty(node.definition?.actions))
    const groups = nodes.reduce((groups: any, node: Node) => {
        const group: Node[] = (groups[node.definition.name] || []);
        group.push(node);
        groups[node.definition.name] = group;
        return groups;
    }, {});

    return <Dropdown renderToggle={(props, ref) => (
        <Button {...props} ref={ref}
                appearance={"subtle"} style={{paddingRight: 5}}>

            <p style={{fontSize: 18}}>
                For {`${data.target?.type.toLowerCase() ?? ""} `}
                <a style={{marginLeft: 5}}>{(data.target?.key ? `"${data.target?.key}"` : "Target")}</a>
                <ArrowDownLine/>
            </p>
        </Button>
    )}>
        {
            Object.keys(groups).map((group) => (
                <div style={{padding: "0 15px", marginTop: 5}}>
                    <h6>{group + "s"}</h6>
                    {
                        groups[group].map((node: Node) => (
                            <Dropdown.Item
                                key={node.key}
                                children={node.key}
                                onSelect={() => {
                                    data.target = node.data;
                                }}
                            />
                        ))
                    }
                </div>
            ))
        }
    </Dropdown>
}

const ChooseActionButton = ({data}: { data: FullActionDefinition }) => {
    const nodes = getAllNodes().filter(node => !_.isEmpty(node.definition?.actions))
    const groups = nodes.reduce((groups: any, node: Node) => {
        const group: Node[] = (groups[node.definition.name] || []);
        group.push(node);
        groups[node.definition.name] = group;
        return groups;
    }, {});

    const TargetActionsList: any = (target: ComponentStore) => {
        const definition = mapper[target.type]
        return definition?.actions?.map((action) =>
            <Dropdown.Item
                key={action.name}
                onSelect={() => {
                    data.action = action;
                }}
                children={action.name}
            />
        )
    }


    const FullActionsList: any = () =>
        Object.keys(groups).map((group, i) => (
            <Dropdown.Menu
                key={(group + i)}
                title={group}
                children={
                    groups[group].map((node: Node) => (
                        <Dropdown.Menu
                            key={node.key}
                            title={node.key}
                            children={
                                node.definition?.actions?.map((action) =>
                                    <Dropdown.Item
                                        key={action.name}
                                        onSelect={() => {
                                            data.action = action;
                                        }}
                                        children={action.name}
                                    />
                                )
                            }
                        />
                    ))
                }
            />
        ))


    return (
        <Dropdown renderToggle={(props, ref) => (
            <Button {...props} ref={ref} appearance={"subtle"} style={{paddingLeft: 5}}>
                <p style={{fontSize: 18}}>
                    do <a style={{color: "blueviolet", marginLeft: 5}}>{`${data.action?.name || "Action"}`}</a>
                    <ArrowDownLine/>
                </p>
            </Button>
        )}>
            {
                data.target
                    ? TargetActionsList(data.target)
                    : FullActionsList()
            }
        </Dropdown>)
}

const ActionItem = ({data}: { data: FullActionDefinition }) => {
    return <div style={{
        backgroundColor: "rgb(247, 247, 250)",
        borderRadius: 10, padding: "15px 5px"
    }}>
        <div>
            <ChooseTargetButton data={data}/>
            <ChooseActionButton data={data}/>
        </div>
        <Columns>
            {data.action?.args?.map(argName => (
                <ParameterInput key={argName} name={argName} data={data}/>
            ))}
        </Columns>
    </div>
}

export default observer(ActionItem)
