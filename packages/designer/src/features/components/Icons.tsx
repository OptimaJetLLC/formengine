import type {IconDefinition} from '@fortawesome/fontawesome-common-types'
import {forwardRef, isUndefined} from '@react-form-builder/core'
import {Icon} from '@rsuite/icons'
import type {Ref} from 'react'

const extractFaIconData = (faIcon: any) => {
  if (faIcon?.icon) {
    const [width, height, , , svgPathData] = faIcon.icon
    return {width, height, svgPathData}
  }
  return faIcon
}

/**
 * The React component that displays an SVG icon.
 * @param props the React component properties.
 * @param props.faIcon the SVG icon.
 * @param props.size the size of the icon.
 * @returns the React element.
 */
const FaSvgIcon = forwardRef(({faIcon, size, ...rest}: {faIcon: any; size?: number}, ref: Ref<SVGSVGElement>) => {
  const {width, height, svgPathData} = extractFaIconData(faIcon)
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={`${size ?? 1}em`} height={`${size ?? 1}em`} fill="currentColor" {...rest} ref={ref}>
      <path d={svgPathData} />
    </svg>
  )
})

interface FaIconProps {
  icon: IconDefinition
  size?: number
  color?: string
  props?: any
  viewBox?: string
  width?: string
  height?: string
  onClick?: any
  className?: string
}

/**
 * The React component that displays an icon.
 * @param props the React component properties.
 * @param props.icon the icon.
 * @param props.size the size of the icon.
 * @param props.props the other properties of the component.
 * @returns the React element.
 */
export const FaIcon = forwardRef(({icon, size, ...props}: FaIconProps, ref: Ref<SVGElement>) => {
  const iconSize = isUndefined(size) ? undefined : `${size}em`
  return <Icon as={FaSvgIcon} ref={ref} size={iconSize} {...{faIcon: icon, ...props}} />
})
