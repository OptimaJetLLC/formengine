import {observer} from "mobx-react";
import {FullActionDefinition} from "../../../../../utils/Types";
import {List, Panel} from "rsuite";
import ParameterInput from "./ActionArgument";

const ActionItem = ({data}: { data: FullActionDefinition }) => {

    return <List.Item>
        <Panel header={`${data.target!.key}.${data.action.name}`} collapsible bordered>
            {data.action?.args?.map(argName => <ParameterInput key={argName} name={argName} data={data}/>)}
        </Panel>
    </List.Item>;
}

export default observer(ActionItem)
