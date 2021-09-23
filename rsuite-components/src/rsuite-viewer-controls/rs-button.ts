import {
    BoolType,MapType,
    ControlDefinition,
    defaultProperty,
    FunctionType, 
    optionalProperty,
    StringType,
} from "optimajet-builder-component-api";
import { AppearanceType, EnumColorType, SizeType } from "./rs-property-types";
import rsButton from "../controls/rs-button";

const rSuiteButton = <ControlDefinition>{
    renderer: rsButton,
    propertyTypes: [
        defaultProperty("onPress", FunctionType, () =>
            console.log("Set me a handler!")
        ),
        defaultProperty("content", StringType, "Button"),
        defaultProperty("appearance", AppearanceType, "default"),
        defaultProperty("color", EnumColorType, "red"),
        defaultProperty("size", SizeType, "md"),
        optionalProperty("disabled", BoolType),
        optionalProperty("loading", BoolType),
        optionalProperty("block", BoolType),
        defaultProperty("data", MapType, []),
    ],
};

export default rSuiteButton;
