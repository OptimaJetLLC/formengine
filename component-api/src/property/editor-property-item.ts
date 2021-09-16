import PropertyType from './property-type';

export default interface EditorPropertyItem {
    name: string;
    type: PropertyType;
    defaultValue: any;
    defaultLabel: string;
}
