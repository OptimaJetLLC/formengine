import {
    BoolType,
    ControlDefinition,
    defaultProperty,
    FunctionType, 
    optionalProperty,
} from "optimajet-builder-component-api";
import {  SizeType } from "./rs-property-types";
import rsButton from "../controls/rs-button";

const rSuiteInput = <ControlDefinition>{
    renderer: rsButton,
    propertyTypes: [
        defaultProperty("onChange", FunctionType, () =>
            console.log("Set me a handler!")
        ),
        defaultProperty("size", SizeType, "md"),
        optionalProperty("disabled", BoolType),
    ],
};

export default rSuiteInput;
