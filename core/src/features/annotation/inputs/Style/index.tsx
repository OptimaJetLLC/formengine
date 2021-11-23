import {PropertyEditorProps} from "../../types";
import {Rows} from "../../../../components/GroupItems";
import CSSList from "./components/CSSList";
import StandardStyles, {inPX, StandardStyleItem} from "./components/StandardStyles";

export default ({componentStore}: PropertyEditorProps<Record<string, string>[] | undefined>) => {
    //TODO mobx.createViewModel (непонятно как заставить работать с массивами) https://github.com/mobxjs/mobx-utils/issues/209
    return <Rows>
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
    </Rows>;
}

const SizeStyles: StandardStyleItem = {
    "Width": inPX("width"),
    "Height": inPX("height"),
}

const IndentStyles: StandardStyleItem = {
    "Left": inPX("margin-left"),
    "Right": inPX("margin-right"),
    "Top": inPX("margin-top"),
    "Bottom": inPX("margin-bottom"),
}

const OtherStyles: StandardStyleItem = {
    "Corner radius": inPX("border-radius"),
    "Rotation": {
        cssName: "transform",
        measure: (val: string) => `rotate(${val}deg)`
    }
}


