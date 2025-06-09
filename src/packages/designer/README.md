# OptimaJet React Form Builder designer

This library is part of the [React Form Builder](https://formengine.io/) project.

This package contains a visual editor for React components. How to use the package, read in
our [documentation](https://formengine.io/documentation/).

## Install

[Quick start from scratch](https://formengine.io/documentation/#creating-a-form-using-designer).

```bash
npm install @react-form-builder/designer @react-form-builder/components-rsuite
```

## Quickstart

```typescript jsx
import {builderViewWithCss} from '@react-form-builder/components-rsuite'
import {FormBuilder} from '@react-form-builder/designer'

/**
 * @returns the Designer element.
 */
export const Designer = () => {
  return <FormBuilder view={builderViewWithCss}/>
}
```

## Resources

- [Website](https://formengine.io/)
- [Documentation](https://formengine.io/documentation)
- [Demo](https://demo.formengine.io/)

## License

For commercial use contact our sales at [sales@optimajet.com](mailto:sales@optimajet.com).
