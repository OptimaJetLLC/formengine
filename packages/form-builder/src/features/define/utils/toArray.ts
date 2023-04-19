import {reduce} from 'lodash-es'
import {string} from '../../annotation'
import {Annotation} from '../../annotation/types/annotations/Annotation'
import {BuilderSetup} from '../../annotation/utils/builders/BaseBuilder'
import {Annotations} from '../types'

export function toArray<T extends object = any>(annotations?: Annotations<T>, setup: BuilderSetup = {}) {
  return reduce(annotations, (prev: Annotation[], value, key) => {
    prev.push(value?.setup(setup)?.build(key) ?? string.setup(setup).build(key))
    return prev
  }, [])
}
