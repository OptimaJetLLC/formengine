import type {ComponentData, ComponentPlacementChange} from '@react-form-builder/core'
import {ComponentStore, ContainerAnnotation, Meta} from '@react-form-builder/core'
import {placeSourceWithOptionalWrapper} from '@react-form-builder/designer/src/utils/childWrapper'
import type {ComponentPlacement} from '@react-form-builder/designer/src/utils/resolveComponentPlacement'
import {describe, expect, it, vi} from 'vitest'

function createNode(key: string, type: string): ComponentData {
  return {
    key,
    model: {type},
    store: new ComponentStore(key, type),
    children: [],
  } as unknown as ComponentData
}

function placeAt(node: ComponentData, placement: ComponentPlacement): void {
  const parent = placement.insertPosition === 'inner' ? placement.target : placement.target.parent
  if (!parent) throw new Error('The placement target has no parent')
  if (node.parent) {
    node.parent.children = node.parent.children.filter(child => child !== node)
  }
  node.parent = parent
  parent.children.push(node)
  node.store.slot = placement.slot
  node.store.slotCondition = placement.slotCondition
}

describe('child wrapper options', () => {
  it('places the original component into the configured wrapper slot', () => {
    const parent = createNode('parent', 'Parent')
    const source = createNode('source', 'Source')
    const wrapper = createNode('wrapper', 'Wrapper')
    const children = new ContainerAnnotation('children', 'Children')
    children.childWrapper = {componentType: 'Wrapper', childSlot: 'content'}
    const parentMeta = new Meta('Parent', [children], [], [], [])
    const placementChanges: Array<{node: ComponentData; change: ComponentPlacementChange}> = []
    const notifyCreated = vi.fn()

    placeSourceWithOptionalWrapper(source, {target: parent, insertPosition: 'inner'}, parentMeta, {
      placeAt,
      createWrapper: () => wrapper,
      notifyPlacementChanged: (node, change) => placementChanges.push({node, change}),
      notifyCreated,
    })

    expect(parent.children).toEqual([wrapper])
    expect(wrapper.children).toEqual([source])
    expect(source.store.slot).toBe('content')
    expect(placementChanges).toEqual([
      {node: wrapper, change: {type: 'insert', current: {parent, index: 0, slot: undefined, slotCondition: undefined}}},
      {node: source, change: {type: 'insert', current: {parent: wrapper, index: 0, slot: 'content', slotCondition: undefined}}},
    ])
    expect(notifyCreated).toHaveBeenCalledOnce()
    expect(notifyCreated).toHaveBeenCalledWith(wrapper)
  })

  it('leaves the wrapper slot unset when childSlot is omitted', () => {
    const parent = createNode('parent', 'Parent')
    const source = createNode('source', 'Source')
    const wrapper = createNode('wrapper', 'Wrapper')
    const children = new ContainerAnnotation('children', 'Children')
    children.childWrapper = {componentType: 'Wrapper'}
    const parentMeta = new Meta('Parent', [children], [], [], [])
    const placementChanges: Array<{node: ComponentData; change: ComponentPlacementChange}> = []

    placeSourceWithOptionalWrapper(source, {target: parent, insertPosition: 'inner'}, parentMeta, {
      placeAt,
      createWrapper: () => wrapper,
      notifyPlacementChanged: (node, change) => placementChanges.push({node, change}),
      notifyCreated: vi.fn(),
    })

    expect(source.store.slot).toBeUndefined()
    expect(placementChanges).toEqual([
      {node: wrapper, change: {type: 'insert', current: {parent, index: 0, slot: undefined, slotCondition: undefined}}},
      {node: source, change: {type: 'insert', current: {parent: wrapper, index: 0, slot: undefined, slotCondition: undefined}}},
    ])
  })

  it('reports a move with previous and current locations when wrapping an attached component', () => {
    const screen = createNode('screen', 'Screen')
    const parent = createNode('parent', 'Parent')
    const source = createNode('source', 'Source')
    const wrapper = createNode('wrapper', 'Wrapper')
    placeAt(parent, {target: screen, insertPosition: 'inner'})
    placeAt(source, {target: screen, insertPosition: 'inner'})

    const children = new ContainerAnnotation('children', 'Children')
    children.childWrapper = {componentType: 'Wrapper', childSlot: 'content'}
    const parentMeta = new Meta('Parent', [children], [], [], [])
    const placementChanges: Array<{node: ComponentData; change: ComponentPlacementChange}> = []
    const notifyCreated = vi.fn()

    placeSourceWithOptionalWrapper(source, {target: parent, insertPosition: 'inner'}, parentMeta, {
      placeAt,
      createWrapper: () => wrapper,
      notifyPlacementChanged: (node, change) => placementChanges.push({node, change}),
      notifyCreated,
    })

    expect(screen.children).toEqual([parent])
    expect(parent.children).toEqual([wrapper])
    expect(wrapper.children).toEqual([source])
    expect(source.store.slot).toBe('content')
    expect(placementChanges).toEqual([
      {node: wrapper, change: {type: 'insert', current: {parent, index: 0, slot: undefined, slotCondition: undefined}}},
      {
        node: source,
        change: {
          type: 'move',
          previous: {parent: screen, index: 1, slot: undefined, slotCondition: undefined},
          current: {parent: wrapper, index: 0, slot: 'content', slotCondition: undefined},
        },
      },
    ])
    expect(notifyCreated).toHaveBeenCalledOnce()
    expect(notifyCreated).toHaveBeenCalledWith(wrapper)
  })
})
