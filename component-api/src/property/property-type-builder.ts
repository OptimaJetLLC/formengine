import LocalizedValue from '../locale/localized-value';
import PropertyType from './property-type';
import EnumPropertyType from './enum-property-type';

export default class PropertyTypeBuilder {

    locFormName: string;
    desc: LocalizedValue | null = null;
    values: LocalizedValue[] = [];

    constructor(public name: string, public subType: typeof PropertyType = PropertyType) {
        this.locFormName = '_' + this.name + 'Type';
    }

    static from(name: string): PropertyTypeBuilder {
        return new PropertyTypeBuilder(name);
    }

    static enum(name: string): PropertyTypeBuilder {
        return new PropertyTypeBuilder(name, EnumPropertyType);
    }

    build(): PropertyType {
        return new this.subType(this.name, this.desc, this.values);
    }

    description(defaultDescription: string): PropertyTypeBuilder {
        const key = this.localizationKey('typedescription');
        this.desc = new LocalizedValue(key, defaultDescription, this.locFormName);
        return this;
    }

    withValue(key: string, defaultValue: string, value?: any): PropertyTypeBuilder {
        let localizationKey = this.localizationKey(key);
        const item = new LocalizedValue(localizationKey, defaultValue, this.locFormName, value);
        this.values.push(item);
        return this;
    }

    private localizationKey(key: string): string {
        return this.name + key;
    }
}
