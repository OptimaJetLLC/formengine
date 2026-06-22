# OptimaJet React Form Builder Designer bundle

This library is part of the [React Form Builder](https://formengine.io/) project.

## Usage

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>FormEngine Designer bundle embedding example</title>
  <script src="https://unpkg.com/@react-form-builder/designer-bundle@latest/dist/index.iife.js" async defer></script>
</head>
<body style="margin: 20px">
<div id="designer"></div>

<script type="text/javascript">
  window.onload = function () {
    const {renderFormBuilder} = window.FormEngineDesignerBundle;

    const props = {
    }

    window.designerRoot = renderFormBuilder('designer', props)
  }
</script>
</body>
</html>
```

## License

For commercial use contact our sales at [sales@optimajet.com](mailto:sales@optimajet.com).
