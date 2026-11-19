import type {ComponentData} from '@react-form-builder/core'
import {createView, define, nodeArray, string} from '@react-form-builder/core'
import {act, fireEvent} from '@testing-library/react'
import type {ReactNode} from 'react'
import {useState} from 'react'
import {describe, expect, it} from 'vitest'
import {asyncAct} from '../../common/lib/asyncAct'
import {renderForm} from '../util/renderForm'

const ArrayContainer = ({children}: {children?: ReactNode[]}) => <div>{children}</div>

const StatefulInput = ({label}: {label: string}) => {
  const [value, setValue] = useState('')
  return <input aria-label={label} value={value} onChange={event => setValue(event.target.value)} />
}

const view = createView([
  define(ArrayContainer, 'ArrayContainer').props({children: nodeArray}).build().model,
  define(StatefulInput, 'StatefulInput').props({label: string}).build().model,
])

describe('Array slot identity', () => {
  it('keeps a child mounted when an earlier sibling is hidden', async () => {
    const form = {
      form: {
        key: 'Screen',
        type: 'Screen',
        children: [
          {
            key: 'container',
            type: 'ArrayContainer',
            children: [
              {
                key: 'first',
                type: 'StatefulInput',
                props: {label: {value: 'First'}},
                renderWhen: {value: 'form.state.showFirst !== false'},
              },
              {
                key: 'second',
                type: 'StatefulInput',
                props: {label: {value: 'Second'}},
              },
            ],
          },
        ],
      },
    }

    const {findByRole, getByRole, queryByRole, formData} = renderForm(form, {view})
    expect(await findByRole('textbox', {name: 'First'})).toBeInTheDocument()
    const second = getByRole('textbox', {name: 'Second'})
    fireEvent.change(second, {target: {value: 'Keep this value'}})

    await asyncAct(async () => {
      formData.state.showFirst = false
    })

    expect(queryByRole('textbox', {name: 'First'})).not.toBeInTheDocument()
    expect(getByRole('textbox', {name: 'Second'})).toBe(second)
    expect(second).toHaveValue('Keep this value')
  })

  it('keeps a child mounted when siblings are reordered', async () => {
    const form = {
      form: {
        key: 'Screen',
        type: 'Screen',
        children: [
          {
            key: 'container',
            type: 'ArrayContainer',
            children: [
              {
                key: 'first',
                type: 'StatefulInput',
                props: {label: {value: 'First'}},
              },
              {
                key: 'second',
                type: 'StatefulInput',
                props: {label: {value: 'Second'}},
              },
            ],
          },
        ],
      },
    }

    const {findByRole, getByRole, formData} = renderForm(form, {view})
    expect(await findByRole('textbox', {name: 'First'})).toBeInTheDocument()
    const second = getByRole('textbox', {name: 'Second'})
    fireEvent.change(second, {target: {value: 'Keep this value'}})

    const container = (formData as ComponentData).findByKey('container')!
    const [firstChild, secondChild] = container.children
    act(() => firstChild.insertBeforeMe(secondChild))

    expect(getByRole('textbox', {name: 'Second'})).toBe(second)
    expect(second).toHaveValue('Keep this value')
    expect(getByRole('textbox', {name: 'First'})).toHaveValue('')
  })
})
