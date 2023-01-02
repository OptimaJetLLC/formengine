import {define, oneOf, size, string} from 'fb-core'
import React, {ComponentProps} from 'react'
import logo from '../../public/images/logo.png'
import {backgroundColor} from '../commonProperties'
import {AreaProps} from '../commonTypes'

interface ImageProps extends ComponentProps<'img'>, AreaProps {
  position: string
  fit: string
}

const Image = ({alt, ...props}: ImageProps) => {
  return <img {...props} alt={alt}/>
}

export const image = define(Image)
  .props({
    src: string.required.default(logo).hinted('Image source'),
    alt: string.named('Description').default('Image').hinted('Image description'),
    height: size.default({measure: 'auto'}).hinted('Image height'),
    width: size.default({value: '100', measure: '%'}).hinted('Image width'),
    backgroundColor: backgroundColor.hinted('Background color'),
    position: oneOf('top', 'bottom', 'left', 'right', 'center').default('left'),
    fit: oneOf('contain', 'cover', 'fill', 'none', 'scale-down').default('scale-down')
  })
