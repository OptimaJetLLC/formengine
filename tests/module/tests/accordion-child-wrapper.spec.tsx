import {rSuiteComponents, rsAccordionPanel} from '@react-form-builder/components-rsuite'
import type {ComponentPlacementChange, ContainerAnnotation} from '@react-form-builder/core'
import {BuilderView, ComponentData, cfDisableToolbarAdd, define, FormViewerPropsStore, isContainer, Store} from '@react-form-builder/core'
import {defaultComponentStateFactory} from '@react-form-builder/core/src/features/form-viewer/components/ViewerStoreProvider'
import {createAddedComponentData} from '@react-form-builder/designer/src/stores/AvailableComponents'
import {BuilderStore} from '@react-form-builder/designer/src/stores/BuilderStore'
import {afterEach, beforeAll, beforeEach, describe, expect, it, vi} from 'vitest'
import {accordionPanelType, accordionType} from '../../../packages/views/rsuite/src/components/internal/RsAccordion/panelKeys'

const emptyAccordionForm = {
  form: {
    key: 'Screen',
    type: 'Screen',
    props: {},
    children: [
      {
        key: 'accordion',
        type: accordionType,
        props: {
          defaultActiveKey: {value: '1'},
        },
        children: [],
      },
    ],
  },
}

const accordionWithPanelForm = {
  form: {
    key: 'Screen',
    type: 'Screen',
    props: {},
    children: [
      {
        key: 'accordion',
        type: accordionType,
        props: {
          defaultActiveKey: {value: '1'},
        },
        children: [
          {
            key: 'panel1',
            type: accordionPanelType,
            props: {
              header: {value: 'Panel'},
              eventKey: {value: '1'},
            },
            children: [],
          },
        ],
      },
    ],
  },
}

function panelStore(key: string, header: string, eventKey: string) {
  return {
    key,
    type: accordionPanelType,
    props: {
      header: {value: header},
      eventKey: {value: eventKey},
    },
    children: [] as unknown[],
  }
}

/**
 * Builds a Screen form with one accordion that has three panels (keys panel1..panel3, eventKeys 1..3).
 * @param activeKey controlled active key
 * @param defaultActiveKey default active key
 */
function threePanelAccordionForm(activeKey: string, defaultActiveKey: string) {
  return {
    form: {
      key: 'Screen',
      type: 'Screen',
      props: {},
      children: [
        {
          key: 'accordion',
          type: accordionType,
          props: {
            activeKey: {value: activeKey},
            defaultActiveKey: {value: defaultActiveKey},
          },
          children: [panelStore('panel1', 'A', '1'), panelStore('panel2', 'B', '2'), panelStore('panel3', 'C', '3')],
        },
      ],
    },
  }
}

