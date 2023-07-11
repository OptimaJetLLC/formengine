import {useTranslation} from 'react-i18next'

interface LabeledPreProps {
  code: string
  value?: string
}

/**
 * React form builder component that displays the <pre> html tag with the label.
 * @param props the React component properties.
 * @param props.code the localization constant code to display in the label text.
 * @param props.value the code to display in the <pre> html tag.
 * @returns the React element.
 */
export const LabeledPre = ({code, value}: LabeledPreProps) => {
  const {t} = useTranslation()
  if (!value) return null

  return (
    <div>
      <h6 style={{marginBottom: 5}}>{t(code)}</h6>
      <pre>{value}</pre>
    </div>
  )
}
