import {define, oneOf, size, string} from '@react-form-builder/builder/view'
import {ComponentProps} from 'react'
import logo from '../../public/images/logo.png'
import {backgroundColor} from '../commonProperties'
import {AreaProps} from '../commonTypes'

interface RsImageProps extends ComponentProps<'img'>, AreaProps {
}

const RsImage = ({alt, ...props}: RsImageProps) => <img {...props} alt={alt}/>

export const rsImage = define(RsImage)
  .type('RsImage')
  .props({
    src: string.required.default(logo).hinted('Image source'),
    alt: string.named('Description').default('Image').hinted('Image description'),
  })
  .css({
    objectPosition: oneOf('top', 'bottom', 'left', 'right', 'center').default('left'),
    objectFit: oneOf('contain', 'cover', 'fill', 'none', 'scale-down').default('scale-down'),
    background: backgroundColor,
    height: size.hinted('Image height'),
    width: size.default('30%').hinted('Image width'),
  })
  .preview(<img src={logo} width="200px" height="auto" alt="Image"/>)
