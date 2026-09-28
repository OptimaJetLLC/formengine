import type {Annotation, PropertyBlockType} from '@react-form-builder/core'
import {Hinted} from '../../../../annotation-editors/Hinted'
import {PropertyEditorWrapper} from '../../../../components/PropertyEditorWrapper/PropertyEditorWrapper'
import type {Section} from '../Section'

/**
 * Represents the properties of PropertyBlock component.
 */
interface PropertyBlockProps {
  /**
   * The array of metadata properties of a React component.
   */
  annotations: Annotation[]
  /**
   * The context containing the property data.
   */
  context?: object
  /**
   * The function for creating an editing context, used if no context is specified.
   */
  initContext?: () => Record<string, any>
  /**
   * The title of the component's property block.
   */
  header?: string
  /**
   * The hint for header.
   */
  headerHint?: string
  /**
   * The property block type.
   */
  propertyBlockType?: PropertyBlockType
  /**
   * The displayed section.
   */
  displayedSection?: Section
}

/**
 * React form builder component that displays the properties of the component.
 * @param props the React component properties.
 * @param props.annotations the array of form builder component metadata.
 * @param props.context the properties of the form builder component.
 * @param props.initContext the function initializes the context for the first change.
 * @param props.header the property block title.
 * @param props.headerHint the hint for the property block title.
 * @param props.propertyBlockType the type of the property block.
 * @param props.displayedSection the displayed section.
 * @returns the React element.
 */
export const PropertyBlock = ({
  annotations,
  context,
  initContext,
  displayedSection,
  header,
  headerHint,
  propertyBlockType = 'component',
}: PropertyBlockProps) => {
  if (!context) return null

  return (
    <>
      {!!header && (
        <Hinted hint={headerHint}>
          <h6>{header}</h6>
        </Hinted>
      )}
      {annotations.map(annotation => (
        <PropertyEditorWrapper
          key={annotation.key}
          propertyBlockType={propertyBlockType}
          annotation={annotation}
          context={context}
          initContext={initContext}
          displayedSection={displayedSection}
        />
      ))}
    </>
  )
}
