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
    src: string.required.default(logo),
    alt: string.named('Description').default('Image'),
    height: size.default({measure: 'auto'}),
    width: size.default({value: '100', measure: '%'}),
    backgroundColor,
    position: oneOf('top', 'bottom', 'left', 'right', 'center').default('left'),
    fit: oneOf('contain', 'cover', 'fill', 'none', 'scale-down').default('scale-down')
  })
