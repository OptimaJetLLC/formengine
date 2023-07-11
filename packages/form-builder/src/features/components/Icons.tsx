import {IconDefinition} from '@fortawesome/fontawesome-common-types'
import {Icon} from '@rsuite/icons'

/**
 * The React component that displays an SVG icon.
 * @param props the React component properties.
 * @param props.faIcon the SVG icon.
 * @param props.size the size of the icon.
 * @returns the React element.
 */
const FaSvgIcon = ({faIcon, size, ...rest}: { faIcon: any, size?: number }) => {
  const {width, height, svgPathData} = extractFaIconData(faIcon)
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={`${size ?? 1}em`} height={`${size ?? 1}em`}
         fill="currentColor" {...rest}>
      <path d={svgPathData}/>
    </svg>
  )
}

const extractFaIconData = (faIcon: any) => {
  if (faIcon?.icon) {
    const [width, height, , , svgPathData] = faIcon.icon
    return {width, height, svgPathData}
  }
  return faIcon
}

interface FaIconProps {
  icon: IconDefinition,
  size?: number,
  color?: string,
  props?: any,
  viewBox?: string,
  width?: string,
  height?: string,
  onClick?: any,
}

/**
 * The React component that displays an icon.
 * @param props the React component properties.
 * @param props.icon the icon.
 * @param props.size the size of the icon.
 * @param props.props the other properties of the component.
 * @returns the React element.
 */
export const FaIcon = ({icon, size, ...props}: FaIconProps) => (
  <Icon as={FaSvgIcon} {...{faIcon: icon, size, ...props}}/>
)

export default FaSvgIcon
