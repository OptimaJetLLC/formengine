import {
    BoolType,
    ControlDefinition,
    defaultProperty,
    FunctionType, 
    optionalProperty,
    StringType,
    MapType
} from "optimajet-builder-component-api";
import { SubtleAppearanceType, SizeType } from "./rs-property-types";
import rsButton from "../controls/rs-button";

const rSuiteSelectDropdown = <ControlDefinition>{
    renderer: rsButton,
    propertyTypes: [
        defaultProperty("onSelect", FunctionType, () =>
            console.log("Set me a handler!")
        ),
        defaultProperty("appearance", SubtleAppearanceType, "default"),,
        optionalProperty("placeholder", StringType),
        defaultProperty("size", SizeType, "md"),
        defaultProperty("data", MapType, []),
        optionalProperty("searchable", BoolType),
        optionalProperty("disabled", BoolType),
        optionalProperty("cleanable", BoolType),
        optionalProperty("searchable", BoolType),
        optionalProperty("block", BoolType),
    ],
};

export default rSuiteSelectDropdown;
