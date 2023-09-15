import {string} from '../annotation'
import {toArray} from '../define'
import {Meta} from '../define/utils/Meta'
import {errorMessageModel, ErrorWrapperProps} from './components/DefaultErrorMessage'

export const errorMessageMeta = new Meta(errorMessageModel.type,
  toArray<ErrorWrapperProps>({
    className: string,
  }), [], [])
