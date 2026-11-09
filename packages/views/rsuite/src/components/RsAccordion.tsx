import {boolean, commonStyles, define, event, forwardRef, node, string, useBuilderMode} from '@react-form-builder/core'
import cx from 'clsx'
import type {ForwardedRef, ReactNode} from 'react'
import {useMemo} from 'react'
import type {PanelGroupProps} from 'rsuite'
import {PanelGroup} from 'rsuite'
import {structureCategory} from './categories'
import type {AccordionActiveKey} from './internal/RsAccordion/IndependentAccordionContext'
import {IndependentAccordionContext} from './internal/RsAccordion/IndependentAccordionContext'
import {accordionPanelType, accordionType} from './internal/RsAccordion/panelKeys'
import styles from './RsAccordion.module.css'

export type {AccordionActiveKey} from './internal/RsAccordion/IndependentAccordionContext'

/**
 * Props for the RsAccordion component.
 */
export interface RsAccordionProps extends Omit<PanelGroupProps, 'accordion' | 'activeKey' | 'defaultActiveKey'> {
  /**
   * Whether only one panel can be expanded at a time.
   */
  accordion?: boolean
  /**
   * Expanded panel event key(s). When `accordion` is false, an array expands every matching panel.
   */
  activeKey?: AccordionActiveKey
  /**
   * Initially expanded panel event key(s) when `activeKey` is unset.
   * When `accordion` is false, an array expands every matching panel on mount.
   */
  defaultActiveKey?: AccordionActiveKey
  /**
   * CSS class name.
   */
  className?: string
  /**
   * Accordion panel children.
   */
  children?: ReactNode
}

/**
 * Narrows an accordion active key to the scalar type RSuite PanelGroup accepts.
 * @param key the active or default key, possibly an array for independent mode
 * @returns the scalar key, or the first array entry
 */
const toPanelGroupKey = (key: AccordionActiveKey | undefined): string | number | undefined => {
  if (key === undefined || typeof key === 'string' || typeof key === 'number') return key
  return key[0]
}

/**
 * Accordion component based on RSuite PanelGroup accordion effect.
 * In builder mode all panels stay expanded so their contents remain editable.
 * @param props the component props.
 * @param props.accordion whether only one panel can be expanded (default true).
 * @param props.activeKey the expanded panel event key, or keys when `accordion` is false.
 * @param props.defaultActiveKey the default expanded panel event key, or keys when `accordion` is false.
 * @param props.bordered whether to show a border around the group.
 * @param props.onSelect callback when a panel is expanded or collapsed.
 * @param props.className the CSS class name.
 * @param props.children accordion panel children.
 * @param ref the forwarded ref to the panel group element.
 * @returns the React element.
 * @see https://www.rsuitejs.com/components/panel/#accordion-effect
 */
export const RsAccordion = forwardRef((props: RsAccordionProps, ref: ForwardedRef<HTMLDivElement>) => {
  const {accordion = true, activeKey, defaultActiveKey, bordered, onSelect, className, children, ...otherProps} = props
  const isBuilder = useBuilderMode() === 'builder'
  const expandsIndependently = !isBuilder && !accordion
  const independentAccordion = useMemo(
    () => (expandsIndependently ? {activeKey, defaultActiveKey, onSelect} : undefined),
    [expandsIndependently, activeKey, defaultActiveKey, onSelect]
  )

  return (
    <PanelGroup
      {...otherProps}
      ref={ref}
      accordion={isBuilder ? false : accordion}
      activeKey={isBuilder || expandsIndependently ? undefined : toPanelGroupKey(activeKey)}
      defaultActiveKey={isBuilder || expandsIndependently ? undefined : toPanelGroupKey(defaultActiveKey)}
      bordered={bordered}
      className={cx(styles.accordion, className)}
      onSelect={expandsIndependently ? undefined : onSelect}
    >
      <IndependentAccordionContext.Provider value={independentAccordion}>{children}</IndependentAccordionContext.Provider>
    </PanelGroup>
  )
})

export const rsAccordion = define(RsAccordion, accordionType)
  .category(structureCategory)
  .kind('container')
  .props({
    accordion: boolean.default(true),
    activeKey: string,
    defaultActiveKey: string.default('1'),
    bordered: boolean.default(false),
    onSelect: event,
    children: node.withChildWrapper({componentType: accordionPanelType}),
  })
  .wrapperCss({
    height: commonStyles.height.setup({default: 'auto'}),
  })
