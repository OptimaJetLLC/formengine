import {errorMessageModel, ErrorMessageProps} from 'fb-core'
import {node, string} from '../annotation'
import {Meta, modules, toArray} from '../define'

export const errorMessageMeta = new Meta(errorMessageModel.type,
  toArray<ErrorMessageProps>({
    error: string,
    children: node,
  }), [], modules)
