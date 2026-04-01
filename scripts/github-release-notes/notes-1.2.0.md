_June_ 5, 2024

- Added the `RsLink` component to be used as a hyperlink.
- Improved error logging when launching custom functions:
  - The error text now includes the source code of the function.
  - Removed unnecessary logging to the console during testing in the editor.
- Added documentation for [storing user-defined data](https://formengine.io/documentation/formengine-designer/faq/storing-user-defined-data).
- Styles have been added to the [bundle](https://formengine.io/documentation/formengine-designer/getting-started/installation#cdn) for the viewer.

### Fixed bugs

- Fixed minor style breakdowns in the Mozilla Firefox browser.
- The last selected form is not loaded when the designer is opened.
- The `onWillUnmount` event does not work.
- Changes to the `Placement` property in `Error settings` are not applied to the form in real time.
