import {useTranslation} from 'react-i18next'

export const useTranslationPart = (path: string) => {
  const [t, {exists}] = useTranslation()
  return (key: string) => {
    const fullPath = `${path}.${key}`
    return exists(fullPath) ? t(fullPath) : ''
  }
}
