import type {ComponentData} from '@react-form-builder/core'
import {ComponentStore} from '@react-form-builder/core'
import {describe, expect, it} from 'vitest'
import {accordionPanelEventListeners} from '../../../packages/views/rsuite/src/components/internal/RsAccordion/eventListeners'
import {
  accordionPanelType,
  accordionType,
  getAccordionPanels,
  pickNeighborPanel,
  syncAccordionPanelKeys,
} from '../../../packages/views/rsuite/src/components/internal/RsAccordion/panelKeys'

function createPanel(key: string, eventKey?: string): ComponentData {
  const store = new ComponentStore(key, accordionPanelType)
  if (eventKey !== undefined) store.props.eventKey = {value: eventKey}
  return {
    key,
    model: {type: accordionPanelType},
    store,
    children: [],
  } as unknown as ComponentData
}

function createAccordion(panels: ComponentData[], activeKey?: string, defaultActiveKey?: string): ComponentData {
  const store = new ComponentStore('accordion', accordionType)
  if (activeKey !== undefined) store.props.activeKey = {value: activeKey}
  if (defaultActiveKey !== undefined) store.props.defaultActiveKey = {value: defaultActiveKey}

  const accordion = {
    key: 'accordion',
    model: {type: accordionType},
    store,
    children: panels,
  } as unknown as ComponentData

  for (const panel of panels) {
    ;(panel as {parent?: ComponentData}).parent = accordion
  }
  return accordion
}

function eventKeysOf(accordion: ComponentData, exclude?: ComponentData): Array<string | undefined> {
  return getAccordionPanels(accordion, exclude).map(panel => panel.store.props.eventKey?.value as string | undefined)
}

describe('pickNeighborPanel', () => {
  it('returns undefined when no panels remain', () => {
    expect(pickNeighborPanel([], 1)).toBeUndefined()
  })

  it('returns the first panel when the first panel is removed', () => {
    const remaining = [createPanel('b', '2'), createPanel('c', '3')]
    expect(pickNeighborPanel(remaining, 0)?.key).toBe('b')
  })

  it('returns the previous sibling when a middle panel is removed', () => {
    const remaining = [createPanel('a', '1'), createPanel('c', '3')]
    expect(pickNeighborPanel(remaining, 1)?.key).toBe('a')
  })

  it('returns the previous sibling when the last panel is removed', () => {
    const remaining = [createPanel('a', '1'), createPanel('b', '2')]
    expect(pickNeighborPanel(remaining, 2)?.key).toBe('b')
  })
})

