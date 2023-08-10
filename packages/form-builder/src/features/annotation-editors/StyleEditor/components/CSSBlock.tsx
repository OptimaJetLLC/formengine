import styled from '@emotion/styled'
import {Device, useComponentData} from '@react-form-builder/core'
import {observer} from 'mobx-react'
import {useEffect, useState} from 'react'
import {SelectPicker} from 'rsuite'
import {CodeEditor} from '../../../components/CodeEditor'
import {useTranslationPart} from '../../../localization/hooks'

const devices: Device[] = ['any', 'desktop', 'mobile', 'tablet']

const CSSBlock = observer(() => {
  const {store} = useComponentData()
  const [device, setDevice] = useState<Device>('any')
  const t = useTranslationPart('style')
  const translatedItems = devices.map(value => ({value, label: t(value)}))

  function getInitialCssCode() {
    return store.css?.[device] ?? ''
  }

  const [initialValue, setInitialValue] = useState(getInitialCssCode())

  useEffect(() => {
    setInitialValue(getInitialCssCode())
  }, [device])

  const handleChange = (value: string) => {
    store.css![device] = value
  }

  return (
    <div>
      <SHeader>
        {t('cssBlock')}
        <SPicker value={device} data={translatedItems} onChange={val => setDevice(val as Device)} appearance={'subtle'} size={'xs'}
                 searchable={false} cleanable={false}/>
      </SHeader>
      <SCodeEditor
        key={store.key + device}
        language="css"
        beginContextLine={'element.style {'}
        endContextLine="}"
        initialValue={initialValue}
        onChange={handleChange}
        height={'20vh'}
        options={{
          contextmenu: false,
          lineNumbers: 'off',
          minimap: {enabled: false},
          glyphMargin: false,
          folding: false,
          lineDecorationsWidth: 0,
          lineNumbersMinChars: 0,
          autoIndent: 'none'
        }}
      />
    </div>
  )
})

const SHeader = styled.h6`
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const SPicker = styled(SelectPicker)`
  margin-inline-end: 4px;

  .rs-picker-toggle-value {
    font-size: 15px;
  }
`

const SCodeEditor = styled(CodeEditor)`
  .suggest-widget {
    width: 100% !important;
    left: 0 !important;
    overflow: hidden;
  }
`

export {CSSBlock}
