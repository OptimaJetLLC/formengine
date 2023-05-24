import {errorMessageModel, ErrorWrapperProps} from '@react-form-builder/core'
import {string} from '../annotation'
import {Meta, toArray} from '../define'

export const errorMessageMeta = new Meta(errorMessageModel.type,
  toArray<ErrorWrapperProps>({
    className: string,
  }), [], [])