describe('syncAccordionPanelKeys', () => {
  it('ignores non-accordion parents', () => {
    const other = {
      key: 'x',
      model: {type: 'RsCard'},
      store: {props: {}},
      children: [createPanel('a', '9')],
    } as unknown as ComponentData

    syncAccordionPanelKeys(other)
    expect(other.children[0].store.props.eventKey?.value).toBe('9')
  })

  it('assigns contiguous eventKeys after create (reindex all panels)', () => {
    const accordion = createAccordion([createPanel('a'), createPanel('b'), createPanel('c')])

    syncAccordionPanelKeys(accordion)

    expect(eventKeysOf(accordion)).toEqual(['1', '2', '3'])
    expect(accordion.store.props.defaultActiveKey?.value).toBe('1')
  })

  it('fills gaps when a new panel is added after sparse keys', () => {
    const accordion = createAccordion([createPanel('a', '1'), createPanel('c', '3'), createPanel('new')])

    syncAccordionPanelKeys(accordion)

    expect(eventKeysOf(accordion)).toEqual(['1', '2', '3'])
  })

  it('reindexes after removing a middle panel and keeps active on the previous sibling', () => {
    const a = createPanel('a', '1')
    const b = createPanel('b', '2')
    const c = createPanel('c', '3')
    const accordion = createAccordion([a, b, c], '2', '2')

    syncAccordionPanelKeys(accordion, {removedPanel: b})

    // b is still in children until BuilderStore.delete; sync excludes it from keys
    expect(eventKeysOf(accordion, b)).toEqual(['1', '2'])
    expect(a.store.props.eventKey?.value).toBe('1')
    expect(c.store.props.eventKey?.value).toBe('2')
    expect(accordion.store.props.activeKey?.value).toBe('1')
    expect(accordion.store.props.defaultActiveKey?.value).toBe('1')
  })

  it('activates the next panel when the first panel is removed while active', () => {
    const a = createPanel('a', '1')
    const b = createPanel('b', '2')
    const c = createPanel('c', '3')
    const accordion = createAccordion([a, b, c], '1', '1')

    syncAccordionPanelKeys(accordion, {removedPanel: a})

    expect(eventKeysOf(accordion, a)).toEqual(['1', '2'])
    expect(b.store.props.eventKey?.value).toBe('1')
    expect(c.store.props.eventKey?.value).toBe('2')
    expect(accordion.store.props.activeKey?.value).toBe('1')
    expect(accordion.store.props.defaultActiveKey?.value).toBe('1')
  })

  it('activates the previous panel when the last panel is removed while active', () => {
    const a = createPanel('a', '1')
    const b = createPanel('b', '2')
    const c = createPanel('c', '3')
    const accordion = createAccordion([a, b, c], '3', '3')

    syncAccordionPanelKeys(accordion, {removedPanel: c})

    expect(eventKeysOf(accordion, c)).toEqual(['1', '2'])
    expect(accordion.store.props.activeKey?.value).toBe('2')
    expect(accordion.store.props.defaultActiveKey?.value).toBe('2')
  })

  it('preserves active panel identity when a sibling before it is removed', () => {
    const a = createPanel('a', '1')
    const b = createPanel('b', '2')
    const c = createPanel('c', '3')
    const accordion = createAccordion([a, b, c], '3', '1')

    syncAccordionPanelKeys(accordion, {removedPanel: b})

    expect(eventKeysOf(accordion, b)).toEqual(['1', '2'])
    // c was active with key 3 → after reindex becomes 2
    expect(accordion.store.props.activeKey?.value).toBe('2')
    // default was a (key 1) → stays 1
    expect(accordion.store.props.defaultActiveKey?.value).toBe('1')
  })

  it('clears activeKey and resets defaultActiveKey when the last panel is removed', () => {
    const only = createPanel('only', '1')
    const accordion = createAccordion([only], '1', '1')

    syncAccordionPanelKeys(accordion, {removedPanel: only})

    expect(eventKeysOf(accordion, only)).toEqual([])
    expect(accordion.store.props.activeKey?.value).toBeUndefined()
    expect(accordion.store.props.defaultActiveKey?.value).toBe('1')
  })

  it('ignores non-panel children when reindexing', () => {
    const a = createPanel('a', '9')
    const noise = {
      key: 'label',
      model: {type: 'RsLabel'},
      store: {props: {}},
      children: [],
    } as unknown as ComponentData
    const accordion = createAccordion([a], '9', '9')
    accordion.children = [noise, a]

    syncAccordionPanelKeys(accordion)

    expect(a.store.props.eventKey?.value).toBe('1')
    expect(accordion.store.props.activeKey?.value).toBe('1')
    expect(accordion.store.props.defaultActiveKey?.value).toBe('1')
  })

  it('defaults defaultActiveKey to the first panel when it pointed at a missing key', () => {
    const a = createPanel('a', '5')
    const b = createPanel('b', '8')
    const accordion = createAccordion([a, b], undefined, 'missing')

    syncAccordionPanelKeys(accordion)

    expect(eventKeysOf(accordion)).toEqual(['1', '2'])
    expect(accordion.store.props.defaultActiveKey?.value).toBe('1')
    expect(accordion.store.props.activeKey?.value).toBeUndefined()
  })
})