describe('Accordion BuilderStore integration', () => {
  let builderStore: BuilderStore

  const getTree = () => builderStore.viewer.form.componentTree

  const find = (key: string) => {
    const node = getTree().findByKey(key)
    if (!node) throw new Error(`Node with key ${key} not found`)
    return node
  }

  const paletteComponent = (type: string) => {
    const model = builderStore.builderComponents.find(component => component.model.type === type)?.model
    if (!model) throw new Error(`Model ${type} not found`)
    return createAddedComponentData(model, builderStore, builderStore.viewer)
  }

  const panelEventKeys = (accordionKey = 'accordion') =>
    find(accordionKey)
      .children.filter(child => child.model.type === accordionPanelType)
      .map(child => child.store.props.eventKey?.value)

  const panelKeys = (accordionKey = 'accordion') =>
    find(accordionKey)
      .children.filter(child => child.model.type === accordionPanelType)
      .map(child => child.key)

  beforeAll(() => {
    const components = rSuiteComponents.map(definer => definer.build())
    const view = new BuilderView(components)
    const store = new Store(new FormViewerPropsStore({view}), defaultComponentStateFactory)
    builderStore = new BuilderStore(store, {view})
  })

  beforeEach(() => {
    builderStore.parseForm(JSON.stringify(emptyAccordionForm))
  })

  describe('children annotation', () => {
    it('declares accordion panel auto-wrap on the children slot', () => {
      const meta = builderStore.getComponentMetadata(accordionType)
      const children = meta.properties.find(property => property.key === 'children')
      expect(children && isContainer(children)).toBe(true)
      if (!children || !isContainer(children)) return
      expect(children.childWrapper).toEqual({componentType: accordionPanelType})
    })

    it('allows panels only as direct accordion children and disables toolbar add', () => {
      const panelMeta = builderStore.getComponentMetadata(accordionPanelType)
      const panel = paletteComponent(accordionPanelType)
      const accordion = find('accordion')
      const screen = find('Screen')

      expect(panelMeta.insertRestriction?.(panel, accordion)).not.toBe(false)
      expect(panelMeta.insertRestriction?.(panel, screen)).toBe(false)
      expect(builderStore.canAddComponent(panel, accordion, 'inner')).toBe(true)
      expect(builderStore.canAddComponent(panel, screen, 'inner')).toBe(false)
      expect(rsAccordionPanel.build().model.isFeatureEnabled(cfDisableToolbarAdd)).toBe(true)
    })
  })

  describe('child auto-wrap', () => {
    it('allows auto-wrapping the first visual singleton and rejects a duplicate', () => {
      const singleton = define(() => null, 'TestSingleton')
        .singleton()
        .build()
      const view = new BuilderView([...rSuiteComponents.map(definer => definer.build()), singleton])
      const store = new Store(new FormViewerPropsStore({view}), defaultComponentStateFactory)
      const builder = new BuilderStore(store, {view})
      const source = createAddedComponentData(singleton.model, builder, store)

      try {
        builder.parseForm(JSON.stringify(emptyAccordionForm))
        const accordion = store.form.componentTree.findByKey('accordion')
        if (!accordion) throw new Error('The accordion was not found')

        expect(builder.canAddComponent(source, accordion, 'inner')).toBe(true)
        builder.add(source, accordion, 'inner')

        expect(accordion.children).toHaveLength(1)
        expect(accordion.children[0].model.type).toBe(accordionPanelType)
        expect(accordion.children[0].children.map(child => child.model.type)).toEqual(['TestSingleton'])
        expect(builder.canAddComponent(source, accordion, 'inner')).toBe(false)
      } finally {
        source.dispose()
        builder.dispose()
        store.dispose()
      }
    })

    it('wraps a non-panel component dropped into an accordion in a new panel', () => {
      const button = paletteComponent('RsButton')
      const accordion = find('accordion')

      expect(builderStore.canAddComponent(button, accordion, 'inner')).toBe(true)

      builderStore.add(button, accordion, 'inner')

      const panels = accordion.children.filter(child => child.model.type === accordionPanelType)
      expect(panels).toHaveLength(1)
      expect(panels[0].children.map(child => child.model.type)).toEqual(['RsButton'])
      expect(panels[0].store.props.eventKey?.value).toBe('1')
      expect(builderStore.selected.has(panels[0].children[0])).toBe(true)
    })

    it('runs the creation listener after an auto-created wrapper is attached', () => {
      const listeners = builderStore.getComponentMetadata(accordionPanelType).eventListeners
      if (!listeners) throw new Error('Accordion panel event listeners are not configured')
      const previousOnCreateNode = listeners.onCreateNode
      const onCreateNode = vi.fn((node: ComponentData) => {
        expect(node.parent).toBe(find('accordion'))
        expect(node.children.map(child => child.model.type)).toEqual(['RsButton'])
      })
      listeners.onCreateNode = onCreateNode

      try {
        builderStore.add(paletteComponent('RsButton'), find('accordion'), 'inner')
        expect(onCreateNode).toHaveBeenCalledOnce()
      } finally {
        listeners.onCreateNode = previousOnCreateNode
      }
    })

    it('reports placement changes before creation listeners on auto-wrap insert', () => {
      const panelListeners = builderStore.getComponentMetadata(accordionPanelType).eventListeners
      if (!panelListeners?.onNodePlacementChanged) throw new Error('Accordion panel event listeners are not configured')

      const buttonMeta = builderStore.getComponentMetadata('RsButton')
      const previousPanelOnCreateNode = panelListeners.onCreateNode
      const previousPanelOnNodePlacementChanged = panelListeners.onNodePlacementChanged
      const previousButtonListeners = buttonMeta.eventListeners
      const timeline: string[] = []

      panelListeners.onNodePlacementChanged = (node, store, change) => {
        timeline.push(`placement:${node.model.type}:${change.type}`)
        previousPanelOnNodePlacementChanged(node, store, change)
      }
      panelListeners.onCreateNode = node => {
        timeline.push(`create:${node.model.type}`)
      }
      Object.assign(buttonMeta, {
        eventListeners: {
          ...previousButtonListeners,
          onNodePlacementChanged: (node: ComponentData, _store: unknown, change: ComponentPlacementChange) => {
            timeline.push(`placement:${node.model.type}:${change.type}`)
          },
          onCreateNode: (node: ComponentData) => {
            timeline.push(`create:${node.model.type}`)
          },
        },
      })

      try {
        builderStore.add(paletteComponent('RsButton'), find('accordion'), 'inner')
      } finally {
        panelListeners.onCreateNode = previousPanelOnCreateNode
        panelListeners.onNodePlacementChanged = previousPanelOnNodePlacementChanged
        Object.assign(buttonMeta, {eventListeners: previousButtonListeners})
      }

      expect(timeline).toEqual([
        `placement:${accordionPanelType}:insert`,
        'placement:RsButton:insert',
        `create:${accordionPanelType}`,
        'create:RsButton',
      ])
    })

    it('reuses prospective wrapper candidates without changing the form and releases them on form replacement', () => {
      const accordion = find('accordion')
      const source = paletteComponent('RsButton')
      const annotation = builderStore.getComponentMetadata(accordionType).properties.find(property => property.key === 'children')
      if (!annotation || !isContainer(annotation)) throw new Error('The accordion children annotation was not found')
      const previousPredicate = annotation.insertPredicate
      const candidates: ComponentData[] = []
      const formBeforeCheck = builderStore.formAsString
      annotation.insertPredicate = (parent, candidate) => {
        expect(parent).toBe(accordion)
        expect(candidate).toBeInstanceOf(ComponentData)
        expect(candidate.model).toBe(builderStore.viewer.getModel(accordionPanelType))
        expect(candidate.parent).toBe(accordion)
        expect(candidate.root).toBe(getTree())
        candidates.push(candidate)
        return true
      }

      try {
        expect(builderStore.canAddComponent(source, accordion, 'inner')).toBe(true)
        expect(builderStore.canAddComponent(source, accordion, 'inner')).toBe(true)
        expect(candidates).toHaveLength(2)
        expect(candidates[0]).toBe(candidates[1])
        expect(candidates[0].parent).toBe(accordion)
        expect(accordion.children).not.toContain(candidates[0])
        expect(builderStore.formAsString).toBe(formBeforeCheck)

        const onKeyChanged = vi.fn()
        candidates[0].events.onAfterKeyChanged.subscribe(onKeyChanged)
        builderStore.parseForm(JSON.stringify(emptyAccordionForm))
        expect(candidates[0].parent).toBeUndefined()
        candidates[0].store.key = 'disposedWrapperCandidate'
        expect(onKeyChanged).not.toHaveBeenCalled()
      } finally {
        annotation.insertPredicate = previousPredicate
        source.dispose()
      }
    })

    it('does not double-wrap when dropping an accordion panel into an accordion', () => {
      const panel = paletteComponent(accordionPanelType)
      const accordion = find('accordion')

      builderStore.add(panel, accordion, 'inner')

      expect(accordion.children).toHaveLength(1)
      expect(accordion.children[0].model.type).toBe(accordionPanelType)
      expect(accordion.children[0].children).toHaveLength(0)
    })

    it('can add a second wrapped component into an accordion that already has a panel', () => {
      builderStore.parseForm(JSON.stringify(accordionWithPanelForm))

      const button = paletteComponent('RsButton')
      const accordion = find('accordion')

      expect(builderStore.canAddComponent(button, accordion, 'inner')).toBe(true)
      builderStore.add(button, accordion, 'inner')

      const panels = accordion.children.filter(child => child.model.type === accordionPanelType)
      expect(panels).toHaveLength(2)
      expect(panels[1].children.map(child => child.model.type)).toEqual(['RsButton'])
      expect(panels.map(panel => panel.store.props.eventKey?.value)).toEqual(['1', '2'])
    })

    it('does not wrap when dropping into an existing panel', () => {
      builderStore.parseForm(JSON.stringify(accordionWithPanelForm))

      const button = paletteComponent('RsButton')
      const panel = find('panel1')

      builderStore.add(button, panel, 'inner')

      const accordion = find('accordion')
      expect(accordion.children).toHaveLength(1)
      expect(accordion.children[0].model.type).toBe(accordionPanelType)
      expect(panel.children.map(child => child.model.type)).toEqual(['RsButton'])
    })

    it('allows moving an existing component into an accordion with auto-wrap', () => {
      builderStore.parseForm(
        JSON.stringify({
          form: {
            key: 'Screen',
            type: 'Screen',
            props: {},
            children: [
              {
                key: 'accordion',
                type: accordionType,
                props: {defaultActiveKey: {value: '1'}},
                children: [],
              },
              {
                key: 'button1',
                type: 'RsButton',
                props: {children: {value: 'Button'}},
                children: [],
              },
            ],
          },
        })
      )

      const button = find('button1')
      const accordion = find('accordion')

      builderStore.move(button, accordion, 'inner')

      expect(find('Screen').children.map(child => child.model.type)).toEqual([accordionType])
      expect(accordion.children).toHaveLength(1)
      expect(accordion.children[0].model.type).toBe(accordionPanelType)
      expect(accordion.children[0].children[0].key).toBe('button1')
    })

    it('runs the creation listener once for a wrapper created by moving into an accordion', () => {
      builderStore.parseForm(
        JSON.stringify({
          form: {
            key: 'Screen',
            type: 'Screen',
            props: {},
            children: [
              {
                key: 'accordion',
                type: accordionType,
                props: {defaultActiveKey: {value: '1'}},
                children: [],
              },
              {
                key: 'button1',
                type: 'RsButton',
                props: {children: {value: 'Button'}},
                children: [],
              },
            ],
          },
        })
      )

      const button = find('button1')
      const accordion = find('accordion')
      const screen = find('Screen')
      const panelListeners = builderStore.getComponentMetadata(accordionPanelType).eventListeners
      if (!panelListeners?.onNodePlacementChanged) throw new Error('Accordion panel event listeners are not configured')

      const previousOnCreateNode = panelListeners.onCreateNode
      const previousOnNodePlacementChanged = panelListeners.onNodePlacementChanged
      const onCreatePanel = vi.fn((node: ComponentData) => {
        expect(node.parent).toBe(accordion)
        expect(node.children.map(child => child.key)).toEqual(['button1'])
      })
      const placementChanges: Array<{node: ComponentData; change: ComponentPlacementChange}> = []

      panelListeners.onCreateNode = onCreatePanel
      panelListeners.onNodePlacementChanged = (node, store, change) => {
        placementChanges.push({node, change})
        previousOnNodePlacementChanged(node, store, change)
      }

      const buttonMeta = builderStore.getComponentMetadata('RsButton')
      const previousButtonListeners = buttonMeta.eventListeners
      const onCreateButton = vi.fn()
      const onButtonPlacementChanged = (node: ComponentData, _store: unknown, change: ComponentPlacementChange) => {
        placementChanges.push({node, change})
      }
      Object.assign(buttonMeta, {
        eventListeners: {
          ...previousButtonListeners,
          onCreateNode: onCreateButton,
          onNodePlacementChanged: onButtonPlacementChanged,
        },
      })

      try {
        builderStore.move(button, accordion, 'inner')
      } finally {
        panelListeners.onCreateNode = previousOnCreateNode
        panelListeners.onNodePlacementChanged = previousOnNodePlacementChanged
        Object.assign(buttonMeta, {eventListeners: previousButtonListeners})
      }

      const wrapper = accordion.children[0]
      expect(onCreatePanel).toHaveBeenCalledOnce()
      expect(onCreatePanel).toHaveBeenCalledWith(wrapper, builderStore.viewer)
      expect(onCreateButton).not.toHaveBeenCalled()
      expect(placementChanges).toEqual([
        {node: wrapper, change: {type: 'insert', current: {parent: accordion, index: 0, slot: undefined, slotCondition: undefined}}},
        {
          node: button,
          change: {
            type: 'move',
            previous: {parent: screen, index: 1, slot: undefined, slotCondition: undefined},
            current: {parent: wrapper, index: 0, slot: undefined, slotCondition: undefined},
          },
        },
      ])
    })
  })

  describe('panel key sync on move', () => {
    it('reindexes panels when reordering within the same accordion', () => {
      builderStore.parseForm(JSON.stringify(threePanelAccordionForm('2', '2')))

      const accordion = find('accordion')
      builderStore.move(find('panel3'), find('panel1'), 'before')

      expect(panelKeys()).toEqual(['panel3', 'panel1', 'panel2'])
      expect(panelEventKeys()).toEqual(['1', '2', '3'])
      // panel2 was active; after reorder it is third → eventKey "3"
      expect(accordion.store.props.activeKey?.value).toBe('3')
      expect(accordion.store.props.defaultActiveKey?.value).toBe('3')
    })

    it('reindexes both accordions when a panel is moved between them', () => {
      builderStore.parseForm(
        JSON.stringify({
          form: {
            key: 'Screen',
            type: 'Screen',
            props: {},
            children: [
              {
                key: 'accordionA',
                type: accordionType,
                props: {activeKey: {value: '2'}, defaultActiveKey: {value: '2'}},
                children: [panelStore('a1', 'A1', '1'), panelStore('a2', 'A2', '2')],
              },
              {
                key: 'accordionB',
                type: accordionType,
                props: {defaultActiveKey: {value: '1'}},
                children: [panelStore('b1', 'B1', '1')],
              },
            ],
          },
        })
      )

      const accordionA = find('accordionA')
      const accordionB = find('accordionB')

      builderStore.move(find('a2'), accordionB, 'inner')

      expect(panelKeys('accordionA')).toEqual(['a1'])
      expect(panelEventKeys('accordionA')).toEqual(['1'])
      expect(accordionA.store.props.activeKey?.value).toBe('1')
      expect(accordionA.store.props.defaultActiveKey?.value).toBe('1')

      expect(panelKeys('accordionB')).toEqual(['b1', 'a2'])
      expect(panelEventKeys('accordionB')).toEqual(['1', '2'])
    })

    it('rejects moving a panel into a non-accordion parent', () => {
      builderStore.parseForm(
        JSON.stringify({
          form: {
            key: 'Screen',
            type: 'Screen',
            props: {},
            children: [
              {
                key: 'accordion',
                type: accordionType,
                props: {activeKey: {value: '2'}, defaultActiveKey: {value: '2'}},
                children: [panelStore('panel1', 'A', '1'), panelStore('panel2', 'B', '2')],
              },
              {
                key: 'card',
                type: 'RsCard',
                props: {},
                children: [],
              },
            ],
          },
        })
      )

      expect(builderStore.canAddComponent(find('panel2'), find('card'), 'inner')).toBe(false)
      expect(() => builderStore.move(find('panel2'), find('card'), 'inner')).toThrow("Can't add component")
      expect(panelKeys()).toEqual(['panel1', 'panel2'])
    })

    it('activates the previous panel when moving an active panel with custom event keys to another accordion', () => {
      builderStore.parseForm(
        JSON.stringify({
          form: {
            key: 'Screen',
            type: 'Screen',
            props: {},
            children: [
              {
                key: 'accordion',
                type: accordionType,
                props: {activeKey: {value: 'active-key'}, defaultActiveKey: {value: 'active-key'}},
                children: [
                  panelStore('panel1', 'A', 'first-key'),
                  panelStore('panel2', 'B', 'active-key'),
                  panelStore('panel3', 'C', 'last-key'),
                ],
              },
              {
                key: 'accordionB',
                type: accordionType,
                props: {defaultActiveKey: {value: '1'}},
                children: [],
              },
            ],
          },
        })
      )
      const accordion = find('accordion')

      builderStore.move(find('panel2'), find('accordionB'), 'inner')

      expect(panelKeys()).toEqual(['panel1', 'panel3'])
      expect(panelEventKeys()).toEqual(['1', '2'])
      expect(accordion.store.props.activeKey?.value).toBe('1')
      expect(accordion.store.props.defaultActiveKey?.value).toBe('1')
      expect(panelKeys('accordionB')).toEqual(['panel2'])
      expect(panelEventKeys('accordionB')).toEqual(['1'])
    })
  })

  describe('panel key sync on remove', () => {
    it('reports the previous location after detach and before disposal', () => {
      builderStore.parseForm(JSON.stringify(threePanelAccordionForm('2', '2')))
      const accordion = find('accordion')
      const panel = find('panel2')
      const listeners = builderStore.getComponentMetadata(accordionPanelType).eventListeners
      if (!listeners?.onNodePlacementChanged) throw new Error('Accordion panel placement listener is not configured')
      const originalListener = listeners.onNodePlacementChanged
      let removalChange: ComponentPlacementChange | undefined
      let parentDuringNotification: ComponentData | undefined
      let attachedDuringNotification = true
      listeners.onNodePlacementChanged = (node, store, change) => {
        if (node === panel && change.type === 'remove') {
          removalChange = change
          parentDuringNotification = node.parent
          attachedDuringNotification = change.previous.parent.children.includes(node)
        }
        originalListener(node, store, change)
      }

      try {
        expect(builderStore.remove(panel)).toBe(true)
      } finally {
        listeners.onNodePlacementChanged = originalListener
      }

      if (!removalChange || removalChange.type !== 'remove') throw new Error('The removal placement change was not reported')
      expect(removalChange.previous.parent).toBe(accordion)
      expect(removalChange.previous.index).toBe(1)
      expect(parentDuringNotification).toBe(accordion)
      expect(attachedDuringNotification).toBe(false)
      expect(panel.parent).toBeUndefined()
    })

    it('reindexes after removing a middle panel and keeps active on the previous sibling', () => {
      builderStore.parseForm(JSON.stringify(threePanelAccordionForm('2', '2')))
      const accordion = find('accordion')

      expect(builderStore.remove(find('panel2'))).toBe(true)

      expect(getTree().findByKey('panel2')).toBeUndefined()
      expect(panelKeys()).toEqual(['panel1', 'panel3'])
      expect(panelEventKeys()).toEqual(['1', '2'])
      expect(accordion.store.props.activeKey?.value).toBe('1')
      expect(accordion.store.props.defaultActiveKey?.value).toBe('1')
    })

    it('activates the previous panel when removing an active panel with custom event keys', () => {
      builderStore.parseForm(
        JSON.stringify({
          form: {
            key: 'Screen',
            type: 'Screen',
            props: {},
            children: [
              {
                key: 'accordion',
                type: accordionType,
                props: {activeKey: {value: 'active-key'}, defaultActiveKey: {value: 'active-key'}},
                children: [
                  panelStore('panel1', 'A', 'first-key'),
                  panelStore('panel2', 'B', 'active-key'),
                  panelStore('panel3', 'C', 'last-key'),
                ],
              },
            ],
          },
        })
      )
      const accordion = find('accordion')

      expect(builderStore.remove(find('panel2'))).toBe(true)

      expect(panelKeys()).toEqual(['panel1', 'panel3'])
      expect(panelEventKeys()).toEqual(['1', '2'])
      expect(accordion.store.props.activeKey?.value).toBe('1')
      expect(accordion.store.props.defaultActiveKey?.value).toBe('1')
    })

    it('activates the next panel when the first panel is removed while active', () => {
      builderStore.parseForm(JSON.stringify(threePanelAccordionForm('1', '1')))
      const accordion = find('accordion')

      expect(builderStore.remove(find('panel1'))).toBe(true)

      expect(panelKeys()).toEqual(['panel2', 'panel3'])
      expect(panelEventKeys()).toEqual(['1', '2'])
      expect(accordion.store.props.activeKey?.value).toBe('1')
      expect(accordion.store.props.defaultActiveKey?.value).toBe('1')
    })

    it('activates the previous panel when the last panel is removed while active', () => {
      builderStore.parseForm(JSON.stringify(threePanelAccordionForm('3', '3')))
      const accordion = find('accordion')

      expect(builderStore.remove(find('panel3'))).toBe(true)

      expect(panelKeys()).toEqual(['panel1', 'panel2'])
      expect(panelEventKeys()).toEqual(['1', '2'])
      expect(accordion.store.props.activeKey?.value).toBe('2')
      expect(accordion.store.props.defaultActiveKey?.value).toBe('2')
    })

    it('preserves active panel identity when a sibling before it is removed', () => {
      builderStore.parseForm(JSON.stringify(threePanelAccordionForm('3', '1')))
      const accordion = find('accordion')

      expect(builderStore.remove(find('panel2'))).toBe(true)

      expect(panelKeys()).toEqual(['panel1', 'panel3'])
      expect(panelEventKeys()).toEqual(['1', '2'])
      // panel3 was active with key 3 → after reindex becomes 2
      expect(accordion.store.props.activeKey?.value).toBe('2')
      // default was panel1 (key 1) → stays 1
      expect(accordion.store.props.defaultActiveKey?.value).toBe('1')
    })

    it('preserves active panel identity when a sibling after it is removed', () => {
      builderStore.parseForm(JSON.stringify(threePanelAccordionForm('1', '2')))
      const accordion = find('accordion')

      expect(builderStore.remove(find('panel3'))).toBe(true)

      expect(panelKeys()).toEqual(['panel1', 'panel2'])
      expect(panelEventKeys()).toEqual(['1', '2'])
      expect(accordion.store.props.activeKey?.value).toBe('1')
      expect(accordion.store.props.defaultActiveKey?.value).toBe('2')
    })

    it('clears activeKey and resets defaultActiveKey when the last panel is removed', () => {
      builderStore.parseForm(
        JSON.stringify({
          form: {
            key: 'Screen',
            type: 'Screen',
            props: {},
            children: [
              {
                key: 'accordion',
                type: accordionType,
                props: {activeKey: {value: '1'}, defaultActiveKey: {value: '1'}},
                children: [panelStore('only', 'Only', '1')],
              },
            ],
          },
        })
      )
      const accordion = find('accordion')

      expect(builderStore.remove(find('only'))).toBe(true)

      expect(panelKeys()).toEqual([])
      expect(accordion.store.props.activeKey?.value).toBeUndefined()
      expect(accordion.store.props.defaultActiveKey?.value).toBe('1')
    })

    it('does not sync accordion keys when removing a panel outside an accordion', () => {
      builderStore.parseForm(
        JSON.stringify({
          form: {
            key: 'Screen',
            type: 'Screen',
            props: {},
            children: [
              {
                key: 'accordion',
                type: accordionType,
                props: {activeKey: {value: '2'}, defaultActiveKey: {value: '2'}},
                children: [panelStore('panel1', 'A', '1'), panelStore('panel2', 'B', '2')],
              },
              {
                key: 'card',
                type: 'RsCard',
                props: {},
                children: [panelStore('orphan', 'Orphan', '9')],
              },
            ],
          },
        })
      )
      const accordion = find('accordion')

      expect(builderStore.remove(find('orphan'))).toBe(true)

      expect(getTree().findByKey('orphan')).toBeUndefined()
      expect(panelKeys()).toEqual(['panel1', 'panel2'])
      expect(panelEventKeys()).toEqual(['1', '2'])
      expect(accordion.store.props.activeKey?.value).toBe('2')
      expect(accordion.store.props.defaultActiveKey?.value).toBe('2')
    })

    it('reindexes after removing every panel one by one', () => {
      builderStore.parseForm(JSON.stringify(threePanelAccordionForm('2', '3')))
      const accordion = find('accordion')

      expect(builderStore.remove(find('panel1'))).toBe(true)
      expect(panelKeys()).toEqual(['panel2', 'panel3'])
      expect(panelEventKeys()).toEqual(['1', '2'])
      // active was panel2 (key 2); after removing panel1 it becomes key 1
      expect(accordion.store.props.activeKey?.value).toBe('1')
      // default was panel3 (key 3) → becomes 2
      expect(accordion.store.props.defaultActiveKey?.value).toBe('2')

      expect(builderStore.remove(find('panel2'))).toBe(true)
      expect(panelKeys()).toEqual(['panel3'])
      expect(panelEventKeys()).toEqual(['1'])
      expect(accordion.store.props.activeKey?.value).toBe('1')
      expect(accordion.store.props.defaultActiveKey?.value).toBe('1')

      expect(builderStore.remove(find('panel3'))).toBe(true)
      expect(panelKeys()).toEqual([])
      expect(accordion.store.props.activeKey?.value).toBeUndefined()
      expect(accordion.store.props.defaultActiveKey?.value).toBe('1')
    })
  })

  describe('wrapper candidate cache performance', () => {
    let source: ComponentData
    let annotation: ContainerAnnotation
    let previousPredicate: ContainerAnnotation['insertPredicate']
    let candidates: Map<ComponentData, ComponentData>

    beforeEach(() => {
      builderStore.parseForm(
        JSON.stringify({
          form: {
            key: 'Screen',
            type: 'Screen',
            children: [
              {key: 'first', type: accordionType},
              {key: 'section', type: 'RsContainer', children: [{key: 'nested', type: accordionType}]},
              {key: 'unrelated', type: 'RsButton'},
            ],
          },
        })
      )
      source = paletteComponent('RsButton')
      const children = builderStore.getComponentMetadata(accordionType).properties.find(property => property.key === 'children')
      if (!children || !isContainer(children)) throw new Error('The accordion children annotation was not found')
      annotation = children
      previousPredicate = annotation.insertPredicate
      candidates = new Map()
      annotation.insertPredicate = (parent, candidate) => {
        candidates.set(parent, candidate)
        return true
      }
    })

    afterEach(() => {
      annotation.insertPredicate = previousPredicate
      source.dispose()
    })

    const getCandidate = (key: string) => {
      const parent = find(key)
      expect(builderStore.canContainComponent(parent, source)).toBe(true)
      const candidate = candidates.get(parent)
      if (!candidate) throw new Error(`The wrapper candidate for ${key} was not captured`)
      return candidate
    }

    it('checks cold and cached containment without searching the form tree', () => {
      const parent = find('first')
      const search = vi.spyOn(ComponentData.prototype, 'findByKey')

      try {
        expect(builderStore.canContainComponent(parent, source)).toBe(true)
        expect(builderStore.canContainComponent(parent, source)).toBe(true)
        expect(search).not.toHaveBeenCalled()
      } finally {
        search.mockRestore()
      }
    })

    it('uses distinct runtime keys for detached candidates even when random keys repeat', () => {
      const random = vi.spyOn(Math, 'random').mockReturnValue(0)

      try {
        const first = getCandidate('first')
        const nested = getCandidate('nested')
        expect(first.key).not.toBe(nested.key)
        expect(getTree().findByKey(first.key)).toBeUndefined()
        expect(getTree().findByKey(nested.key)).toBeUndefined()
        expect(getCandidate('first')).toBe(first)
      } finally {
        random.mockRestore()
      }
    })

    it('looks up the slot annotation once for a parent without auto-wrapping', () => {
      const parent = find('section')
      const metadata = builderStore.getComponentMetadata(parent.model.type)
      const lookup = vi.spyOn(metadata.properties, 'find')

      try {
        expect(builderStore.canContainComponent(parent, source)).toBe(true)
        expect(lookup).toHaveBeenCalledOnce()
      } finally {
        lookup.mockRestore()
      }
    })

    it('preserves candidates when an unrelated component is removed', () => {
      const first = getCandidate('first')
      const nested = getCandidate('nested')

      expect(builderStore.remove(find('unrelated'))).toBe(true)

      expect(getCandidate('first')).toBe(first)
      expect(getCandidate('nested')).toBe(nested)
    })

    it('disposes only candidates belonging to the removed parent', () => {
      const first = getCandidate('first')
      const nested = getCandidate('nested')
      const dispose = vi.spyOn(first, 'dispose')

      expect(builderStore.remove(find('first'))).toBe(true)

      expect(dispose).toHaveBeenCalledOnce()
      expect(first.parent).toBeUndefined()
      expect(getCandidate('nested')).toBe(nested)
    })

    it('disposes candidates belonging to descendants of a removed component', () => {
      const first = getCandidate('first')
      const nested = getCandidate('nested')
      const dispose = vi.spyOn(nested, 'dispose')

      expect(builderStore.remove(find('section'))).toBe(true)

      expect(dispose).toHaveBeenCalledOnce()
      expect(nested.parent).toBeUndefined()
      expect(getCandidate('first')).toBe(first)
    })

    it('preserves candidates for the same view and releases them when the view changes', () => {
      const view = builderStore.view
      const first = getCandidate('first')
      const nested = getCandidate('nested')

      try {
        builderStore.setView(view)
        expect(getCandidate('first')).toBe(first)
        builderStore.setView(new BuilderView(rSuiteComponents.map(definer => definer.build())))
        expect(first.parent).toBeUndefined()
        expect(nested.parent).toBeUndefined()
      } finally {
        builderStore.setView(view)
      }
    })
  })

  describe('panel key sync on create', () => {
    it('assigns contiguous eventKeys when adding panels via the palette', () => {
      const accordion = find('accordion')

      builderStore.add(paletteComponent(accordionPanelType), accordion, 'inner')
      builderStore.add(paletteComponent(accordionPanelType), accordion, 'inner')
      builderStore.add(paletteComponent(accordionPanelType), accordion, 'inner')

      expect(accordion.children).toHaveLength(3)
      expect(panelEventKeys()).toEqual(['1', '2', '3'])
      expect(accordion.store.props.defaultActiveKey?.value).toBe('1')
    })

    it('assigns contiguous eventKeys when wrapping non-panel children on add', () => {
      const accordion = find('accordion')

      builderStore.add(paletteComponent('RsButton'), accordion, 'inner')
      builderStore.add(paletteComponent('RsButton'), accordion, 'inner')

      expect(panelKeys()).toEqual(['rsAccordionPanel1', 'rsAccordionPanel2'])
      expect(panelEventKeys()).toEqual(['1', '2'])
    })

    it('keeps the active panel when wrapping another child into the accordion', () => {
      builderStore.parseForm(JSON.stringify(threePanelAccordionForm('2', '2')))
      const accordion = find('accordion')

      builderStore.add(paletteComponent('RsButton'), accordion, 'inner')

      expect(panelKeys()).toEqual(['panel1', 'panel2', 'panel3', 'rsAccordionPanel1'])
      expect(panelEventKeys()).toEqual(['1', '2', '3', '4'])
      expect(accordion.store.props.activeKey?.value).toBe('2')
      expect(accordion.store.props.defaultActiveKey?.value).toBe('2')
    })

    it('keeps the active panel when inserting a new panel that already has eventKey 1', () => {
      builderStore.parseForm(JSON.stringify(threePanelAccordionForm('2', '2')))

      const incoming = paletteComponent(accordionPanelType)
      incoming.store.props.eventKey = {value: '1'}

      builderStore.add(incoming, find('panel1'), 'before')

      expect(panelKeys().slice(1)).toEqual(['panel1', 'panel2', 'panel3'])
      expect(panelEventKeys()).toEqual(['1', '2', '3', '4'])
      // panel2 was active (eventKey "2"); after insert+reindex it must remain active as "3"
      expect(find('accordion').store.props.activeKey?.value).toBe('3')
      expect(find('panel2').store.props.eventKey?.value).toBe('3')
      expect(find('accordion').store.props.defaultActiveKey?.value).toBe('3')
    })
  })

  describe('multi-select remove and clone', () => {
    it('reindexes and retargets activeKey when deleteSelectedComponents removes multiple panels including the active one', () => {
      builderStore.parseForm(JSON.stringify(threePanelAccordionForm('2', '2')))
      const accordion = find('accordion')

      builderStore.selected.clear()
      builderStore.selectNode(find('panel1'), true)
      builderStore.selectNode(find('panel2'), true)
      builderStore.deleteSelectedComponents()

      expect(panelKeys()).toEqual(['panel3'])
      expect(panelEventKeys()).toEqual(['1'])
      expect(accordion.store.props.activeKey?.value).toBe('1')
      expect(accordion.store.props.defaultActiveKey?.value).toBe('1')
    })

    it('assigns a unique eventKey and keeps the original active panel when cloning a panel in the same accordion', () => {
      builderStore.parseForm(JSON.stringify(threePanelAccordionForm('2', '2')))
      const accordion = find('accordion')
      const originalActive = find('panel2')

      builderStore.clone(originalActive)

      expect(panelEventKeys()).toEqual(['1', '2', '3', '4'])
      expect(panelKeys()).toHaveLength(4)
      expect(originalActive.store.props.eventKey?.value).toBe('2')
      expect(accordion.store.props.activeKey?.value).toBe('2')
      expect(accordion.store.props.defaultActiveKey?.value).toBe('2')
      expect(new Set(panelEventKeys()).size).toBe(4)
    })
  })
})
