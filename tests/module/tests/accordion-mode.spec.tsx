import {RsAccordion, RsAccordionPanel} from '@react-form-builder/components-rsuite'
import {BuilderModeProvider} from '@react-form-builder/core'
import {cleanup, fireEvent, render, screen} from '@testing-library/react'
import {afterEach, describe, expect, it, vi} from 'vitest'

/**
 * Mode-wiring only: builder vs viewer prop overrides.
 * Expand/collapse clicks belong in the component-suite accordion interaction tests.
 */
describe('RsAccordion / RsAccordionPanel builder mode wiring', () => {
  afterEach(() => {
    cleanup()
  })

  it('in builder mode keeps panels expanded and non-collapsible', () => {
    render(
      <BuilderModeProvider value="builder">
        <RsAccordion accordion={true} activeKey="1" defaultActiveKey="1">
          <RsAccordionPanel header="One" eventKey="1">
            Body One
          </RsAccordionPanel>
          <RsAccordionPanel header="Two" eventKey="2">
            Body Two
          </RsAccordionPanel>
        </RsAccordion>
      </BuilderModeProvider>
    )

    expect(screen.getByText('Body One')).toBeVisible()
    expect(screen.getByText('Body Two')).toBeVisible()
    expect(document.querySelectorAll('.rs-panel-btn')).toHaveLength(0)
  })

  it('in viewer mode renders collapsible panels and honors controlled activeKey', () => {
    render(
      <BuilderModeProvider value="viewer">
        <RsAccordion accordion={true} activeKey="2" defaultActiveKey="1">
          <RsAccordionPanel header="One" eventKey="1">
            Body One
          </RsAccordionPanel>
          <RsAccordionPanel header="Two" eventKey="2">
            Body Two
          </RsAccordionPanel>
        </RsAccordion>
      </BuilderModeProvider>
    )

    const buttons = document.querySelectorAll<HTMLButtonElement>('.rs-panel-btn')
    expect(buttons).toHaveLength(2)
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'false')
    expect(buttons[1]).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('Body Two')).toBeVisible()
  })

  it('does not apply an outer independent accordion state to a nested accordion', () => {
    render(
      <BuilderModeProvider value="viewer">
        <RsAccordion accordion={false} defaultActiveKey="outer">
          <RsAccordionPanel header="Outer" eventKey="outer">
            <RsAccordion accordion={true}>
              <RsAccordionPanel header="Nested" eventKey="outer">
                Nested body
              </RsAccordionPanel>
            </RsAccordion>
          </RsAccordionPanel>
        </RsAccordion>
      </BuilderModeProvider>
    )

    expect(screen.getByText('Outer').closest('button')).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('Nested').closest('button')).toHaveAttribute('aria-expanded', 'false')
  })

  it('preserves panel and group onSelect callbacks when panels expand independently', () => {
    const panelOnSelect = vi.fn()
    const groupOnSelect = vi.fn()

    render(
      <BuilderModeProvider value="viewer">
        <RsAccordion accordion={false} defaultActiveKey="one" onSelect={groupOnSelect}>
          <RsAccordionPanel header="One" eventKey="one">
            Body One
          </RsAccordionPanel>
          <RsAccordionPanel header="Two" eventKey="two" onSelect={panelOnSelect}>
            Body Two
          </RsAccordionPanel>
        </RsAccordion>
      </BuilderModeProvider>
    )

    fireEvent.click(screen.getByText('Two'))

    expect(panelOnSelect).toHaveBeenCalledOnce()
    expect(panelOnSelect).toHaveBeenCalledWith('two', expect.any(Object))
    expect(groupOnSelect).toHaveBeenCalledOnce()
    expect(groupOnSelect).toHaveBeenCalledWith('two', expect.any(Object))
  })

  it('in viewer mode a standalone panel reports collapsed via aria-expanded when expanded is false', () => {
    render(
      <BuilderModeProvider value="viewer">
        <RsAccordionPanel header="Closed" eventKey="1" expanded={false} collapsible>
          Hidden body
        </RsAccordionPanel>
      </BuilderModeProvider>
    )

    const button = document.querySelector('.rs-panel-btn')
    expect(button).toHaveAttribute('aria-expanded', 'false')
    // RSuite keeps the body mounted while collapsed; visibility is driven by aria-expanded / anim classes.
    expect(document.querySelector('.rs-anim-collapse.rs-anim-in')).toBeNull()
  })

  it('in viewer mode honors an explicitly non-collapsible panel', () => {
    render(
      <BuilderModeProvider value="viewer">
        <RsAccordionPanel header="Fixed" eventKey="1" collapsible={false}>
          Fixed body
        </RsAccordionPanel>
      </BuilderModeProvider>
    )

    expect(document.querySelector('.rs-panel-btn')).toBeNull()
    expect(screen.getByText('Fixed body')).toBeVisible()
  })

  it('in viewer mode updates expansion when controlled activeKey changes with accordion={false}', () => {
    const {rerender} = render(
      <BuilderModeProvider value="viewer">
        <RsAccordion accordion={false} activeKey="1">
          <RsAccordionPanel header="One" eventKey="1">
            Body One
          </RsAccordionPanel>
          <RsAccordionPanel header="Two" eventKey="2">
            Body Two
          </RsAccordionPanel>
        </RsAccordion>
      </BuilderModeProvider>
    )

    expect(screen.getByText('One').closest('button')).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('Two').closest('button')).toHaveAttribute('aria-expanded', 'false')

    rerender(
      <BuilderModeProvider value="viewer">
        <RsAccordion accordion={false} activeKey="2">
          <RsAccordionPanel header="One" eventKey="1">
            Body One
          </RsAccordionPanel>
          <RsAccordionPanel header="Two" eventKey="2">
            Body Two
          </RsAccordionPanel>
        </RsAccordion>
      </BuilderModeProvider>
    )

    expect(screen.getByText('One').closest('button')).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getByText('Two').closest('button')).toHaveAttribute('aria-expanded', 'true')
  })

  it('in viewer mode expands every controlled activeKey when accordion is disabled', () => {
    render(
      <BuilderModeProvider value="viewer">
        <RsAccordion accordion={false} activeKey={['1', '2']}>
          <RsAccordionPanel header="One" eventKey="1">
            Body One
          </RsAccordionPanel>
          <RsAccordionPanel header="Two" eventKey="2">
            Body Two
          </RsAccordionPanel>
          <RsAccordionPanel header="Three" eventKey="3">
            Body Three
          </RsAccordionPanel>
        </RsAccordion>
      </BuilderModeProvider>
    )

    expect(screen.getByText('One').closest('button')).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('Two').closest('button')).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('Three').closest('button')).toHaveAttribute('aria-expanded', 'false')
  })

  it('in viewer mode expands the matching panel when defaultActiveKey is numeric and eventKey is a string', () => {
    render(
      <BuilderModeProvider value="viewer">
        <RsAccordion accordion={false} defaultActiveKey={1 as unknown as string}>
          <RsAccordionPanel header="One" eventKey="1">
            Body One
          </RsAccordionPanel>
          <RsAccordionPanel header="Two" eventKey="2">
            Body Two
          </RsAccordionPanel>
        </RsAccordion>
      </BuilderModeProvider>
    )

    expect(screen.getByText('One').closest('button')).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('Two').closest('button')).toHaveAttribute('aria-expanded', 'false')
  })

  it('in viewer mode honors explicit defaultExpanded={false} over the independent defaultActiveKey seed', () => {
    render(
      <BuilderModeProvider value="viewer">
        <RsAccordion accordion={false} defaultActiveKey="one">
          <RsAccordionPanel header="One" eventKey="one" defaultExpanded={false}>
            Body One
          </RsAccordionPanel>
          <RsAccordionPanel header="Two" eventKey="two">
            Body Two
          </RsAccordionPanel>
        </RsAccordion>
      </BuilderModeProvider>
    )

    expect(screen.getByText('One').closest('button')).toHaveAttribute('aria-expanded', 'false')
  })

  it('in viewer mode expands every panel whose eventKey matches defaultActiveKey', () => {
    render(
      <BuilderModeProvider value="viewer">
        <RsAccordion accordion={false} defaultActiveKey="1">
          <RsAccordionPanel header="One" eventKey="1">
            Body One
          </RsAccordionPanel>
          <RsAccordionPanel header="Duplicate" eventKey="1">
            Body Duplicate
          </RsAccordionPanel>
          <RsAccordionPanel header="Other" eventKey="2">
            Body Other
          </RsAccordionPanel>
        </RsAccordion>
      </BuilderModeProvider>
    )

    expect(screen.getByText('One').closest('button')).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('Duplicate').closest('button')).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('Other').closest('button')).toHaveAttribute('aria-expanded', 'false')
  })
})
