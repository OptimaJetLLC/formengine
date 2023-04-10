import {reduce} from 'lodash-es'
import {string} from '../../annotation'
import {AnnotationType} from '../../annotation/types'
import {Annotation} from '../../annotation/types/annotations/Annotation'
import {Annotations} from '../types'

export function toArray<T extends object = any>(annotations?: Annotations<T>, type?: AnnotationType) {
  return reduce(annotations, (prev: Annotation[], value, key) => {
    prev.push(value?.setup({type})?.build(key) ?? string.setup({type}).build(key))
    return prev
  }, [])
}
