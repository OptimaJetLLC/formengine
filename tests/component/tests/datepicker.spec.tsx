import {fireEvent} from '@testing-library/react'
import {renderForm} from '../util/renderForm'
import form from './forms/datepicker-form.json'
import visualForm from './forms/datepicker-visual-form.json'

describe('DatePicker component test', () => {
  it('Should render dialog', async () => {
    const {findByTestId, findAllByRole} = renderForm(form)
    const datePicker = await findByTestId('showdialog')
    expect(datePicker).not.toBeNull()
    expect(datePicker).not.toBeUndefined()
    fireEvent.click(datePicker)
    const dialogs = await findAllByRole('dialog')
    expect(dialogs.length).toBe(2)
  })

  it('Should not render dialog', async () => {
    const {findByTestId, findAllByRole} = renderForm(form)
    const datePicker = await findByTestId('disabled')
    expect(datePicker).not.toBeNull()
    expect(datePicker).not.toBeUndefined()
    expect(datePicker.classList.value).toContain('disabled')
    fireEvent.click(datePicker)
    const dialogs = await findAllByRole('dialog')
    expect(dialogs.length).toBe(1)
  })

  it('Should render dialog by default', async () => {
    const {findAllByRole} = renderForm(form)
    const dialogs = await findAllByRole('dialog')
    expect(dialogs.length).toBe(1)
  })

  it('Should clean value', async () => {
    const stringDate = '2025-09-02T12:29:42.016Z'
    const initialData = {
      datepicker_cleanable: stringDate
    }
    const {findByTestId} = renderForm(form, {initialData})
    const datePicker = await findByTestId('cleanable')
    const input = datePicker.querySelector('input')
    expect(input).not.toBeNull()
    if (input === null || input === undefined) {
      throw new Error('Input not found')
    }
    expect(input.value).toBe('02/09/2025')
    const cleanButton = Array.from(datePicker.querySelectorAll('button')).find(b => b.ariaLabel === 'Clear')
    expect(cleanButton).not.toBeUndefined()
    if (cleanButton === null || cleanButton === undefined) {
      throw new Error('Clean button not found')
    }
    fireEvent.click(cleanButton)

    expect(input.value).toBe('')
  })

  it('Should set value with format', async () => {
    const stringDate = '2025-09-02T12:29:42.016Z'
    const initialData = {
      datepicker_format: stringDate
    }
    const {findByTestId} = renderForm(form, {initialData})
    const datePicker = await findByTestId('format')
    const input = datePicker.querySelector('input')
    expect(input).not.toBeNull()
    if (input === null || input === undefined) {
      throw new Error('Input not found')
    }
    expect(input.value).toBe('2025-09-02')
  })

  it('Should has placeholder', async () => {
    const {findByTestId} = renderForm(form)
    const datePicker = await findByTestId('placeholder')
    const input = datePicker.querySelector('input')
    expect(input).not.toBeNull()
    if (input === null || input === undefined) {
      throw new Error('Input not found')
    }
    expect(input.value).toBe('')
    expect(input.placeholder).toBe('datetime picker')
  })

  it('Should set default value', async () => {
    const {findByTestId} = renderForm(form)
    const datePicker = await findByTestId('defaultvalue')
    const input = datePicker.querySelector('input')
    expect(input).not.toBeNull()
    if (input === null || input === undefined) {
      throw new Error('Input not found')
    }
    expect(input.value).toBe('01/12/2025')
  })

  it('Should be readonly', async () => {
    const {findByTestId, findAllByRole} = renderForm(form)
    const datePicker = await findByTestId('readonly')
    fireEvent.click(datePicker)
    const dialogs = await findAllByRole('dialog')
    expect(dialogs.length).toBe(1)
  })

  it('Should be no possibility to edit by pressing a key', async () => {
    const {findByTestId} = renderForm(form)
    const datePicker = await findByTestId('editable')
    const input = datePicker.querySelector('input')
    expect(input).not.toBeNull()
    if (input === null || input === undefined) {
      throw new Error('Input not found')
    }

    fireEvent.keyDown(input, {
      key: '1',
      code: 'Digit1',
      keyCode: 49,
      charCode: 49
    })
    expect(input.value).toBe('')
  })

  it('Should show the current and next year', async () => {
    const {findAllByRole, findByTestId, getAllByRole} = renderForm(visualForm)
    const datePicker = await findByTestId('limityear')
    fireEvent.click(datePicker)
    const dialog = (await findAllByRole('dialog'))[0]
    const selectMonthButton = Array.from(dialog.querySelectorAll('button')).find(b => b.ariaLabel === 'Select month')
    expect(selectMonthButton).not.toBeUndefined()
    if (selectMonthButton === null || selectMonthButton === undefined) {
      throw new Error('Select month button not found')
    }

    fireEvent.click(selectMonthButton)
    const yearHeaders = getAllByRole('rowheader', {hidden: true}).map(i => i.textContent)
    expect(yearHeaders.length).toBe(2)
    const currentYear: number = new Date().getFullYear()
    expect(yearHeaders).toContain(currentYear.toString())
    expect(yearHeaders).toContain((currentYear + 1).toString())
  })

  it('Should show ISO weeks', async () => {
    const {findByTestId, getAllByRole} = renderForm(visualForm)
    const datePicker = await findByTestId('isoweek')
    fireEvent.click(datePicker)

    const weeks = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
    const rows = getAllByRole('columnheader')
    rows.forEach((row, index) => {
      expect(row.textContent).toBe(weeks[index])
    })
  })

  it('Should show week numbers', async () => {
    const stringDate = '2025-09-02T12:29:42.016Z'
    const initialData = {
      datepicker_weeknumbers: stringDate
    }
    const {findByTestId, getAllByRole} = renderForm(visualForm, {initialData})
    const datePicker = await findByTestId('weeknumbers')
    fireEvent.click(datePicker)

    const dialog = (getAllByRole('dialog'))[0]
    const expectedNumbers = [36, 37, 38, 39, 40, 41]
    const weekNumbers = Array.from(dialog.querySelectorAll('.rs-calendar-table-cell-week-number')).map(i => i.textContent)
    weekNumbers.forEach((weekNumber, index) => {
      expect(weekNumber).not.toBeNull()
      expect(weekNumber).toBe(expectedNumbers[index].toString())
    })
  })

  it('Should set value by ony top', async () => {
    const {findByTestId, getAllByRole} = renderForm(visualForm)
    const datePicker = await findByTestId('onetap')
    const input = datePicker.querySelector('input')
    expect(input).not.toBeNull()
    if (input === null || input === undefined) {
      throw new Error('Input not found')
    }
    fireEvent.click(datePicker)
    const dialog = getAllByRole('dialog')[0]
    const cellButton = dialog.querySelector('.rs-calendar-table-cell')
    expect(cellButton).not.toBeNull()
    if (cellButton === null || cellButton === undefined) {
      throw new Error('cell button not found')
    }
    fireEvent.click(cellButton)
    expect(input.value).not.toBe('')
  })

  it('Should show meridiem', async () => {
    const stringDate = '2025-09-02T14:29:42.016Z'
    const initialData = {
      datepicker_showmeridiem: stringDate
    }
    const {findByTestId, getAllByRole} = renderForm(visualForm, {initialData})
    const datePicker = await findByTestId('showmeridiem')
    fireEvent.click(datePicker)
    const dialog = getAllByRole('dialog')[0]
    const timeSelectButton = Array.from(dialog.querySelectorAll('button')).find(b => b.ariaLabel === 'Select time')
    expect(timeSelectButton).not.toBeUndefined()
    if (timeSelectButton === null || timeSelectButton === undefined) {
      throw new Error('timeSelectButton not found')
    }
    fireEvent.click(timeSelectButton)
    const rows = dialog.querySelectorAll('.rs-calendar-time-dropdown-column')
    expect(rows.length).toBe(3)
    const expectedHeaders = ['Hours', 'Minutes', 'AM/PM']
    const headers = Array.from(rows).map(i => i.children[0].textContent)
    headers.forEach((header, index) => {
      expect(header).toBe(expectedHeaders[index])
    })
  })
})
