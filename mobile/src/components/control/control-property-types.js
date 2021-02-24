import { isDefined, isUndefined } from 'optimajet-builder-shared';

function locValue(key, defaultValue, formName, value) {
    return {
        key,
        defaultValue,
        formName,
        value
    }
}

class PTypeBuilder {

    constructor(name, subType) {
        this.name = name;
        this.locFormName = '_' + this.name + 'Type';
        this.subType = isDefined(subType) ? subType : PType;
    }

    static from(name) {
        return new PTypeBuilder(name);
    }

    static enum(name) {
        return new PTypeBuilder(name, EnumType);
    }

    build() {
        return new this.subType(this.name, this.description, this.values);
    }

    locKey(key) {
        return this.name + key;
    }

    description(defaultDescription) {
        const key = this.locKey('typedescription');
        this.description = locValue(key, defaultDescription, this.locFormName);
        return this;
    }

    withValue(key, defaultValue, value) {
        if (isUndefined(this.values)) {
            this.values = [];
        }
        const item = locValue(this.locKey(key), defaultValue, this.locFormName, value);
        this.values.push(item);
        return this;
    }
}

class PType {

    constructor(name, description, values = []) {
        this.name = name;
        this.description = description;
        this.values = values;
    }

    getDescription() {
        return this.description;
    }

    getValues() {
        return this.values;
    }

}

class EnumType extends PType {

}

const AnyType = PTypeBuilder.from('any')
    .description('any')
    .build();

const ArrayType = PTypeBuilder.from('array')
    .description('array of values')
    .build();

const BoolType = PTypeBuilder.enum('bool')
    .description('true or false')
    .withValue('default', 'Default')
    .withValue('true', 'True', true)
    .withValue('false', 'False', true)
    .build();

const ColorType = PTypeBuilder.from('color')
    .description('red|green|rgba(10,20,30,0.5)')
    .build();

const ComponentType = PTypeBuilder.from('component')
    .description('react component')
    .build();

const FunctionType = PTypeBuilder.from('function')
    .build();

const NumberType = PTypeBuilder.from('number')
    .description('any number')
    .build();

const ObjectType = PTypeBuilder.from('object')
    .description('any object')
    .build();

const StringType = PTypeBuilder.from('string')
    .description('any string')
    .build();

const StyleType = PTypeBuilder.from('style')
    .description('/*** Example Code ***/\ncolor:red;\npaddingTop:5;')
    .build();

export {
    AnyType,
    ArrayType,
    BoolType,
    ColorType,
    ComponentType,
    FunctionType,
    NumberType,
    ObjectType,
    StringType,
    StyleType,
    EnumType,
    PType,
    PTypeBuilder,
};
