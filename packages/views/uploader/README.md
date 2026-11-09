# OptimaJet React Form Builder Uploader components library

This library is part of the [React Form Builder](https://formengine.io/) project.

This package contains file upload component with drag and drop support based on [React Dropzone](https://npmjs.com/package/react-dropzone).

Notable Uploader props:

- `dropzone` (default `true`) — enable drag-and-drop
- `paste` (default `false`) — allow pasting files (for example screenshots) into the uploader
- `action` — URL that receives uploaded files via `POST` multipart form data

Successful uploads call `onChange` only. Failures (network errors, non-OK HTTP status, or error payloads) call `onError` and still append failed file entries through `onChange`.

This package depends on `react-dropzone` 20.x, which requires Node.js 22 or newer for installation tooling.

To learn how to use the package, see our [documentation](https://formengine.io/documentation/).

## License

This library is distributed under the MIT license.
