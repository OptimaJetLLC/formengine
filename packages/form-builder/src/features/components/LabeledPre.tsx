import {useTranslation} from 'react-i18next'

interface LabeledPreProps {
  code: string
  value?: string
}

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
