import PropertyType from './property-type';
import EditorPropertyItem from './editor-property-item';

function getPropertyDefaultLabel(name: string): string {
    const split = name.split('');
    let result = '';
    for (let letter of split) {
        if (letter.toUpperCase() === letter) {
            result += ' ';
        }
        result += letter;
    }
    result = result.charAt(0).toUpperCase() + result.substr(1);
    return result;
}

function optionalProperty(name: string, type: PropertyType): EditorPropertyItem {
    return <EditorPropertyItem>{
        name: name,
        type: type,
        defaultLabel: getPropertyDefaultLabel(name)
    };
}

function defaultProperty(name: string, type: PropertyType, defaultValue: any): EditorPropertyItem {
    return <EditorPropertyItem>{
        name: name,
        type: type,
        defaultValue: defaultValue,
        defaultLabel: getPropertyDefaultLabel(name)
    };
}

export {
    optionalProperty,
    defaultProperty
};
