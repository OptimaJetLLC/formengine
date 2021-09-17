import PropertyType from './property-type';

// todo rename to ControlPropertyItem
export default interface EditorPropertyItem {
    name: string;
    type: PropertyType;
    defaultValue: any;
    defaultLabel: string;
}
