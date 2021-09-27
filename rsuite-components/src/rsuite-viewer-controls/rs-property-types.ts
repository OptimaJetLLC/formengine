import { PropertyTypeBuilder } from "optimajet-builder-component-api";

const AppearanceType = PropertyTypeBuilder.enum("enum")
    .description("one value from enum")
    .withValue("default", "Default", "default")
    .withValue("primary", "Primary", "primary")
    .withValue("link", "Link", "link")
    .withValue("subtle", "Subtle", "subtle")
    .withValue("ghost", "Ghost", "ghost")
    .build();

const SubtleAppearanceType = PropertyTypeBuilder.enum("enum")
    .description("one value from enum")
    .withValue("default", "Default", "default")
    .withValue("subtle", "Subtle", "subtle")
    .build();

const EnumColorType = PropertyTypeBuilder.enum("enum")
    .description("one value from enum")
    .withValue("default", "Default", undefined)
    .withValue("red", "Red", "red")
    .withValue("orange", "Orange", "orange")
    .withValue("yellow", "Yellow", "yellow")
    .withValue("green", "Green", "green")
    .withValue("cyan", "Cyan", "cyan")
    .withValue("blue", "Blue", "blue")
    .withValue("violet", "Violet", "violet")
    .build();

const SizeType = PropertyTypeBuilder.enum("toggle-select")
    .description("one value from enum")
    .withValue("xs", "Tiny", "xs")
    .withValue("sm", "Small", "sm")
    .withValue("md", "Medium", "md")
    .withValue("lg", "Large", "lg")
    .build();

export { AppearanceType, EnumColorType, SizeType, SubtleAppearanceType };
