/**
 * Properties of the modal dialog for data entry.
 */
export interface PromptDialogProps {
  backdrop?: boolean | 'static';
  title: string
  placeholder?: string
  okText?: string
  cancelText?: string
  value: string
  onOk: (value: string) => void
  onCancel?: () => void
  onClose?: () => void
}
