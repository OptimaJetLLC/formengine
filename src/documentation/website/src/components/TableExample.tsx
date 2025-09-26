import {useColorMode} from '@docusaurus/theme-common'
import {viewWithCss} from '@react-form-builder/components-rsuite'
import {tableModels} from '@react-form-builder/components-rsuite-table'
import {buildForm, FormViewer, FormViewerProps} from '@react-form-builder/core'
import CodeBlock from '@theme/CodeBlock'
import TabItem from '@theme/TabItem'
import Tabs from '@theme/Tabs'
import {useEffect, useMemo, useState} from 'react'
import {CustomProvider} from 'rsuite'

const emptyForm = buildForm().json()

const getForm = async (formName?: string) => {
  if (!formName) return emptyForm

  try {
    const data = await import(`./forms/table/${formName}.json`)
    return data ? JSON.stringify(data, null, 2) : emptyForm
  } catch (e) {
    return emptyForm
  }
}

const JsonBlock = ({formName}: { formName?: string }) => {
  const [json, setJson] = useState('')

  useEffect(() => {
    getForm(formName)
      .then(setJson)
      .catch(console.error)
  }, [formName])

  return <div>
    <CodeBlock className="json-code-block-container" language="json">{json}</CodeBlock>
  </div>
}

export const TableExample = (props: Partial<FormViewerProps>) => {
  const view = useMemo(() => {
    const result = viewWithCss
    tableModels.forEach(model => result.define(model))
    return result
  }, [])

  const {colorMode} = useColorMode()

  return <div>
    <Tabs>
      <TabItem value="form" label="Form" default>
        <CustomProvider theme={colorMode}>
          <FormViewer view={view} getForm={getForm} {...props} />
        </CustomProvider>
      </TabItem>
      <TabItem value="json" label="JSON">
        <JsonBlock formName={props.formName}/>
      </TabItem>
    </Tabs>
  </div>
}

export default TableExample
