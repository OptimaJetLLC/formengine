import PropertyTypeBuilder from './property-type-builder';

const AnyType = PropertyTypeBuilder.from('any')
    .description('any')
    .build();

const ArrayType = PropertyTypeBuilder.from('array')
    .description('array of values')
    .build();

const BoolType = PropertyTypeBuilder.enum('bool')
    .description('true or false')
    .withValue('default', 'Default')
    .withValue('true', 'True', true)
    .withValue('false', 'False', true)
    .build();

const ColorType = PropertyTypeBuilder.from('color')
    .description('red|green|rgba(10,20,30,0.5)')
    .build();

const ComponentType = PropertyTypeBuilder.from('component')
    .description('react component')
    .build();

const FunctionType = PropertyTypeBuilder.from('function')
    .build();

const NumberType = PropertyTypeBuilder.from('number')
    .description('any number')
    .build();

const ObjectType = PropertyTypeBuilder.from('object')
    .description('any object')
    .build();

const StringType = PropertyTypeBuilder.from('string')
    .description('any string')
    .build();

const StyleType = PropertyTypeBuilder.from('style')
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
};
