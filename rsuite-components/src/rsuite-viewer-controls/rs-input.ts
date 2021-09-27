import {
    BoolType,
    ControlDefinition,
    defaultProperty,
    FunctionType, 
    optionalProperty,
} from "optimajet-builder-component-api";
import {  SizeType } from "./rs-property-types";
import rsInput from "../controls/rs-input";

const rSuiteInput = <ControlDefinition>{
    renderer: rsInput,
    propertyTypes: [
        defaultProperty("onChange", FunctionType, () =>
            console.log("Set me a handler!")
        ),
        defaultProperty("size", SizeType, "md"),
        optionalProperty("disabled", BoolType),
    ],
};

export default rSuiteInput;
