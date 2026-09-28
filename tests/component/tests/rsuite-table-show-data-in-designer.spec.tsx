import {rSuiteComponents} from '@react-form-builder/components-rsuite'
import {rSuiteTableComponents} from '@react-form-builder/components-rsuite-table'
import {createView, FormViewer} from '@react-form-builder/core'
import {BuilderView, FormBuilder} from '@react-form-builder/designer'
import {generatedLicenseKey} from '@react-form-builder/tests-common/lib/designer/utils/license'
import {render, within} from '@testing-library/react'
import {expect} from 'vitest'

const builderComponents = [...rSuiteComponents, ...rSuiteTableComponents].map(definer => definer.build())
const builderView = new BuilderView(builderComponents)
const viewerView = createView(builderComponents.map(({model}) => model))

const tableData = [
  {name: 'Alex Morgan', department: 'Engineering'},
  {name: 'Jordan Lee', department: 'Design'},
]

const createColumn = (key: string, header: string | undefined, dataKey: string, cellChildren?: object[]) => ({
  key: `${key}Column`,
  type: 'RsColumn',
  props: {
    width: {value: 180},
  },
  children: [
    {
      key: `${key}Header`,
      type: 'RsHeaderCell',
      props: header === undefined ? {} : {children: {value: header}},
    },
    {
      key: `${key}Cell`,
      type: 'RsCell',
      props: {
        dataKey: {value: dataKey},
      },
      ...(cellChildren ? {children: cellChildren} : {}),
    },
  ],
})

const defaultColumns = [createColumn('name', 'Name', 'name'), createColumn('department', 'Department', 'department')]

const assignedBadge = [
  {
    key: 'assignedBadge',
    type: 'RsStaticContent',
    props: {
      content: {value: 'Assigned'},
    },
    disableDataBinding: {value: true},
  },
]

const createForm = (showDataInDesigner = false, columns = defaultColumns) => ({
  form: {
    key: 'Screen',
    type: 'Screen',
    props: {},
    htmlAttributes: [{name: 'data-testid', value: 'mainScreen'}],
    children: [
      {
        key: 'teamTable',
        type: 'RsTable',
        props: {
          height: {value: 280},
          autoHeight: {value: true},
          data: {value: tableData},
          ...(showDataInDesigner ? {showDataInDesigner: {value: true}} : {}),
        },
        children: columns,
      },
    ],
  },
})

const renderDesigner = (showDataInDesigner = false, columns = defaultColumns) => {
  return render(
    <FormBuilder
      licenseKey={generatedLicenseKey}
      view={builderView}
      getForm={() => JSON.stringify(createForm(showDataInDesigner, columns))}
    />
  )
}

describe('RsTable show data in designer', () => {
  it('shows the node picker in empty cells in design mode', async () => {
    const {findByTestId} = renderDesigner()
    await findByTestId('mainScreen')

    const table = await findByTestId('teamTable-editable-wrapper')
    expect(await within(table).findAllByTestId('inner-dropzone')).toHaveLength(2)
    expect(table.querySelector('.rs-table')).toBeNull()
  })

  it('renders table data in design mode when the option is enabled', async () => {
    const {findByTestId, findByText} = renderDesigner(true)
    await findByTestId('mainScreen')

    const table = await findByTestId('teamTable-editable-wrapper')
    expect(table.querySelector('.rs-table')).toBeInTheDocument()
    expect(await findByText('Name')).toBeInTheDocument()
    expect(await findByText('Department')).toBeInTheDocument()
    expect(await findByText('Alex Morgan')).toBeInTheDocument()
    expect(await findByText('Engineering')).toBeInTheDocument()
    expect(await findByText('Jordan Lee')).toBeInTheDocument()
    expect(await findByText('Design')).toBeInTheDocument()
  })

  it('does not show the node picker in an empty header when showing data in design mode', async () => {
    const {findByTestId, findByText} = renderDesigner(true, [
      createColumn('name', undefined, 'name'),
      createColumn('department', 'Department', 'department'),
    ])
    await findByTestId('mainScreen')

    const table = await findByTestId('teamTable-editable-wrapper')
    expect(table.querySelector('.rs-table')).toBeInTheDocument()
    expect(await findByText('Alex Morgan')).toBeInTheDocument()
    expect(within(table).queryByTestId('inner-dropzone')).not.toBeInTheDocument()
    expect(within(table).queryByTestId('add-button')).not.toBeInTheDocument()
  })

  it('renders custom cell content in design mode when the option is enabled', async () => {
    const {findByTestId} = renderDesigner(true, [
      createColumn('name', 'Name', 'name', assignedBadge),
      createColumn('department', 'Department', 'department'),
    ])
    await findByTestId('mainScreen')

    const table = await findByTestId('teamTable-editable-wrapper')
    expect(await within(table).findAllByText('Assigned')).toHaveLength(2)
    expect(await within(table).findByText('Engineering')).toBeInTheDocument()
    expect(within(table).queryByText('Alex Morgan')).not.toBeInTheDocument()
    expect(within(table).queryByTestId('inner-dropzone')).not.toBeInTheDocument()
  })

  it('does not show the node picker in empty cells when showing data in design mode', async () => {
    const {findByTestId} = renderDesigner(true)
    await findByTestId('mainScreen')

    const table = await findByTestId('teamTable-editable-wrapper')
    expect(within(table).queryByTestId('inner-dropzone')).not.toBeInTheDocument()
    expect(within(table).queryByTestId('add-button')).not.toBeInTheDocument()
  })

  it('renders the same cell values in viewer mode', async () => {
    const {findByText} = render(<FormViewer view={viewerView} getForm={() => JSON.stringify(createForm())} />)

    expect(await findByText('Alex Morgan')).toBeInTheDocument()
    expect(await findByText('Engineering')).toBeInTheDocument()
    expect(await findByText('Jordan Lee')).toBeInTheDocument()
    expect(await findByText('Design')).toBeInTheDocument()
  })
})
