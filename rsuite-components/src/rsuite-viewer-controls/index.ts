import { ControlDefinition } from "optimajet-builder-component-api";
import rSuiteButton from "./rs-button";
import rSuiteInput from "./rs-input";
import rSuiteSelectDropdown from "./rs-select-dropdown";

const rSuiteViewerControls = new Map<string, ControlDefinition>([
    ["rSuiteButton", rSuiteButton],
    ["rSuiteInput", rSuiteInput],
    ["rSuiteSelectDropdown", rSuiteSelectDropdown],
]);

export default rSuiteViewerControls;
