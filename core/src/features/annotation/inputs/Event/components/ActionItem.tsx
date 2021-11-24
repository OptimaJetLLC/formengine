import {observer} from "mobx-react";
import {FullActionDefinition} from "../../../../../utils/Types";
import {Animation, Button, Dropdown, Nav} from "rsuite";
import ParameterInput from "./ActionArgument";
import {Box, Rows} from "../../../../../components/Containers";
import {ArrowDownLine, ArrowUpLine} from '@rsuite/icons';
import {ComponentStore} from "../../../../../stores/ComponentStore";
import {getAllNodes} from "../../../../../utils/tree";
import _ from "lodash";
import {Node} from "../../../../../utils/Node";
import {mapper} from "../../../../../views";
import {useState} from "react";
import styled from "@emotion/styled";
import {NavIconItem} from "../../../../../components/NavIconItem";

const ChooseTargetButton = observer(({data}: { data: FullActionDefinition }) => {
    const nodes = getAllNodes().filter(node => !_.isEmpty(node.definition?.actions))
    const groups = nodes.reduce((groups: any, node: Node) => {
        const group: Node[] = (groups[node.definition.name] || []);
        group.push(node);
        groups[node.definition.name] = group;
        return groups;
    }, {});

    return <Dropdown style={{display: "flex"}} renderToggle={(props, ref) => (
        <Button {...props} ref={ref} block
                appearance={"subtle"} style={{padding: "2px 10px"}}>

            <p style={{display: "flex"}}>
                <p>For </p>
                <div style={{
                    marginRight: 3
                }}>
                    <a style={{
                        fontWeight: "bold",
                        marginLeft: 5
                    }}>{(data.target?.key ? `${data.target?.key}` : "Target")}</a>
                    <ArrowDownLine/>
                </div>
                <p style={{opacity: .8}}>{`${data.target?.type.toLowerCase() ?? ""} `}</p>
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
})

const ChooseActionButton = observer(({data}: { data: FullActionDefinition }) => {
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
        <Dropdown style={{display: "flex"}} placement={"leftStart"} renderToggle={(props, ref) => (
            <Button {...props} ref={ref} appearance={"subtle"} block style={{padding: "2px 10px"}}>
                <label style={{display: "flex"}}>
                    <p>do </p>
                    <div>
                        <a style={{
                            fontWeight: "bold",
                            color: "blueviolet",
                            marginLeft: 8
                        }}>{`${data.action?.name || "Action"}`}</a>
                        <ArrowDownLine/>
                    </div>
                </label>
            </Button>
        )}>
            <Nav appearance="subtle" activeKey={"With target"} style={{marginBottom: 10}}>
                {NavIconItem("With target")}
                {NavIconItem("Without target")}
            </Nav>
            {
                data.target
                    ? TargetActionsList(data.target)
                    : FullActionsList()
            }
        </Dropdown>)
})

const ActionItem = ({data}: { data: FullActionDefinition }) => {
    const [showParams, setShowParams] = useState(false);
    const ExpandIcon = showParams ? ArrowUpLine : ArrowDownLine;
    return <div style={{
        backgroundColor: "rgb(247, 247, 250)",
        borderRadius: 10, padding: "10px 5px 0"
    }}>
        <div>
            <ChooseTargetButton data={data}/>
            <ChooseActionButton data={data}/>
        </div>
        <Box px={10}>
            <Animation.Collapse in={showParams}>
                {(props, ref) => <div {...props} ref={ref}>
                    <Rows margin={1} style={{marginTop: 8}}>
                        {data.action?.args?.map(argName => (
                            <ParameterInput key={argName} name={argName} data={data}/>
                        ))}
                    </Rows>
                </div>}
            </Animation.Collapse>
        </Box>
        <ExpandButton
            onClick={() => setShowParams(!showParams)}
            block>
            <ExpandIcon style={{marginTop: -6}}/>
        </ExpandButton>
    </div>
}

const ExpandButton = styled(Button)`
  padding: 0;
  margin: 0px -2%;
  border-top-right-radius: 0;
  border-top-left-radius: 0;
  width: 104%;
  outline: 0 !important;

  &:focus {
    box-shadow: none;
    background-color: initial;
  }
`

export default observer(ActionItem)
