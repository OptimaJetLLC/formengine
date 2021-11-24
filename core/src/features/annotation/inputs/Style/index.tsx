import {PropertyEditorProps} from "../../types";
import {Rows} from "../../../../components/Containers";
import CSSList from "./components/CSSList";
import StandardStyles from "./components/StandardStyles";
import {StandardStylesDefinitions} from "../../../style";
import CSSBlock from "./components/CSSBlock";

export default ({componentStore}: PropertyEditorProps<Record<string, string>[] | undefined>) => {
    //TODO mobx.createViewModel (непонятно как заставить работать с массивами) https://github.com/mobxjs/mobx-utils/issues/209
    return <Rows ml={"5px"} my={0}>
        <div>
            <h6>Size</h6>
            <StandardStyles componentStore={componentStore} stylesDefinition={SizeStyles}/>
        </div>
        <div>
            <h6>Indent</h6>
            <StandardStyles componentStore={componentStore} stylesDefinition={IndentStyles}/>
        </div>
        <div>
            <h6>Other</h6>
            <StandardStyles componentStore={componentStore} stylesDefinition={OtherStyles}/>
        </div>
        <div>
            <h6>CSS styles</h6>
            <CSSList componentStore={componentStore}/>
        </div>
        <div>
            <h6 style={{marginBottom: 5}}>CSS style block</h6>
            <CSSBlock componentStore={componentStore}/>
        </div>
    </Rows>;
}

const pick = (object: any, keys: string[]) => {
    const result: any = {};
    keys.forEach(key => {
        if (object[key]) result[key] = object[key];
    })
    return result;
};
const SizeStyles = pick(StandardStylesDefinitions, ["Width", "Height"])
const IndentStyles = pick(StandardStylesDefinitions, ["Left", "Right", "Top", "Bottom"])
const OtherStyles = pick(StandardStylesDefinitions, ["Corner radius", "Rotation"])


