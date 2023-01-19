import {IconDefinition} from '@fortawesome/fontawesome-common-types'
import {Icon} from '@rsuite/icons'

const FaSvgIcon = ({faIcon, size, ...rest}: { faIcon: any, size?: number }) => {
  const {width, height, svgPathData} = faIcon
  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={`${size ?? 1}em`} height={`${size ?? 1}em`}
         fill="currentColor" {...rest}>
      <path d={svgPathData}/>
    </svg>
  )
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

export const FaIcon = ({icon, size, ...props}: FaIconProps) => (
  <Icon as={FaSvgIcon} {...{faIcon: icon, size, ...props}}/>
)

export default FaSvgIcon
