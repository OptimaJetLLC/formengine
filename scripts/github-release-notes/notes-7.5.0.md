### Changed

- After upgrading to **Zod v4**, some default validation error messages have changed.
- The method name `initFormFields` has been renamed to `getEditableFormData`.
- Deprecated methods: `Definer.preview`, `Meta.customPreview`, and `DefinerData.customPreview`.

### Fixed bugs

- Fixed a bug that caused the following error to appear:  
  `[MobX] Since strict-mode is enabled, changing (observed) observable values without using an action is not allowed.`

### Updated internal dependencies

- Bumped `zod` from 3.22.4 to 4.0.0.
- Bumped `validator` from 13.11.0 to 2.1.4.
