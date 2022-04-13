import {Box, Rows} from "../../../../../../../ui/Containers";
import {ArgumentItem} from "./ArgumentItem";
import {Animation, Button} from "rsuite";
import {observer} from "mobx-react";
import styled from "@emotion/styled";
import {useState} from "react";
import {ArrowDownLine, ArrowUpLine} from "@rsuite/icons";
import {useActionData} from "../../contexts/ActionDataContext";
import {useClearableArguments} from "./hooks/useClearableArguments";

export const ArgumentList = observer(() => {
    const [show, setShow] = useState(false);
    const data = useActionData()
    const ExpandIcon = show ? ArrowUpLine : ArrowDownLine;
    useClearableArguments()

    if (!data.action.args?.length) return null

    return (
        <>
            <Animation.Collapse in={show}>
                <Box px={10}>
                    <div>
                        <Rows margin={1} style={{marginTop: 8}}>
                            {data.action.args.map((arg, index) =>
                                <ArgumentItem key={index} data={arg}/>)}
                        </Rows>
                    </div>
                </Box>
            </Animation.Collapse>

            <ExpandButton block onClick={() => setShow(!show)}>
                <ExpandIcon style={{marginTop: -6}}/>
            </ExpandButton>
        </>
    )
})

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