describe('accordionPanelEventListeners', () => {
  it('reindexes panels inserted under an accordion', () => {
    const accordion = createAccordion([createPanel('a', '1'), createPanel('b')])
    const created = accordion.children[1]

    accordionPanelEventListeners.onNodePlacementChanged?.(created, {} as never, {
      type: 'insert',
      current: {parent: accordion, index: 1},
    })

    expect(eventKeysOf(accordion)).toEqual(['1', '2'])
  })

  it('does not reindex panels inserted under another component type', () => {
    const panel = createPanel('panel', '9')
    const card = {
      key: 'card',
      model: {type: 'RsCard'},
      store: new ComponentStore('card', 'RsCard'),
      children: [panel],
    } as unknown as ComponentData

    accordionPanelEventListeners.onNodePlacementChanged?.(panel, {} as never, {
      type: 'insert',
      current: {parent: card, index: 0},
    })

    expect(panel.store.props.eventKey?.value).toBe('9')
  })

  it('reindexes and retargets activeKey after a middle panel has been removed', () => {
    const a = createPanel('a', '1')
    const b = createPanel('b', '2')
    const c = createPanel('c', '3')
    const accordion = createAccordion([a, b, c], '2', '2')
    accordion.children = [a, c]

    accordionPanelEventListeners.onNodePlacementChanged?.(b, {} as never, {
      type: 'remove',
      previous: {parent: accordion, index: 1},
    })

    expect(eventKeysOf(accordion)).toEqual(['1', '2'])
    expect(accordion.store.props.activeKey?.value).toBe('1')
    expect(accordion.store.props.defaultActiveKey?.value).toBe('1')
  })

  it('reindexes once when a panel is reordered inside the same accordion', () => {
    const a = createPanel('a', '1')
    const b = createPanel('b', '2')
    const accordion = createAccordion([a, b], '1', '1')
    accordion.children = [b, a]

    accordionPanelEventListeners.onNodePlacementChanged?.(a, {} as never, {
      type: 'move',
      previous: {parent: accordion, index: 0},
      current: {parent: accordion, index: 1},
    })

    expect(accordion.children.map(panel => panel.key)).toEqual(['b', 'a'])
    expect(eventKeysOf(accordion)).toEqual(['1', '2'])
    expect(accordion.store.props.activeKey?.value).toBe('2')
  })

  it('preserves the active target panel when a moved panel has the same eventKey', () => {
    const moved = createPanel('moved', '2')
    const source = createAccordion([moved])
    const first = createPanel('first', '1')
    const active = createPanel('active', '2')
    const target = createAccordion([first, moved, active], '2', '2')
    source.children = []

    accordionPanelEventListeners.onNodePlacementChanged?.(moved, {} as never, {
      type: 'move',
      previous: {parent: source, index: 0},
      current: {parent: target, index: 1},
    })

    expect(eventKeysOf(target)).toEqual(['1', '2', '3'])
    expect(target.store.props.activeKey?.value).toBe('3')
    expect(target.store.props.defaultActiveKey?.value).toBe('3')
  })

  it('does not guess a neighbor when a detached panel is synced without removedChildIndex', () => {
    const a = createPanel('a', 'first-key')
    const b = createPanel('b', 'active-key')
    const c = createPanel('c', 'last-key')
    const accordion = createAccordion([a, b, c], 'active-key', 'active-key')
    accordion.children = [a, c]

    syncAccordionPanelKeys(accordion, {removedPanel: b})

    expect(eventKeysOf(accordion)).toEqual(['1', '2'])
    expect(accordion.store.props.activeKey?.value).toBeUndefined()
    expect(accordion.store.props.defaultActiveKey?.value).toBe('1')
  })

  it('retargets a custom activeKey using removedChildIndex after the panel is detached', () => {
    const a = createPanel('a', 'first-key')
    const b = createPanel('b', 'active-key')
    const c = createPanel('c', 'last-key')
    const accordion = createAccordion([a, b, c], 'active-key', 'active-key')
    accordion.children = [a, c]

    syncAccordionPanelKeys(accordion, {removedPanel: b, removedChildIndex: 1})

    expect(eventKeysOf(accordion)).toEqual(['1', '2'])
    expect(accordion.store.props.activeKey?.value).toBe('1')
    expect(accordion.store.props.defaultActiveKey?.value).toBe('1')
  })
})
