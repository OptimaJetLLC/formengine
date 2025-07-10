import type {CSSProperties, PropsWithChildren} from 'react'
import {useCallback, useEffect, useState} from 'react'
import {Button} from 'rsuite'
import {useFormsContext} from '../FormsProvider'
import {ListItem} from './ListItem'

const buttonStyle: CSSProperties = {
  borderRadius: 10,
  justifyContent: 'center',
  padding: 16
}

const listStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 5
}

const localizationPlaceholder = (key: string) => key

/**
 * The form versions list.
 * @param props the props with children.
 * @returns the React element.
 */
export const VersionsList = (props: PropsWithChildren<any>) => {
  const t = localizationPlaceholder
  const {formName, formVersion, setFormVersion, formStorage} = useFormsContext()
  const [versionsList, setVersionsList] = useState([] as number[])

  const reloadVersionsList = useCallback(() => {
    formStorage?.getFormVersions().then(versions => {
      setVersionsList(versions.sort((a, b) => a - b))
    })
  }, [formStorage])

  useEffect(() => {
    if (!formName) return
    reloadVersionsList()
  }, [formName, formVersion, formStorage, reloadVersionsList])

  const addVersion = useCallback(() => {
    formStorage?.addVersion()
  }, [formStorage])

  const deleteVersion = useCallback((version: number) => {
    formStorage?.deleteVersion(version)
    reloadVersionsList()
  }, [formStorage, reloadVersionsList])

  if (!formName || !setFormVersion) return null

  return <div style={{display: 'flex', flexDirection: 'column'}}>
    {props.children}
    <div style={{marginTop: 10}}>
      <h6 style={{marginInlineStart: 5}}>{t('versions')}</h6>
      <div style={listStyle}>
        <Button onClick={addVersion} block style={buttonStyle}>
          {t('addVersion')}
        </Button>
        {versionsList?.map((version, index) => (
          <ListItem key={index} version={version} active={version === formVersion}
                    onSelect={setFormVersion} onDelete={deleteVersion}/>
        ))}
      </div>
    </div>
  </div>
}
