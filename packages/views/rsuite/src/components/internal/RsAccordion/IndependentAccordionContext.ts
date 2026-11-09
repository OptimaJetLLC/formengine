import {createContext} from 'react'
import type {PanelGroupProps} from 'rsuite'

/**
 * Event key or keys used to expand accordion panels.
 * When `accordion` is false, an array expands every matching panel.
 */
export type AccordionActiveKey = string | number | ReadonlyArray<string | number>

/**
 * State used by accordion panels when they expand independently (`accordion={false}`).
 * Expansion is plain key equality — every panel whose eventKey matches the seed expands.
 */
export interface IndependentAccordionContextValue {
  /**
   * Controlled expanded key(s). When set, panels follow this value after mount.
   */
  activeKey?: AccordionActiveKey
  /**
   * Uncontrolled seed key(s) used for `defaultExpanded` when `activeKey` is unset.
   */
  defaultActiveKey?: AccordionActiveKey
  /**
   * Group onSelect forwarded from the accordion when panels expand independently.
   */
  onSelect?: PanelGroupProps['onSelect']
}

/**
 * Returns whether a panel eventKey matches an accordion seed key or any key in a seed array.
 * @param eventKey the panel event key
 * @param seed the active or default seed key(s)
 * @returns true when both are defined and equal after string coercion
 */
function matchesAccordionKey(eventKey: string | number | undefined, seed: AccordionActiveKey | undefined): boolean {
  if (eventKey === undefined || seed === undefined) return false
  if (typeof seed === 'string' || typeof seed === 'number') {
    return String(eventKey) === String(seed)
  }
  return seed.some(key => String(eventKey) === String(key))
}

type ResolvePanelExpansionArgs = {
  isBuilder: boolean
  independent?: IndependentAccordionContextValue
  eventKey?: string | number
  expanded?: boolean
  defaultExpanded?: boolean
}

type ResolvedPanelExpansion = {
  expanded?: boolean
  defaultExpanded?: boolean
  /** Cleared in independent mode so PanelGroup cannot coordinate panels. */
  eventKey?: string | number
}

/**
 * Resolves builder / group-accordion / independent expansion props for one panel.
 * @param args the builder flag, optional independent context, and panel expansion props
 * @param args.isBuilder whether the panel is rendered in the form builder
 * @param args.independent the independent-accordion context when `accordion` is false
 * @param args.eventKey the panel event key
 * @param args.expanded the panel controlled expanded prop
 * @param args.defaultExpanded the panel defaultExpanded prop
 * @returns props to pass through to RSuite Panel
 */
export function resolvePanelExpansion({
  isBuilder,
  independent,
  eventKey,
  expanded,
  defaultExpanded,
}: ResolvePanelExpansionArgs): ResolvedPanelExpansion {
  if (isBuilder) {
    return {expanded: true, defaultExpanded, eventKey}
  }

  if (!independent) {
    return {expanded, defaultExpanded, eventKey}
  }

  if (independent.activeKey !== undefined) {
    return {
      expanded: matchesAccordionKey(eventKey, independent.activeKey),
      defaultExpanded,
      eventKey: undefined,
    }
  }

  return {
    expanded,
    defaultExpanded: defaultExpanded ?? matchesAccordionKey(eventKey, independent.defaultActiveKey),
    eventKey: undefined,
  }
}

/** Context for panels when the group expands independently. */
export const IndependentAccordionContext = createContext<IndependentAccordionContextValue | undefined>(undefined)
