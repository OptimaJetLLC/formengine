import {useState} from "react";
import {ComponentStore} from "../../../../../stores/ComponentStore";
import {Input} from "rsuite";
import styled from "@emotion/styled";
import {AutoSize} from "../../../../../components/Containers";

export default ({componentStore}: { componentStore: ComponentStore }) => {
    //TODO mobx.createViewModel (непонятно как заставить работать с массивами) https://github.com/mobxjs/mobx-utils/issues/209
    const [value, setValue] = useState(componentStore.cssBlock);
    const onBlur = () => {
        if (value) componentStore.cssBlock = value;
    }
    return <AutoSize>
        <TextArea as={"textarea"} value={value} rows={3}
                  onChange={(val: any) => setValue(val)} onBlur={onBlur}/>
    </AutoSize>
}

const TextArea = styled(Input)`
  //max-height: 300px;
  overflow-y: auto;
  resize: vertical !important;
`

