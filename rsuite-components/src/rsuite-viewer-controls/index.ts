import { ControlDefinition } from "optimajet-builder-component-api";
import rSuiteButton from "./rs-button";
import rSuiteInput from "./rs-input";

const rSuiteViewerControls = new Map<string, ControlDefinition>([
    ["rSuiteButton", rSuiteButton],
    ["rSuiteInput", rSuiteInput],
]);

export default rSuiteViewerControls;
