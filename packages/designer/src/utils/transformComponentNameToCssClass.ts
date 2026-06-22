/**
 * Transforms internal component name or title to suitable CSS class.
 * @param componentName the component name or title.
 * @returns the string well-formed CSS class.
 */
export function transformComponentNameToCssClass(componentName?: string): string {
  return componentName ? `FE_${componentName.replaceAll(' ', '_')}` : ''
}
