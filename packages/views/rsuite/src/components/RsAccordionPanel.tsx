import {boolean, commonStyles, define, node, string, useBuilderMode} from '@react-form-builder/core'
import cx from 'clsx'
import type {ReactNode} from 'react'
import {useCallback, useContext} from 'react'
import type {PanelProps} from 'rsuite'
import {Panel} from 'rsuite'
import {structureCategory} from './categories'
import {accordionPanelEventListeners} from './internal/RsAccordion/eventListeners'
import {IndependentAccordionContext, resolvePanelExpansion} from './internal/RsAccordion/IndependentAccordionContext'
import {accordionPanelType, accordionType} from './internal/RsAccordion/panelKeys'
import styles from './RsAccordionPanel.module.css'

/**
 * Props for the RsAccordionPanel component.
 */
export interface RsAccordionPanelProps extends Omit<PanelProps, 'header'> {
  /**
   * Panel header text.
   */
  header?: ReactNode
  /**
   * Panel body content.
   */
  children?: ReactNode
  /**
   * CSS class name.
   */
  className?: string
}

/**
 * A single panel for use inside RsAccordion (RSuite Panel in an accordion group).
 * In builder mode the panel stays expanded and non-collapsible so its contents remain editable.
 * @param props the component props.
 * @param props.header the panel header.
 * @param props.eventKey the event key used by the parent accordion.
 * @param props.bodyFill whether content fills the panel body.
 * @param props.bordered whether to show a border.
 * @param props.shaded whether to show a shadow.
 * @param props.className the CSS class name.
 * @param props.children panel body content.
 * @param props.expanded whether the panel is expanded (forced true in builder mode).
 * @param props.defaultExpanded whether the panel is expanded initially.
 * @param props.collapsible whether the panel can be collapsed (forced false in builder mode).
 * @param props.onSelect callback when the panel is expanded or collapsed.
 * @returns the React element.
 * @see https://www.rsuitejs.com/components/panel/#accordion-effect
 */
export const RsAccordionPanel = ({
  header,
  eventKey,
  bodyFill,
  bordered,
  shaded,
  className,
  children,
  expanded,
  defaultExpanded,
  collapsible = true,
  onSelect,
  ...props
}: RsAccordionPanelProps) => {
  const isBuilder = useBuilderMode() === 'builder'
  const independentAccordion = useContext(IndependentAccordionContext)
  const expansion = resolvePanelExpansion({isBuilder, independent: independentAccordion, eventKey, expanded, defaultExpanded})
  const handleIndependentSelect = useCallback<NonNullable<PanelProps['onSelect']>>(
    (_selectedKey, event) => {
      onSelect?.(eventKey, event)
      independentAccordion?.onSelect?.(eventKey, event)
    },
    [eventKey, independentAccordion, onSelect]
  )

  return (
    <Panel
      {...props}
      header={header}
      eventKey={expansion.eventKey}
      bodyFill={bodyFill}
      bordered={bordered}
      shaded={shaded}
      className={cx(styles.panel, className)}
      collapsible={isBuilder ? false : collapsible}
      expanded={expansion.expanded}
      defaultExpanded={expansion.defaultExpanded}
      onSelect={independentAccordion ? handleIndependentSelect : onSelect}
    >
      {children}
    </Panel>
  )
}

export const rsAccordionPanel = define(RsAccordionPanel, accordionPanelType)
  .category(structureCategory)
  .eventListeners(accordionPanelEventListeners)
  .disableToolbarAdd()
  .props({
    header: string.default('Panel'),
    eventKey: string.default('1'),
    bodyFill: boolean.default(false),
    bordered: boolean.default(false),
    shaded: boolean.default(false),
    children: node,
  })
  .wrapperCss({
    height: commonStyles.height.setup({default: 'auto'}),
  })
  .insertRestriction((_, parent) => parent.model.type === accordionType)
