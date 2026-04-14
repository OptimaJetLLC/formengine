import type {ViewPickerPreset} from '@react-form-builder/apps-common'
import type {FormBuilderProps} from '@react-form-builder/designer'

/**
 * Props for the FormBuilderApp component.
 */
export interface FormBuilderAppProps extends Omit<FormBuilderProps, 'view'> {
  /**
   * The application name that will be used to generate dbName, storeName and other storage parameters.
   */
  appName?: string
  /**
   * Which view picker option set to show (defaults to full: both RSuite strategies + MUI + Mantine).
   */
  viewPickerPreset?: ViewPickerPreset
}
