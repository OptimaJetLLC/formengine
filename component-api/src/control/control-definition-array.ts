import ControlDefinition from './control-definition';

// todo rename to named array? or use some bundled type?
export default interface ControlDefinitionArray<T extends ControlDefinition> {
    [name: string]: T;
}
