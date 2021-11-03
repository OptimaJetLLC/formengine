import {observer} from "mobx-react";
import {FullActionDefinition} from "../../../../../utils/Types";
import {List, Panel} from "rsuite";
import ParameterInput from "./ActionArgument";
import styled from "@emotion/styled";

const ActionItem = ({data}: { data: FullActionDefinition }) => {
    const Label = styled.p`
      display: flex;
    `
    const Hint = styled.p`
      opacity: 0.6;
      margin-right: 5px;
    `
    return <List.Item>
        <Panel
            header={(
                `${data.target!.key} (${data.target!.type}).${data.action.name}`
            )} collapsible bordered>
            {data.action?.args?.map(argName => <ParameterInput key={argName} name={argName} data={data}/>)}
        </Panel>
    </List.Item>;
}

export default observer(ActionItem)
